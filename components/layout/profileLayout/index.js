import React, { useEffect } from "react";
import { getUser } from "api";
import { BsPersonCircle } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import Link from "next/link";

const ProfileLayout = ({ children }) => {
  useEffect(() => {
    getProfileUser();
  });
  const getProfileUser = async () => {
    await getUser();
  };
  return (
    <div className="  h-full  grid grid-cols-1  lg:grid-cols-4  md:grid-cols-4 gap-1   pb-40 fixed w-full  overflow-x-scroll ">
      <div className="   hidden lg:block md:inline-block sm:hidden ">
        <div className="    bg-white rounded shadow-sm   pb-40     mt-5 mr-3  top10   sticky top-2   ">
          <div className="flex p-3 items-center justify-between">
            <div>
              <div className="flex p-3 items-center">
                <div className="p-2">
                  <BsPersonCircle className=" text-6xl text-gray-500" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <Link href="/profile">
                <FiEdit2 className="text-blue-400  text-2xl cursor-pointer" />
                <span className="text-blue-400  text-xs">ویرایش</span>
              </Link>
            </div>
          </div>
          <hr />
          <Link href="/orders">
            <div className="p-3 cursor-pointer">
              <span className="p-3">
                <HiOutlineShoppingBag className=" inline-block text-xl" />
              </span>
              <span>سفارش ها </span>
            </div>
          </Link>
          <hr />
          <Link href="/address">
            <div className="p-3 cursor-pointer">
              <span className="p-3">
                <FaRegAddressCard className=" inline-block text-xl" />
              </span>
              آدرس ها
            </div>
          </Link>
          <hr />
          <div className="p-3 cursor-pointer ">
            <span className="p-3">
              <RxExit className=" inline-block text-xl" />
            </span>
            خروج
          </div>
        </div>
      </div>
      <div className="   mx-2  col-span-3 rounded">{children}</div>
    </div>
  );
};

export { ProfileLayout };
