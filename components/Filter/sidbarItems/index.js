import React, { useEffect, useState } from "react";
import { colors } from "config/sibarMenu.config";
import * as MdIcons from "react-icons/md";
import { isEmptyArray } from "../../../utils/function.util";

const SidebarItem = ({
  onChangeCheckbox,
  depth = 0,
  depthStep = 10,
  icon,
  items,
  label,
  onOpenSidebar,
  path,
  sidebarStatus = false,
  id,
  ...rest
}) => {
  const [subNav, setSubNav] = useState(false);
  const [checkBoxValues, setCheckBoxValues] = useState();
  useEffect(() => {
    if (sidebarStatus === false) {
      setSubNav(false);
    }
  }, [sidebarStatus]);
  const showSubNav = () => {
    setSubNav(!subNav);
  };

  return (
    <>
      <div href={""}>
        <div
          button
          dense
          {...rest}
          className={`cursor-pointer  p-1   ${
            sidebarStatus ? " h-12 mb-2" : null
          }`}
        >
          <div
            style={{
              marginLeft: depth * depthStep,
              backgroundColor: colors[depth].backgroundColor,
              color: colors[depth].color,
            }}
            className={`p-3 rounded justify-between flex items-center`}
            onClick={() => {
              if (!isEmptyArray(items)) {
                showSubNav();
                onOpenSidebar("");
              }
            }}
          >
            <div className="flex items-center ">
              {isEmptyArray(items) && (
                <input type="checkbox" value={id} onChange={onChangeCheckbox} />
              )}
              <span
                className={`pl-4 text-center inline-block ${
                  sidebarStatus ? "inline-block text-base  " : "text-4xl"
                } `}
                style={{ transition: "200ms linear" }}
              >
                {icon}
              </span>

              <span className={` ${sidebarStatus ? "text-base" : "text-xs"} `}>
                {label}
              </span>
            </div>
            {Array.isArray(items) ? (
              <div
                onClick={() => {
                  showSubNav();
                  onOpenSidebar("");
                }}
              >
                <MdIcons.MdKeyboardArrowLeft
                  style={{ transition: "200ms linear" }}
                  className={`text-lg ${
                    subNav ? "-rotate-90" : "rotate-0"
                  }  transform-gpu"  ${sidebarStatus ? "null" : "mt-6 "} `}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {Array.isArray(items) ? (
        <div
          style={{
            maxHeight: `${subNav ? items.length * 110 + "px" : "0px"}`,
            overflow: "hidden",
            transition: "200ms linear",
          }}
        >
          <div>
            {items.map((subItem, index) => (
              <div key={(subItem.name + subItem.id, index)}>
                <SidebarItem
                  onChangeCheckbox={onChangeCheckbox}
                  sidebarStatus={sidebarStatus}
                  key={subItem.name}
                  depth={depth + 1}
                  depthStep={depthStep}
                  {...subItem}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SidebarItem;
