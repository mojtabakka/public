

"use client"
import Progressbar from '@/components/proggress-bar';
import { ORDER_STATUS } from '@/config/general.config';
import OrderDetailSkeleton from '@/skeletons/order-detail.skeleton';
import { Order } from '@/types/order.type';
import { Product } from '@/types/product.type';
import { endpoints } from '@/utils/end-points';
import { fetchInstance } from '@/utils/fetch';
import { englishToPersianNumbers, getCompleteDateToPersian, getToman, groupBy } from '@/utils/function.utils';
import { Card } from '@mui/material';
import { isEmpty } from 'lodash';;
import React, { useEffect, useState } from 'react'

export default function OrderDetails(props: any) {
    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<{ [key: string]: any; }[] | null>([]);
    const orderId = props.params.id;
    useEffect(() => {

        getOrderItems();
    }, []);
    const getOrderItems = async () => {
        {
            try {
                if (orderId) {
                    setLoading(true)
                    const result = await fetchInstance(endpoints.order.getOrder.replace(":id", orderId))
                    const products = result?.data?.products
                        ? groupBy<Product>(result?.data?.products, "model")
                        : null;
                    setProducts(products);
                    setOrder(result.data);
                }
            } catch (error) {
                console.log('error', error)
            } finally {
                setLoading(false)
            }

        }
    };
    return (
        <>
            {!loading && <div>
                <Card className="mt-5 !p-3">
                    <div className="  border rounded p-2">
                        <div className="py-2 ">
                            <span className="px-1 text-gray-400 text-small">
                                تاریخ ثبت سفارش
                            </span>
                            <span className="px-1">
                                {englishToPersianNumbers(getCompleteDateToPersian(order?.updated_at || ""))}
                            </span>
                        </div>
                        <div className="py-2">
                            <span className="px-1  text-gray-400"> کد پیگیری </span>
                            <span className="px-1"> {englishToPersianNumbers(order?.id.toString() || '')} </span>
                        </div>
                    </div>
                </Card>
                <Card className="mt-2 !p-3">
                    <div className="  border p-3  rounded">
                        <div className="py-2">
                            <span className="px-1  text-gray-400"> شماره تماس </span>
                            <span className="px-2">{englishToPersianNumbers(order?.user?.phoneNumber || "")} </span>
                        </div>
                        <div className="py-2">
                            <span className="px-1  text-gray-400">آدرس</span>
                            <span className="px-2"> {englishToPersianNumbers(order?.address?.address || '')} </span>
                        </div>
                    </div>
                </Card>

                <Card className="mt-2 !p-3">
                    <div className="  border  rounded">
                        <div className="flex justify-between">
                            <div>
                                <div className="py-2">
                                    <span className="px-2  text-gray-400"> مبلغ </span>
                                    <span className="px-1 font-bold">
                                        {englishToPersianNumbers(getToman(order?.finalPrice || 0))}
                                    </span>
                                    <span className=" font-bold">تومان </span>
                                </div>
                                <div className="py-2">
                                    <span className="px-2  text-gray-400"> هزینه ارسال </span>
                                    <span className="px-1">
                                        <span className="px-1 font-bold">
                                            {englishToPersianNumbers(getToman(order?.shippingPrice || 0))}
                                        </span>
                                    </span>
                                    <span className="">تومان </span>
                                </div>

                                <div className="py-2">
                                    <span className="px-2  text-gray-400"> زمان ارسال </span>
                                    <span className="px-1">
                                        <span className="px-1 font-bold">
                                            {englishToPersianNumbers(getCompleteDateToPersian(order?.shippingTime || "", true))}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 text-blue-400 cursor-pointer ">
                                مشاهده فاکتور
                            </div>
                        </div>
                        {order?.status && (
                            <div className="mt-5 px-3">
                                <div
                                    className="my-2"
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
                        <div className=" overflow-x-scroll my-5 rounded-lg">
                            {!isEmpty(products) && products &&
                                products.map((item, index) => {
                                    const key = Object.keys(item)[0];
                                    const data = item[key][0];
                                    const number = item[key].length;
                                    return (
                                        <div key={index} className="flex border rounded-lg p-5 mx-2 w-full mt-2">
                                            <div className="w-full">
                                                <div className="mb-5">
                                                    <span className="text-gray-400  px-2">
                                                        کدپیگیری مرسوله
                                                    </span>
                                                    <span className=""> {englishToPersianNumbers(data?.id)}</span>
                                                </div>
                                                <div className="mb-5">
                                                    <span className="text-gray-400  px-2">قیمت</span>
                                                    <span className="">
                                                        {englishToPersianNumbers(getToman(data?.priceForUser))}
                                                        <span className="mx-1">تومان</span>
                                                    </span>
                                                </div>

                                                <div className="mb-5">
                                                    <span className="text-gray-400  px-2">
                                                        سود شما از این خرید
                                                    </span>
                                                    <span className="">
                                                        {englishToPersianNumbers(getToman(data?.priceForUser * (data.off / 100)))}
                                                        <span className="mx-1">تومان</span>
                                                    </span>
                                                </div>

                                                <hr />
                                                <div className="flex p-2 mx-2 items-center " key={index}>
                                                    <img
                                                        src={process.env.NEXT_PUBLIC_BASE_URL + data.photos[0].src}
                                                        className="  w-16 h-16 lg:w-24 lg:h-24 md:w-24 md:h-24"
                                                    />
                                                    <div className=" pt-3">
                                                        <div className="p-2 text-right  w-full">
                                                            <h1 className=" text-lg text-black ">
                                                                {data.model}
                                                            </h1>
                                                            <div className="py-2">
                                                                <span className="pl-2">
                                                                    {/* <AiOutlineNumber className=" inline-block text-sm" /> */}
                                                                </span>
                                                                تعداد ( {englishToPersianNumbers(number)} )
                                                            </div>
                                                            {data.warranty && (
                                                                <>
                                                                    <div className="py-2">
                                                                        <span className="pl-2">
                                                                            {/* <IoShieldCheckmark className=" inline-block text-sm" /> */}
                                                                        </span>
                                                                        {data.warranty}
                                                                    </div>
                                                                </>
                                                            )}
                                                            {data.deliveryMethod && (
                                                                <div className="py-2 text-xs text-gray-500 ">
                                                                    <span className="pl-2">
                                                                        {/* <MdOutlineDeliveryDining className=" inline-block  text-sm" /> */}
                                                                    </span>
                                                                    <span>{data.deliveryMethod}</span>
                                                                </div>
                                                            )}
                                                            <div className="mt-3 font-black text-lg">
                                                                {englishToPersianNumbers(getToman(
                                                                    Number(data.priceForUser) -
                                                                    Number(data.priceForUser) * (data.off / 100)
                                                                ))}
                                                                <span className="px-1">تومان</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Card>
            </div>}
            {loading && <OrderDetailSkeleton />}
        </>
    )
}



