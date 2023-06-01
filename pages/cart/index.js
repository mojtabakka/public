import React, { useEffect, useState } from "react";
import { CartBox, Card } from "components";
import { getCurrentBasket } from "api";
import { MdOutlinePriceCheck } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import MainLayout from "components/Layout/mainLayout";
import { Button } from "components";

const Cart = () => {
  const [cartItems, setCartItems] = useState();
  const [benefit, setBenefit] = useState();
  const [sumFinalPrice, setSumFinalPrice] = useState();
  const [sumPrice, setSumPrice] = useState();
  useEffect(() => {
    getBasekt();
  }, []);

  const calculatePrices = (data) => {
    let mySumPrice = 0;
    let mySumFinalPrice = 0;
    let myBefefit = 0;
    data.map((item) => {
      const benefitOfPrice =
        +item.products_priceForUser * (+item.products_off / 100);
      myBefefit +=
        +item.products_priceForUser * (+item.products_off / 100) * item.number;
      setBenefit(myBefefit);
      mySumPrice += +item.products_priceForUser * item.number;
      mySumFinalPrice +=
        +(item.products_priceForUser - benefitOfPrice) * item.number;
    });
    setBenefit(myBefefit);
    setSumFinalPrice(mySumFinalPrice);
    setSumPrice(mySumPrice);
  };
  const getBasekt = async () => {
    const data = await getCurrentBasket();
    console.log(data);
    calculatePrices(data.data);
    setCartItems(data.data);
  };
  return (
    <div className="p-2 w-full md:flex  lg:flex">
      <Card className="m-2 w-full rounded-lg ">
        <CartBox items={cartItems} />
      </Card>
      <div className=" lg:w-1/3 md:w-1/2 m-2 w-full ">
        <Card className="rounded-lg ">
          <div>
            <div className=" flex justify-between">
              <div>
                <MdOutlinePriceCheck className=" inline-block text-xl " />
                <span className="px-2">قیمت کالاها</span>
              </div>
              <div>{sumPrice}</div>
            </div>
            <hr className="my-5" />
            <div className=" flex justify-between">
              <div>
                <MdOutlinePriceCheck className=" inline-block text-xl " />
                <span className="px-2">جمع سبد خرید</span>
              </div>
              <div>{sumFinalPrice}</div>
            </div>
            <hr className="my-5" />
            <div className=" flex justify-between text-red-500">
              <div>
                <GiProfit className=" inline-block text-xl " />
                <span className="px-2">سود شما از خرید</span>
              </div>
              <div className="">{benefit}</div>
            </div>
            <div className="w-full mt-14 mb-3 text-center">
              <Button className="w-full"> ثبت سفارش</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

Cart.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
