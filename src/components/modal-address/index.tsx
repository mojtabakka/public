import React, { memo } from "react";
import { Icon } from "@iconify/react";
import Modal from "../modal";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { isEmpty } from "lodash";

import { Address } from "@/types/address.type";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";

interface Props {
    addresses: Address[];
    show: boolean;
    loading?: boolean;
    onSubmit?: () => void;
    onClose?: () => void;
    onClickAddAddress?: () => void;
    onChangeActiveAddress?: () => void;
}

function ModalAddress({
    addresses,
    show,
    onClose,
    onClickAddAddress,
    onChangeActiveAddress,
}: Props) {
    const hasAddresses = !isEmpty(addresses);

    const handleChangeActiveAddress = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            await fetchInstance(
                endpoints.address.changeActiveAddress.replace(
                    ":id",
                    event.target.value
                ),
                {
                    method: "PUT",
                }
            );

            onChangeActiveAddress?.();
        } catch (error) {
            console.error("Change active address failed:", error);
        }
    };

    // =========================
    // ✨ EMPTY STATE (Elegant)
    // =========================
    const EmptyState = (
        <div className="flex flex-col justify-center items-center px-6 h-[70vh] text-center">
            <div className="bg-blue-50 mb-3 p-4 rounded-full">
                <Icon
                    icon="fluent:location-add-20-filled"
                    className="text-blue-500 text-5xl"
                />
            </div>

            <div className="font-medium text-gray-600">
                هنوز آدرسی ثبت نشده
            </div>

            <div className="mt-1 text-gray-400 text-xs">
                برای ادامه، یک آدرس جدید اضافه کنید
            </div>

            <button
                type="button"
                onClick={onClickAddAddress}
                className="bg-blue-500 hover:bg-blue-600 mt-5 px-5 py-2 rounded-xl text-white text-sm transition"
            >
                افزودن آدرس جدید
            </button>
        </div>
    );

    // =========================
    // ✨ ADD ADDRESS BUTTON (Elegant Card)
    // =========================
    const AddAddressButton = (
        <button
            type="button"
            onClick={onClickAddAddress}
            className="group flex justify-center items-center gap-2 bg-blue-50/40 hover:bg-blue-50 mt-4 py-3 border border-blue-300 hover:border-blue-400 border-dashed rounded-xl w-full text-blue-600 transition-all"
        >
            <Icon
                icon="fluent:location-add-20-filled"
                className="text-xl group-hover:scale-110 transition"
            />

            <span className="font-medium text-sm">
                افزودن آدرس جدید
            </span>
        </button>
    );

    // =========================
    // ✨ CONTENT
    // =========================
    const content = (
        <div className="px-3 md:h-96 lg:h-96 overflow-y-auto">
            <FormControl className="w-full">
                <RadioGroup
                    name="address"
                    onChange={handleChangeActiveAddress}
                >
                    {hasAddresses
                        ? addresses.map((item) => (
                            <label
                                key={item.id}
                                className="flex items-start gap-3 bg-white hover:shadow-sm mt-3 p-4 border rounded-xl transition cursor-pointer"
                            >
                                {/* RADIO */}
                                <FormControlLabel
                                    value={item.id}
                                    control={
                                        <Radio checked={item.active} />
                                    }
                                    label=""
                                />

                                {/* INFO */}
                                <div className="w-full text-gray-600 text-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon
                                            icon="fluent:mail-32-regular"
                                            className="text-gray-400"
                                        />
                                        <span>{item.postalCode}</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon
                                            icon="circum:mobile-3"
                                            className="text-gray-400"
                                        />
                                        <span>{item.recivermobile}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="fa6-solid:person"
                                            className="text-gray-400"
                                        />
                                        <span>
                                            {item.receivername}{" "}
                                            {item.receiverlastname}
                                        </span>
                                    </div>
                                </div>
                            </label>
                        ))
                        : EmptyState}
                </RadioGroup>
            </FormControl>
        </div>
    );

    return (
        <Modal
            show={show}
            title="انتخاب آدرس"
            onClose={onClose}
            modalContent={content}
            sheetContent={content}
            modalFooter={hasAddresses ? AddAddressButton : null}
            sheetFooter={hasAddresses ? AddAddressButton : null}
        />
    );
}

export default memo(ModalAddress);