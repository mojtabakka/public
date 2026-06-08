"use client"

import React from "react";
import { Icon } from '@iconify/react'
import { isEmpty, isObject } from "lodash";
import { getToman } from "@/utils/function.utils";
import OrderButton from "../order-button";
import Image from 'next/image'
import CartBoxSkeleton from "@/skeletons/cart-box.skeleton";
import { Skeleton } from "@mui/material";

interface propsType {
    items: Array<{ [key: string]: any }> | undefined
}

export default function CardBox(props: propsType) {
    const {
        items
    } = props
    return (
        <div className="">
            {items ? isObject(items) && items.length > 0 && < div className="  text-sm  md:text-base lg:text-lg">سبد خرید شما</div> : <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={100} height={35} ></Skeleton>
            }
            <div className="mb-5">
                {!isEmpty(items) && items &&
                    items.map((item, index) => {
                        const key = Object.keys(item)[0]
                        const number = item[key].length;
                        const data = item[Object.keys(item)[0]][0];
                        return (
                            number > 0 && (
                                <div className="mt-3" key={index}>
                                    <div className="flex border rounded-lg">
                                        <div className="flex flex-col justify-between py-5 px-5">
                                            <Image src={(process.env.NEXT_PUBLIC_BASE_URL_CLIENT || "") +'/'+ data?.photos[0]?.src} height={10} width={200} alt={data.model} className=" rounded-lg h-24 w-24" />
                                            <div className="  text-center">
                                                <OrderButton model={data.model} />
                                            </div>
                                        </div>

                                        <div className=" pt-3">
                                            <div className="p-2 text-right  w-full">
                                                <h1 className="lg:text-lg text-sm md:text-base text-black ">{data.model}</h1>

                                                {data.warranty && (
                                                    <>
                                                        <div className="py-1  text-xs lg:text-sm mt-1 ">
                                                            <span className="pl-2  ">
                                                                <Icon icon="iconamoon:shield-yes-bold" className=" inline-block text-xs lg:text-sm" />
                                                            </span>
                                                            {data.warranty}
                                                        </div>
                                                    </>
                                                )}
                                                {data.deliveryMethod && (
                                                    <div className="py-1 text-xs lg:text-sm text-gray-500 ">
                                                        <span className="pl-2">
                                                            <Icon icon="hugeicons:delivery-delay-02" className=" inline-block  text-xs lg:text-sm" />
                                                        </span>
                                                        <span>{data.deliveryMethod}</span>
                                                    </div>
                                                )}
                                                <div className=" text-xs lg:text-sm text-gray-500">
                                                    <span className="pl-2">
                                                        <Icon icon="mage:memory-card" className=" inline-block text-xs lg:text-sm" />
                                                    </span>
                                                    <span>موجود در انبار </span>
                                                </div>
                                                {data.off && (
                                                    <div className="mt-3 text-red-400 text-xs lg:text-sm">
                                                        {getToman(
                                                            Number(data.priceForUser) * (data.off / 100)
                                                        )}
                                                        <span className="px-1 text-xs lg:text-sm">تومان تخفیف</span>
                                                    </div>
                                                )}
                                                <div className="mt-3 font-black  text-sm lg:text-sm">
                                                    {getToman(
                                                        Number(data.priceForUser) -
                                                        Number(data.priceForUser) * (data.off / 100)
                                                    )}
                                                    <span className="px-1">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        );
                    })}
                {isEmpty(items) && items && (
                    <div className="text-base text-gray-400 lg:text-lg t flex h-full p-20 justify-center items-center">
                        <div className=" flex flex-col justify-center items-starts gap-6">
                            <div className=" flex justify-center">
                                <Icon icon="twemoji:shopping-cart" className=" text-9xl" />
                            </div>
                            <div className="text-center">سبد شما خالی است</div>
                        </div>
                    </div>
                )}

                {!items && <CartBoxSkeleton />}
            </div>
        </div >
    )
}

