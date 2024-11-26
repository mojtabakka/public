"use client"
import { Product } from "@/types/product.type";
import React from "react";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

interface PropsType {
    product: Product
}

export default function ProductImages(props: PropsType) {
    const { product } = props
    const images: ReactImageGalleryItem[] = [];
    product.photos.map((item) => {
        images.push({
            original: item.src,
            thumbnail: item.src,
            originalHeight: 100,
            originalClass: " w-52 h-52 flex  items-center ",
        });
    });
    return (
        <div
            className={` bg-white m-1 rounded lg:w-2/5    text-center   overflow-scrolld  mt-3 `}
        >
            <div className=" flex justify-center  w-full">
                <ReactImageGallery
                    items={images}
                    useBrowserFullscreen={false}
                    infinite={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    disableThumbnailScroll={true}
                />
            </div>
        </div>
    );
}
