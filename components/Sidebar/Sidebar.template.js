import React from "react";
import { items } from "config/sibarMenu.config";
import SidebarItem from "./sidbarItems";
// import style from "./index.module.scss";
import * as MdIcons from "react-icons/md";
import { isEmptyArray } from "../../utils/function.util";

const SidebarTemplate = ({
  items,
  depth,
  depthStep,
  onOpneSidebarFromChild,
  SidebarStatus,
  onClickSidbarItem
}) => {
  return (
    <>
      <div className={` w-full `}>
        {!isEmptyArray(items) &&
          items.map((sidebarItem, index) => (
            <SidebarItem
              onOpenSidebar={onOpneSidebarFromChild}
              sidebarStatus={SidebarStatus}
              key={`${sidebarItem.name}${index}`}
              depthStep={depthStep}
              depth={depth}
              {...sidebarItem}
              onClickSidbarItem={onClickSidbarItem}
            />
          ))}
      </div>
    </>
  );
};

export { SidebarTemplate };
