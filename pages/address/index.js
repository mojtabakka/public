import React, { useEffect, useState } from "react";
import MainLayout from "components/Layout/mainLayout";
import ProfileLayout from "components/Layout/profileLayout";
import { FaCity } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAddLocationAlt } from "react-icons/md";

import { BsPerson } from "react-icons/bs";
import { getAddresses } from "api";
import { isEmptyArray } from "../../utils/function.util";
import { Dropdown } from "../../components";

const address = () => {
  const [addresses, setAddresses] = useState([]);
  const [dropDownItems, setDropDownItems] = useState([]);
  useEffect(() => {
    getAddressItems();
    initDropDown();
  }, []);

  const getAddressItems = async () => {
    const result = await getAddresses();
    setAddresses(result.data);
  };

  const initDropDown = () => {
    const items = [
      {
        id: 1,
        title: "ویرایش ",
        border: true,
        className: "",
        icon: <BiEditAlt className=" text-xl inline-block" />,
        // secondIcon: <MdOutlineKeyboardArrowLeft className="" />,
        url: "/profile",
      },

      {
        id: 2,
        title: "حذف",
        bgColor: "white",
        url: "/orders",
        icon: <AiFillDelete className=" text-xl inline-block" />,
        // icon: <BsFillBasket3Fill />,
      },
    ];
    setDropDownItems(items);
  };
  return (
    <div className=" bg-white mt-5 p-3  rounded">
      <div className="border p-2 rounde4">
        <div className="mb-5">آدرس ها </div>
        {!isEmptyArray(addresses) &&
          addresses.map((item) => (
            <div className="flex justify-between border p-4 mb-2 rounded">
              <div className="w-full">
                <div className=" w-full">
                  {item.address}تهران پردیس فاز۲
                  <div className="mt-3">
                    <FaCity className=" inline-block text-base text-gray-400" />
                    <span className="px-3 text-gray-400">{item.city}</span>
                  </div>
                  <div className="mt-1">
                    <AiOutlineMail className=" inline-block text-base text-gray-400 " />
                    <span className="px-3 text-gray-400">
                      {item.postalCode}
                    </span>
                  </div>
                  <div className="my-1">
                    <BsPerson className=" inline-block text-base text-gray-400" />
                    <span className=" mx-2 text-gray-400 "> hdlld</span>
                  </div>
                </div>
              </div>
              <div className=" relative">
                <Dropdown
                  title={<BsThreeDots className="mt-3 cursor-pointer " />}
                  open={true}
                  items={dropDownItems}
                  //   onClick={handleClickDropdown}
                />
              </div>
            </div>
          ))}

        <div className="border rounded p-2 text-center text-red-700 bg-gray-200 cursor-pointer font-black">
          <MdOutlineAddLocationAlt className=" inline-block text-base" />
          <span className="px-2">افزودن آدرس جدید</span>
        </div>
      </div>
    </div>
  );
};

address.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};

export default address;
