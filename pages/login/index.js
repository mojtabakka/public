import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "public/images/logo.jpeg";
import { setSumOfCart } from "redux/action/general.action";
import { Input, Button, Loading } from "components";
import { sendOtp, verification, getCurrentBasket, addToBasket } from "api";
import { changeMaskValueToNumber, isEmptyArray } from "utils/function.util";

const INPUT_NAMES = {
  phoneNumber: "phoneNumber",
  otp: "otp",
};
function Login(props) {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const router = useRouter();
  const state = useSelector((state) => state.general);

  const changeBasket = async () => {
    try {
      const mainProducts = [];
      const ids = [];
      const cart = await getCurrentBasket();
      const products = cart.data.products;

      const productsLength = !isEmptyArray(products) ? products.length : 0;
      const storageProducts = JSON.parse(localStorage.getItem("cart"));
      const storageProductsLengh = !isEmptyArray(storageProducts)
        ? storageProducts.length
        : 0;

      if (productsLength >= storageProductsLengh) {
        !isEmptyArray(products) &&
          products.map((item) => {
            mainProducts.push(item);
            !isEmptyArray(storageProducts) &&
              storageProducts.map((data) => {
                const check = products.find((el) => el.id == item.id);
                if (!check) mainProducts.push(data);
              });
          });
      }
      if (productsLength < storageProductsLengh) {
        !isEmptyArray(storageProducts) &&
          storageProducts.map((item) => {
            mainProducts.push(item);
            !isEmptyArray(products) &&
              products.map((data) => {
                const check = storageProducts.find((el) => el.id == item.id);
                if (!check) mainProducts.push(item);
              });
          });
      }

      !isEmptyArray(mainProducts) &&
        mainProducts.forEach((item) => {
          ids.push(item.id);
        });
      await addToBasket(ids);
      localStorage.setItem("cart", JSON.stringify(mainProducts));

      dispatch(setSumOfCart(mainProducts.length));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeOtpCode = (e) => {
    const val = e.target.value;
    setOtpValue(val);
    const value = changeMaskValueToNumber(val);
    if (value.length === 4) {
      setOtpValue(value);
      handleVerification(value);
    }
  };
  const handleSubmit = async (e) => {
    try {
      setButtonLoading(true);
      e.preventDefault();
      const form = new FormData(e.target);
      const data = Object.fromEntries(form);
      setPhoneNumber(changeMaskValueToNumber(data[INPUT_NAMES.phoneNumber]));
      data[INPUT_NAMES.phoneNumber] = changeMaskValueToNumber(
        data[INPUT_NAMES.phoneNumber]
      );
      const result = await sendOtp(data);
      result.data.sent && setShowVerification(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setButtonLoading(false);
    }
  };
  const handleVerification = async (value) => {
    setLoading(true);
    const data = {};
    data.otp = value;
    data.phoneNumber = phoneNumber;
    try {
      const result = await verification(data);
      result.data.token && localStorage.setItem("phoneNumber", phoneNumber);
      changeBasket();
      localStorage.setItem("authenticated", true);
      router.query?.back_url
        ? router.push(router.query.back_url)
        : router.push("/");
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  return (
    <div className=" grid place-items-center h-screen  ">
      {!showVerification ? (
        <span className="border bg-white  rounded lg:w-1/4 md:2/4 sm:w-3/5 w-11/12 h-1/2 ">
          <div className="md:flex md:items-center mb-6">
            <div className="w-full px-4">
              <div className="text-center">
                <Image
                  src={logo}
                  className=" inline-block"
                  width={100}
                  height={100}
                  alt="logo"
                />
              </div>
              <h1 className="font-extrabold text-lg  mb-14 ">ورود | ثبت نام</h1>
              <span className="text-sm py-1 mb-14 opacity-50 ">
                لطفا شماره موبایل خود را وارد نمایید
              </span>
              <form onSubmit={handleSubmit}>
                <div className=" mt-1 ">
                  <Input
                    type="tel"
                    max={11}
                    name={INPUT_NAMES.phoneNumber}
                    mask={true}
                    maskpattern="9  9  9  9  9  9  9  9  9  9  9"
                  />
                </div>
                <div className="py-4 text-center ">
                  <Button
                    loading={buttonLoading}
                    className=" !px-10 w-full"
                    type="submit"
                  >
                    ورود
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </span>
      ) : (
        <span className="border bg-white  rounded lg:w-1/4 md:2/4 sm:w-3/5 w-11/12 h-1/2 ">
          <div className="md:flex md:items-center mb-6">
            <div className="w-full px-4">
              <div className="text-center">
                <Image
                  src={logo}
                  className=" inline-block"
                  width={100}
                  alt="logo"
                  height={100}
                />
              </div>
              <h1 className="font-extrabold text-lg  mb-14 ">کد تایید</h1>
              <span className="text-sm py-1 mb-14 opacity-50 " dir="ltr">
                لطفا کد تایید ارسال شده به شماره را وارد کنید
              </span>
              <form onSubmit={handleVerification}>
                <div className=" mt-1 ">
                  <Input
                    type="tel"
                    name={INPUT_NAMES.otp}
                    defaultValue={null}
                    value={otpValue}
                    onChange={handleChangeOtpCode}
                    max={4}
                    mask={true}
                    maskpattern="9 9 9 9 "
                  />
                </div>
                <div
                  className="text-center text-blue-400 underline cursor-pointer"
                  onClick={() => {
                    setPhoneNumber(null);
                    setShowVerification(false);
                  }}
                >
                  اصلاح شماره موبایل
                </div>
                <Loading show={loading} />
              </form>
            </div>
          </div>
        </span>
      )}
    </div>
  );
}

export default Login;
