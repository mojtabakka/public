import React, { useEffect, useState } from "react";
import { CartBox, Card } from "components";
import { MdOutlinePriceCheck } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { Button, Loading, MainLayout } from "components";
import Link from "next/link";
import {
  getToman,
  groupBy,
  isEmptyArray,
  isEmptyObject,
} from "../../utils/function.util";
import { getCurrentBasket } from "api/orders.api";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [benefit, setBenefit] = useState();
  const [sumFinalPrice, setSumFinalPrice] = useState();
  const [sumPrice, setSumPrice] = useState();
  useEffect(() => {
    getBasekt();
  }, []);

  const calculatePrices = (data) => {
    let purePrice = 0;
    let sumFinalPrice = 0;
    data.map((item) => {
      Object.keys(item).forEach((el) => {
        purePrice =
          purePrice +
          item[el].reduce((total, preveius) => {
            return (
              (!isEmptyObject(total) ? +total.priceForUser : total) +
              +preveius.priceForUser
            );
          });

        sumFinalPrice =
          sumFinalPrice +
          item[el].reduce((total, preveius) => {
            console.log(preveius);
            return (
              (!isEmptyObject(total)
                ? total?.priceForUser -
                  total?.priceForUser * (+total?.off / 100)
                : total) +
              +(
                preveius?.priceForUser -
                preveius?.priceForUser * (+preveius?.off / 100)
              )
            );
          });

        console.log(setSumFinalPrice);
      });
    });

    // if (!isEmptyArray(data)) {

    setSumFinalPrice(sumFinalPrice);
    setSumPrice(purePrice);

    setBenefit(purePrice - sumFinalPrice);
    // }
  };
  const getBasekt = async () => {
    let data = JSON.parse(localStorage.getItem("cart"));
    data = groupBy(data, "model");
    calculatePrices(data);
    setCartItems(data);
  };

  const handleClickOrder = () => {
    setLoading(true);
  };
  return (
    <div className="p-2 w-full md:flex  lg:flex text-xs">
      <Card className="m-2 w-full rounded-lg ">
        <CartBox items={cartItems} />
      </Card>
      {!isEmptyArray(cartItems) && (
        <div className=" lg:w-1/3 md:w-1/2 m-2 w-full ">
          <Card className="rounded-lg ">
            <div>
              <div className=" flex justify-between">
                <div>
                  <MdOutlinePriceCheck className=" inline-block text-xl " />
                  <span className="px-2">قیمت کالاها</span>
                </div>
                <div>{getToman(sumPrice)} تومان</div>
              </div>
              <hr className="my-5" />
              <div className=" flex justify-between">
                <div>
                  <MdOutlinePriceCheck className=" inline-block text-xl " />
                  <span className="px-2">جمع سبد خرید</span>
                </div>
                <div>{getToman(sumFinalPrice)} تومان</div>
              </div>
              <hr className="my-5" />
              <div className=" flex justify-between text-red-500">
                <div>
                  <GiProfit className=" inline-block text-xl " />
                  <span className="px-2">سود شما از خرید</span>
                </div>
                <div className="">{getToman(benefit)} تومان</div>
              </div>
              <div className="w-full mt-10  mb-3 text-center">
                <Link href={"shipping"} onClick={handleClickOrder}>
                  <Button className="w-full"> ثبت سفارش</Button>
                </Link>
              </div>
            </div>
          </Card>
          <Loading show={loading} />
        </div>
      )}
    </div>
  );
};

Cart.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
