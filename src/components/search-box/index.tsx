import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { isEmpty } from "lodash";

interface PropsType {
    items: {
        [key: string]: {
            id: string;
            category_title: string;
            productCount: string;
            product_model: string;
            product_priceForUser: string;
            title: string;
            brand: string;
        }[];
    };
    onClick: () => void;
}

export default function SearchBox({
    items,
    onClick,
}: PropsType) {
    return (
        <div className="space-y-6 md:p-4 px-3">
            {/* Products */}
            {!isEmpty(items.products) && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Icon
                            icon="solar:box-linear"
                            className="text-blue-500 text-xl"
                        />
                        <h3 className="font-bold text-gray-800">
                            محصولات
                        </h3>
                    </div>

                    <div className="space-y-2">
                        {items.products.map((item, index) => (
                            <Link
                                key={index}
                                href={`/product-detail/${item.product_model}`}
                                onClick={onClick}
                                className="group flex items-center gap-3 bg-white hover:bg-blue-50/40 hover:shadow-md p-3 border border-gray-100 hover:border-blue-100 rounded-2xl transition-all duration-200"
                            >
                                <div
                                    className="flex justify-center items-center bg-gray-100 group-hover:bg-blue-100 rounded-full w-10 h-10 transition-all"
                                >
                                    <Icon
                                        icon="solar:magnifer-linear"
                                        className="text-gray-600 text-lg"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p
                                        className="font-medium text-gray-800 text-sm"
                                    >
                                        {item.product_model}
                                    </p>

                                    {item.brand && (
                                        <span
                                            className="inline-block mt-1 text-gray-500 text-xs"
                                        >
                                            {item.brand}
                                        </span>
                                    )}
                                </div>

                                <Icon
                                    icon="solar:alt-arrow-left-linear"
                                    className="text-gray-400 text-lg transition-transform group-hover:-translate-x-1"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories */}
            {!isEmpty(items.category) && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Icon
                            icon="solar:widget-2-linear"
                            className="text-emerald-500 text-xl"
                        />
                        <h3 className="font-bold text-gray-800">
                            دسته‌بندی‌ها
                        </h3>
                    </div>

                    <div className="space-y-2">
                        {items.category.map((item, index) => (
                            <Link
                                key={index}
                                href={`/products?category=${item.id}`}
                                onClick={onClick}
                                className="group flex items-center gap-3 bg-white hover:bg-emerald-50/50 hover:shadow-md p-3 border border-gray-100 hover:border-emerald-100 rounded-2xl transition-all duration-200"
                            >
                                <div
                                    className="flex justify-center items-center bg-gray-100 group-hover:bg-emerald-100 rounded-full w-10 h-10 transition-all"
                                >
                                    <Icon
                                        icon="solar:widget-2-linear"
                                        className="text-gray-600 text-lg"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p
                                        className="font-medium text-gray-800 text-sm"
                                    >
                                        {item.title}
                                    </p>
                                </div>

                                <Icon
                                    icon="solar:alt-arrow-left-linear"
                                    className="text-gray-400 text-lg transition-transform group-hover:-translate-x-1"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {isEmpty(items.category) &&
                isEmpty(items.products) && (
                    <div
                        className="flex flex-col justify-center items-center py-12 text-center"
                    >
                        <Icon
                            icon="solar:magnifer-broken"
                            className="mb-3 text-gray-300 text-6xl"
                        />

                        <h3 className="font-medium text-gray-700">
                            نتیجه‌ای پیدا نشد
                        </h3>

                        <p className="mt-1 text-gray-500 text-sm">
                            عبارت دیگری را جستجو کنید
                        </p>
                    </div>
                )}
        </div>
    );
}