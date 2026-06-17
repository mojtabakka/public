'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from '@iconify/react'
import { CartBox, Card, Button } from "@/components";
import { useSelector } from "react-redux";
import { isEmpty, sumBy } from "lodash";
import { englishToPersianNumbers, getToman, groupBy } from "@/utils/function.utils";
import { RootState } from "@/redux/store";
import CalPricesBoxSkeleton from "@/skeletons/cal-prices-box.skeleton";
import { Product } from "@/types/product.type";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";

export const dynamic = "force-dynamic";


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
        if (localStorage.getItem("cartId")) {
            try {
                const response = await fetchInstance(endpoints.order.getCurrentBasket.replace(":cartId", localStorage.getItem("cartId") || ''))
                const data = groupBy<Product>(response.data.products, "model");
                calculatePrices(data);
                setCartItems(data);
            } catch (error) {
                setCartItems([])
                console.log('error', error)
            } finally {
            }
        } else {
            setCartItems([])
        }
    };
    return (
        <div className="md:flex lg:flex p-2 w-full text-xs">
            <Card className="md:m-2 rounded-lg w-full">
                <CartBox items={cartItems} />
            </Card>
            {!isEmpty(cartItems) && cartItems && (
                <div className="mt-2 w-full md:w-1/2 lg:w-1/3">
                    <Card className="shadow-sm border rounded-xl">
                        <div className="p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="ic:baseline-price-check"
                                            className="text-lg md:text-xl"
                                        />
                                        <span className="text-xs md:text-sm">
                                            قیمت کالاها
                                        </span>
                                    </div>

                                    <span className="font-semibold text-xs md:text-sm">
                                        {englishToPersianNumbers(
                                            getToman(Number(sumPrice))
                                        )}{" "}
                                        تومان
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="ic:baseline-price-check"
                                            className="text-lg md:text-xl"
                                        />
                                        <span className="text-xs md:text-sm">
                                            جمع سبد خرید
                                        </span>
                                    </div>

                                    <span className="font-semibold text-xs md:text-sm">
                                        {englishToPersianNumbers(
                                            getToman(Number(sumFinalPrice))
                                        )}{" "}
                                        تومان
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-red-500">
                                        <Icon
                                            icon="game-icons:profit"
                                            className="text-lg md:text-xl"
                                        />
                                        <span className="text-xs md:text-sm">
                                            سود شما از خرید
                                        </span>
                                    </div>

                                    <span className="font-bold text-red-500 text-xs md:text-sm">
                                        {englishToPersianNumbers(
                                            getToman(Number(benefit))
                                        )}{" "}
                                        تومان
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link href="/shipping">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        className="!rounded-lg w-full"
                                    >
                                        ثبت سفارش
                                    </Button>
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
