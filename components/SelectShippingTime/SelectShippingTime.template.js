import React, { useEffect } from "react";
import { Input } from "../Input";
import { isEmptyArray } from "../../utils/function.util";

function SelectShippingTimeTemplate({ days, onChange }) {
  return (
    <div className="  text-xs overflow-y-scroll ">
      {!isEmptyArray(days) &&
        days.map((item, index) => {
          return (
            <span
              className="px-5 flex  bsg-gray-100 mx-2  my-2 rounded items-center bg-gray-100"
              key={item.value + index}
            >
              <div className="mt-2">
                <Input
                  type="radio"
                  name="day"
                  value={item?.value}
                  onClick={onChange}
                  checked={item?.checked}
                />
              </div>
              <div className="px-2 bg-red"> {item?.dayName} </div>
            </span>
          );
        })}
    </div>
  );
}

export default SelectShippingTimeTemplate;
