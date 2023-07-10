import React, { useState } from "react";
import FilterItem from "./FilterItems";
import { isEmptyArray, isFunction } from "../../utils/function.util";

const FilterTemplate = ({
  depth,
  depthStep,
  onOpneSidebarFromChild,
  SidebarStatus,
  menueItems,
  className,
  ...props
}) => {
  const [filterItems, setFilterItems] = useState([]);
  const handleChangeCheckbox = (item) => {
    if (item.target.checked) {
      filterItems.push(item.target.value);
      setFilterItems(filterItems);
      isFunction(props.onChangeFilter) && props.onChangeFilter(filterItems);
    } else {
      const value = !isEmptyArray(filterItems)
        ? filterItems.filter((data) => {
            return data !== item.target.value;
          })
        : null;
      isFunction(props.onChangeFilter) && props.onChangeFilter(value);
      setFilterItems([...value]);
    }
  };
  return (
    <>
      {!isEmptyArray(menueItems) && (
        <div
          className={` ${
            SidebarStatus ? "" : ""
          }  ${className} mt-3 px-3  py-4 shadow bg-white w-1/4 rounded  `}
          // style={{ boxShadow: "-2px -2px 10px gray" }}
        >
          <div className="text-sm text-gray-400 hidden lg:block md:block">
            {" "}
            فیلتر محصولات
          </div>

          <div
            className={`

          h-screen   transition  overflow-hidden  bg-white text-white  `}
            style={{ transition: "200ms ease-in-out" }}
          >
            {!isEmptyArray(menueItems) &&
              menueItems.map((sidebarItem, index) => (
                <div key={index + sidebarItem?.id}>
                  <FilterItem
                    onOpenSidebar={onOpneSidebarFromChild}
                    sidebarStatus={SidebarStatus}
                    key={`${sidebarItem.name}${index}`}
                    depthStep={depthStep}
                    depth={depth}
                    {...sidebarItem}
                    onChangeCheckbox={handleChangeCheckbox}
                  />
                </div>
              ))}
          </div>
        </div>
      )}{" "}
    </>
  );
};

export { FilterTemplate };
