import React from "react";
import { Fragment } from "react";
import { ThreeDots } from "react-loader-spinner";
import logo from "public/images/logo.jpeg";
import Image from "next/image";

const LoadingTemplate = ({ show = false }) => {
  return (
    <Fragment>
      <div
        className={`flex items-center justify-center h-full w-full fixed top-0 right-0 z-50 ${
          show ? "block" : "hidden"
        }`}
      >
        <div
          className={`bg-white p-20 rounded-lg ${show ? "block" : "hidden"}`}
        >
          <h1 className="text-center flex justify-center w-full text-lg">
            <Image
              src={logo}
              alt="Picture of the author"
              width={100}
              height={100}
              className=" inline-block"
            />
          </h1>
          <div className=" flex justify-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="blue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={show}
            />
          </div>
        </div>
      </div>
      <div
        className={` z-10 fixed flex justify-center bg-gray-400 w-full h-full top-0 right-0  items-center opacity-50 ${
          show ? "block" : "hidden"
        }`}
      ></div>
    </Fragment>
  );
};

export default LoadingTemplate;
