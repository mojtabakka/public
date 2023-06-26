import React from "react";
import { isEmptyArray } from "../../utils/function.util";

const ProductFeaturesTemplate = ({ product }) => {
  return (
    <div className="bg-white m-1 rounded lg:w-2/6 p-4 lg:p-7 text-base  w-full text-right mt-3 ">
      <h1 className="text-blue-400"> {product.model}</h1>
      <div className="gap-1 mt-4">
        {!isEmptyArray(product?.properties) &&
          product.properties.map((item, index) => (
            <>
              <div key={index}>
                <h1 className="inline-block ">
                  <span className="p-1">{item.title}</span>
                </h1>
                <h1 className="  text-gray-500 col-span-4  p-2 inline-block  ">
                  {item.property}
                </h1>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default ProductFeaturesTemplate;
