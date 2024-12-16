"use client"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { isEmpty } from "lodash";
import ModalAddAddress from "@/components/Modal-add-address";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import PopoverListIcon from "@/components/popover-list-icon";
import { Address } from "@/types/address.type";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";
import AddressSkeleton from "@/skeletons/address.skeleton";

export default function Addresses() {
    const [addresses, setAddresses] = useState<Array<Address>>([]);
    const [address, setAddress] = useState<Address>();
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getAddressItems();
    }, []);

    const handleClickDropDown = async (item: PopoverListIconType, address: Address) => {
        switch (item.key) {
            case "delete":
                console.log(`${endpoints.address.address}/${item.id}`)
                await fetchInstance(`${endpoints.address.address}/${item.id}`, { method: "DELETE", cache: "no-cache" })
                getAddressItems();
                break;
            case "edit":
                setAddress(address)
                setShowAddModal(true)
                break;
        }
    };

    const getAddressItems = async () => {
        try {
            setLoading(true)
            const result = await fetchInstance(endpoints.address.address, { cache: "no-cache" });
            setAddresses(result.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    const handleResult = (result: Address) => {
        if (result) getAddressItems();
        setShowAddModal(false);
    };

    return (
        <div className=" bg-white mt-5 p-3  rounded">
            {!loading && <div className="border p-2 rounde4">
                <div className="mb-5">آدرس ها </div>
                {!isEmpty(addresses) &&
                    addresses.map((item, index) => (
                        <div key={index} className="flex justify-between border p-4 mb-2 rounded">
                            <div className="w-full">
                                <div className=" w-full">
                                    {item.address}
                                    <div className="mt-3">
                                        <Icon icon="mdi:city" className=" inline-block text-base text-gray-400" />
                                        <span className="px-3 text-gray-400">{item.city}</span>
                                    </div>
                                    <div className="mt-1">
                                        <Icon icon="ic:outline-email" className=" inline-block text-base text-gray-400 " />
                                        <span className="px-3 text-gray-400">
                                            {item.postalCode}
                                        </span>
                                    </div>
                                    <div className="my-1">
                                        <Icon icon="proicons:person" className=" inline-block text-base text-gray-400" />
                                        <span className=" mx-2 text-gray-400 "> hdlld</span>
                                    </div>
                                </div>
                            </div>
                            <div className=" relative">
                                <PopoverListIcon
                                    icon="ph:dots-three"
                                    items={[
                                        {
                                            id: item.id,
                                            title: "ویرایش ",
                                            border: true,
                                            icon: <Icon icon='mynaui:edit' className="text-xl" />,
                                            url: "/profile",
                                            key: "edit"
                                        },
                                        {
                                            id: item.id,
                                            key: "delete",
                                            title: "حذف",
                                            url: "/orders",
                                            icon: <Icon icon="mdi:bin" className="text-xl" />,
                                        },
                                    ]}

                                    onClick={(PopoverItems) => handleClickDropDown(PopoverItems, item)}
                                />
                            </div>
                        </div>
                    ))}
                <div
                    className="border rounded p-2 text-center text-blue-400 bg-gray-200 cursor-pointer font-black"
                    onClick={() => setShowAddModal(true)}
                >
                    <Icon icon="mdi:location-add-outline" className=" inline-block text-base" />
                    <span className="px-2">افزودن آدرس جدید</span>
                </div>
            </div>
            }

            {
                loading && <AddressSkeleton />
            }

            <ModalAddAddress
                address={address}
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onResult={handleResult}
            />
        </div>
    );
}
