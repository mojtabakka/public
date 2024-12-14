import { convertMiladiDateToJalaliDate } from '@/utils/function.utils';
import { isEmpty, isFunction } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import moment from '@/utils/momentJalali.util';
import { fetchInstanceClient } from '@/utils/fetch-client';
import { endpoints } from '@/utils/end-points';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface PropsType {
    onSelectTime: (item: string) => void;
}

interface daysType {
    value: string;
    dayNumber: number;
    dayName: string;
    checked: boolean;
}

export default function SelectShippingTime(props: PropsType) {
    const { onSelectTime } = props;
    const [days, setDays] = useState<Array<daysType>>([]);

    const currentOrder = async () => {
        try {
            const currentOrder = await fetchInstanceClient(endpoints.order.getCurrentOrder, { cache: "no-cache" });
            return currentOrder?.data?.shippingTime || null;
        } catch (error) {
            console.error('Error fetching current order:', error);
            return null;
        }
    };

    // Helper function to handle adding days
    const generateDays = (today: moment.Moment, shippingTime: string | null) => {
        const myDays: Array<daysType> = [];

        today.add(2, "day"); // Add 2 days initially
        myDays.push(createDay(today, shippingTime));

        // Add the next few days, skipping Fridays
        [1, 1, 1, 1].forEach(() => {
            today.add(1, "day");
            if (today.format("ddddd") !== "جمعه") { // Skip Fridays
                myDays.push(createDay(today, shippingTime));
            }
        });

        return myDays;
    };

    // Helper function to create a day object
    const createDay = (day: moment.Moment, shippingTime: string | null) => {
        return {
            value: day.format("jYYYY/jM/jD"),
            dayNumber: day.jDate(),
            dayName: day.format("dddd jD jMMMM"),
            checked: day.format("jYYYY/jM/jD") === shippingTime,
        };
    };

    useEffect(() => {
        const today = moment(convertMiladiDateToJalaliDate(), "jYYYY/jM/jD");
        const fetchData = async () => {
            const shippingTime = await currentOrder();
            const myDays = generateDays(today, shippingTime);
            setDays(myDays);
        };
        fetchData();
    }, []); // Empty dependency array to run only once when the component mounts

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const today = moment(convertMiladiDateToJalaliDate(), "jYYYY/jM/jD");
        const myDays = generateDays(today, selectedDate);

        setDays(myDays);
        if (isFunction(onSelectTime)) onSelectTime(selectedDate);
    };

    return (
        <div className="text-xs overflow-y-scroll">
            {!isEmpty(days) &&
                days.map((item, index) => (
                    <span
                        className="px-5 flex bsg-gray-100 mx-2 my-2 rounded items-center bg-gray-100"
                        key={item.value + index}
                    >
                        <div className="mt-2">
                            <FormControl>
                                <RadioGroup name="day" onChange={handleChange}>
                                    <FormControlLabel
                                        value={item?.value}
                                        control={<Radio checked={item.checked} />}
                                        label=""
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="px-2 "> {item?.dayName} </div>
                    </span>
                ))}
        </div>
    );
}
