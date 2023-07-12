import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Button } from "components";
import logo from "public/images/logo.jpeg";
import { sendOtp, verification } from "api";
import Image from "next/image";
import { useRouter } from "next/router";
import { changeMaskValueToNumber } from "../../utils/function.util";
import { getCookie } from "../../lib/function.utils";

const INPUT_NAMES = {
  phoneNumber: "phoneNumber",
  otp: "otp",
};
function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();
  const state = useSelector((state) => state.general);

  useEffect(() => {
    const value = changeMaskValueToNumber(otpValue);
    if (value.length === 4) {
      setOtpValue(value);
      handleVerification(value);
    }
  }, [otpValue]);
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.back();
    }
    // router.back();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    setPhoneNumber(changeMaskValueToNumber(data[INPUT_NAMES.phoneNumber]));
    data[INPUT_NAMES.phoneNumber] = changeMaskValueToNumber(
      data[INPUT_NAMES.phoneNumber]
    );
    const result = await sendOtp(data);
    result.data.sent && setShowVerification(true);
  };
  const handleVerification = async (value) => {
    const data = {};
    data.otp = value;
    data.phoneNumber = phoneNumber;
    try {
      const result = await verification(data);
      result.data.token && localStorage.setItem("phoneNumber", phoneNumber);
      router.back();
    } catch (error) {
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
                />
              </div>
              <h1 className="font-extrabold text-lg  mb-14 ">ورود | ثبت نام</h1>
              <span className="text-sm py-1 mb-14 opacity-50 ">
                لطفا شماره موبایل خود را وارد نمایید
              </span>
              <form onSubmit={handleSubmit}>
                <div className=" mt-1 ">
                  <Input
                    type="number"
                    max={11}
                    name={INPUT_NAMES.phoneNumber}
                    mask={true}
                    maskpattern="9  9  9  9  9  9  9  9  9  9  9"
                  />
                </div>
                <div className="py-4 text-center ">
                  <Button className=" !px-10 w-full" type="submit">
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
                    type="number"
                    name={INPUT_NAMES.otp}
                    defaultValue={null}
                    value={otpValue}
                    onChange={(event) => setOtpValue(event.target.value)}
                    max={4}
                    mask={true}
                    maskpattern="9 9 9 9 "
                  />
                </div>
                <div className="py-4 text-center ">
                  <Button className=" !px-10 w-full" type="submit">
                    ورود
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </span>
      )}
    </div>
  );
}

export default Login;
