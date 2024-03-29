import React from "react";
import { getToman } from "utils/function.util";
import { isEmptyArray } from "../../utils/function.util";
import { IoCamera } from "react-icons/io5";
import style from "./ProductCard.module.scss";

const ProductCardTemplate = ({ items, key, onClick }) => {
  const src = `${items?.photos[0]?.src}`;
  return (
    <div
      onClick={onClick}
      key={key}
      className=" cursor-pointer w-full mt-1 rounded  "
    >
      <div className=" relative shadow-sm bg-white   hover:shadow-lg border rounded-lg w-full flex">
        <div className="  w-full flex md:block sm:block lg:block justify-between ">
          <figure className=" px-5 pt-7   w-full  flex justify-center  items-center ">
            {!isEmptyArray(items?.photos) ? (
              <img src={src} alt={items.model} className="   h-52 w-52 " />
            ) : (
              <IoCamera className=" h-40 w-40 text-gray-600" />
            )}
          </figure>
          <div className="w-full px-2 relative ">
            <h1 className="text-right pt-5  text-sm">{items.model}</h1>
            <div className="text-right mt-2 text-gray-500 text-xs ">
              ارسال با {items.deliveryMethod}
            </div>
            <div className=" flex   text-left justify-between w-full items-center  ">
              <div className="lg:static sm:static  md:static absolute bottom-0 py-5 w-11/12 flex justify-between items-center">
                {/* <div className="flex-1 text-right w-full"></div> */}

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
                      className="text-xs text-gray-400 px-1 flex "
                      style={{ fontSize: "10px" }}
                    >
                      <span className="line-through">
                        {getToman(items.priceForUser)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {items?.off && (
          <div className=" text-left flex   w-50  justify-end ">
            <div
              className=" absolute px-2  text-white  left-0 bg-red-500 text-xs  py-2"
              style={{
                borderTopLeftRadius: "5px",
                borderBottomRightRadius: "30px",
                borderBottomLeftRadius: "0px",
                borderTopRightRadius: "0px",
              }}
            >
              {items.off} % تخفیف
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardTemplate;
