"use client";

import moment from "moment-jalaali";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components";
import ShippingPrice from "@/components/shipping-price";
import { getMonthName, groupBy } from "@/utils/function.utils";
import { Icon } from "@iconify/react";
import { isEmpty } from "lodash";
import { ORDER_STATUS } from "@/config/general.config";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Product } from "@/types/product.type";
import PaymentSkeleton from "@/skeletons/payment.skeleton";

export default function Payment() {
  const [showPage, setShowPage] = useState(true);
  const [cart, setCart] = useState<any>();
  const [shippingTime, setShippingTime] = useState<string>();
  const [shippingPermision, setShippingPermission] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    currentOrder();
  }, []);

  const currentOrder = async () => {
    setLoading(true);
    try {
      const order = await fetchInstance(
        endpoints.order.getCurrentOrder,
        { cache: "no-cache" }
      );

      if (!order.data) return;

      setShowPage(true);

      const response = await fetchInstance(
        endpoints.order.getCurrentBasket.replace(
          ":cartId",
          localStorage.getItem("cartId") || ""
        ),
        { cache: "no-cache" }
      );

      const grouped = groupBy<Product>(
        response.data.products,
        "model"
      );

      setCart(grouped);
      setOrderId(order.data.id);

      const m = moment(order.data.shippingTime, "jYYYY/jM/jD");

      setShippingTime(
        `${m.format("dddd")} ${m.jDate()} ${getMonthName(
          +m.format("jM")
        )}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentChange = () => {
    setShippingPermission(true);
  };

  const handleClickOrder = async () => {
    try {
      await fetchInstance(
        endpoints.order.changeStatusorder.replace(
          ":id",
          orderId
        ),
        {
          method: "PATCH",
          body: {
            paymentMethod: ORDER_STATUS.payed,
            status: ORDER_STATUS.payed,
          },
        }
      );

      router.push("/payment/final-payment");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    showPage && (
      <div className="md:flex lg:flex gap-4">

        {/* LEFT SIDE */}
        {loading ? (
          <PaymentSkeleton />
        ) : (
          <Card className="shadow-sm rounded-xl w-full">
            <div className="space-y-6">

              {/* payment methods */}
              <div>
                <h2 className="mb-4 font-semibold text-gray-500 text-sm">
                  روش پرداخت
                </h2>

                <FormControl className="w-full">
                  <RadioGroup
                    name="payment"
                    onChange={handlePaymentChange}
                  >
                    <label className="flex justify-between items-center p-2 border hover:border-blue-400 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="fluent:payment-28-regular"
                          className="text-2xl"
                        />
                        <span>پرداخت اینترنتی</span>
                      </div>
                      <FormControlLabel
                        value="internet"
                        control={<Radio />}
                        label=""
                      />
                    </label>

                    <label className="flex justify-between items-center mt-3 p-2 border hover:border-blue-400 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="mingcute:home-7-line"
                          className="text-2xl"
                        />
                        <span>پرداخت در محل</span>
                      </div>
                      <FormControlLabel
                        value="local"
                        control={<Radio />}
                        label=""
                      />
                    </label>
                  </RadioGroup>
                </FormControl>
              </div>

              {/* shipping time */}
              <div className="text-gray-500 text-sm">
                <span>زمان ارسال:</span>{" "}
                <span className="font-semibold text-black">
                  {shippingTime}
                </span>
              </div>

              {/* cart preview */}
              <div className="p-3 border rounded-xl">
                {isEmpty(cart) ? (
                  <div className="flex justify-center py-10">
                    <Icon
                      icon="mdi:trash"
                      className="text-gray-300 text-6xl"
                    />
                  </div>
                ) : (
                  <div className="gap-3 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
                    {cart.map((item: any, index: number) => {
                      const key = Object.keys(item)[0];
                      const data = item[key][0];
                      const count = item[key].length;

                      return (
                        <div
                          key={index}
                          className="relative flex justify-center"
                        >
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL_CLIENT +
                              data.photos[0].src
                            }
                            className="w-16 sm:w-20 h-16 sm:h-20 object-contain"
                          />

                          <span className="-right-1 -bottom-1 absolute bg-gray-500 px-2 rounded-full text-white text-xs">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* RIGHT SIDE */}
        <ShippingPrice
          shippingPermision={shippingPermision}
          onCartItem={() => { }}
          onClick={handleClickOrder}
          inValidTextButton="انتخاب روش پرداخت"
        />
      </div>
    )
  );
}