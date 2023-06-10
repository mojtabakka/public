import React, { useEffect } from "react";
import { Input } from "../Input";
import { isEmptyArray } from "../../utils/function.util";

function SelectShippingTimeTemplate({ days, onChange }) {
  return (
    <div className="flex text-xs ">
      {!isEmptyArray(days) &&
        days.map((item, index) => {
          return (
            <div className="px-5 flex items-center" key={item.value + index}>
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
            </div>
          );
        })}
    </div>
  );
}

export default SelectShippingTimeTemplate;
