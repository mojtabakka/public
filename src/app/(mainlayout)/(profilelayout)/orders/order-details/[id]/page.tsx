"use client";

import Progressbar from "@/components/proggress-bar";
import { ORDER_STATUS } from "@/config/general.config";
import OrderDetailSkeleton from "@/skeletons/order-detail.skeleton";
import { Order } from "@/types/order.type";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import {
    englishToPersianNumbers,
    getCompleteDateToPersian,
    getToman,
    groupBy,
} from "@/utils/function.utils";
import { Card } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface PageProps {
    params: { id: string };
    searchParams?: Record<string, string | string[] | undefined>;
}

const STATUS_BG: Record<string, string> = {
    notPayed: "bg-red-100 dark:bg-red-900/20",
    payed: "bg-blue-100 dark:bg-blue-900/20",
    preparing: "bg-amber-100 dark:bg-amber-900/20",
    isSendig: "bg-green-100 dark:bg-green-900/20",
    completed: "bg-green-100 dark:bg-green-900/20",
};

const STATUS_TEXT: Record<string, string> = {
    notPayed: "text-red-600 dark:text-red-400",
    payed: "text-blue-600 dark:text-blue-400",
    preparing: "text-amber-600 dark:text-amber-400",
    isSendig: "text-green-700 dark:text-green-400",
    completed: "text-green-800 dark:text-green-400",
};

export default function OrderDetails(props: PageProps) {
    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<{ [key: string]: any }[] | null>([]);

    const orderId = props.params.id;

    useEffect(() => {
        getOrderItems();
    }, []);

    const getOrderItems = async () => {
        try {
            if (orderId) {
                setLoading(true);

                const result = await fetchInstance(
                    endpoints.order.getOrder.replace(":id", orderId)
                );

                const products = result?.data?.products
                    ? groupBy(result?.data?.products, "model")
                    : null;

                setProducts(products);
                setOrder(result.data);
            }
        } catch (error) {
            console.error("order detail fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!loading && (
                <div className="w-full space-y-3">

                    {/* Page Header */}
                    <div className="mb-4">
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                            جزئیات سفارش #{order?.id}
                        </h1>
                    </div>

                    {/* Order Info */}

                    {/* Order Info */}
                    <Card className="shadow-sm mt-5 !p-4 rounded-xl text-xs border border-slate-200 dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-3 text-xs md:text-sm">

                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Icon icon="mdi:calendar-check" width="18" />
                                <span>تاریخ ثبت سفارش:</span>
                                <span className="text-gray-900 dark:text-white">
                                    {englishToPersianNumbers(
                                        getCompleteDateToPersian(order?.updated_at || "")
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Icon icon="mdi:barcode" width="18" />
                                <span>کد پیگیری:</span>
                                <span className="text-gray-900 dark:text-white">
                                    {englishToPersianNumbers(order?.id.toString() || "")}
                                </span>
                            </div>

                        </div>
                    </Card>

                    {/* User Info */}
                    <Card className="shadow-sm !p-4 rounded-xl border border-slate-200 dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-3 text-xs md:text-sm">

                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Icon icon="mdi:phone" width="18" />
                                <span>شماره تماس:</span>
                                <span className="text-gray-900 dark:text-white">
                                    {englishToPersianNumbers(order?.user?.phoneNumber || "")}
                                </span>
                            </div>

                            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                <Icon icon="mdi:map-marker" width="18" className="mt-1" />
                                <span>آدرس:</span>
                                <span className="text-gray-900 dark:text-white leading-6">
                                    {order?.address?.address || ""}
                                </span>
                            </div>

                        </div>
                    </Card>

                    {/* Price Info */}
                    <Card className="shadow-md !p-5 rounded-xl border border-slate-200 dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-3 text-xs md:text-sm">

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Icon icon="mdi:cash" width="18" />
                                    <span>مبلغ کل</span>
                                </div>
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {englishToPersianNumbers(getToman(order?.finalPrice || 0))} تومان
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Icon icon="mdi:truck-delivery" width="18" />
                                    <span>هزینه ارسال</span>
                                </div>
                                <span className="text-gray-900 dark:text-white">
                                    {englishToPersianNumbers(getToman(order?.shippingPrice || 0))} تومان
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Icon icon="mdi:clock-outline" width="18" />
                                    <span>زمان ارسال</span>
                                </div>
                                <span className="text-gray-900 dark:text-white">
                                    {englishToPersianNumbers(
                                        getCompleteDateToPersian(order?.shippingTime || "", true)
                                    )}
                                </span>
                            </div>

                        </div>

                        {/* Status */}
                        {order?.status && (
                            <div className="mt-5 text-xs md:text-sm">
                                <div
                                    className={`mb-2 font-medium inline-block px-2 py-1 rounded-full ${
                                        STATUS_BG[order.status] ||
                                        "bg-gray-100 dark:bg-gray-700"
                                    } ${
                                        STATUS_TEXT[order.status] ||
                                        "text-gray-600 dark:text-gray-300"
                                    }`}
                                >
                                    {ORDER_STATUS[order.status].text}
                                </div>

                                <Progressbar
                                    color={ORDER_STATUS[order.status].color}
                                    width={ORDER_STATUS[order.status].progress}
                                />
                            </div>
                        )}
                    </Card>

                    {/* Products */}
                    <div className="space-y-3 text-xs md:text-sm">
                        {!isEmpty(products) &&
                            products &&
                            products.map((item, index) => {
                                const key = Object.keys(item)[0];
                                const data = item[key][0];
                                const number = item[key].length;

                                return (
                                    <Card key={index} className="shadow-sm !p-4 rounded-xl border border-slate-200 dark:border-gray-700 dark:bg-gray-800">

                                        <div className="flex items-center gap-2 mb-3 text-[#423CAD]">
                                            <Icon icon="mdi:percent" width="18" />
                                            سود شما:
                                            <span className="font-bold text-green-600">
                                                {englishToPersianNumbers(
                                                    getToman(data?.priceForUser * (data.off / 100))
                                                )}{" "}
                                                تومان
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={
                                                    (process.env.NEXT_PUBLIC_BASE_URL_CLIENT || "") +
                                                    data.photos[0].src
                                                }
                                                alt={data.model}
                                                width={80}
                                                height={80}
                                                className="rounded-lg w-20 h-20 object-cover flex-shrink-0"
                                            />

                                            <div className="w-full">
                                                <h2 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">{data.model}</h2>

                                                <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                                                    <Icon icon="mdi:counter" width="16" />
                                                    تعداد: {englishToPersianNumbers(number)}
                                                </div>

                                                <div className="mt-3 font-black text-base md:text-lg text-gray-900 dark:text-white">
                                                    {englishToPersianNumbers(
                                                        getToman(
                                                            Number(data.priceForUser) -
                                                            Number(data.priceForUser) * (data.off / 100)
                                                        )
                                                    )}{" "}
                                                    تومان
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                    </div>
                </div>
            )}

            {loading && <OrderDetailSkeleton />}
        </>
    );
}