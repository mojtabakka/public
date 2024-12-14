
import { Product } from "@/types/product.type";
import { isEmpty } from "lodash";
import React from "react";
import LineElementLine from "../line-element-line";

export default function ProductFeatures({ product }: { product: Product }) {
    return (
        <div className="bg-white m-1 rounded lg:w-2/6 p-4 lg:p-7 text-base  w-full text-right mt-3 ">
            <h1 className="  text-xl font-extrabold"> {product?.model}</h1>
            <h1 className=" font-semibold  mt-10 "> ویژگی ها</h1>
            <div className="gap-3 flex  mt-3 justify-between">
                {!isEmpty(product?.properties) &&
                    [...product.properties, ...product.properties, ...product.properties].slice(0, 3).map((item, index) => (
                        <>
                            <span key={index} className=" bg-gray-100  w-full  text-sm  flex flex-col p-3 rounded-lg  mt-5 ">
                                <h1 className="inline-block ">
                                    <span className="p-1 text-gray-500">{item.title}</span>
                                </h1>
                                <h1 className="  font-semibold  col-span-4  p-2 inline-block  ">
                                    {item.property}
                                </h1>
                            </span>
                        </>
                    ))}
            </div>
            <LineElementLine className=" mt-8" element={<button className="w-2/3 border  p-3 rounded-lg">مشاهده بیشتر</button>} />
        </div>
    );
}
