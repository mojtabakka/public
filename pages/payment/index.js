import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import MainLayout from "components/Layout/mainLayout";
import { Card, ShippingPrice, Input } from "components";
import { getCurrentOrder } from "api";
import { MdOutlinePayment } from "react-icons/md";
import paymentIcon from "public/images/payment.png";
import Image from "next/image";
import { isEmptyArray } from "utils/function.util";
import { CgTrashEmpty } from "react-icons/cg";
import { getMonthName } from "../../utils/function.util";

const PAYMENT_METHODS = {
  internet: "internet",
  local: "local",
};
const payment = () => {
  const [cart, setCart] = useState([]);
  const [shippingTime, setShippingTime] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  useEffect(() => {
    currentOrder();
  });
  const handleCartItem = (item) => {
    setCart(item);
  };
  const currentOrder = async () => {
    const order = await getCurrentOrder();
    const m = moment(order.data.shippingTime, "jYYYY/jM/jD");
    const date =
      m.format("dddd") + " " + m.jDate() + " " + getMonthName(+m.format("jM"));
    setShippingTime(date);
  };
  const handelChangePaymentMethod = (item) => {
    setPaymentMethod(item);
  };

  return (
    <>
      <div className="px-5 flex">
        <Card className="w-full mx-2">
          <div className="border w-full h-full p-3 rounded-lg  ">
            <span className="text-base text-gray-400">پرداخت از طریق </span>
            <div className="flex mt-10 text-lg items-center   ">
              <div className="mt-1">
                <Input
                  type="radio"
                  name="payment"
                  className="mt-10"
                  value={PAYMENT_METHODS.internet}
                  onChange={handelChangePaymentMethod}
                />
              </div>
              <div className="pr-5">
                <MdOutlinePayment className="text-3xl" />
              </div>
              <span className="px-2">پرداخت اینترتی</span>
            </div>
            <div className="flex mt-10 text-lg items-center   ">
              <div className="mt-1">
                <Input
                  type="radio"
                  name="payment"
                  value={PAYMENT_METHODS.local}
                  className="mt-10"
                  onChange={handelChangePaymentMethod}
                />
              </div>
              <div className="pr-5">
                <Image
                  value={PAYMENT_METHODS.local}
                  src={paymentIcon}
                  width={25}
                  height={25}
                  className=" inline-block cursor-pointer"
                />
              </div>
              <span className="px-2">پرداخت در محل</span>
            </div>
            <div className="mt-32 py-5 px-2 text-base">
              <span className="text-gray-400 text-sm">زمان ارسال :</span>{" "}
              {shippingTime}
            </div>
            <div className="border p-3 rounded-lg ">
              {isEmptyArray(cart) && (
                <div className="flex justify-center p-20">
                  <CgTrashEmpty className=" text-8xl" />
                </div>
              )}
              <div className="flex overflow-x-scroll">
                {!isEmptyArray(cart) &&
                  cart.map((item, index) => (
                    <div className="flex" key={index}>
                      <img
                        src={item?.productPhotos_src}
                        width={100}
                        height={100}
                      />
                      <div className="relative">
                        <span
                          className="bg-gray-400 p-1 rounded  absolute "
                          style={{ right: "-30px", bottom: "0px" }}
                        >
                          {item?.number}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
        <ShippingPrice shippingPermision={true} onCartItem={handleCartItem} />
      </div>
    </>
  );
};

payment.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default payment;
