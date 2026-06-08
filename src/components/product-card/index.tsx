import React from "react";
import { Icon } from "@iconify/react";
import { englishToPersianNumbers, getToman } from "@/utils/function.utils";
import Image from "next/image";
import Link from "next/link";

interface PropsType {
    items: {
        model: string;
        product_id: number;
        photos_id: number;
        photos_created_at: string;
        photos_updated_at: string;
        photos_src: string;
        category_id: number;
        category_created_at: string;
        category_updated_at: string;
        category_title: string;
        category_photo: string;
        productCount: string;
        priceForUser: string;
        warranty: string;
        deliveryMethod: string;
        off: string;
    };
}

const ProductCard = ({ items }: PropsType) => {
    const finalPrice = items.off
        ? Math.round(
            Number(items.priceForUser) -
            Number(items.priceForUser) * (Number(items.off) / 100)
        )
        : Number(items.priceForUser);

    return (
        <div className="w-full h-full">
            <Link
                href={`/product-detail/${items.model}`}
                className="relative flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
                {/* Discount Badge */}
                {/* {!!items.off && (
                    <div
                        className="absolute left-0 top-0 z-10 bg-red-500 px-3 py-2 text-xs text-white"
                        style={{
                            borderBottomRightRadius: "24px",
                        }}
                    >
                        {englishToPersianNumbers(items.off)}٪ تخفیف
                    </div>
                )} */}

                {/* Product Image */}
                <figure className="flex h-52 items-center justify-center border-b p-4">
                    {items.photos_src ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${items.photos_src}`}
                            alt={items.model}
                            width={208}
                            height={208}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <Icon
                            icon="fa6-solid:camera"
                            className="h-24 w-24 text-gray-400"
                        />
                    )}
                </figure>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                        {/* Title */}
                        <h2 className="line-clamp-2 text-right text-sm font-bold leading-6 md:text-base lg:text-lg">
                            {items.model}
                        </h2>

                        {/* Stock */}
                        <div className="mt-2 text-right">
                            <span className="text-xs text-red-500 md:text-sm">
                                {englishToPersianNumbers(
                                    `${items.productCount} عدد باقی مانده`
                                )}
                            </span>
                        </div>

                        {/* Delivery */}
                        {items.deliveryMethod && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 md:text-sm">
                                <Icon
                                    icon="iconamoon:delivery-fast"
                                    className="text-base"
                                />
                                <span>
                                    ارسال با {items.deliveryMethod}
                                </span>
                            </div>
                        )}

                        {/* Warranty */}
                        {items.warranty && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 md:text-sm">
                                <Icon
                                    icon="mdi:shield-check"
                                    className="text-base"
                                />
                                <span>{items.warranty}</span>
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            {!!items.off && (
                                <span className="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                                    {englishToPersianNumbers(items.off)}٪
                                </span>
                            )}

                            <div className="text-left">
                                <div className="flex items-center justify-end gap-1">
                                    <span className="text-sm font-extrabold md:text-base">
                                        {englishToPersianNumbers(
                                            getToman(finalPrice)
                                        )}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                        تومان
                                    </span>
                                </div>

                                {!!items.off && (
                                    <div className="mt-1 text-xs text-gray-400 line-through">
                                        {englishToPersianNumbers(
                                            getToman(
                                                Number(items.priceForUser)
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;