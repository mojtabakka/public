import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { isEmpty, isFunction } from "lodash";
import { colors } from "@/config/sibarMenu.config";
interface propTyeps {
  onChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void,
  depth?: number,
  depthStep?: number,
  icon?: ReactNode,
  items?: Array<dataType>,
  label?: string,
  onOpenSidebar?: (item: any) => void,
  path?: string,
  sidebarStatus?: boolean,
  id?: string | number,
  name: string
}

interface dataType {
  id?: string,
  name?: string,
  label?: string,
  items?: {
    id: string,
    name: string,
    label: string,
  }
}
const FilterItem = ({
  onChangeCheckbox,
  depth = 0,
  depthStep = 10,
  icon,
  items,
  label,
  onOpenSidebar,
  sidebarStatus = false,
  id,

  ...rest
}: propTyeps) => {
  const [subNav, setSubNav] = useState(false);
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
      <div >
        <div
          {...rest}
          className={`cursor-pointer  p-1 text-xs   ${sidebarStatus ? " h-12  mx-2" : null
            }`}
        >
          <div
            style={{
              marginLeft: depth * depthStep,
              backgroundColor: colors[depth].backgroundColor,
              color: colors[depth].color,
            }}
            className={`p-1 rounded justify-between flex items-center`}
            onClick={() => {
              if (!isEmpty(items)) {
                showSubNav();
                if (isFunction(onOpenSidebar)) onOpenSidebar("");
              }
            }}
          >
            <div className="flex items-center ">
              {isEmpty(items) && (
                <input type="checkbox" className="w-5 h-6" value={id} onChange={onChangeCheckbox} />
              )}
              <span
                className={`pl-4 text-center inline-block ${sidebarStatus ? "inline-block text-base  " : "text-4xl"
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
                  if (isFunction(onOpenSidebar)) onOpenSidebar("");
                }}
              >
                <Icon icon="hugeicons:arrow-left-01"
                  width="24" height="24"
                  style={{ transition: "200ms linear" }}
                  className={`text-lg ${subNav ? "-rotate-90" : "rotate-0"
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
              <div key={index}>
                <FilterItem
                  onChangeCheckbox={onChangeCheckbox}
                  sidebarStatus={sidebarStatus}
                  key={subItem.name}
                  depth={depth + 1}
                  depthStep={depthStep}
                  id={subItem.id}
                  label={subItem.label}
                  name={subItem.name || ''}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterItem;
