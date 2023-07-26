import React from "react";
import emmtyCart from "../../public/images/empty-cart.png";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { BiMemoryCard } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";
import { isEmptyArray, getToman } from "utils/function.util";
import Image from "next/image";
import { OrderButton } from "../OrderButton";

const CartBoxTemplate = ({ items }) => {
  console.log(items);
  return (
    <div className="">
      {!isEmptyArray(items) && <div className=" text-lg">سبد خرید شما</div>}
      <div className="mb-5">
        {!isEmptyArray(items) &&
          items.map((item, index) => {
            const data = item[Object.keys(item)[0]][0];
            console.log();
            return (
              <div className="mt-5" key={index}>
                <div className="flex border rounded-lg p-5">
                  <div>
                    <img
                      src={data?.photos[0]?.src}
                      height={200}
                      width={200}
                      alt={data.model}
                    />
                    <div className="mt-5">
                      <OrderButton model={data.model} />
                    </div>
                  </div>

                  <div className=" pt-3">
                    <div className="p-2 text-right  w-full">
                      <h1 className=" text-lg text-black ">{data.model}</h1>
                      <div className="py-2">
                        <span className="pl-2">
                          <AiOutlineNumber className=" inline-block text-sm" />
                        </span>
                        تعداد ( {data.number} )
                      </div>
                      {data.warranty && (
                        <>
                          <div className="py-2">
                            <span className="pl-2">
                              <IoShieldCheckmark className=" inline-block text-sm" />
                            </span>
                            {data.warranty}
                          </div>
                        </>
                      )}
                      {data.deliveryMethod && (
                        <div className="py-2 text-xs text-gray-500 ">
                          <span className="pl-2">
                            <MdOutlineDeliveryDining className=" inline-block  text-sm" />
                          </span>
                          <span>{data.deliveryMethod}</span>
                        </div>
                      )}
                      <div className=" text-xs text-gray-500">
                        <span className="pl-2">
                          <BiMemoryCard className=" inline-block  text-sm" />
                        </span>
                        <span>موجود در انبار </span>
                      </div>
                      {data.off && (
                        <div className="mt-3 text-red-400">
                          {getToman(
                            Number(data.priceForUser) * (data.off / 100)
                          )}
                          تومان تخفیف
                        </div>
                      )}
                      <div className="mt-3 font-black text-lg">
                        {getToman(
                          Number(data.priceForUser) -
                            Number(data.priceForUser) * (data.off / 100)
                        )}
                        <span className="px-1">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {isEmptyArray(items) && (
          <div className="text-base text-gray-400 lg:text-lg t flex h-full p-20 justify-center items-center">
            <div>
              <Image
                src={emmtyCart}
                width="200"
                alt="shopping cart, basket cart red shopping icon"
              />
              <div className="text-center">سبد شما خالی است</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartBoxTemplate;
