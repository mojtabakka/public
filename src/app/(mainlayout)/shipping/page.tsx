"use client"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { groupBy } from "@/utils/function.utils";
import {
    Card,
} from "@/components";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { fetchInstance } from "@/utils/fetch";
import { Cart } from "@/types/cart.type";
import { Address } from "@/types/address.type";
import ModalAddAddress from "@/components/Modal-add-address";
import ModalAddress from "@/components/modal-address";
import { endpoints } from "@/utils/end-points";
import ShippingPrice from "@/components/shipping-price";
import SelectShippingTime from "@/components/select-shipping-time";
import { Product } from "@/types/product.type";
import ShippingSkeleton from "@/skeletons/shipping.skeleton";

const Shipping = () => {
    const [address, setAddress] = useState<Address>();
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [cart, setCart] = useState<Array<{ [key: string]: any }>>();
    const [shippingTime, setShippingTime] = useState<string>();
    const [modalAddressesState, setModalAddressesState] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [addressLoading, setAddressLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        getAllAddresses();
    }, []);
    const addProductsOrder = async () => {

        try {
            if (!address) setShowModal(true);

            if (shippingTime && address) {
                await fetchInstance(endpoints.order.addOrder, {
                    cache: "no-store",
                    method: "POST", body: {
                        shippingTime
                    }
                })
                router.push("/payment");
            }

        } catch (error) {
            console.log("error", error);
        }
    };

    const getAllAddresses = async () => {
        try {

            setAddressLoading(true)
            const myAaddress = await fetchInstance(endpoints.address.getActiveAddress, { cache: "no-store" });
            setAddress(myAaddress.data);
        } catch (error) {
            console.log('error', error)
        } finally {
            setAddressLoading(false)
        }

    };

    const handleClickAddNewAddress = () => {
        setShowModal(true);
    };

    const handleResult = (result: Address) => {
        if (result) getAllAddresses();
        setModalAddressesState(!modalAddressesState);
        setShowAddModal(false);
    };

    const handleClickAddAddress = () => {
        setShowModal(false);
        setShowAddModal(true);
    };

    const handleSelectTime = (value: string) => {
        if (value) setShippingTime(value);
    };

    const handleCartItem = (item: Cart) => {
        const products = groupBy<Product>(item.products, "model");
        setCart(products);
    };
    return (
        <div className="mt-5">
            <div className=" lg:flex md:flex justify-between">
                {!addressLoading && <Card className="w-full ">
                    <div className="border p-3 rounded-lg">
                        <div className="text-medium  text-gray-400">آدرس تحویل سفارش</div>
                        {isEmpty(address) && (
                            <>
                                <div>هیچ آدرسی وجود ندارد</div>
                            </>
                        )}
                        {!isEmpty(address) && (
                            <div className=" flex items-center text-base">
                                <span>

                                    <Icon className="text-lg inline-block" icon="carbon:location-filled" />
                                </span>
                                <div className="my-5 "> {address?.address} </div>
                            </div>
                        )}

                        <span className="flex justify-end">
                            <span
                                onClick={handleClickAddNewAddress}
                                className="text-blue-400 cursor-pointer"
                            >
                                تغییر یا ویرایش آدرس
                                <Icon icon="ep:arrow-left-bold" className=" inline-block mx-1" />
                            </span>
                        </span>
                        {/* </div> */}
                    </div>
                    <div className="border p-3 rounded-lg mt-5">
                        {isEmpty(cart) && (
                            <div className="flex justify-center p-20">
                                <Icon icon="mdi:bin-outline" className=" text-8xl" />
                            </div>
                        )}
                        <div className="flex overflow-x-scroll">
                            {!isEmpty(cart) && cart &&
                                cart.map((item, index) => {
                                    const key = Object.keys(item)[0];
                                    const data = item[key][0];
                                    const len = item[key].length;
                                    return (
                                        <div className="flex" key={index}>
                                            <img src={process.env.NEXT_PUBLIC_BASE_URL + data.photos[0].src} width={100} height={100} />
                                            <div className="relative">
                                                <span
                                                    className="bg-gray-400 p-1 rounded  absolute "
                                                    style={{ right: "-30px", bottom: "0px" }}
                                                >
                                                    {len}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="border mt-3  rounded-lg">
                        <div className="px-2 py-2">انتخاب زمان ارسال</div>
                        <SelectShippingTime onSelectTime={handleSelectTime} />
                    </div>
                </Card>}
                {
                    addressLoading && <ShippingSkeleton />
                }

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
                onClose={() => setShowAddModal(false)}
                onResult={handleResult}
            />
            <ModalAddress
                onClickAddAddress={handleClickAddAddress}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
            {/* <Loading show={loading} /> */}
        </div>
    );
};
export default Shipping;