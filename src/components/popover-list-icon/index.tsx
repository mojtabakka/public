"use client"

import { Drawer, Popover } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { Icon } from "@iconify/react";
import { isEmpty } from "lodash";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";
import Link from "next/link";

interface PropsType {
  sheetTitle?: ReactElement;
  icon: string;
  onClick?: (item: PopoverListIconType) => void;
  items: Array<PopoverListIconType>;
  sheetItems: Array<PopoverListIconType>;
}

export default function PopoverListIcon(props: PropsType) {
  const { items, icon, sheetTitle, sheetItems, onClick } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="relative">
      <Icon
        icon={icon}
        className="cursor-pointer text-4xl"
        onClick={handleOpen}
      />

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ display: { xs: "none", md: "none", lg: "block" } }}
      >
        <div
          dir="rtl"
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded shadow-xl w-52 dark:bg-gray-700"
        >
          <ul className="text-sm text-gray-700 dark:text-gray-200 w-full">
            {!isEmpty(items) &&
              items.map((item, index) => (
                <span key={item?.id ? `${index}${item?.id}` : ""}>
                  <Link
                    href={item?.href || ""}
                    onClick={() => {
                      onClick && onClick(item);
                      handleClose();
                    }}
                    style={{
                      backgroundColor: item?.bgColor,
                      color: item?.color,
                    }}
                    className="rounded w-100 w-full"
                    key={item.id}
                  >
                    <div className="w-full" key={item.id}>
                      <a
                        href="#"
                        className="block rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-right"
                      >
                        <div className="flex items-center w-full py-4 justify-between">
                          <div className="flex items-center">
                            <span className="px-2">{item?.icon}</span>
                            <div>
                              <span> {item?.title} </span>
                              {item?.subTitle && (
                                <div className="text-right text-xs">
                                  {item?.subTitle}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="px-2"> {item?.secondIcon} </div>
                        </div>
                      </a>
                    </div>
                  </Link>
                  {item?.border && <div className="border"></div>}
                </span>
              ))}
          </ul>
        </div>
      </Popover>

      <Drawer
        open={open}
        anchor="bottom"
        onClose={handleClose}
        sx={{ display: { xs: "block", md: "block", lg: "none" } }}
      >
        <div className="p-3">
          {sheetTitle}
          {sheetItems.map((item, index) => (
            <Link
              href={item.href || ""}
              key={item.id ? `${index}${item?.id}` : index}
              className={`flex w-full mt-3 rounded cursor-pointer p-4 items-center border ${item.className}`}
              onClick={() => {
                onClick && onClick(item);
                handleClose();
              }}
            >
              <div className="rounded text-sm w-full">
                <div className="text-sm">{item.title}</div>
                <span className="text-gray-400 text-xs">{item.subTitle}</span>
              </div>
              <div>{item.icon}</div>
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
