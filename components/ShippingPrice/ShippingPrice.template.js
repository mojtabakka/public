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
    <div className="w-1/4">
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
          <div className="mt-14 flex justify-center">
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
        </div>
      </Card>
    </div>
  );
};

export default ShippingPriceTemplate;
