
import { convertMiladiDateToJalaliDate } from '@/utils/function.utils';
import { isEmpty, isFunction } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Moment } from 'moment-jalaali'
import moment from '@/utils/momentJalali.util'
import { fetchInstanceClient } from '@/utils/fetch-client';
import { endpoints } from '@/utils/end-points';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface PropsType {
    onSelectTime: (item: any) => void
}

interface daysType {
    value: string,
    dayNumber: number,
    dayName: string,
    checked: boolean

}

export default function SelectShippingTime(props: PropsType) {
    const { onSelectTime
    } = props

    const [days, setDays] = useState<Array<daysType>>([]);
    useEffect(() => {
        const today = convertMiladiDateToJalaliDate();
        const m = moment(today, "jYYYY/jM/jD");
        console.log(m)
        addDays(m);
    }, []);

    const currentOrder = async () => {
        try {
            const currentOrder = await fetchInstanceClient(endpoints.order.getCurrentOrder, { cache: "no-cache" });
            if (currentOrder?.data?.shippingTime)
                return currentOrder?.data?.shippingTime;
        } catch (error) {
            console.log('error'), error
        }

    };

    const addDays = async (today: Moment) => {
        const shippingTime = await currentOrder();
        shippingTime &&
            isFunction(props.onSelectTime) &&
            props.onSelectTime(shippingTime);
        let myDays: Array<daysType> = [];
        today.add(2, "day");
        myDays.push({
            value: today.format("jYYYY/jM/jD"),
            dayNumber: today.jDate(),
            dayName: today.format("dddd jD jMMMM  "),
            checked: today.format("jYYYY/jM/jD") === shippingTime ? true : false,
        });
        [1, 1, 1, 1].forEach(() => {
            today.add(1, "day");
            today.format("ddddd") !== "جمعه" &&
                myDays.push({
                    value: today.format("jYYYY/jM/jD"),
                    dayNumber: today.jDate(),
                    dayName: today.format("dddd jD jMMMM  "),
                    checked: today.format("jYYYY/jM/jD") === shippingTime ? true : false,
                });
        });
        console.log(myDays)
        setDays(myDays);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const m = convertMiladiDateToJalaliDate();
        const today = moment(m, "jYYYY/jM/jD");
        let myDays = [];
        today.add(2, "day");
        myDays.push({
            value: today.format("jYYYY/jM/jD"),
            dayNumber: today.jDate(),
            dayName: today.format("dddd jD jMMMM  "),
            checked: today.format("jYYYY/jM/jD") === e.target.value,
        });

        [1, 1, 1, 1].forEach(() => {
            today.add(1, "day");
            today.format("ddddd") !== "جمعه" &&
                myDays.push({
                    value: today.format("jYYYY/jM/jD"),
                    dayNumber: today.jDate(),
                    dayName: today.format("dddd jD jMMMM  "),
                    checked: today.format("jYYYY/jM/jD") === e.target.value,
                });
        });
        console.log(myDays)
        setDays(myDays);
        isFunction(onSelectTime) && props.onSelectTime(e.target.value);
    };
    return (
        <div className="  text-xs overflow-y-scroll ">
            {!isEmpty(days) &&
                days.map((item, index) => {
                    return (
                        <span
                            className="px-5 flex  bsg-gray-100 mx-2  my-2 rounded items-center bg-gray-100"
                            key={item.value + index}
                        >
                            <div className="mt-2">
                                <FormControl>
                                    <RadioGroup
                                        name="day"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value={item?.value} control={<Radio checked={item.checked} />} label="" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="px-2 bg-red"> {item?.dayName} </div>
                        </span>
                    );
                })}
        </div>
    );
}
