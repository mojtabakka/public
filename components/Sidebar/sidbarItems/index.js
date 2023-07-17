import React, { useEffect, useState } from "react";
import { colors } from "config/sibarMenu.config";
import * as MdIcons from "react-icons/md";
import { useRouter } from "next/router";

const SidebarItem = ({
  depth = 0,
  depthStep = 10,
  icon,
  items,
  label,
  onOpenSidebar,
  path = {},
  sidebarStatus = false,
  onClickSidbarItem,
  ...rest
}) => {
  const [subNav, setSubNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sidebarStatus === false) {
      setSubNav(false);
    }
  }, [sidebarStatus]);
  const showSubNav = () => {
    setSubNav(!subNav);
  };

  const handleClickTitle = (e) => {
    onClickSidbarItem(path);
  };
  return (
    <>
      <div onClick={handleClickTitle}>
        <div button dense {...rest} className="cursor-pointer w-full  ">
          <div
            style={{
              marginLeft: depth * depthStep,
              backgroundColor: colors[depth].backgroundColor,
              color: colors[depth].color,
            }}
            className={`p-2 rounded justify-between flex bg-red-50 w-full`}
          >
            <div>
              <span
                className={`pl-4 text-center inline-block ${
                  sidebarStatus ? "inline-block text-base  " : "text-4xl"
                } `}
                style={{ transition: "200ms linear" }}
              >
                {icon}
              </span>
              <span className="text-xs">{label}</span>
            </div>
            {Array.isArray(items) ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  showSubNav();
                  // onOpenSidebar("");
                }}
              >
                <MdIcons.MdKeyboardArrowLeft
                  style={{ transition: "200ms linear" }}
                  className={`${
                    subNav ? "-rotate-90" : "rotate-0"
                  }  transform-gpu"  ${
                    sidebarStatus ? "null" : "mt-6 "
                  } text-xl `}
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
              <div index={index}>
                <SidebarItem
                  sidebarStatus={sidebarStatus}
                  key={subItem.name}
                  depth={depth + 1}
                  depthStep={depthStep}
                  {...subItem}
                  onClickSidbarItem={onClickSidbarItem}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {/* <Loading show={true} /> */}
    </>
  );
};

export default SidebarItem;
