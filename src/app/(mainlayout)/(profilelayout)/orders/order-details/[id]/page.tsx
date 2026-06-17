"use client";

import Progressbar from "@/components/proggress-bar";
import { ORDER_STATUS } from "@/config/general.config";
import OrderDetailSkeleton from "@/skeletons/order-detail.skeleton";
import { Order } from "@/types/order.type";
import { Product } from "@/types/product.type";
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

export default function OrderDetails(props: any) {
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
                    ? groupBy<Product>(result?.data?.products, "model")
                    : null;

                setProducts(products);
                setOrder(result.data);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!loading && (
                <div className="space-y-3">

                    {/* Order Info */}
                    <Card className="shadow-sm mt-5 !p-4 rounded-xl">
                        <div className="space-y-3">

                            <div className="flex items-center gap-2 text-gray-600">
                                <Icon icon="mdi:calendar-check" width="18" />
                                <span>تاریخ ثبت سفارش:</span>
                                <span className="text-black">
                                    {englishToPersianNumbers(
                                        getCompleteDateToPersian(order?.updated_at || "")
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Icon icon="mdi:barcode" width="18" />
                                <span>کد پیگیری:</span>
                                <span className="text-black">
                                    {englishToPersianNumbers(order?.id.toString() || "")}
                                </span>
                            </div>

                        </div>
                    </Card>

                    {/* User Info */}
                    <Card className="shadow-sm !p-4 rounded-xl">
                        <div className="space-y-3">

                            <div className="flex items-center gap-2 text-gray-600">
                                <Icon icon="mdi:phone" width="18" />
                                <span>شماره تماس:</span>
                                <span className="text-black">
                                    {englishToPersianNumbers(order?.user?.phoneNumber || "")}
                                </span>
                            </div>

                            <div className="flex items-start gap-2 text-gray-600">
                                <Icon icon="mdi:map-marker" width="18" className="mt-1" />
                                <span>آدرس:</span>
                                <span className="text-black leading-6">
                                    {order?.address?.address || ""}
                                </span>
                            </div>

                        </div>
                    </Card>

                    {/* Price Info */}
                    <Card className="shadow-md !p-5 rounded-xl">
                        <div className="space-y-3">

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Icon icon="mdi:cash" width="18" />
                                    <span>مبلغ کل</span>
                                </div>
                                <span className="font-bold">
                                    {englishToPersianNumbers(getToman(order?.finalPrice || 0))} تومان
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Icon icon="mdi:truck-delivery" width="18" />
                                    <span>هزینه ارسال</span>
                                </div>
                                <span>
                                    {englishToPersianNumbers(getToman(order?.shippingPrice || 0))} تومان
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Icon icon="mdi:clock-outline" width="18" />
                                    <span>زمان ارسال</span>
                                </div>
                                <span>
                                    {englishToPersianNumbers(
                                        getCompleteDateToPersian(order?.shippingTime || "", true)
                                    )}
                                </span>
                            </div>

                        </div>

                        {/* Status */}
                        {order?.status && (
                            <div className="mt-5">
                                <div
                                    className="mb-2 font-medium"
                                    style={{ color: ORDER_STATUS[order.status].color }}
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
                    <div className="space-y-3">
                        {!isEmpty(products) &&
                            products &&
                            products.map((item, index) => {
                                const key = Object.keys(item)[0];
                                const data = item[key][0];
                                const number = item[key].length;

                                return (
                                    <Card key={index} className="shadow-sm !p-4 rounded-xl">

                                        <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm">
                                            <Icon icon="mdi:percent" width="18" />
                                            سود شما:
                                            <span className="font-bold text-green-600">
                                                {englishToPersianNumbers(
                                                    getToman(data?.priceForUser * (data.off / 100))
                                                )} تومان
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <img
                                                src={
                                                    process.env.NEXT_PUBLIC_BASE_URL_CLIENT +
                                                    data.photos[0].src
                                                }
                                                className="rounded-lg w-20 h-20 object-cover"
                                            />

                                            <div className="w-full">
                                                <h2 className="font-bold text-lg">{data.model}</h2>

                                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                                                    <Icon icon="mdi:counter" width="16" />
                                                    تعداد: {englishToPersianNumbers(number)}
                                                </div>

                                                <div className="mt-3 font-black text-lg">
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