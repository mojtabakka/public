import React from "react";
import { Icon } from "@iconify/react";
import { Product } from "@/types/product.type";
import { isEmpty } from "lodash";
import { getToman } from "@/utils/function.utils";
import Image from 'next/image';
import Link from "next/link";

interface propsType {
    items: Product;
}

const ProductCard = ({ items }: propsType) => {
    const src = `${items?.photos[0]?.src}`;

    return (
        <div className="cursor-pointer w-full mt-1 rounded">
            <Link href={`product-detail/${items.model}`} className="relative shadow-sm bg-white hover:shadow-lg border rounded-lg w-full flex">
                <div className="w-full flex md:block sm:block lg:block justify-between">
                    <figure className="w-full flex justify-center items-center">
                        {!isEmpty(items?.photos) ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${src}`}
                                alt={`Product image for ${items.model}`}
                                height={208}
                                width={208}
                                className="h-52 w-52 object-cover"
                            />
                        ) : (
                            <Icon icon="fa6-solid:camera" className="h-40 w-40 text-gray-600" />
                        )}
                    </figure>
                    <div className="w-full px-2 py-5">
                        <h1 className="text-right pt-5 text-sm">{items.model}</h1>
                        <div className="text-right mt-2 text-gray-500 text-xs">
                            ارسال با {items.deliveryMethod}
                        </div>
                        <div className="flex text-left justify-between w-full items-center">
                            <div className="">
                                <div className="text-right">
                                    <div className="p-1 text-sm flex items-center">
                                        {getToman(
                                            items.off
                                                ? Math.round(Number(items.priceForUser) - Number(items.priceForUser) * (items.off / 100))
                                                : Number(items.priceForUser)
                                        )}
                                        <span className="text-sm px-2">تومان</span>
                                    </div>
                                    {items?.off && (
                                        <div className="text-xs text-gray-400 px-1 flex" style={{ fontSize: "10px" }}>
                                            <span className="line-through">
                                                {getToman(Number(items.priceForUser))}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {items?.off && (
                    <div className="text-left flex w-50 justify-end">
                        <div
                            className="absolute px-2 text-white left-0 bg-red-500 text-xs py-2"
                            style={{
                                borderTopLeftRadius: "5px",
                                borderBottomRightRadius: "30px",
                                borderBottomLeftRadius: "0px",
                                borderTopRightRadius: "0px",
                            }}
                        >
                            {items.off}% تخفیف
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ProductCard;
