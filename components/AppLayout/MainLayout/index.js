import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "public/images/logo.jpeg";
import { HiOutlineLogin } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { SlBasket } from "react-icons/si";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillBasket3Fill } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoFilter } from "react-icons/io5";
import { searchProduct, getCats } from "api";
import { setSumOfCart } from "redux/action/general.action";
import { getCookie } from "lib/function.utils.js";
import {
  Dropdown,
  BasketModal,
  Modal,
  Sidebar,
  CategoryBox,
  Loading,
  Filter,
  Badge,
} from "components";
import { isEmptyObject, isEmptyArray, isFunction } from "utils/function.util";
const MainLayout = ({ children, showFilters = false, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [catMenueStatus, setCatMenueStatus] = useState(false);
  const [token, setToken] = useState();
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [dropDownItems, setDropDownItems] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [displayBaskModal, setDisplayBaskModal] = useState(false);
  const [leaveBasketFlag, setLeaveBasketFlag] = useState(false);
  const [leaveBaketKadrFlag, setLeaveBaketKadrFlag] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [search, setSearch] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [cats, setCats] = useState([]);
  const [sidbarItems, setSidbarItems] = useState([]);
  const { push } = useRouter();
  const router = useRouter();
  const mySumCart = useSelector((state) => state.general.sumCart);
  const [sumCart, setSumCart] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    const token = getCookie("token");
    setToken(token);
    getAllCats();
    initDropDown();
    CreateSidebarItem();
    currentBasketCount();
    const authenticated = localStorage.getItem("authenticated");
    setAuthenticated(authenticated);
  }, []);
  const currentBasketCount = async () => {
    const products = JSON.parse(localStorage.getItem("cart"));
    const cartCount = products && !isEmptyArray(products) ? products.length : 0;
    setSumCart(cartCount);
    dispatch(setSumOfCart(cartCount));
  };
  useEffect(() => {
    setLoading(false);
  }, [router.query]);
  useEffect(() => {
    setSumCart(mySumCart);
  }, [mySumCart]);

  const getAllCats = async () => {
    const myCats = await getCats();
    setCats(myCats.data);
    CreateSidebarItem(myCats.data);
  };

  const CreateSidebarItem = (categories) => {
    const items = [];
    !isEmptyArray(categories) &&
      categories.forEach((item) => {
        const catId = item.id;
        const data = {};
        const brands = {};
        const types = {};
        const properties = {};
        data.name = item.title;
        data.label = item.title;
        (data.path = {
          query: {},
          pathname: "/" + catId,
        }),
          (data.items = []);
        if (!isEmptyArray(item.brands)) {
          brands.name = "برندها";
          brands.label = "برندها";
          brands.items = [];
          brands.path = {
            query: null,
            pathname: "/" + catId,
          };
          item.brands.forEach((item) => {
            brands.items.push({
              name: item.brand,
              label: item.brand + ` ( ${item.title} ) `,
              path: {
                query: { brand: item.id },
                pathname: "/" + catId,
              },
            });
          });
        }
        data.items.push(brands);

        if (!isEmptyArray(item.productTypes)) {
          types.name = "انواع";
          types.label = "انواع";
          types.items = [];
          types.path = {
            query: null,
            pathname: "/" + catId,
          };
          item.productTypes.forEach((item) => {
            types.items.push({
              name: item.brans,
              label: item.type,
              path: {
                query: { type: item.id },
                pathname: "/" + catId,
              },
            });
          });
        }
        data.items.push(types);

        if (!isEmptyArray(item.propertyTitles)) {
          properties.name = "ویژگی ها";
          properties.label = "ویژگی ها";
          properties.items = [];
          properties.path = {
            query: null,
            pathname: "/" + catId,
          };
          item.propertyTitles.forEach((item) => {
            properties.items.push({
              name: item.brans,
              label: item.title,
              path: {
                query: { properties: item.id },
                pathname: "/" + catId,
              },
            });
          });
        }
        !isEmptyObject(properties) && data.items.push(properties);
        items.push(data);
      });

    setSidbarItems(items);
  };
  useEffect(() => {
    if (search) {
      const getData = setTimeout(async () => {
        const data = {
          search,
        };
        const result = await searchProduct(data);
      }, 1000);

      return () => clearTimeout(getData);
    }
  }, [search]);

  const handleClickBasket = () => {
    router.asPath !== "/cart" && setLoading(true);
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

      {
        id: 3,
        title: "آدرس ها",
        bgColor: "white",
        url: "/address",
        icon: <GrMapLocation />,
      },
    ];
    setDropDownItems(items);
  };
  const changeStatusDropDown = () => {
    setDropdownOpen(!DropdownOpen);
  };
  const handleClickDropdown = (item) => {
    setLoading(true);
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

  const handleChangeFilter = (item) => {
    isFunction(props.onChangeFilter) && props.onChangeFilter(item);
  };

  const handleClickFilterIcon = () => {
    setShowFilterModal(true);
  };

  return (
    <div className="">
      <Drawer
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        direction="right"
      >
        <div className="text-left mt-2 bg">
          <div className="text-center">
            <Image
              onClick={handleClickLogo}
              src={logo}
              alt="Picture of the author"
              width={50}
              height={50}
              className=" inline-block cursor-pointer"
            />
          </div>
          <hr />
          <div className=" h-screen ">
            <div style={{ height: "92%" }} className="   overflow-y-scroll">
              <Sidebar
                items={sidbarItems}
                onClickSidbarItem={(item) => {
                  setLoading(true);
                  router.push({
                    pathname: item.pathname,
                    query: { ...router.query, ...item.query },
                  });
                  setIsOpenDrawer(false);
                }}
              />
            </div>
          </div>
        </div>
      </Drawer>
      <header className=" shadow-md bg-white  sm:text-xm p-2  lg:sticky lg:top-0 md:sticky md:top-0 w-full  z-50 ">
        <div className="text-center lg:hidden flex justify-between items-center">
          <div className="w-full  text-right">
            <div className="px-2" onClick={() => setIsOpenDrawer(true)}>
              <GiHamburgerMenu className=" inline-block cursor-pointer text-lg" />
            </div>
          </div>
          <div className="w-1/2 text-left ">
            <Image
              onClick={handleClickLogo}
              src={logo}
              alt="Picture of the author"
              width={50}
              height={50}
              className=" inline-block cursor-pointer"
            />
          </div>
        </div>
        <hr className="lg:hidden " />
        <div className=" flex place-items-center mt-3  ">
          <div className=" text-right mx-20  lg:block hidden w-1/2  ">
            <Image
              onClick={handleClickLogo}
              src={logo}
              alt="Picture of the author"
              width={60}
              height={60}
              className=" inline-block cursor-pointer"
            />
          </div>
          <div className="  text-right  w-full  ">
            <form>
              <div className="relative w-full">
                <input
                  type="search"
                  id="default-search"
                  className=" bg-gray-100 rounded-lg text-right w-full p-2 pr-10 text-sm text-gray-900 outline-0"
                  placeholder="جستوجو"
                  required
                  onChange={(e) => setSearch(e.target.value)}
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
          <div className=" lg:mx-10  md:mx-6 sm:mx-1 cursor-pointer mr-2 mt-1 sm:text-sm text-left  flex justify-end w-full">
            <div className="flex  items-center justify-end mx-3 lg:mx-0">
              <div
                className=" inline-block px-6 py-3 "
                onMouseLeave={hanleMouseLeaveBasketIcon}
                onMouseOver={handleBasketIconMoouseOver}
                onClick={handleClickBasket}
              >
                <div className=" relative">
                  <SlBasket className="   inline-block   lg:text-2xl  md:text-xl sm:text-lg text-xl" />
                  {sumCart > 0 && (
                    <Badge
                      className="text-xs top-2   flex !items-center absolute  left-0"
                      style={{ left: "-5px" }}
                    >
                      {sumCart}
                    </Badge>
                  )}
                </div>
              </div>
              {!authenticated ? (
                <span
                  onClick={handleClicklogin}
                  className=" p-1 sm:p-2 lg:p-4 md:p-2  border-x w-full "
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
                    onClose={() => setDropdownOpen(false)}
                    sheetTitle={
                      <>
                        <div
                          className="text-center"
                          style={{ marginTop: "-20px" }}
                        >
                          <span className="border border-white bg-white p-5 rounded-full">
                            <span className=" ">
                              <CgProfile className=" inline-block  text-2xl  lg:text-2xl  md:text-xl sm:text-lg" />
                            </span>
                          </span>
                        </div>
                        <div className="text-center mt-3 text-gray-400">
                          مجتبی کریمی
                        </div>
                        <div className="text-center mt-3 text-gray-400">
                          {localStorage.getItem("phoneNumber")}
                        </div>
                      </>
                    }
                    title={
                      <CgProfile className="  inline-block text-lg  lg:text-2xl  md:text-xl sm:text-lg" />
                    }
                    open={true}
                    items={dropDownItems}
                    onClick={handleClickDropdown}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-base mx-1 mt-2 px-4">
          <div className="relative  hidden lg:block ">
            <span
              onMouseMove={() => setCatMenueStatus(true)}
              onMouseLeave={() => setCatMenueStatus(false)}
            >
              <GiHamburgerMenu className=" inline-block cursor-pointer" />

              <span className="px-3 cursor-pointer lg:text-base text-sm ">
                دسته بندی ها
              </span>
              {catMenueStatus && (
                <CategoryBox
                  className="text-sm"
                  onMouseLeaveCatMenue={() => setCatMenueStatus(false)}
                  categories={cats}
                />
              )}
            </span>
          </div>
        </div>
      </header>
      {showFilters && (
        <div
          className={`p-3 flex items-center shadow  rounded border-4 mt-1 border-white lg:hidden  ${
            !showFilters && ""
          }`}
        >
          <div
            className={`cursor-pointer  ${!showFilters && "hidden"}`}
            onClick={handleClickFilterIcon}
          >
            <span className="pl-1 text-xs">فیلترها</span>
            <IoFilter className=" inline-block text-xs" />
          </div>
        </div>
      )}
      <div className="flex">
        {showFilters && (
          <Filter
            onChangeFilter={handleChangeFilter}
            className={` ${!showFilters ? "hidden" : "hidden lg:block"}`}
          />
        )}
        <div className="w-full">
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
          <div className=" lg:text-base  text-small mb-24 overflow-y-scroll">
            {children}
          </div>
        </div>
        {showFilterModal && (
          <Modal
            title="فیلتر ها"
            show={showFilterModal}
            className="bg-white"
            onClickClose={() => setShowFilterModal(false)}
            onClickBackdrop={() => setShowFilterModal(false)}
            modalContent={
              showFilters && (
                <Filter
                  onChangeFilter={handleChangeFilter}
                  className=" !w-full !p-0  !shadow-none"
                />
              )
            }
            sheetContent={
              showFilters && (
                <Filter
                  onChangeFilter={handleChangeFilter}
                  className=" !w-full !p-0  !shadow-none"
                />
              )
            }
          ></Modal>
        )}
        <Loading show={loading} />
      </div>
    </div>
  );
};

export { MainLayout };
