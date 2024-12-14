"use client"
import React, { useEffect, useState } from "react";
import { Tab } from '@/components'
import { useRouter } from "next/navigation";
import { Order } from "@/types/order.type";
import { isEmpty } from "lodash";
import { getCompleteDateToPersian, groupBy } from "@/utils/function.utils";
import { TabType } from "@/types/client/tab.type";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Icon } from "@iconify/react";
import OrderBoxSkeleton from "@/skeletons/order-box.skeleton";
import { Product } from "@/types/product.type";


const ACTIONS = {
    CURRENT_ORDERS: "current-orders",
    COMPLETED_ORDERS: "completed-orders",
};

const TAB_ITEMS = [
    {
        title: "سفارش های جاری",
        action: ACTIONS.CURRENT_ORDERS,
    },
    {
        title: "تحویل شده",
        action: ACTIONS.COMPLETED_ORDERS,
    },
];

export default function OrderDetails() {
    const [orders, setOrders] = useState<Array<Order>>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tabAction, setTabAction] = useState<string>();
    const router = useRouter();
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        try {
            const orders = await fetchInstance(endpoints.order.getCurrentOrders, { cache: "no-cache" })
            setOrders(orders.data);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    };

    const handleClickTabItem = async (item: TabType) => {
        try {
            setIsLoading(true);
            let orders;
            switch (item.action) {
                case ACTIONS.CURRENT_ORDERS:
                    orders = item.action !== tabAction && (await fetchInstance(endpoints.order.getCurrentOrders, { cache: "no-cache" })).data;
                    console.log(orders)
                    setTabAction(item.action);
                    break;
                case ACTIONS.COMPLETED_ORDERS:
                    orders = item.action !== tabAction && (await fetchInstance(endpoints.order.getPreviousOrders, { cache: "no-cache" })).data;
                    setTabAction(item.action);
                    break;
                default:
                    break;
            }
            if (item.action !== tabAction) setOrders(orders);
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickOrder = (orderId: string | number) => {
        router.push(`orders/order-details/${orderId}`,
        );
    };

    return (

        <div className="  bg-white mt-5 p-3 rounded text-sm">
            <Tab items={TAB_ITEMS} onClick={handleClickTabItem} />
            {!isEmpty(orders) && !isLoading ? (
                <div>
                    {!isEmpty(orders) && orders &&
                        orders.map((order, key) => {
                            const products = order?.cart?.products
                                ? groupBy<Product>(order?.cart?.products, "model")
                                : null;
                            return (
                                <div
                                    onClick={() => handleClickOrder(order.id)}
                                    className="p-3 border mt-5  rounded-lg  bg-gray-50 "
                                    key={key}
                                >
                                    <div className=" flex justify-between ">
                                        <div className=" py-3 flex  justify-between w-full  md:text-base" >
                                            <div className=" lg:w-1/5 md:w-1/3 w-1/2    text-gray-500">
                                                <div className="p-1">تاریخ</div>
                                                <div className="p-1">شماره سفارش</div>
                                                <div className="p-1">مبلغ خرید</div>
                                            </div>
                                            <div className=" w-full">
                                                <div className="p-1">
                                                    {getCompleteDateToPersian(order.created_at)}
                                                </div>
                                                <div className="p-1">{order.id}</div>
                                                <div className="p-1">{order.price} تومان</div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <Icon icon="ep:arrow-left-bold" />
                                        </div>
                                    </div>
                                    <div className="flex overflow-x-scroll bg-white rounded-lg">
                                        {!isEmpty(products) && products &&
                                            products.map((item, index) => {
                                                const key = Object.keys(item)[0];
                                                const data = item[key][0];
                                                const number = item[key].length;
                                                return (
                                                    <div className="flex p-2 mx-2 " key={index}>
                                                        <img
                                                            src={data?.photos[0]?.src}
                                                            className="  w-16 h-16 lg:w-24 lg:h-24 md:w-24 md:h-24"
                                                        />
                                                        <div className="relative">
                                                            <span
                                                                className="bg-gray-400 p-1 rounded-3xl  absolute "
                                                                style={{ right: "-30px", bottom: "0px" }}
                                                            >
                                                                {number}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className=" text-left p-3 text-medium text-blue-500 mt-2 cursor-pointer">
                                        مشاهده فاکتور
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <>
                    {isEmpty(orders) && !isLoading && < div className="flex  justify-center p-20">
                        <span>
                            <div className="text-center">
                                <Icon icon="solar:trash-bin-minimalistic-outline" className=" text-8xl inline-block" />
                            </div>
                            <div className="mt-3">سفارشی ثبت نشده است</div>
                        </span>
                    </div>}

                    {isLoading && <OrderBoxSkeleton />}

                </>
            )
            }

            {/* <Loading show={isLoading} /> */}
        </div >
    );

}

