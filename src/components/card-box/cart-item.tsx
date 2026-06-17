import Image from "next/image";
import { Icon } from "@iconify/react";

import OrderButton from "../order-button";
import CartItemPrice from "./cart-item-price";

interface Props {
    data: any;
}

export default function CartItem({ data }: Props) {
    return (
        <div className="bg-white shadow-sm mt-3 border rounded-xl overflow-hidden">
            <div className="flex sm:flex-row flex-col">
                {/* Image */}
                <div className="flex justify-center p-4 sm:border-l sm:w-48">
                    <Image
                        src={
                            (process.env.NEXT_PUBLIC_BASE_URL_CLIENT || "") +
                            data?.photos?.[0]?.src
                        }
                        width={400}
                        height={400}
                        alt={data.model}
                        className="w-24 sm:w-32 h-24 sm:h-32 object-contain"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                    <h2 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                        {data.model}
                    </h2>

                    <div className="space-y-2 mt-3">
                        {data.warranty && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                <Icon
                                    icon="iconamoon:shield-yes-bold"
                                    className="text-green-600"
                                />
                                <span>{data.warranty}</span>
                            </div>
                        )}

                        {data.deliveryMethod && (
                            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                                <Icon icon="hugeicons:delivery-delay-02" />
                                <span>{data.deliveryMethod}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                            <Icon icon="mage:memory-card" />
                            <span>موجود در انبار</span>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden flex justify-between items-center mt-4 pt-4 border-t">
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
                <div className="hidden sm:flex flex-col justify-center items-center gap-4 p-4 border-r min-w-[220px]">
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