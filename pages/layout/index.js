import Link from "next/link";
import React from "react";
// import { CgProfile } from "react-icons/Cg";
import { HiOutlineLogin } from "react-icons/hi";

import { SlBasket } from "react-icons/Sl";
import logo from "public/images/logo.jpeg";
import Image from "next/image";
function Layout({ children }) {
  return (
    <div>
      <header>
        <div className=" flex shadow-md bg-white py-3 sm:text-xm p-2 place-items-center">
          <div className="flex-1 text-right mx-20 md:block lg:block hidden ">
            <Image
              src={logo}
              alt="Picture of the author"
              width={60}
              height={60}
              className=" inline-block"
            />
          </div>
          <div className="flex-1  text-right w-full ">
            <form>
              <div class="relative">
                <input
                  type="search"
                  id="default-search"
                  className=" bg-gray-100 rounded-lg text-right w-full p-2 pr-10 text-sm text-gray-900 outline-0"
                  placeholder="جستوجو"
                  required
                />
                <div class="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none  ">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div className="flex-1 lg:mx-20 md:mx-6 sm:mx-1 cursor-pointer mr-2 mt-1 sm:text-sm text-left ">
            <span href={""} className=" px-6">
              <SlBasket className="inline-block    lg:text-2xl  md:text-xl sm:text-lg" />
            </span>
            <Link
              href="/login"
              className=" p-1 sm:p-2 lg:p-4 md:p-2  border-x"
            >
              <HiOutlineLogin className="  inline-block  lg:text-2xl  md:text-xl sm:text-lg" />
              <span
                href="login"
                className=" px-1 text-xs lg:text-base md:text-base  sm:text-sm text"
              >
                <span className=" hidden lg:inline-block md:hidden sm:hidden text">
                  ثبت نام |
                </span>
                <span> ورود </span>
              </span>
            </Link>
          </div>
        </div>
      </header>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default Layout;
