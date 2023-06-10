import React from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { BiMemoryCard } from "react-icons/bi";
import { isEmptyArray } from "utils/function.util";
import { AiOutlineNumber } from "react-icons/ai";
import { getToman } from "utils/function.util";

const CartBoxTemplate = ({ items }) => {
  return (
    <div>
      <div className=" text-lg">سبد خرید شما</div>
      <div className="mb-5">
        {!isEmptyArray(items) &&
          items.map((item, index) => (
            <div className="mt-5" key={index}>
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
                    {item.products_deliveryMethod && (
                      <div className="py-2 text-xs text-gray-500 ">
                        <span className="pl-2">
                          <MdOutlineDeliveryDining className=" inline-block  text-sm" />
                        </span>
                        <span>{item.products_deliveryMethod}</span>
                      </div>
                    )}
                    <div className=" text-xs text-gray-500">
                      <span className="pl-2">
                        <BiMemoryCard className=" inline-block  text-sm" />
                      </span>
                      <span>موجود در انبار </span>
                    </div>
                    {item.products_off && (
                      <div className="mt-3 text-red-400">
                        {getToman(
                          Number(item.products_priceForUser) *
                            (item.products_off / 100)
                        )}
                        تومان تخفیف
                      </div>
                    )}
                    <div className="mt-3 font-black text-lg">
                      {getToman(
                        Number(item.products_priceForUser) -
                          Number(item.products_priceForUser) *
                            (item.products_off / 100)
                      )}
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
