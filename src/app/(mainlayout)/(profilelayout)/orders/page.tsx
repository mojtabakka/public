"use client";

import React, { useEffect, useState } from "react";
import { Tab } from "@/components";
import { useRouter } from "next/navigation";
import { Order } from "@/types/order.type";
import { isEmpty } from "lodash";
import { getCompleteDateToPersian, getToman, groupBy } from "@/utils/function.utils";
import { TabType } from "@/types/client/tab.type";
import { Icon } from "@iconify/react";
import OrderBoxSkeleton from "@/skeletons/order-box.skeleton";
import { Product } from "@/types/product.type";
import { ORDER_STATUS } from "@/config/general.config";
import Image from "next/image";

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

const STATUS_COLORS: Record<string, string> = {
    notPayed: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    payed: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    preparing: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    isSendig: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    completed: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
};

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
            console.error("load orders error:", error);
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
        <div className="bg-white dark:bg-gray-800 shadow-sm mt-5 p-4 lg:p-6 border border-slate-200 dark:border-gray-700 rounded-xl text-sm">
            {/* Tabs */}
            <Tab items={TAB_ITEMS} onClick={handleClickTabItem} />

            {/* Loading */}
            {isLoading && <OrderBoxSkeleton />}

            {/* Empty state */}
            {isEmpty(orders) && !isLoading && (
                <div className="flex justify-center items-center py-16 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center text-center">
                        <Icon
                            icon="solar:trash-bin-minimalistic-outline"
                            className="text-6xl opacity-50"
                        />
                        <div className="mt-3 text-sm">
                            سفارشی ثبت نشده است
                        </div>
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

                        const statusInfo =
                            ORDER_STATUS[
                                order.status as keyof typeof ORDER_STATUS
                            ];

                        return (
                            <div
                                key={index}
                                onClick={() => handleClickOrder(order.id)}
                                className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 border border-slate-200 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md group"
                            >
                                {/* Header: date + status badge */}
                                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-100 dark:border-gray-700">
                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                                        <Icon icon="mdi:calendar" width="14" />
                                        {getCompleteDateToPersian(order.created_at)}
                                    </div>
                                    {statusInfo && (
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                STATUS_COLORS[order.status] ||
                                                "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                            }`}
                                        >
                                            {statusInfo.text}
                                        </span>
                                    )}
                                </div>

                                {/* Order info grid */}
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                        <Icon icon="mdi:receipt" width="16" />
                                        شماره سفارش
                                    </div>
                                    <div className="text-gray-900 dark:text-white font-medium text-left">
                                        #{order.id}
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                        <Icon icon="mdi:cash" width="16" />
                                        مبلغ خرید
                                    </div>
                                    <div className="text-gray-900 dark:text-white font-bold text-left">
                                        {getToman(order.price)} تومان
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="flex gap-2 overflow-x-auto py-3">
                                    {!isEmpty(products) &&
                                        products &&
                                        products
                                            .slice(0, 5)
                                            .map((item: any, idx) => {
                                                const key =
                                                    Object.keys(item)[0];
                                                const data = item[key][0];
                                                const number =
                                                    item[key].length;

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="relative flex-shrink-0"
                                                    >
                                                        <Image
                                                            src={
                                                                (process.env.NEXT_PUBLIC_BASE_URL_CLIENT || "") +
                                                                data.photos[0].src
                                                            }
                                                            alt={data.model}
                                                            width={64}
                                                            height={64}
                                                            className="rounded-lg w-16 h-16 object-cover"
                                                        />

                                                        <span className="absolute -top-1 -right-1 bg-[#423CAD] px-1.5 py-0.5 rounded-full text-white text-xs flex items-center justify-center min-w-[20px] h-5">
                                                            +{number}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end items-center gap-1 mt-3 pt-3 border-t border-slate-100 dark:border-gray-700 text-[#423CAD] hover:text-[#423CAD]/80 transition-colors">
                                    <span className="text-sm font-medium">
                                        مشاهده جزئیات
                                    </span>
                                    <Icon icon="mdi:eye-outline" className="text-lg" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
