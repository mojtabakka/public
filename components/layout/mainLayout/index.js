import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from "public/images/logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineLogin } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { SlBasket } from "react-icons/Sl";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillBasket3Fill } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Dropdown, BasketModal } from "components";
import { getCurrentBasket } from "api";
import { getCookie } from "lib/function.utils.js";
import { isEmptyArray } from "utils/function.util.js";
const Layout = ({ children }) => {
  const [token, setToken] = useState();
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [dropDownItems, setDropDownItems] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [displayBaskModal, setDisplayBaskModal] = useState(false);
  const [leaveBasketFlag, setLeaveBasketFlag] = useState(false);
  const [leaveBaketKadrFlag, setLeaveBaketKadrFlag] = useState(false);
  const { query, push } = useRouter();
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    setToken(token);
    initDropDown();
  }, []);

  const handleClicklogin = () => {
    const url = document.URL.split(window.location.origin)[1];
    localStorage.setItem("back_url", url);
    router.push("/login");
  };
  const initDropDown = () => {
    const items = [
      {
        id: 1,
        title: localStorage.getItem("phoneNumber"),
        bgColor: "white",
        border: true,
        subTitle: "hello",
        icon: <BsPersonCircle className=" text-xl inline-block" />,
        secondIcon: <MdOutlineKeyboardArrowLeft className="" />,
        url: "/profile",
      },

      {
        id: 2,
        title: "سفارش ها",
        bgColor: "white",
        url: "/orders",
        icon: <BsFillBasket3Fill />,
      },
    ];
    setDropDownItems(items);
  };
  const changeStatusDropDown = () => {
    setDropdownOpen(!DropdownOpen);
  };
  const handleClickDropdown = (item) => {
    push(item.url);
  };

  const handleBasketIconMoouseOver = () => {
    getBasket();
    setDisplayBaskModal(true);
  };

  const hanelMouseLeaveBasketkadr = () => {
    setLeaveBasketFlag(false);
    if (!leaveBasketFlag) setDisplayBaskModal(false);
  };

  const hanleMouseLeaveBasketIcon = () => {
    setLeaveBasketFlag(false);
    if (!leaveBaketKadrFlag) setDisplayBaskModal(false);
  };

  const getBasket = async () => {
    // const data = await getCurrentBasket();
    // setBasketData(data.data);
  };
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
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className=" bg-gray-100 rounded-lg text-right w-full p-2 pr-10 text-sm text-gray-900 outline-0"
                  placeholder="جستوجو"
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none  ">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 "
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
          <div className="flexƒ-1 lg:mx-20 md:mx-6 sm:mx-1 cursor-pointer mr-2 mt-1 sm:text-sm text-left ">
            <Link
              href={"/cart"}
              className=" px-6 py-3"
              onMouseLeave={hanleMouseLeaveBasketIcon}
              onMouseOver={handleBasketIconMoouseOver}
            >
              <SlBasket className="inline-block relative  lg:text-2xl  md:text-xl sm:text-lg" />
            </Link>
            {!token ? (
              <span
                onClick={handleClicklogin}
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
              </span>
            ) : (
              <span
                className=" p-1 sm:p-2 lg:p-4 md:p-2  border-x  "
                onClick={changeStatusDropDown}
              >
                <CgProfile className="  inline-block  lg:text-2xl  md:text-xl sm:text-lg" />
                <span
                  href="login"
                  className=" px-1 text-xs lg:text-base md:text-base  sm:text-sm text"
                >
                  <span className="  lg:inline-block text">
                    <IoMdArrowDropdown className=" inline-block" />
                    <Dropdown
                      className="left-8 lg:left-24 top-12 lg:top-16 border"
                      open={DropdownOpen}
                      items={dropDownItems}
                      onClick={handleClickDropdown}
                    />
                  </span>
                </span>
              </span>
            )}
          </div>
        </div>
      </header>
      <div>
        <div className=" hidden  md:block">
          <div className={`${!displayBaskModal ? "hidden" : ""}`}>
            {isEmptyArray(basketData) && basketData.length > 0 && (
              <BasketModal
                items={basketData}
                onMouseLeave={hanelMouseLeaveBasketkadr}
                onMouseOver={() => setDisplayBaskModal(true)}
              />
            )}
          </div>
        </div>
        <div className="mt-5" >{children}</div>
      </div>
    </div>
  );
};

export default Layout;
