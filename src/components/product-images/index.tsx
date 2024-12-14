"use client"
import { Product } from "@/types/product.type";
import React from "react";
import Gallery from "../gallery";

interface PropsType {
    product: Product
}

export default function ProductImages(props: PropsType) {
    const { product } = props
    const images: Array<{
        src: string
        main: boolean

    }> = [];
    product?.photos.map((item) => {
        images.push({
            main: true,
            src: `${process.env.NEXT_PUBLIC_BASE_URL}${item.src}`,
        });
    });
    return (
        <div
            className={` bg-white m-1 rounded lg:w-2/5    text-center   overflow-scrolld  mt-3 `}
        >
            <div className=" flex justify-center  w-full">
                <Gallery images={images} />
            </div>
        </div>
    );
}
