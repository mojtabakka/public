import { Product } from "@/types/product.type";
import { englishToPersianNumbers } from "@/utils/function.utils";
import { isEmpty } from "lodash";
import React from "react";
import { Icon } from "@iconify/react";

export default function ProductFeatures({ product }: { product: Product }) {
    return (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 mt-3 p-4 lg:p-7 rounded-xl w-full lg:w-2/6 text-base text-right border border-slate-200 transition-all duration-200">
            <h1 className="font-extrabold text-[#423CAD] text-base md:text-lg lg:text-xl line-clamp-1">
                {product?.model}
            </h1>

            <div className="flex items-center gap-2 mt-5 mb-4">
                <Icon
                    icon="mdi:feature-search-outline"
                    className="text-[#423CAD] text-lg"
                />
                <h1 className="font-semibold text-xs md:text-base text-gray-500 dark:text-gray-400">
                    ویژگی ها
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {!isEmpty(product?.properties) &&
                    [...product.properties].slice(0, 4).map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-slate-50 dark:bg-gray-700/50 p-3 lg:p-4 rounded-lg transition-colors duration-200"
                        >
                            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {englishToPersianNumbers(item.title)}
                            </span>
                            <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                {englishToPersianNumbers(item.property)}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
