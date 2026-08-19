"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { isEmpty } from "lodash";

import ModalAddAddress from "@/components/Modal-add-address";
import PopoverListIcon from "@/components/popover-list-icon";
import AddressSkeleton from "@/skeletons/address.skeleton";

import { Address } from "@/types/address.type";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";

import { getAddresses, deleteAddress } from "@/actions/address.action";
import { Button } from "@/components";

export default function Addresses() {
    const [addresses, setAddresses] = useState<Array<Address>>([]);
    const [address, setAddress] = useState<Address>();
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            setLoading(true);

            const result = await getAddresses();
            setAddresses(result.data);
        } catch (error) {
            console.error("load addresses error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickDropDown = async (
        item: PopoverListIconType,
        address: Address
    ) => {
        switch (item.key) {
            case "delete":
                try {
                    await deleteAddress(item.id);
                    loadAddresses();
                } catch (error) {
                    console.error("delete address error:", error);
                }
                break;

            case "edit":
                setAddress(address);
                setShowAddModal(true);
                break;
        }
    };

    const handleResult = (result: Address) => {
        if (result) loadAddresses();

        setAddress(undefined);
        setShowAddModal(false);
    };
    return (
        <div className="space-y-4">
            {!loading && (
                <div className="bg-white dark:bg-gray-800 shadow-sm p-4 sm:p-5 md:p-6 border border-slate-200 dark:border-gray-700 rounded-xl">
                    {/* Header */}
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 mb-6">
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                                آدرس‌های من
                            </h2>

                            <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                آدرس‌های ثبت شده برای ارسال سفارش
                            </p>
                        </div>

                        {!isEmpty(addresses) && (
                            <div className="bg-[#423CAD]/10 px-3 py-1 rounded-full w-fit font-medium text-[#423CAD] text-xs sm:text-sm">
                                {addresses.length} آدرس
                            </div>
                        )}
                    </div>

                    {!isEmpty(addresses) ? (
                        <>
                            <div className="space-y-4">
                                {addresses.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex justify-between gap-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md p-4 sm:p-5 border border-slate-200 dark:border-gray-700 dark:border-gray-700 rounded-xl transition-all"
                                    >
                                        <div className="flex flex-1 gap-3 sm:gap-4">
                                            <div className="flex justify-center items-center bg-[#423CAD]/10 rounded-full w-9 sm:w-11 h-9 sm:h-11 shrink-0">
                                                <Icon
                                                    icon="mdi:map-marker-outline"
                                                    className="text-[#423CAD] text-lg sm:text-xl md:text-2xl"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base break-words leading-6 sm:leading-7">
                                                    {item.address}
                                                </div>

                                                <div className="space-y-2 mt-3 sm:mt-4">
                                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                                        <Icon
                                                            icon="mdi:city"
                                                            className="text-sm sm:text-base"
                                                        />

                                                        <span className="mr-2">
                                                            {item.city}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                                        <Icon
                                                            icon="mdi:postage-stamp-outline"
                                                            className="text-sm sm:text-base"
                                                        />

                                                        <span className="mr-2">
                                                            {item.postalCode}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <PopoverListIcon
                                            icon="solar:menu-dots-bold"
                                            items={[
                                                {
                                                    id: item.id,
                                                    title: "ویرایش",
                                                    border: true,
                                                    icon: (
                                                        <Icon
                                                            icon="mynaui:edit"
                                                            className="text-[#423CAD] text-lg sm:text-xl"
                                                        />
                                                    ),
                                                    key: "edit",
                                                },
                                                {
                                                    id: item.id,
                                                    title: "حذف",
                                                    icon: (
                                                        <Icon
                                                            icon="mdi:bin"
                                                            className="text-red-500 text-lg sm:text-xl"
                                                        />
                                                    ),
                                                    key: "delete",
                                                },
                                            ]}
                                            sheetItems={[
                                                {
                                                    id: item.id,
                                                    title: "ویرایش",
                                                    border: true,
                                                    icon: (
                                                        <Icon
                                                            icon="mynaui:edit"
                                                            className="text-[#423CAD] text-lg sm:text-xl"
                                                        />
                                                    ),
                                                    key: "edit",
                                                },
                                                {
                                                    id: item.id,
                                                    title: "حذف",
                                                    icon: (
                                                        <Icon
                                                            icon="mdi:bin"
                                                            className="text-red-500 text-lg sm:text-xl"
                                                        />
                                                    ),
                                                    key: "delete",
                                                },
                                            ]}
                                            onClick={(dropdownItem) =>
                                                handleClickDropDown(
                                                    dropdownItem,
                                                    item
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Add New Address */}
                            <div className="mt-4 text-center">
                                <Button
                                    onClick={() => {
                                        setAddress(undefined);
                                        setShowAddModal(true);
                                    }}
                                    className="w-full sm:w-auto"
                                >
                                    <Icon
                                        icon="mdi:location-plus"
                                        className="mx-2 text-white text-lg sm:text-xl"
                                    />

                                    <span className="font-medium text-white">افزودن آدرس جدید</span>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center py-10 sm:py-14 text-center">
                            <div className="flex justify-center items-center bg-[#423CAD]/10 rounded-full w-20 sm:w-24 h-20 sm:h-24">
                                <Icon
                                    icon="mdi:map-marker-off-outline"
                                    className="text-[#423CAD] text-4xl sm:text-5xl"
                                />
                            </div>

                            <h3 className="mt-5 font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                                هنوز آدرسی ثبت نشده
                            </h3>

                            <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-6 sm:leading-7">
                                برای ثبت سفارش و دریافت سریع‌تر محصولات،
                                اولین آدرس خود را اضافه کنید.
                            </p>

                            <Button
                                onClick={() => {
                                    setAddress(undefined);
                                    setShowAddModal(true);
                                }}
                                className="mt-4"
                            >
                                <Icon
                                    icon="mdi:plus"
                                    className="mx-2 text-white text-lg sm:text-xl"
                                />

                                <span className="font-medium text-white">افزودن آدرس جدید</span>
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {loading && <AddressSkeleton />}

            <ModalAddAddress
                address={address}
                show={showAddModal}
                onClose={() => {
                    setAddress(undefined);
                    setShowAddModal(false);
                }}
                onResult={handleResult}
            />
        </div>
    );
}