import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from "public/images/logo.jpeg";
import Image from "next/image";
import { HiOutlineLogin } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { SlBasket } from "react-icons/Sl";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillBasket3Fill } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Dropdown, BasketModal } from "components";
import { getCookie } from "lib/function.utils.js";
import { isEmptyArray } from "utils/function.util.js";
import { Loading } from "components";
const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
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
  const handleClickBasket = () => {
    if (router.pathname !== "/cart") {
      setLoading(true);
      router.push({
        pathname: "/cart",
      });
      setLoading(true);
    }
  };
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

  const handleClickLogo = () => {
    if (router.pathname !== "/") {
      setLoading(true);
      router.push({ pathname: "/" });
    }
  };
  return (
    <div>
      <header>
        <div className=" flex shadow-md bg-white py-3 sm:text-xm p-2 place-items-center">
          <div className="flex-1 text-right mx-20 md:block lg:block hidden ">
            <Image
              onClick={handleClickLogo}
              src={logo}
              alt="Picture of the author"
              width={60}
              height={60}
              className=" inline-block cursor-pointer"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div className="flex-1 lg:mx-10 md:mx-6 sm:mx-1 cursor-pointer mr-2 mt-1 sm:text-sm text-left ">
            <div className="flex  items-center justify-end mx-3 lg:mx-0">
              <div
                className=" inline-block px-6 py-3 "
                onMouseLeave={hanleMouseLeaveBasketIcon}
                onMouseOver={handleBasketIconMoouseOver}
                onClick={handleClickBasket}
              >
                <SlBasket className="inline-block relative  lg:text-2xl  md:text-xl sm:text-lg text-lg" />
              </div>
              {!token ? (
                <span
                  onClick={handleClicklogin}
                  className=" p-1 sm:p-2 lg:p-4 md:p-2  border-x"
                >
                  <HiOutlineLogin className="  inline-block  text-lg  lg:text-2xl  md:text-xl sm:text-lg" />
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
                <div>
                  <Dropdown
                    title={
                      <CgProfile className="  inline-block text-lg  lg:text-2xl  md:text-xl sm:text-lg" />
                    }
                    open={true}
                    items={dropDownItems}
                    //   onClick={handleClickDropdown}
                  />
                </div>
              )}
            </div>
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
        <div className=" lg:text-base  text-small mb-24">{children}</div>
      </div>
      <Loading show={loading} />
    </div>
  );
};

export default Layout;
