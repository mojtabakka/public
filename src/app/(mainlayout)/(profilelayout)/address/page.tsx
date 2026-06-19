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
            console.log(error);
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
                    console.log(error);
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
        setShowAddModal(false);
    };

    return (
        <div className="bg-white mt-5 p-3 rounded">

            {!loading && (
                <div className="p-2 border rounde4">
                    <div className="mb-5">آدرس ها</div>

                    {!isEmpty(addresses) &&
                        addresses.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between mb-2 p-4 border rounded"
                            >
                                <div className="w-full">

                                    <div>{item.address}</div>

                                    <div className="mt-3">
                                        <Icon icon="mdi:city" className="inline-block text-gray-400 text-base" />
                                        <span className="px-3 text-gray-400">{item.city}</span>
                                    </div>

                                    <div className="mt-1">
                                        <Icon icon="ic:outline-email" className="inline-block text-gray-400 text-base" />
                                        <span className="px-3 text-gray-400">
                                            {item.postalCode}
                                        </span>
                                    </div>

                                    <div className="my-1">
                                        <Icon icon="proicons:person" className="inline-block text-gray-400 text-base" />
                                        <span className="mx-2 text-gray-400">---</span>
                                    </div>

                                </div>

                                <PopoverListIcon
                                    icon="ph:dots-three"
                                    items={[
                                        {
                                            id: item.id,
                                            title: "ویرایش",
                                            border: true,
                                            icon: (
                                                <Icon icon="mynaui:edit" className="text-xl" />
                                            ),
                                            key: "edit",
                                        },
                                        {
                                            id: item.id,
                                            title: "حذف",
                                            icon: (
                                                <Icon icon="mdi:bin" className="text-xl" />
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
                                                <Icon icon="mynaui:edit" className="text-xl" />
                                            ),
                                            key: "edit",
                                        },
                                        {
                                            id: item.id,
                                            title: "حذف",
                                            icon: (
                                                <Icon icon="mdi:bin" className="text-xl" />
                                            ),
                                            key: "delete",
                                        },
                                    ]}
                                    onClick={(item) =>
                                        handleClickDropDown(item, item as any)
                                    }
                                />
                            </div>
                        ))}

                    <div
                        className="bg-gray-200 p-2 border rounded font-black text-blue-400 text-center cursor-pointer"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Icon icon="mdi:location-add-outline" className="inline-block text-base" />
                        <span className="px-2">افزودن آدرس جدید</span>
                    </div>
                </div>
            )}

            {loading && <AddressSkeleton />}

            <ModalAddAddress
                address={address}
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onResult={handleResult}
            />
        </div>
    );
}