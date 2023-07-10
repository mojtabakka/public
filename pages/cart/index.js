import React, { useEffect, useState } from "react";
import { CartBox, Card } from "components";
import { getCurrentBasket } from "api";
import { MdOutlinePriceCheck } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import MainLayout from "components/Layout/mainLayout";
import { Button, Loading } from "components";
import Link from "next/link";
import { getToman, isEmptyArray } from "../../utils/function.util";

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
    if (!isEmptyArray(data)) {
      setBenefit(data[0]?.basket_benefit);
      setSumFinalPrice(data[0]?.basket_finalPrice);
      setSumPrice(data[0]?.basket_purePrice);
    }
  };
  const getBasekt = async () => {
    const data = await getCurrentBasket();
    calculatePrices(data.data);
    setCartItems(data.data);
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
