import { getCurrentOrder, changeOrderStatus } from "api";
import { Card, Input, MainLayout, ShippingPrice } from "components";
import moment from "moment-jalaali";
import Image from "next/image";
import paymentIcon from "public/images/payment.png";
import React, { useEffect, useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { MdOutlinePayment } from "react-icons/md";
import { getMonthName, isEmptyArray } from "utils/function.util";
import { groupBy } from "utils/function.util";
import { ORDER_STATUS } from "../../config/general.config";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const PAYMENT_METHODS = {
  internet: "internet",
  local: "local",
};
const payment = () => {
  const [showPage, setShowPage] = useState(false);
  const [cart, setCart] = useState([]);
  const [shippingTime, setShippingTime] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [shippingPermision, setShippingPermission] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const order = currentOrder();
  });
  const handleCartItem = () => {
    let data = JSON.parse(Cookies.get("cart"));
    data = groupBy(data, "model");
    setCart(data);
  };
  const currentOrder = async () => {
    const order = await getCurrentOrder();

    if (!order.data) router.push("cart");
    if (order.data) {
      setShowPage(true);
      setOrderId(order.data.id);
      const m = moment(order?.data?.shippingTime, "jYYYY/jM/jD");
      const date =
        m?.format("dddd") +
        " " +
        m?.jDate() +
        " " +
        getMonthName(+m?.format("jM"));
      setShippingTime(date);
    }
  };
  const handelChangePaymentMethod = (item) => {
    setPaymentMethod(item);
    setShippingPermission(true);
  };

  const handleClickOrder = async () => {
    try {
      const data = {
        paymentMethod: ORDER_STATUS.payed,
        status: ORDER_STATUS.payed,
      };
      await changeOrderStatus(orderId, data);
      router.push("/payment/final-payment");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    showPage && (
      <>
        <div className=" lg:px-2 md:px-2 pt-5 lg:flex md:flex ">
          <Card className="w-full lg:mx-2 md:mx-2 mx-0">
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
              <div className="flex mt-7 text-lg items-center   ">
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
                    alt="payment-icon"
                    value={PAYMENT_METHODS.local}
                    src={paymentIcon}
                    width={25}
                    height={25}
                    className=" inline-block cursor-pointer"
                  />
                </div>
                <span className="px-2">پرداخت در محل</span>
              </div>
              <div className=" md:mt-32 lg:mt-32  mt-16 py-5 px-2 text-base">
                <span className="text-gray-400 text-sm">زمان ارسال :</span>{" "}
                {shippingTime}
              </div>
              <div className="border p-3 rounded-lg  ">
                {isEmptyArray(cart) && (
                  <div className="flex justify-center p-20">
                    <CgTrashEmpty className=" text-8xl" />
                  </div>
                )}
                <div className="flex overflow-x-scroll">
                  {!isEmptyArray(cart) &&
                    cart.map((item, index) => {
                      const data = item[Object.keys(item)[0]][0];
                      const number = item[Object.keys(item)[0]].length;

                      return (
                        <div className="flex" key={index}>
                          <img
                            src={data.photos[0].src}
                            width={100}
                            height={100}
                          />
                          <div className="relative">
                            <span
                              className="bg-gray-400 p-1 rounded  absolute "
                              style={{ right: "-30px", bottom: "0px" }}
                            >
                              {number}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </Card>
          <ShippingPrice
            shippingPermision={shippingPermision}
            onCartItem={handleCartItem}
            onClick={handleClickOrder}
            inValidTextButton="انتخاب روش پرداخت"
          />
        </div>
      </>
    )
  );
};

payment.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default payment;
