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
                className="relative flex flex-col bg-white shadow-sm hover:shadow-lg border rounded-lg h-full overflow-hidden transition-all duration-300"
            >
                {/* Discount Badge */}
                {/* {!!items.off && (
                    <div
                        className="top-0 left-0 z-10 absolute bg-red-500 px-3 py-2 text-white text-xs"
                        style={{
                            borderBottomRightRadius: "24px",
                        }}
                    >
                        {englishToPersianNumbers(items.off)}٪ تخفیف
                    </div>
                )} */}

                {/* Product Image */}
                <figure className="flex justify-center items-center p-4 border-b h-52">
                    {items.photos_src ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL_CLIENT}${items.photos_src}`}
                            alt={items.model}
                            width={208}
                            height={208}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <Icon
                            icon="fa6-solid:camera"
                            className="w-24 h-24 text-gray-400"
                        />
                    )}
                </figure>

                {/* Content */}
                <div className="flex flex-col flex-1 justify-between p-4">
                    <div>
                        {/* Title */}
                        <h2 className="font-bold text-sm md:text-base lg:text-lg text-right line-clamp-2 leading-6">
                            {items.model}
                        </h2>

                        {/* Stock */}
                        <div className="mt-2 text-right">
                            <span className="text-red-500 text-xs md:text-sm">
                                {englishToPersianNumbers(
                                    `${items.productCount} عدد باقی مانده`
                                )}
                            </span>
                        </div>

                        {/* Delivery */}
                        {items.deliveryMethod && (
                            <div className="flex items-center gap-2 mt-3 text-gray-500 text-xs md:text-sm">
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
                            <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs md:text-sm">
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
                        <div className="flex justify-between items-center">
                            {!!items.off && (
                                <span className="bg-red-100 px-2 py-1 rounded font-bold text-red-600 text-xs">
                                    {englishToPersianNumbers(items.off)}٪
                                </span>
                            )}

                            <div className="text-left">
                                <div className="flex justify-end items-center gap-1">
                                    <span className="font-extrabold text-sm md:text-base">
                                        {englishToPersianNumbers(
                                            getToman(finalPrice)
                                        )}
                                    </span>
                                    <span className="text-gray-600 text-xs">
                                        تومان
                                    </span>
                                </div>

                                {!!items.off && (
                                    <div className="mt-1 text-gray-400 text-xs line-through">
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