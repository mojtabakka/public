import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
// import { Loading } from "../Loading";
import { Address } from "@/types/address.type";
import { isEmpty, isFunction } from "lodash";
import Modal from "../modal";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";

interface propsType {
    show: boolean
    onSubmit?: () => void
    loading?: boolean
    onClose?: () => void,
    onChangeRadio?: () => void,
    onClickAddAddress?: () => void
}
function ModalAddressTemplate(props: propsType) {
    const [addresses, setAddresses] = useState<Array<Address>>([]);
    const {
        onClose,
        show,
        onSubmit,
        onClickAddAddress } = props

    useEffect(() => { getAllAddresses() }, [])

    const getAllAddresses = async () => {
        const myAddresses = await fetchInstance(endpoints.address.addAddress, { cache: "no-cache" });
        setAddresses(myAddresses.data);
    };

    const content = (
        <div className="lg:h-96 md:h-96 overflow-scroll">
            {!isEmpty(addresses) && addresses ? (
                addresses.map((item, index) => {
                    return (
                        <div
                            className="border mt-2  rounded-lg p-3 flex items-center bg-white "
                            key={index}
                        >
                            <div className="mx-5">
                                <FormControl>

                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value={item.id} control={<Radio checked={item.active} />} label="" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>

                                <div className="my-4">
                                    <Icon icon="fluent:mail-32-regular" className=" inline-block text-base" />
                                    <span className=" mx-2 text-gray-400 ">

                                        {item.postalCode}
                                    </span>
                                </div>

                                <div className="my-4">
                                    <Icon icon="circum:mobile-3" className=" inline-block text-base" />
                                    <span className=" mx-2 text-gray-400 ">
                                        {item.recivermobile}
                                    </span>
                                </div>

                                <div className="my-4">
                                    <Icon icon="fa6-solid:person" className=" inline-block text-base" />
                                    <span className=" mx-2 text-gray-400 ">
                                        {item.receivername} {item.receiverlastname}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex items-center justify-center h-full">
                    <span onClick={onClickAddAddress} className=" cursor-pointer">
                        <div className="text-center flex justify-center">
                            <Icon icon="fluent:location-add-20-filled" className="  text-5xl text-blue-400" />
                        </div>
                        <div className="px-2 text-medium text-blue-400">
                            افزودن ادرس جدید
                        </div>
                    </span>
                </div>
            )}
        </div>
    );
    return (
        <>
            <form onSubmit={onSubmit}>
                <Modal
                    show={show}
                    title="انتخاب آدرس"
                    onClose={() => { if (isFunction(onClose)) { onClose() } }}
                    modalContent={content}
                    modalFooter={
                        !isEmpty(addresses) && (
                            <div
                                className="text-blue-400 cursor-pointer"
                                onClick={onClickAddAddress}
                            >
                                <Icon icon="fluent:location-add-20-filled" className=" inline-block text-lg" />
                                <span className="px-2 text-medium">افزودن ادرس جدید</span>
                            </div>
                        )
                    }
                    sheetContent={content}
                    sheetFooter={
                        !isEmpty(addresses) && (
                            <div
                                className="text-blue-400 cursor-pointer"
                                onClick={onClickAddAddress}
                            >
                                <Icon icon="fluent:location-add-20-filled" className=" inline-block text-lg" />
                                <span className="px-2 text-medium">افزودن ادرس جدید</span>
                            </div>
                        )
                    }
                ></Modal>
            </form >
            {/* <Loading show={loading} /> */}
        </>
    );
}

export default ModalAddressTemplate;
