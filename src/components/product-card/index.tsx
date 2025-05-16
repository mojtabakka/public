import React from "react";
import { Icon } from "@iconify/react";
import { englishToPersianNumbers, getToman } from "@/utils/function.utils";
import Image from 'next/image';
import Link from "next/link";

interface propsType {
    items: {
        model: string,
        product_id: 21,
        photos_id: 2,
        photos_created_at: string,
        photos_updated_at: string,
        photos_src: string,
        category_id: 1,
        category_created_at: string,
        category_updated_at: string,
        category_title: string,
        category_photo: string,
        productCount: string
        priceForUser: string,
        warranty: string,
        deliveryMethod: string,
        off: string
    };
}

const ProductCard = ({ items }: propsType) => {
    const src = `${items.photos_src}`;

    return (
        <div className="cursor-pointer w-full mt-1 rounded">
            <Link href={`product-detail/${items.model}`} className="relative shadow-sm bg-white hover:shadow-lg border rounded-lg w-full flex">
                <div className="w-full flex md:block sm:block lg:block justify-between">
                    <figure className="w-full flex justify-center items-center">
                        {items.photos_src ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${src}`}
                                alt={`Product image for ${items.model}`}
                                height={208}
                                width={208}
                                className="md:h-52 md:w-52   h-32 w-32  object-cover"
                            />
                        ) : (
                            <Icon icon="fa6-solid:camera" className="h-40 w-40 text-gray-600" />
                        )}
                    </figure>
                    <div className="w-full px-2 py-5 ">
                        <h1 className="text-right pt-5  text-xs md:text-base lg:text-lg font-extrabold "> {items.model + '  '}
                            <span className="  text-xs  md:text-sm font-medium text-red-500 ">
                                {englishToPersianNumbers(`(${items.productCount} عدد باقی مانده)`)}
                            </span>
                        </h1>
                        <div className="text-right mt-2  text-xs lg:text-sm text-gray-500  flex gap-2 items-center">
                            <Icon icon="iconamoon:delivery-fast" className=" inline-block text-xs  md:text-lg" />
                            ارسال با {items.deliveryMethod}
                        </div>
                        <div className="flex text-left justify-between w-full items-center">
                            <div className="">
                                <div className="text-right">
                                    <div className=" mt-2 text-sm flex items-center gap-2 ">
                                        <Icon icon="nimbus:discount-circle" className=" inline-block  text-xs  md:text-lg" />
                                        <div className="text-xs lg:text-sm font-extrabold">
                                            {englishToPersianNumbers(getToman(
                                                items.off
                                                    ? Math.round(Number(items.priceForUser) - Number(items.priceForUser) * (+items.off / 100))
                                                    : Number(items.priceForUser)
                                            ))}
                                            <span className=" px-1 text-xs lg:text-sm">تومان</span>
                                        </div>
                                    </div>
                                    {items?.off && (
                                        <div className=" text-xs  md:text-lg text-gray-400 px-1 flex items-center" style={{ fontSize: "10px" }}>
                                            <Icon icon="material-symbols-light:price-check-sharp" className=" inline-block  text-xs  md:text-lg" />
                                            <span className="line-through">
                                                {englishToPersianNumbers(getToman(Number(items.priceForUser)))}
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
                            className="absolute px-2 text-white left-0 bg-red-500 !text-xs py-2 "
                            style={{
                                borderTopLeftRadius: "5px",
                                borderBottomRightRadius: "30px",
                                borderBottomLeftRadius: "0px",
                                borderTopRightRadius: "0px",
                            }}
                        >
                            {englishToPersianNumbers(items.off)}% تخفیف
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ProductCard;
