import React, { useEffect } from "react";
import Layout from "components/Layout/mainLayout";
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
    <div className="flex h-screen ">
      <div className="w-1/3 bg-white rounded shadow-sm  h-4/5 ">
        <div className="flex p-3 items-center justify-between">
          <div>
            <div className="flex p-3 items-center">
              <div className="p-2">
                <BsPersonCircle className=" text-6xl text-gray-500" />
              </div>
              {/* <div>{localStorage && <div>{phoneNumber}</div>}</div> */}
            </div>
          </div>
          <div className="p-3">
            <FiEdit2 className="text-blue-400  text-2xl cursor-pointer" />
            <span className="text-blue-400  text-xs">ویرایش</span>
          </div>
        </div>
        <hr />
        <div className="p-3 cursor-pointer">
          <Link href="/orders">
            <span className="p-3">
              <HiOutlineShoppingBag className=" inline-block text-xl" />
            </span>
            <span>سفارش ها </span>
          </Link>
        </div>
        <hr />
        <div className="p-3 cursor-pointer">
          <span className="p-3">
            <FaRegAddressCard className=" inline-block text-xl" />
          </span>
          آدرس ها
        </div>
        <hr />
        <div className="p-3 cursor-pointer ">
          <span className="p-3">
            <RxExit className=" inline-block text-xl" />
          </span>
          خروج
        </div>
      </div>
      <div className="  bg-white  mx-2  p-3 w-full rounded h-4/5">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
