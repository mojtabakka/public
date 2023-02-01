import React from "react";
import { Badge, Button, OrderButton } from "components";
import { BsExclamation } from "react-icons/bs";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { GrFormCheckmark } from "react-icons/gr";
import { MdOutlineDeliveryDining, MdOutlinePriceCheck } from "react-icons/md";

// import { AiFillTrademarkCircle } from "react-icons/ai";

const ProductPriceTemplate = ({
  product,
  onClickPlus,
  onClickBin,
  numberOfOrder,
  showOrders,
}) => {
  const { warranty, priceForUser, exist, numberOfExist, deliveryMethod } =
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
          {product.exist && (
            <>
              {exist && (
                <div className="px-2 pt-2 text-sm ">
                  <span className="pl-2">
                    <GrFormCheckmark className=" inline-block text-xl" />
                  </span>
                  موجود در انبار
                </div>
              )}
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
                {/* <span
                  className="border rounded-full m-2  bg-gray-50  w-7"
                  style={{ borderRadius: "500px" }}
                >
                  <BsExclamation className=" inline-block" />
                </span> */}

                <span>
                  <span className="pl-2">
                    <MdOutlinePriceCheck className=" inline-block text-xl " />
                  </span>
                  قیمت فروشنده
                </span>
              </div>
              <div>
                <span className="line-through"> {priceForUser} </span>
                <span>تومان </span>
                <Badge value="200">30%</Badge>
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
              <span
                className="text-xs p-2 text-blue-300 cursor-pointer"
                onClick={showOrders}
              >
                مشاهده سبد خرید
              </span>
            </>
          )}
        </div>

        <div className=" fixed w-full   right-0  bottom-0  bg-white shadow-lg border p-2">
          <div className="w-full text-center mb-0  items-center flex  align-middle lg:hidden">
            <div className="w-full text-right  ">
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
                  <span
                    className="text-xs p-2 text-blue-300 cursor-pointer"
                    onClick={showOrders}
                  >
                    مشاهده سبد خرید
                  </span>
                </>
              )}
            </div>
            <div className="w-full text-left  ">
              <span className=" text-gray-400 text-xs p-2  line-through ">
                10000000
              </span>
              <Badge className=" inline-block  text-xs">30%</Badge>
              <div>۱۲۶۰۰۰۰ تومان</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPriceTemplate;
