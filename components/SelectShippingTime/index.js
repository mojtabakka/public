import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { convertMiladiDateToJalaliDate, isFunction } from "utils/function.util";
import { getCurrentOrder } from "api";
import SelectShippingTimeTemplate from "./SelectShippingTime.template";

function SelectShippingTime(props) {
  const [days, setDays] = useState();
  useEffect(() => {
    const today = convertMiladiDateToJalaliDate();
    const m = moment(today, "jYYYY/jM/jD");
    addDays(m);
  }, []);

  const currentOrder = async () => {
    const currentOrder = await getCurrentOrder();
    if (currentOrder?.data?.shippingTime)
      return currentOrder?.data?.shippingTime;
  };

  const addDays = async (today) => {
    const shippingTime = await currentOrder();
    shippingTime &&
      isFunction(props.onSelectTime) &&
      props.onSelectTime(shippingTime);
    let myDays = [];
    today.add(2, "day");
    myDays.push({
      value: today.format("jYYYY/jM/jD"),
      dayNumber: today.jDate(),
      dayName: today.format("dddd"),
      checked: today.format("jYYYY/jM/jD") === shippingTime ? true : false,
    });

    [1, 1, 1, 1, 1, 1, 1].forEach(() => {
      today.add(1, "day");
      today.format("ddddd") !== "جمعه" &&
        myDays.push({
          value: today.format("jYYYY/jM/jD"),
          dayNumber: today.jDate(),
          dayName: today.format("dddd"),
          checked: today.format("jYYYY/jM/jD") === shippingTime ? true : false,
        });
    });
    setDays(myDays);
  };

  const handleChange = (e) => {
    const m = convertMiladiDateToJalaliDate();
    const today = moment(m, "jYYYY/jM/jD");
    let myDays = [];
    today.add(2, "day");
    myDays.push({
      value: today.format("jYYYY/jM/jD"),
      dayNumber: today.jDate(),
      dayName: today.format("dddd"),
      checked: today.format("jYYYY/jM/jD") === e.target.value,
    });

    [1, 1, 1, 1, 1, 1, 1].forEach(() => {
      today.add(1, "day");
      today.format("ddddd") !== "جمعه" &&
        myDays.push({
          value: today.format("jYYYY/jM/jD"),
          dayNumber: today.jDate(),
          dayName: today.format("dddd"),
          checked: today.format("jYYYY/jM/jD") === e.target.value,
        });
    });
    setDays(myDays);
    isFunction(props.onSelectTime) && props.onSelectTime(e.target.value);
  };

  return (
    <SelectShippingTimeTemplate
      {...props}
      days={days}
      onChange={handleChange}
    />
  );
}

export { SelectShippingTime };
