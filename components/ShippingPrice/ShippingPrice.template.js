import React from "react";
import { getToman } from "utils/function.util";
import { Button, Card } from "components";

const ShippingPriceTemplate = ({
  price,
  shippingPermision,
  onClick,
  finalPrice,
  purePrice,
  shippingPrice,
}) => {
  return (
    <div className="w-full text-xs   mt-4 mx-0 md:mx-2 lg:mx-2  md:mt-0 lg:mt-0  md:w-1/2 lg:w-1/3 ">
      <Card>
        <div className="border  w-full rounded-lg p-4">
          <div className="flex justify-between my-4">
            <div>قیمت کالاها</div>
            <div>
              <span className="px-1">{getToman(purePrice)} </span> تومان
            </div>
          </div>
          <hr />
          <div className="flex justify-between my-4">
            <div>هزینه ارسال</div>
            <div>
              <span className="px-1">{getToman(shippingPrice)} </span> تومان
            </div>
          </div>
          <hr />
          <div className="flex justify-between my-4">
            <div> قابل پرداخت</div>
            <div>
              <span className="px-1">{getToman(finalPrice)} </span> تومان
            </div>
          </div>
          <div className="mt-14 lg:flex md:flex justify-center hidden ">
            {shippingPermision ? (
              <Button className="w-full" onClick={onClick}>
                ثبت سفارش
              </Button>
            ) : (
              <Button className="w-ful" color="primary" outline={true}>
                انتخاب زمان سفارش
              </Button>
            )}
          </div>
          <div className="fixed border rounded-lg lg:hidden md:hidden   bottom-0 right-0 flex justify-between items-center bg-white w-full p-5 shadow-lg  ">
            <div>
              {shippingPermision ? (
                <Button className="w-full" onClick={onClick}>
                  ثبت سفارش
                </Button>
              ) : (
                <Button className="w-ful" color="primary" outline={true}>
                  انتخاب زمان سفارش
                </Button>
              )}
            </div>
            <div className=" text-center">
              <div className="text-xs text-gray-400">قیمت نهایی</div>
              <span className="px-1 text-xs">{getToman(finalPrice)} </span>
              <span className="text-xs">تومان</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShippingPriceTemplate;
