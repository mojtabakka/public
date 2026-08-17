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

    const isInStock = Number(items.productCount) > 0;

    return (
        <div className="w-full h-full">
            <Link
                href={`/product-detail/${items.model}`}
                className="group relative flex flex-col bg-white shadow-md hover:shadow-2xl border border-slate-100/50 rounded-2xl w-full h-full overflow-hidden transition-all duration-300"
            >
                {/* Discount Badge */}
                {!!items.off && (
                    <div className="top-3 left-3 z-10 absolute bg-gradient-to-r from-red-500 to-pink-500 shadow-lg px-2.5 py-1 rounded-full font-extrabold text-white text-xs">
                        {englishToPersianNumbers(items.off)}٪ تخفیف
                    </div>
                )}

                {/* Stock Badge */}
                <div className={`top-3 right-3 z-10 absolute px-2 py-1 rounded-full text-xs font-medium shadow-md ${
                    isInStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {englishToPersianNumbers(
                        isInStock ? `${items.productCount} عدد` : "اتمام موجودی"
                    )}
                </div>

                {/* Product Image */}
                <figure className="relative flex justify-center items-center bg-gradient-to-b from-slate-50 via-white to-white p-3 md:p-4 h-36 md:h-48">
                    {items.photos_src ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL_CLIENT}${items.photos_src}`}
                            alt={items.model}
                            width={160}
                            height={160}
                            sizes="(max-width: 768px) 140px, 160px"
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <Icon
                            icon="fa6-solid:camera"
                            className="w-16 md:w-20 h-16 md:h-20 text-gray-400"
                        />
                    )}
                </figure>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 md:p-4">
                    {/* Title */}
                    <h2 className="font-bold text-slate-900 text-sm md:text-base text-right line-clamp-2 leading-tight">
                        {items.model}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1.5 md:mt-2 text-gray-500 text-xs">
                        {items.deliveryMethod && (
                            <div className="flex items-center gap-1">
                                <Icon
                                    icon="iconamoon:delivery-fast"
                                    className="text-base"
                                />
                                <span>{items.deliveryMethod}</span>
                            </div>
                        )}

                        {items.warranty && (
                            <div className="flex items-center gap-1">
                                <Icon
                                    icon="mdi:shield-check"
                                    className="text-base"
                                />
                                <span>{items.warranty}</span>
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div className="flex justify-between items-center mt-auto pt-2 md:pt-3">
                        <div className="flex flex-col items-end gap-0.5">
                            <div className="flex justify-end items-center gap-1">
                                <span className="font-extrabold text-slate-900 text-sm md:text-base">
                                    {englishToPersianNumbers(getToman(finalPrice))}
                                </span>
                                <span className="text-slate-500 text-xs">تومان</span>
                            </div>

                            {!!items.off && (
                                <div className="text-right">
                                    <span className="text-slate-400 text-xs md:text-sm line-through">
                                        {englishToPersianNumbers(
                                            getToman(Number(items.priceForUser))
                                        )}
                                    </span>
                                    <span className="text-slate-400 text-xs"> تومان</span>
                                </div>
                            )}
                        </div>

                        {/* Discount Label */}
                        {!!items.off && (
                            <div className="bg-red-50 px-1.5 py-0.5 rounded font-bold text-red-600 text-xs">
                                {englishToPersianNumbers(items.off)}%
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
