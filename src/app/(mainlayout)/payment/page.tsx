"use client"
import moment from "moment-jalaali";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card } from "@/components";
import ShippingPrice from "@/components/shipping-price";
import { getMonthName, groupBy } from "@/utils/function.utils";
import { Icon } from '@iconify/react'
import { isEmpty } from "lodash";
import { ORDER_STATUS } from "@/config/general.config";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function Payment() {
  const [showPage, setShowPage] = useState(true);
  const [cart, setCart] = useState<Array<{ [key: string]: any }>>();
  const [shippingTime, setShippingTime] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [shippingPermision, setShippingPermission] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    currentOrder();
  });
  const handleCartItem = () => {
    let data = JSON.parse(Cookies.get("cart") || '');
    data = groupBy(data, "model");
    setCart(data);
  };
  const currentOrder = async () => {
    try {
      const order = await fetchInstance(endpoints.order.getCurrentOrder, { cache: "no-cache" });
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
    } catch (error) {
      console.log('error', error)
    }
  };

  const handelChangePaymentMethod = (item: any) => {
    setPaymentMethod(item);
    setShippingPermission(true);
  };

  const handleClickOrder = async () => {
    try {
      const data = {
        paymentMethod: ORDER_STATUS.payed,
        status: ORDER_STATUS.payed,
      };
      await fetchInstance(endpoints.order.changeStatusorder.replace(":id", orderId.toString() || ""), { method: "PATCH", body: { ...data } })
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
                  <FormControl>
                    <RadioGroup
                      onChange={handelChangePaymentMethod}
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="payment"
                    >
                      <div className=" flex items-center">
                        <FormControlLabel value={PAYMENT_METHODS.internet} control={<Radio />} label="" />
                        <div className="pr-5">
                          <Icon icon="fluent:payment-28-regular" className="text-3xl" />
                        </div>
                        <span className="px-2">پرداخت اینترتی</span>
                      </div>
                      <div className="flex items-center mt-3">
                        <FormControlLabel value={PAYMENT_METHODS.local} control={<Radio />} label="" />
                        <div className="pr-5">
                          <Icon icon="mingcute:home-7-line" className=" text-3xl" />
                        </div>
                        <span className="px-2">پرداخت در محل</span>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>

              </div>
              <div className="flex mt-7 text-lg items-center   ">
                <div className="mt-1">

                  <FormControl>
                    <RadioGroup
                      onChange={handelChangePaymentMethod}
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="payment"
                    >

                    </RadioGroup>
                  </FormControl>
                </div>

              </div>
              <div className=" md:mt-32 lg:mt-32  mt-16 py-5 px-2 text-base">
                <span className="text-gray-400 text-sm">زمان ارسال :</span>{" "}
                {shippingTime}
              </div>
              <div className="border p-3 rounded-lg  ">
                {isEmpty(cart) && (
                  <div className="flex justify-center p-20">
                    <Icon icon="mdi:trash" className=" text-8xl" />
                  </div>
                )}
                <div className="flex overflow-x-scroll">
                  {!isEmpty(cart) && cart &&
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
  )
}

const PAYMENT_METHODS = {
  internet: "internet",
  local: "local",
};



