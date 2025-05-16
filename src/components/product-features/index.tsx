
import { Product } from "@/types/product.type";
import { englishToPersianNumbers } from "@/utils/function.utils";
import { isEmpty } from "lodash";
import React from "react";

export default function ProductFeatures({ product }: { product: Product }) {
    return (
        <div className="bg-white m-1 rounded lg:w-2/6 p-4 lg:p-7 text-base  w-full text-right mt-3 ">
            <h1 className="  text-base md:text-lg  lg:text-xl font-extrabold text-blue-400"> {product?.model}</h1>
            <h1 className=" font-semibold  mt-5 text-xs md:text-base  "> ویژگی ها</h1>
            <div className="gap-3 flex  justify-between">
                {!isEmpty(product?.properties) &&
                    [...product.properties].slice(0, 3).map((item, index) => (
                        <>
                            <span key={index} className=" bg-gray-100  w-full  text-xs md:text-sm  flex flex-col lg:p-3 p-2 rounded-lg  mt-3  ">
                                <h1 className="inline-block ">
                                    <span className="p-1 text-gray-500">{englishToPersianNumbers(item.title)}</span>
                                </h1>
                                <h1 className="  font-semibold  col-span-4  p-2 inline-block  ">
                                    {englishToPersianNumbers(item.property)}
                                </h1>
                            </span>
                        </>
                    ))}
            </div>
            {/* <LineElementLine className=" mt-8" element={<button className="w-2/3 border  p-3 rounded-lg">مشاهده بیشتر</button>} /> */}
        </div>
    );
}
