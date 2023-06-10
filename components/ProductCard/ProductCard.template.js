import React from "react";
import { Loading } from "components";
import { getToman } from "utils/function.util";

const ProductCardTemplate = ({ items, key, onClick }) => {
  const src = `${items.src}`;
  return (
    <div onClick={onClick} key={key} className=" cursor-pointer w-full  ">
      <div className=" shadow-sm bg-white py-2 inline-block  hover:shadow-lg border w-full">
        <div className="  w-full bg-red flex md:block sm:block lg:block justify-between ">
          <figure className=" px-5 pt-3 flex justify-center w-full ">
            <img src={src} className="  h-40 w-40" />
          </figure>
          <div className="w-full px-2 relative ">
            <h1 className="text-right pt-5  text-sm">{items.model}</h1>
            <div className="text-right mt-2 text-gray-500 text-xs ">
              ارسال با {items.deliveryMethod}
            </div>
            <div className=" flex  pt-4 text-left justify-between w-full items-center  ">
              <div className="lg:static sm:static  md:static absolute bottom-0 py-5 w-11/12 flex justify-between items-center">
                <div className="flex-1 text-right w-full">
                  {items.off && (
                    <div className="text-right">
                      <span className="font-black  text-red-400 underline">
                        {items.off} %
                      </span>
                      <div
                        className="text-gray-400"
                        style={{ fontSize: "10px" }}
                      >
                        تخفیف
                      </div>
                    </div>

                    // <Badge className="  p-1 rounded-3xl text-sm">
                    //   {items.off}
                    // </Badge>
                  )}
                </div>
                <div className=" flex-1  text-bold w-full text-left text-base mb-0  ">
                  <div>
                    <div className="flex justify-end bg-red items-center ">
                      <div className=" text-right">
                        <div className="p-1 text-sm flex items-center">
                          {getToman(
                            items.off
                              ? Math.round(
                                  items.priceForUser -
                                    items.priceForUser * (items.off / 100)
                                )
                              : items.priceForUser
                          )}
                          <span className="text-sm px-2">تومان</span>
                        </div>
                        {items?.off && (
                          <div
                            className="text-xs text-gray-400 px-1 line-through"
                            style={{ fontSize: "10px" }}
                          >
                            {getToman(items.priceForUser)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTemplate;
