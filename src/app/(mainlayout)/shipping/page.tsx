"use client"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { groupBy } from "@/utils/function.utils";
import {
    Card,
} from "@/components";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { Cart } from "@/types/cart.type";
import { Address } from "@/types/address.type";
import ModalAddAddress from "@/components/Modal-add-address";
import ModalAddress from "@/components/modal-address";
import { endpoints } from "@/utils/end-points";
import ShippingPrice from "@/components/shipping-price";
import SelectShippingTime from "@/components/select-shipping-time";
import { Product } from "@/types/product.type";
import ShippingSkeleton from "@/skeletons/shipping.skeleton";
import { fetchInstance } from "@/utils/fetch";

const Shipping = () => {
    const [address, setAddress] = useState<Address>();
    const [addresses, setAddresses] = useState<Array<Address>>([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [cart, setCart] = useState<Array<{ [key: string]: any }>>();
    const [shippingTime, setShippingTime] = useState<string>();
    const [modalAddressesState, setModalAddressesState] = useState(true);
    const [addressLoading, setAddressLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        getAllAddresses();
    }, []);
    const addProductsOrder = async () => {
        try {
            if (!address) setShowModal(true);
            console.log('hello')

            if (shippingTime && address) {
                await fetchInstance(endpoints.order.addOrder, {
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
            const myAaddress = await fetchInstance(endpoints.address.address);
            const activAddress = myAaddress.data.find((address) => address.active)
            setAddresses(myAaddress.data)
            setAddress(activAddress);
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
        <div >
            <div className="flex lg:flex-row flex-col justify-between">
                {!addressLoading && (
                    <Card className="bg-white shadow-lg border border-gray-100 rounded-xl w-full overflow-hidden">
                        {/* Address Section */}
                        <div className="">
                            <div className="bg-white shadow-sm p-5 border border-gray-100 rounded-2xl">
                                <div className="mb-4 font-bold text-xs md:text-sm">
                                    آدرس تحویل سفارش
                                </div>

                                {isEmpty(address) && (
                                    <div className="flex flex-col justify-center items-center py-8 text-gray-400">
                                        <span className="text-xs md:text-base">هیچ آدرسی ثبت نشده است</span>
                                    </div>
                                )}

                                {!isEmpty(address) && (
                                    <div className="flex items-start gap-3">
                                        <Icon
                                            className="mt-1 text-primary text-2xl"
                                            icon="carbon:location-filled"
                                        />

                                        <div className="text-gray-700 text-xs md:text-sm leading-7">
                                            {address?.address}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end mt-4">
                                    <span
                                        onClick={handleClickAddNewAddress}
                                        className="inline-flex items-center gap-2 hover:opacity-80 font-medium text-primary text-xs md:text-sm transition-all cursor-pointer"
                                    >
                                        تغییر یا ویرایش آدرس
                                        <Icon icon="ep:arrow-left-bold" className="text-xs" />
                                    </span>
                                </div>
                            </div>

                            {/* Products Section */}
                            <div className="bg-white shadow-sm mt-6 p-5 border border-gray-100 rounded-2xl">
                                <div className="mb-4 font-bold text-xs md:text-sm">
                                    محصولات سفارش
                                </div>

                                {isEmpty(cart) && (
                                    <div className="flex flex-col justify-center items-center py-10 text-gray-400">
                                        <Icon icon="mdi:cart-outline" className="mb-2 text-7xl" />
                                        <span>محصولی برای نمایش وجود ندارد</span>
                                    </div>
                                )}

                                <div className="flex gap-4 pb-2 overflow-x-auto">
                                    {!isEmpty(cart) &&
                                        cart &&
                                        cart.map((item, index) => {
                                            const key = Object.keys(item)[0];
                                            const data = item[key][0];
                                            const len = item[key].length;

                                            return (
                                                <div
                                                    key={index}
                                                    className="group relative flex-shrink-0"
                                                >
                                                    <div className="bg-gray-50 shadow-sm group-hover:shadow-md border border-gray-100 rounded-2xl w-28 h-28 overflow-hidden transition-all">
                                                        <img
                                                            src={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + data.photos[0].src}
                                                            width={112}
                                                            height={112}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <span className="-right-2 -bottom-2 absolute flex justify-center items-center bg-primary shadow-md px-2 rounded-full min-w-7 h-7 text-white text-xs">
                                                        {len}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            {/* Shipping Time */}
                            <div className="bg-white shadow-sm mt-6 border border-gray-100 rounded-2xl">
                                <SelectShippingTime onSelectTime={handleSelectTime} />
                            </div>
                        </div>
                    </Card>
                )}

                {addressLoading && <ShippingSkeleton />}

                <ShippingPrice
                    shippingPermision={shippingTime ? true : false}
                    onCartItem={handleCartItem}
                    onClick={addProductsOrder}
                />
            </div>

            <div className="flex justify-between mt-6">
                <div className="mx-1 w-full"></div>
            </div>

            <ModalAddAddress
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onResult={handleResult}
            />

            <ModalAddress
                onChangeActiveAddress={() => getAllAddresses()}
                addresses={addresses}
                onClickAddAddress={handleClickAddAddress}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};
export default Shipping;