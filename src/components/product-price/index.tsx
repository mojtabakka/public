"use client";

import React, { useMemo, useState } from "react";
import OrderButton from "@/components/order-button";
import { Icon } from "@iconify/react";
import { Product } from "@/types/product.type";
import {
    addCommasSeprator,
    englishToPersianNumbers,
} from "@/utils/function.utils";

interface PropsType {
    product: Product;
}

export default function ProductPrice({
    product,
}: PropsType) {
    const [, setNumberOfOrder] =
        useState(0);

    const {
        warranty,
        priceForUser,
        // deliveryMethod,
        off,
        model,
    } = product;

    // 🔥 clean price logic (no duplication)
    const { finalPrice, originalPrice } = useMemo(() => {
        const original = Number(priceForUser);

        const final =
            off > 0
                ? Math.round(
                    original -
                    original * (Number(off) / 100)
                )
                : original;

        return {
            finalPrice: final,
            originalPrice: original,
        };
    }, [priceForUser, off]);

    const formattedFinal = englishToPersianNumbers(
        addCommasSeprator(finalPrice.toString())
    );

    const formattedOriginal = englishToPersianNumbers(
        addCommasSeprator(originalPrice.toString())
    );

    return (
        <div
            className="flex flex-col justify-between bg-white shadow-sm hover:shadow-md mt-3 p-5 border border-gray-100 !rounded-lg w-full lg:w-1/4 transition duration-300"
        >
            {/* ===== INFO SECTION ===== */}
            <div className="space-y-4">
                {/* Warranty */}
                {warranty && (
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-green-50 rounded-full w-10 h-10">
                            <Icon
                                icon="iconamoon:shield-yes-bold"
                                className="text-green-600 text-xl"
                            />
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs">
                                گارانتی
                            </p>
                            <p className="font-semibold text-sm">
                                {warranty}
                            </p>
                        </div>
                    </div>
                )}

                {/* Delivery */}
                {true && (
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-blue-50 rounded-full w-10 h-10">
                            <Icon
                                icon="hugeicons:delivery-delay-02"
                                className="text-blue-600 text-xl"
                            />
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs">
                                ارسال
                            </p>
                            <p className="font-semibold text-sm">
                                {/* {'deliveryMethod'} */}
                                با پست
                            </p>
                        </div>
                    </div>
                )}

                {/* Price header */}
                <div className="hidden md:flex justify-between items-center pt-3 border-t">
                    <span className="text-gray-500 text-sm">
                        قیمت
                    </span>

                    {off > 0 && (
                        <span className="bg-red-500 px-2 py-1 rounded-full text-white text-xs">
                            {englishToPersianNumbers(
                                Math.round(Number(off)).toString()
                            )}
                            %
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="hidden md:block text-left">
                    <div className="font-black text-gray-900 text-2xl">
                        {formattedFinal}
                        <span className="mr-1 text-sm">
                            تومان
                        </span>
                    </div>

                    {off > 0 && (
                        <div className="mt-1 text-gray-400 text-sm line-through">
                            {formattedOriginal}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="hidden md:inline-block space-y-3 mt-6">
                <OrderButton
                    model={model}
                    onNumberOfOrder={setNumberOfOrder}
                />
            </div>

            {/* ===== MOBILE FIXED BAR ===== */}
            <div
                className="lg:hidden right-0 bottom-0 left-0 z-50 fixed bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,.08)] backdrop-blur-md border-t"
            >
                <div className="flex justify-between items-center p-2">
                    {/* Price */}
                    <div>
                        {off > 0 && (
                            <span className="bg-red-500 px-1 rounded font-bold text-[11px] text-white" >
                                {englishToPersianNumbers(
                                    Math.round(Number(off)).toString()
                                )}
                                % تخفیف
                            </span >
                        )}

                        <div className="font-extrabold text-bas">
                            {formattedFinal}
                            <span className="mr-1 text-xs">
                                تومان
                            </span>
                        </div>

                        {off > 0 && (
                            <div className="mx-1 text-gray-600 text-sm line-through">
                                {formattedOriginal}
                            </div>
                        )}
                    </div>

                    {/* Button */}
                    <div className="flex justify-end mx-1 min-w-[140px]">
                        <OrderButton
                            model={model}
                            onNumberOfOrder={setNumberOfOrder}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}