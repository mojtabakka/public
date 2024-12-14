'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from '@iconify/react'
import { CartBox, Card, Button } from "@/components";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { isEmpty, sumBy } from "lodash";
import { getToman, groupBy } from "@/utils/function.utils";
import { RootState } from "@/redux/store";
import CalPricesBoxSkeleton from "@/skeletons/cal-prices-box.skeleton";
import { Product } from "@/types/product.type";

const Cart = () => {
    const [cartItems, setCartItems] = useState<Array<{ [key: string]: any }>>();
    const [benefit, setBenefit] = useState<number>();
    const [sumFinalPrice, setSumFinalPrice] = useState<number>();
    const [sumPrice, setSumPrice] = useState<number>();
    const cartCount = useSelector((item: RootState) => item.general.sumCart);
    useEffect(() => {
        getBasekt();

    }, [cartCount]);

    const calculatePrices = (data: any) => {
        let purePrice = 0;
        let sumFinalPrice = 0;
        data.map((item: any) => {
            const mapedItem = item[Object.keys(item)[0]].map((data: Product) => ({ ...data, priceForUser: +data.priceForUser }))
            purePrice = sumBy(mapedItem, 'priceForUser')
            item[Object.keys(item)[0]].forEach((item: Product) => {
                sumFinalPrice = sumFinalPrice + (+item.priceForUser - (+item.priceForUser * (item.off / 100)))
            })
        });
        setSumFinalPrice(sumFinalPrice);
        setSumPrice(purePrice);
        setBenefit(purePrice - sumFinalPrice);
    };
    const getBasekt = async () => {
        if (Cookies.get("cart")) {
            let data = JSON.parse(Cookies.get("cart") || "");
            data = groupBy<Product>(data, "model");
            calculatePrices(data);
            setCartItems(data);
        }
        else {
            setCartItems([]);
        }
    };
    return (
        <div className="p-2 w-full md:flex  lg:flex text-xs">
            <Card className="m-2 w-full rounded-lg ">
                <CartBox items={cartItems} />
            </Card>
            {!isEmpty(cartItems) && cartItems && (
                <div className=" lg:w-1/3 md:w-1/2 m-2 w-full ">
                    <Card className="rounded-lg ">
                        <div>
                            <div className=" flex justify-between">
                                <div>
                                    <Icon icon="ic:baseline-price-check" className=" inline-block text-xl " />
                                    <span className="px-2">قیمت کالاها</span>
                                </div>
                                <div>{getToman(Number(sumPrice))} تومان</div>
                            </div>
                            <hr className="my-5" />
                            <div className=" flex justify-between">
                                <div>
                                    <Icon icon="ic:baseline-price-check" className=" inline-block text-xl " />
                                    <span className="px-2">جمع سبد خرید</span>
                                </div>
                                <div>{getToman(Number(sumFinalPrice))} تومان</div>
                            </div>
                            <hr className="my-5" />
                            <div className=" flex justify-between text-red-500">
                                <div>
                                    <Icon icon="game-icons:profit" className=" inline-block text-xl" />
                                    <span className="px-2">سود شما از خرید</span>
                                </div>
                                <div className="">{getToman(Number(benefit))} تومان</div>
                            </div>
                            <div className="w-full mt-10  mb-3 text-center">
                                <Link href={"shipping"} >
                                    <Button variant="contained" className="w-full"> ثبت سفارش</Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {
                !cartItems && <CalPricesBoxSkeleton />
            }
        </div>
    );
};

export default Cart;
