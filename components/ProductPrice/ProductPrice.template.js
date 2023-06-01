import React from "react";
import { Badge, Button, OrderButton } from "components";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineDeliveryDining, MdOutlinePriceCheck } from "react-icons/md";
import Link from "next/link";

const ProductPriceTemplate = ({
  product,
  onClickPlus,
  onClickBin,
  numberOfOrder,
  showOrders,
}) => {
  const { warranty, priceForUser, exist, numberOfExist, deliveryMethod, off } =
    product;
  return (
    <div className=" bg-white p-2 rounded lg:w-1/4 m-1 w-full     mb-20 flex-1">
      <div className=" flex-col h-full">
        <div className="  text-sm flex-1   h-5/6">
          {warranty && (
            <>
              <div className="p-2">
                <span className="pl-2">
                  <IoShieldCheckmark className=" inline-block text-xl" />
                </span>
                {warranty}
              </div>
              <div className="border"></div>
            </>
          )}
          {product.numberOfExist > 0 && (
            <>
              {/* {exist && (
                <div className="px-2 pt-2 text-sm ">
                  <span className="pl-2">
                    <GrFormCheckmark className=" inline-block text-xl" />
                  </span>
                  موجود در انبار
                </div>
              )} */}
              {numberOfExist && (
                <div className="px-3 pt-2  text-xs text-gray-500">
                  <span className="pl-2">
                    <FaClipboardList className=" inline-block text-sm text-gray-500" />
                  </span>
                  تعداد {numberOfExist} عدد در انبار موجود است
                </div>
              )}

              <div className="text-xs p-2  text-gray-500">
                <span className="pl-2">
                  <MdOutlineDeliveryDining className=" inline-block text-xl" />
                </span>
                {deliveryMethod}
              </div>
              <div className="border"></div>
            </>
          )}

          <div className="text-left p-2 pt-5 hidden  lg:block   ">
            <div className=" flex justify-between">
              <div className="hidden lg:block">
                <div className="flex ">
                  <div className="px-2">
                    <span className="pl-2">
                      <MdOutlinePriceCheck className=" inline-block text-xl " />
                    </span>
                    قیمت فروشنده
                  </div>
                  {/* <div className="text-right">
                    <div className="font-black  text-red-400 underline text-xs">
                      {off} %
                    </div>
                    <div className="text-gray-400" style={{ fontSize: "10px" }}>
                      تخفیف
                    </div>
                  </div> */}
                </div>
              </div>
              <div>
                <div>
                  <span> {off ? priceForUser * (off / 10) : priceForUser}</span>
                  <span>تومان </span>
                </div>
                {off && (
                  <div
                    className=" text-right line-through text-gray-400"
                    style={{ fontSize: "12px" }}
                  >
                    {priceForUser}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-right mb-0  flex-1 hidden lg:inline-block">
          {numberOfOrder === 0 ? (
            <Button className="w-full" onClick={onClickPlus}>
              افزودن به سبد
            </Button>
          ) : (
            <>
              <OrderButton
                onClickPlus={onClickPlus}
                onClickBin={onClickBin}
                value={numberOfOrder}
              />
              <Link
                href={"/cart"}
                className="text-xs p-2 text-blue-300 cursor-pointer"
                onClick={showOrders}
              >
                مشاهده سبد خرید
              </Link>
            </>
          )}
        </div>

        <div className=" fixed w-full   right-0  bottom-0  bg-white shadow-lg border p-2">
          <div className="w-full text-center my-3 items-center flex  align-middle lg:hidden">
            <div className="w-full text-right   ">
              {numberOfOrder === 0 ? (
                <Button className="w-full" onClick={onClickPlus}>
                  افزودن به سبد
                </Button>
              ) : (
                <>
                  <OrderButton
                    onClickPlus={onClickPlus}
                    onClickBin={onClickBin}
                    value={numberOfOrder}
                  />
                  <Link
                    href="/cart"
                    className=" p-2 text-blue-300 cursor-pointer"
                    onClick={showOrders}
                  >
                    مشاهده سبد خرید
                  </Link>
                </>
              )}
            </div>
            <div className=" w-9/12 flex justify-end  items-center  ">
              <div className="flex">
                <div>
                  <div className=" text-gray-400 text-xs px-2  ">
                    {off ? priceForUser * (off / 10) : priceForUser}
                  </div>
                  {off && <div className="line-through ">{priceForUser}</div>}
                </div>
              </div>
              <Badge className=" inline-block  text-xs p-1">30%</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPriceTemplate;
