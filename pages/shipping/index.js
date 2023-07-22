import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { CgTrashEmpty } from "react-icons/cg";
import { IoLocationSharp } from "react-icons/io5";
import { getActiveAddress, addOrder } from "api";
import { isEmptyArray, isEmptyObject } from "utils/function.util";
import {
  Card,
  ModalAddAddress,
  ModalAddress,
  SelectShippingTime,
  ShippingPrice,
  Loading,
  MainLayout,
} from "components";
import { useRouter } from "next/router";

const Shipping = () => {
  const [address, setAddress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [cart, setCart] = useState(false);
  const [shippingTime, setShippingTime] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [modalAddressesState, setModalAddressesState] = useState(true);

  useEffect(() => {
    getAllAddresses();
  }, []);
  const addProductsOrder = async () => {
    !address && setShowModal(true);
    if (shippingTime && address) {
      const result = await addOrder({ shippingTime });
      // setLoading(true);
      // router.push({ pathname: "/payment" });
    }
  };

  const getAllAddresses = async () => {
    const myAaddress = await getActiveAddress();
    setAddress(myAaddress.data);
  };

  const handleClickAddNewAddress = () => {
    setShowModal(true);
  };

  const handleResult = (result) => {
    result && getAllAddresses();
    setModalAddressesState(!modalAddressesState);
    setShowAddModal(false);
  };

  const handleClickAddAddress = () => {
    setShowModal(false);
    setShowAddModal(true);
  };

  const handleSelectTime = (value) => {
    value && setShippingTime(value);
  };

  const handleCartItem = (item) => {
    setCart(item);
  };
  return (
    <div className="mt-5">
      <div className=" lg:flex md:flex justify-between">
        <Card className="w-full ">
          <div className="border p-3 rounded-lg">
            <div className="text-medium  text-gray-400">آدرس تحویل سفارش</div>
            {isEmptyObject(address) && (
              <>
                <div>هیچ آدرسی وجود ندارد</div>
              </>
            )}
            {!isEmptyObject(address) && (
              <div className=" flex items-center text-base">
                <span>
                  <IoLocationSharp className="text-lg inline-block" />
                </span>
                <div className="my-5 "> {address.address} </div>
              </div>
            )}

            <span className="flex justify-end">
              <span
                onClick={handleClickAddNewAddress}
                className="text-blue-400 cursor-pointer"
              >
                تغییر یا ویرایش آدرس
                <MdArrowBackIos className=" inline-block mx-1" />
              </span>
            </span>
            {/* </div> */}
          </div>
          <div className="border p-3 rounded-lg mt-5">
            {isEmptyArray(cart) && (
              <div className="flex justify-center p-20">
                <CgTrashEmpty className=" text-8xl" />
              </div>
            )}
            <div className="flex overflow-x-scroll">
              {!isEmptyArray(cart) &&
                cart.map((item, index) => (
                  <div className="flex" key={index}>
                    <img
                      src={item?.productPhotos_src}
                      width={100}
                      height={100}
                    />
                    <div className="relative">
                      <span
                        className="bg-gray-400 p-1 rounded  absolute "
                        style={{ right: "-30px", bottom: "0px" }}
                      >
                        {item?.number}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="border mt-3  rounded-lg">
            <div className="px-2 py-2">انتخاب زمان ارسال</div>
            <SelectShippingTime onSelectTime={handleSelectTime} />
          </div>
        </Card>

        <ShippingPrice
          shippingPermision={shippingTime ? true : false}
          onCartItem={handleCartItem}
          onClick={addProductsOrder}
        />
      </div>
      <div className="flex justify-between">
        <div className="w-full mx-1"></div>
      </div>
      <ModalAddAddress
        show={showAddModal}
        onClickClose={() => setShowAddModal(false)}
        onResult={handleResult}
      />
      <ModalAddress
        state={modalAddressesState}
        onClickAddAddress={handleClickAddAddress}
        show={showModal}
        onClickClose={() => setShowModal(false)}
      />
      <Loading show={loading} />
    </div>
  );
};

Shipping.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Shipping;
