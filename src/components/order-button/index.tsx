"use client"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { ThreeDots } from "react-loader-spinner";
import style from "./OrderButton.module.scss";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { isArray, isEmpty } from "lodash";
import { setSumOfCart } from "@/redux/slices/generalSlice";
import { Product } from "@/types/product.type";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Button } from "..";

interface propsType {
    model: string
}

export default function OrderButton(props: propsType) {
    const [loading, setLoading] = useState(false);
    const [numberOfOrder, setNumberOfOrder] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getNumberOfProductFunc();
        checkLogin();
    });
    const checkLogin = () => {
        const check = localStorage.getItem("authenticated");
        if (check) setIsLogin(true);
        else setIsLogin(false);
    };
    const getNumberOfProductFunc = async () => {
        try {
            let products: Array<Product> = JSON.parse(Cookies.get("cart") || "");
            products =
                !isEmpty(products) ?
                    products.filter((item) => item?.model === props.model) : []
            const cartCount =
                products && !isEmpty(products) ? products.length : 0;
            setNumberOfOrder(() => {
                return cartCount;
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleClickBin = async () => {
        const ids: Array<string | number> = [];
        try {
            setIsLogin(true);
            let cookieCart: Array<Product> | string = Cookies.get("cart") || "";
            if (cookieCart) {
                cookieCart = JSON.parse(Cookies.get("cart") || "");
                if (cookieCart.length > 0) {
                    const filterModel = isArray(cookieCart) ? cookieCart.filter((item) => {
                        return item.model === props.model;
                    })[0] : { id: "" }

                    cookieCart = isArray(cookieCart) ? cookieCart.filter((item) => item.id !== filterModel.id) : '';
                    if (isEmpty(!cookieCart) && isArray(cookieCart))
                        cookieCart.forEach((element) => {
                            ids.push(element.id);
                        });
                    dispatch(setSumOfCart(cookieCart.length));
                    cookieCart = JSON.stringify(cookieCart);
                    Cookies.set("cart", cookieCart);
                    setNumberOfOrder((value) => {
                        return value - 1;
                    });
                    if (isLogin) {
                        await fetchInstance(endpoints.order.addToCart, {
                            method: "POST",
                            cache: "no-cache", body: {
                                ids
                            }
                        })
                    };
                }
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickPlus = async () => {
        const ids: Array<string | number> = [];
        setLoading(true);
        try {
            let cookieCart = Cookies.get("cart");
            if (!cookieCart) {
                Cookies.set("cart", JSON.stringify([]));
            }
            cookieCart = JSON.parse(Cookies.get("cart") || "");

            if (isEmpty(!cookieCart) && isArray(cookieCart))
                cookieCart.forEach((element) => {
                    ids.push(element.id);
                });

            const data = new URLSearchParams({
                model: props.model,
                ids: JSON.stringify(ids)
            });

            const product = (await fetchInstance(`${endpoints.product.getProductsNotReserved}?${data}`, {
                method: "GET",
                cache: "no-cache"
            })).data
            if (product) {
                const chekck = isArray(cookieCart) && cookieCart.find((item) => item?.id === product?.id);
                if (!chekck && isArray(cookieCart)) cookieCart.push(product);
                ids.push(product.id);
                if (isArray(cookieCart)) dispatch(setSumOfCart(cookieCart?.length));
                Cookies.set("cart", JSON.stringify(cookieCart));
                setNumberOfOrder((value) => {
                    return value + 1;
                });
                if (isLogin)
                    await fetchInstance(endpoints.order.addToCart, {
                        method: "POST",
                        cache: "no-cache", body: {
                            ids
                        }
                    });
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {numberOfOrder > 0 && <span className={` border p-2 rounded ${style.button__shodow}`}>
                <button className=" border-0">
                    <span className="px-2 " onClick={handleClickPlus}>
                        <Icon icon="ic:baseline-plus" className=" inline-block text-blue-400" />
                    </span>
                    <span className="px-2">
                        {loading ? (
                            <div className=" inline-block">
                                <ThreeDots
                                    height="10"
                                    width="10"
                                    radius="9"
                                    color="#5FA4F9"
                                    ariaLabel="three-dots-loading"
                                    visible={loading}
                                />
                            </div>
                        ) : (
                            <span className="text -blue-400">{numberOfOrder}</span>
                        )}
                    </span>
                    <span className="px-2" onClick={handleClickBin}>
                        <Icon icon="gravity-ui:trash-bin" className=" text-red-400 inline-block" />
                    </span>
                </button>
            </span>}
            {
                numberOfOrder === 0 && <Button variant="contained" className="w-full" onClick={handleClickPlus}>افزودن به سب خرید</Button>
            }
        </>
    );
}
