'use client'

import React from "react";
import OrderButton from "@/components/order-button";
import { Icon } from '@iconify/react'
import Link from "next/link";
import { Product } from "@/types/product.type";
import { addCommasSeprator, englishToPersianNumbers } from "@/utils/function.utils";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


interface PropsType {
    product: Product
}

export default function ProductPrice(props: PropsType) {
    const cartCount = useSelector((item: RootState) => item.general.sumCart);
    const { product } = props
    const { warranty, priceForUser, deliveryMethod, off, model } = product;
    return (
        <div className="bg-white m-1 rounded lg:w-1/4 px-3  pt-3  w-full text-right mt-3">
            <div className=" flex-col h-full">
                <div className="  text-sm flex-1   h-5/6">
                    {warranty && (
                        <>
                            <div className="p-2">
                                <span className="pl-2">
                                    <Icon icon="iconamoon:shield-yes-bold" className=" inline-block text-xl" />
                                </span>
                                <span className=" font-semibold">
                                    {warranty}
                                </span>
                            </div>
                        </>
                    )}

                    {deliveryMethod && (
                        <div className="px-3 py-2 ">
                            <span className="pl-2">
                                <Icon icon="hugeicons:delivery-delay-02" className=" inline-block  text-lg" />
                            </span>
                            <span className=" font-semibold"> ارسال با </span>
                            <span>{deliveryMethod}</span>
                        </div>
                    )}

                    <div className="text-left  pt-3 hidden  lg:block   ">
                        <div className=" flex justify-between">
                            <div className="hidden lg:items-start lg:justify-between  w-full  lg:flex">
                                <div className="flex items-center  ">
                                    <div className="px-2 flex">
                                        <span className="pl-2">
                                            <Icon icon="material-symbols:price-check" className=" inline-block  text-xl" />
                                        </span>
                                        <span>قیمت فروشنده</span>
                                    </div>
                                    {off && <Badge className="p-1 py-0 bg-red-600  text-white  rounded-xl   !text-xs" variant="standard" color="error">{englishToPersianNumbers(Math.round(off))} %</Badge>}
                                </div>
                                <div >
                                    <div className=" text-right text-lg font-semibold ">
                                        <span className=" text-right">
                                            {off
                                                ? englishToPersianNumbers(addCommasSeprator(
                                                    Math.round(Number(priceForUser) - Number(priceForUser) * (+off / 100)).toString()
                                                ))
                                                : englishToPersianNumbers(addCommasSeprator(Math.round(Number(priceForUser)).toString()))}
                                        </span>
                                        <span className="px-1">تومان </span>
                                    </div>

                                    {off && (
                                        <div
                                            className=" text-right line-through text-gray-400 text-base"
                                        >
                                            {englishToPersianNumbers(priceForUser)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full text-right  mb-0  flex-1 hidden lg:inline-block">
                    <>
                        <OrderButton model={model} />
                        {cartCount > 0 && <Link
                            href={"/cart"}
                            className="text-xs p-2 text-blue-300 cursor-pointer"
                        >
                            مشاهده سبد خرید
                        </Link>}
                    </>
                </div>

                <div className=" fixed w-full   right-0  bottom-0  bg-white shadow-lg border p-2">
                    <div className="w-full text-center my-3 items-center flex  align-middle lg:hidden">
                        <div className="w-full text-right   ">
                            <>
                                <OrderButton model={model} />
                                {cartCount > 0 && < Link
                                    href="/cart"
                                    className=" p-2 text-blue-300 cursor-pointer text-xs"
                                >
                                    مشاهده سبد خرید
                                </Link>}
                            </>
                        </div>
                        <div className=" w-8/12 flex justify-end  items-center  ">
                            <div className="flex">
                                <div className=" text-right">
                                    <div className=" text-gray-400 text-xs   ">
                                        {off
                                            ? addCommasSeprator(
                                                Math.round(Number(priceForUser) - Number(priceForUser) * (off / 10)).toString()
                                            )
                                            : addCommasSeprator(priceForUser)}

                                        <span className="px-1">تومان</span>
                                    </div>
                                    {off && (
                                        <div className="line-through ">
                                            {addCommasSeprator(priceForUser)}
                                        </div>
                                    )}
                                    <Badge className=" inline-block  text-xs p-1   font-black text-red-400 " color="error" >{off}% تخفیف</Badge>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

