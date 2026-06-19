"use client";

import React, { useEffect, useState } from "react";
import { Tab } from "@/components";
import { useRouter } from "next/navigation";
import { Order } from "@/types/order.type";
import { isEmpty } from "lodash";
import { getCompleteDateToPersian, groupBy } from "@/utils/function.utils";
import { TabType } from "@/types/client/tab.type";
import { Icon } from "@iconify/react";
import OrderBoxSkeleton from "@/skeletons/order-box.skeleton";
import { Product } from "@/types/product.type";

import {
    getCurrentOrders,
    getPreviousOrders,
} from "@/actions/order.action";

const ACTIONS = {
    CURRENT_ORDERS: "current-orders",
    COMPLETED_ORDERS: "completed-orders",
};

const TAB_ITEMS = [
    { id: 1, title: "سفارش های جاری", action: ACTIONS.CURRENT_ORDERS },
    { id: 2, title: "تحویل شده", action: ACTIONS.COMPLETED_ORDERS },
];

export default function OrderDetails() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tabAction, setTabAction] = useState<string>(ACTIONS.CURRENT_ORDERS);

    const router = useRouter();

    useEffect(() => {
        loadOrders(ACTIONS.CURRENT_ORDERS);
    }, []);

    const loadOrders = async (action: string | undefined) => {
        try {
            setIsLoading(true);

            let res;

            if (action === ACTIONS.COMPLETED_ORDERS) {
                res = await getPreviousOrders();
            } else {
                res = await getCurrentOrders();
            }

            setOrders(res.data || []);
            if (action) setTabAction(action);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickTabItem = async (item: TabType) => {
        if (item.action === tabAction) return;
        await loadOrders(item.action);
    };

    const handleClickOrder = (orderId: string | number) => {
        router.push(`orders/order-details/${orderId}`);
    };

    return (
        <div className="bg-white shadow-sm mt-5 p-4 rounded-xl text-sm">

            {/* Tabs */}
            <Tab items={TAB_ITEMS} onClick={handleClickTabItem} />

            {/* Loading */}
            {isLoading && <OrderBoxSkeleton />}

            {/* Empty state */}
            {isEmpty(orders) && !isLoading && (
                <div className="flex justify-center p-20 text-gray-500">
                    <div className="text-center">
                        <Icon
                            icon="solar:trash-bin-minimalistic-outline"
                            className="text-7xl"
                        />
                        <div className="mt-3">سفارشی ثبت نشده است</div>
                    </div>
                </div>
            )}

            {/* Orders */}
            {!isEmpty(orders) && !isLoading && (
                <div className="space-y-4 mt-4">

                    {orders.map((order, index) => {
                        const products = order.products
                            ? groupBy<Product>(order.products, "model")
                            : null;

                        return (
                            <div
                                key={index}
                                onClick={() => handleClickOrder(order.id)}
                                className="bg-gray-50 hover:bg-gray-100 p-4 border rounded-xl cursor-pointer"
                            >

                                {/* Header */}
                                <div className="flex justify-between items-center">

                                    <div className="flex gap-3 w-full">

                                        <div className="space-y-2 w-1/3 text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Icon icon="mdi:calendar" width="16" />
                                                تاریخ
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Icon icon="mdi:receipt" width="16" />
                                                شماره سفارش
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Icon icon="mdi:cash" width="16" />
                                                مبلغ خرید
                                            </div>
                                        </div>

                                        <div className="space-y-2 w-full text-gray-800">
                                            <div>{getCompleteDateToPersian(order.created_at)}</div>
                                            <div className="font-medium">{order.id}</div>
                                            <div className="font-bold">
                                                {order.price} تومان
                                            </div>
                                        </div>

                                    </div>

                                    <Icon
                                        icon="ep:arrow-left-bold"
                                        className="text-gray-400"
                                        width="20"
                                    />
                                </div>

                                {/* Products */}
                                <div className="flex gap-2 bg-white mt-4 p-2 rounded-lg overflow-x-auto">

                                    {!isEmpty(products) &&
                                        products && products.map((item: any, index) => {
                                            const key = Object.keys(item)[0];
                                            const data = item[key][0];
                                            const number = item[key].length;

                                            return (
                                                <div key={index} className="relative flex-shrink-0">

                                                    <img
                                                        src={
                                                            process.env.NEXT_PUBLIC_BASE_URL_CLIENT +
                                                            data.photos[0].src
                                                        }
                                                        className="rounded-lg w-16 h-16 object-cover"
                                                    />

                                                    <span className="-top-1 -right-1 absolute bg-blue-500 px-2 rounded-full text-white text-xs">
                                                        {number}
                                                    </span>

                                                </div>
                                            );
                                        })}
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end items-center gap-1 mt-3 text-blue-500">
                                    <Icon icon="mdi:eye-outline" />
                                    <span>مشاهده جزئیات</span>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}