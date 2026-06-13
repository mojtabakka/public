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
        <div className="space-y-6 md:p-4">
            {/* Products */}
            {!isEmpty(items.products) && (
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <Icon
                            icon="solar:box-linear"
                            className="text-xl text-blue-500"
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
                                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-3
                  transition-all
                  duration-200
                  hover:border-blue-100
                  hover:bg-blue-50/40
                  hover:shadow-md
                "
                            >
                                <div
                                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    transition-all
                    group-hover:bg-blue-100
                  "
                                >
                                    <Icon
                                        icon="solar:magnifer-linear"
                                        className="text-lg text-gray-600"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p
                                        className="
                      text-sm
                      font-medium
                      text-gray-800
                    "
                                    >
                                        {item.product_model}
                                    </p>

                                    {item.brand && (
                                        <span
                                            className="
                        mt-1
                        inline-block
                        text-xs
                        text-gray-500
                      "
                                        >
                                            {item.brand}
                                        </span>
                                    )}
                                </div>

                                <Icon
                                    icon="solar:alt-arrow-left-linear"
                                    className="
                    text-lg
                    text-gray-400
                    transition-transform
                    group-hover:-translate-x-1
                  "
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories */}
            {!isEmpty(items.category) && (
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <Icon
                            icon="solar:widget-2-linear"
                            className="text-xl text-emerald-500"
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
                                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-3
                  transition-all
                  duration-200
                  hover:border-emerald-100
                  hover:bg-emerald-50/50
                  hover:shadow-md
                "
                            >
                                <div
                                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    transition-all
                    group-hover:bg-emerald-100
                  "
                                >
                                    <Icon
                                        icon="solar:widget-2-linear"
                                        className="text-lg text-gray-600"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p
                                        className="
                      text-sm
                      font-medium
                      text-gray-800
                    "
                                    >
                                        {item.title}
                                    </p>
                                </div>

                                <Icon
                                    icon="solar:alt-arrow-left-linear"
                                    className="
                    text-lg
                    text-gray-400
                    transition-transform
                    group-hover:-translate-x-1
                  "
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
                        className="
              flex
              flex-col
              items-center
              justify-center
              py-12
              text-center
            "
                    >
                        <Icon
                            icon="solar:magnifer-broken"
                            className="mb-3 text-6xl text-gray-300"
                        />

                        <h3 className="font-medium text-gray-700">
                            نتیجه‌ای پیدا نشد
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            عبارت دیگری را جستجو کنید
                        </p>
                    </div>
                )}
        </div>
    );
}