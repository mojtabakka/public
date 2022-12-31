import React from "react";
import { Input, Button } from "components";
import logo from "public/images/logo.jpeg";
import Image from "next/image";

function LoginTemplate() {
  return (
    <div className=" grid place-items-center h-screen  ">
      <span className="border bg-white  rounded lg:w-1/4 md:2/4 sm:w-3/5 w-11/12 h-1/2 ">
        <div class="md:flex md:items-center mb-6">
          <div className="w-full px-4">
            <div className="text-center">
              <Image
                src={logo}
                className=" inline-block"
                width={100}
                height={100}
              />
            </div>
            <h1 className="font-extrabold text-lg  mb-14 "> ورود | ثبت نام </h1>
            <span className="text-sm py-1 mb-14 opacity-50 ">
              لطفا شماره موبایل یا ایمیل خود را وارد نمایید
            </span>
            <div className=" mt-1 ">
              <Input type="number" />
            </div>
            <div className="py-4 text-center ">
              <Button className=" !px-10 w-full"> ورود </Button>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}

export default LoginTemplate;
