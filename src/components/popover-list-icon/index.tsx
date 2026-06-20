"use client";

import { Drawer } from "vaul";
import { Popover } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { isEmpty } from "lodash";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";
import Link from "next/link";
import { logOut } from "@/actions/auth.action";
import toast from "react-hot-toast";

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
  const [isMobile, setIsMobile] = useState(false);

  const handleOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const siteLogout = async () => {
    try {
      const promise = logOut();

      await toast.promise(promise, {
        loading: "لطفا منتظر بمانید",
        success: "خروج با موفقیت انجام شد",
        error: (error) =>
          Array.isArray(error?.message)
            ? error?.message[0]
            : error?.message || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
      });

      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.log("logout error:", error);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <div className="relative">
      {/* ICON */}
      <Icon
        icon={icon}
        className="text-3xl cursor-pointer"
        onClick={handleOpen}
      />

      {/* ================= DESKTOP → POPOVER ================= */}
      {!isMobile && (
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
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              border: "1px solid rgba(0,0,0,0.06)",
              minWidth: 220,
            },
          }}
        >
          <div dir="rtl" className="py-2">
            <ul className="text-gray-700 dark:text-gray-200 text-sm">
              {!isEmpty(items) &&
                items.map((item, index) => (
                  <li key={item?.id ? `${index}${item.id}` : index}>
                    <Link

                      href={item?.href || ""}
                      onClick={() => {
                        onClick?.(item);
                        if (item.title === "خروج") siteLogout();
                        handleClose();
                      }}
                      className={`flex justify-between items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-3 transition-colors duration-200 ${item.className}`}
                      style={{
                        color: item?.color,
                        backgroundColor: item?.bgColor,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item?.icon}</span>

                        <div className="flex flex-col">
                          <span className="font-medium">{item?.title}</span>
                          {item?.subTitle && (
                            <span className="text-gray-400 text-xs">
                              {item.subTitle}
                            </span>
                          )}
                        </div>
                      </div>

                      {item?.secondIcon && (
                        <span className="text-gray-400">{item.secondIcon}</span>
                      )}
                    </Link>

                    {item?.border && (
                      <div className="bg-gray-100 dark:bg-gray-700 mx-3 h-px" />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </Popover>
      )}

      {/* ================= MOBILE → VAUL DRAWER ================= */}
      {isMobile && (
        <Drawer.Root open={open} onOpenChange={handleClose}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" style={{ zIndex: 8000 }} />

            <Drawer.Content
              className="right-0 bottom-0 left-0 fixed bg-white dark:bg-gray-900 shadow-2xl p-4 rounded-t-2xl focus:outline-none"
              style={{ zIndex: 8001 }}
            >
              {/* handle */}
              <div className="bg-gray-300 dark:bg-gray-700 mx-auto mb-4 rounded-full w-12 h-1.5" />

              {/* title */}
              {sheetTitle && (
                <div className="mb-4 font-semibold text-gray-700 dark:text-gray-200 text-sm text-center">
                  {sheetTitle}
                </div>
              )}

              {/* items */}
              <div className="space-y-2">
                {sheetItems.map((item, index) => (
                  <Link
                    key={item.id ? `${index}${item.id}` : index}
                    href={item.href || ""}
                    onClick={() => {
                      if (item.title === "خروج") siteLogout();
                      onClick?.(item);
                      handleClose();
                    }}
                    className={`
                      flex items-center justify-between gap-3
                      p-4 rounded-xl border
                      bg-white dark:bg-gray-800
                      hover:shadow-md hover:scale-[1.01]
                      active:scale-[0.98]
                      transition-all duration-200
                      ${item.className}
                    `}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{item.title}</span>
                      {item.subTitle && (
                        <span className="text-gray-400 text-xs">
                          {item.subTitle}
                        </span>
                      )}
                    </div>

                    <span className="text-lg">{item.icon}</span>
                  </Link>
                ))}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </div>
  );
}