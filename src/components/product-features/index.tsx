
import { Product } from "@/types/product.type";
import { englishToPersianNumbers } from "@/utils/function.utils";
import { isEmpty } from "lodash";
import React from "react";

export default function ProductFeatures({ product }: { product: Product }) {
    return (
        <div className="bg-white mt-3 p-4 lg:p-7 rounded-lg w-full lg:w-2/6 text-base text-right">
            <h1 className="font-extrabold text-blue-400 text-base md:text-lg lg:text-xl"> {product?.model}</h1>
            <h1 className="mt-5 font-semibold text-xs md:text-base"> ویژگی ها</h1>
            <div className="flex justify-between gap-3">
                {!isEmpty(product?.properties) &&
                    [...product.properties].slice(0, 3).map((item, index) => (
                        <>
                            <span key={index} className="flex flex-col bg-gray-100 mt-3 p-2 lg:p-3 rounded-lg w-full text-xs md:text-sm">
                                <h1 className="inline-block">
                                    <span className="p-1 text-gray-500">{englishToPersianNumbers(item.title)}</span>
                                </h1>
                                <h1 className="inline-block col-span-4 p-2 font-semibold">
                                    {englishToPersianNumbers(item.property)}
                                </h1>
                            </span>
                        </>
                    ))}
            </div>
            {/* <LineElementLine className="mt-8" element={<button className="p-3 border rounded-lg w-2/3">مشاهده بیشتر</button>} /> */}
        </div>
    );
}
