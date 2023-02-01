import React from "react";

const ProductFeaturesTemplate = ({ product }) => {
  return (
    <div className="   bg-white m-1 rounded lg:w-2/6 p-10  w-full text-center ">
      <h1 className=" text-blue-400"> {product.model}</h1>
      <div className="gap-1 mt-4">
        {product?.features.length > 0 &&
          product.features.map((item, index) => (
            <>
              <div key={index}>
                <h1 className=" p-2 inline-block ">
                  <span className="p-1">{item.title}</span>:
                </h1>
                <h1 className="  text-gray-500 col-span-4  p-2 inline-block  ">
                  {item.value}
                </h1>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default ProductFeaturesTemplate;
