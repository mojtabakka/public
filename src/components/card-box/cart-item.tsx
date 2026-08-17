import Image from "next/image";
import { Icon } from "@iconify/react";

import OrderButton from "../order-button";
import CartItemPrice from "./cart-item-price";

interface Props {
    data: any;
}

export default function CartItem({ data }: Props) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200">
            <div className="flex sm:flex-row flex-col">
                {/* Image */}
                <div className="flex justify-center p-4 sm:border-l sm:border-slate-200 dark:sm:border-gray-700 sm:w-48">
                    <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0">
                        <Image
                            src={
                                (process.env.NEXT_PUBLIC_BASE_URL_CLIENT || "") +
                                data?.photos?.[0]?.src
                            }
                            width={400}
                            height={400}
                            alt={data.model}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                    <h2 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg line-clamp-1">
                        {data.model}
                    </h2>

                    <div className="space-y-2 mt-3">
                        {data.warranty && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                <Icon
                                    icon="iconamoon:shield-yes-bold"
                                    className="text-green-600 flex-shrink-0"
                                />
                                <span>{data.warranty}</span>
                            </div>
                        )}

                        {data.deliveryMethod && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <Icon icon="hugeicons:delivery-delay-02" className="flex-shrink-0" />
                                <span>{data.deliveryMethod}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            <Icon icon="mage:memory-card" className="flex-shrink-0" />
                            <span>موجود در انبار</span>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                        <CartItemPrice
                            priceForUser={Number(data.priceForUser)}
                            off={Number(data.off)}
                        />
                        <div className="flex items-center mt-2">

                            <OrderButton
                                showAddButton={false}
                                model={data.model}
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex flex-col justify-center items-center gap-4 p-4 sm:border-l sm:border-slate-200 dark:sm:border-gray-700 min-w-[220px]">
                    <CartItemPrice
                        priceForUser={Number(data.priceForUser)}
                        off={Number(data.off)}
                    />
                    <div className="flex justify-center items-center">
                        <OrderButton
                            showAddButton={false}
                            model={data.model}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}