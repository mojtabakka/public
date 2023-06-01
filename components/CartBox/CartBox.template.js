import React from "react";
import { Card } from "components";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";

import { BiMemoryCard } from "react-icons/bi";
import { isEmptyArray } from "utils/function.util";
import { AiOutlineNumber } from "react-icons/ai";
import { off } from "process";

const CartBoxTemplate = ({ items }) => {
  console.log(items);
  return (
    <div>
      <div className=" text-lg">سبد خرید شما</div>
      <div className="mb-5">
        {!isEmptyArray(items) &&
          items.map((item, index) => (
            <div className="mt-5">
              <div className="flex border rounded-lg p-5">
                <div>
                  <img src={item?.productPhotos_src} height={200} width={200} />
                </div>
                <div className=" pt-3">
                  <div className="p-2 text-right  w-full">
                    <h1 className=" text-lg text-black ">
                      {item.products_model}
                    </h1>
                    <div className="py-2">
                      <span className="pl-2">
                        <AiOutlineNumber className=" inline-block text-sm" />
                      </span>
                      تعداد ( {item.number} )
                    </div>
                    ƒ
                    {item.products_warranty && (
                      <>
                        <div className="py-2">
                          <span className="pl-2">
                            <IoShieldCheckmark className=" inline-block text-sm" />
                          </span>
                          {item.products_warranty}
                        </div>
                      </>
                    )}
                    <div className="py-2 text-xs text-gray-500 ">
                      <span className="pl-2">
                        <AiOutlineNumber className=" inline-block  text-sm" />
                      </span>
                      <span>{item.products_deliveryMethod}</span>
                    </div>
                    <div className=" text-xs text-gray-500">
                      <span className="pl-2">
                        <BiMemoryCard className=" inline-block  text-sm" />
                      </span>
                      <span>موجود در انبار </span>
                    </div>
                    {item.products_off && (
                      <div className="mt-3 text-red-400">
                        {Number(item.products_priceForUser) *
                          (item.products_off / 100)}
                        تومان تخفیف
                      </div>
                    )}
                    <div className="mt-3 font-black text-lg">
                      {Number(item.products_priceForUser) -
                        Number(item.products_priceForUser) *
                          (item.products_off / 100)}

                      <span className="px-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CartBoxTemplate;
