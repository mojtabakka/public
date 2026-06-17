"use client";

import { convertMiladiDateToJalaliDate } from "@/utils/function.utils";
import { isFunction } from "lodash";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "@/utils/momentJalali.util";
import { endpoints } from "@/utils/end-points";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { fetchInstance } from "@/utils/fetch";

interface PropsType {
    onSelectTime: (item: string) => void;
}

interface DaysType {
    value: string;
    dayNumber: number;
    dayName: string;
}

export default function SelectShippingTime({
    onSelectTime,
}: PropsType) {
    const [days, setDays] = useState<DaysType[]>([]);
    const [selectedDate, setSelectedDate] = useState("");

    const currentOrder = async () => {
        try {
            const currentOrder = await fetchInstance(
                endpoints.order.getCurrentOrder,
                {
                    cache: "no-cache",
                }
            );

            return currentOrder?.data?.shippingTime || null;
        } catch {
            return null;
        }
    };

    const createDay = (
        day: moment.Moment
    ): DaysType => ({
        value: day.format("jYYYY/jM/jD"),
        dayNumber: day.jDate(),
        dayName: day.format("dddd jD jMMMM"),
    });

    const generateDays = () => {
        const today = moment(
            convertMiladiDateToJalaliDate(),
            "jYYYY/jM/jD"
        );

        const result: DaysType[] = [];

        today.add(2, "day");

        result.push(createDay(today.clone()));

        for (let i = 0; i < 4; i++) {
            today.add(1, "day");

            if (today.format("ddddd") !== "جمعه") {
                result.push(createDay(today.clone()));
            }
        }

        return result;
    };

    useEffect(() => {
        const fetchData = async () => {
            const shippingTime = await currentOrder();

            setDays(generateDays());

            if (shippingTime) {
                setSelectedDate(shippingTime);
            }
        };

        fetchData();
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setSelectedDate(value);

        if (isFunction(onSelectTime)) {
            onSelectTime(value);
        }
    };

    return (
        <div className="px-4 py-3">
            <h2 className="mb-4 font-bold text-sm md:text-base">
                زمان ارسال سفارش
            </h2>

            <FormControl className="w-full">
                <RadioGroup
                    value={selectedDate}
                    onChange={handleChange}
                >
                    <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                        {days.map((item) => (
                            <label
                                key={item.value}
                                className={`flex cursor-pointer items-center justify-between rounded-xl border p-2 transition-all
                  ${selectedDate === item.value
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div>
                                    <div className="font-medium text-sm">
                                        {item.dayName}
                                    </div>

                                    <div className="mt-1 text-gray-500 text-xs">
                                        ارسال در این تاریخ
                                    </div>
                                </div>

                                <FormControlLabel
                                    value={item.value}
                                    control={<Radio />}
                                    label=""
                                    className="m-0"
                                />
                            </label>
                        ))}
                    </div>
                </RadioGroup>
            </FormControl>
        </div>
    );
}