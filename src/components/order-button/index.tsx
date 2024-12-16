"use client"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { ThreeDots } from "react-loader-spinner";
import style from "./OrderButton.module.scss";
import { useDispatch } from "react-redux";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Button } from "..";
import { setSumOfCart } from "@/redux/slices/generalSlice";

interface propsType {
    model: string
}

export default function OrderButton(props: propsType) {
    const [loading, setLoading] = useState(false);
    const [numberOfOrder, setNumberOfOrder] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        getNumberOfProductFunc();

    }, []);
    const getNumberOfProductFunc = async () => {
        setLoading(true)
        const CartId = localStorage.getItem("cartId") || ''
        if (CartId) {
            try {
                const response = await fetchInstance(`${endpoints.order.getCurrentCartWithProductModel.replace(":id", CartId)}?model=${props.model}`)

                setNumberOfOrder(response.data.count || 0)
                dispatch(setSumOfCart(response.data.total));

            } catch (error) {
                console.log('error', error)
            } finally {
                setLoading(false)
            }
        }
    };

    const handleClickBin = async () => {
        setLoading(true)
        const CartId = localStorage.getItem('cartId')
        try {
            const response = await fetchInstance(endpoints.order.reomoveFormCart, {
                method: "POST",
                cache: "no-cache", body: {
                    model: props.model,
                    cartId: CartId ? CartId : ''
                }
            });
            setNumberOfOrder(response.data.count)

            dispatch(setSumOfCart(response.data.total));

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const handleClickPlus = async () => {
        setLoading(true);
        const CartId = localStorage.getItem('cartId')
        try {
            const response = await fetchInstance(endpoints.order.addToCart, {
                method: "POST",
                cache: "no-cache", body: {
                    model: props.model,
                    cartId: CartId ? CartId : ''
                }
            });
            console.log(response.data)
            if (!CartId) localStorage.setItem('cartId', response.data?.cartId ? response.data.cartId : '')
            setNumberOfOrder(+response.data.count)
            dispatch(setSumOfCart(response.data.total));
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
