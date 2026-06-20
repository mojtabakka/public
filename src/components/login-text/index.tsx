import React from "react";
import PopoverListIcon from "../popover-list-icon";
import IconTitleSubtitle from "../icon-title-subtitle";
import { cookies } from "next/headers";
import { Icon } from '@iconify/react'
import CartIcon from "../cart-icon";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";
import { jwtDecode } from 'jwt-decode';
import LoginButton from "./login-button";

export default function LoginText() {
  let userInfo: {
    phoneNumber?: string
    sub?: number,
    iat?: number,
    exp?: number,
    fullName?: string
  } = {}
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (token)
    userInfo = jwtDecode(token || '')

  const popoverItems: Array<PopoverListIconType> = [
    {
      id: 1,
      title: <div className="!p-0 rounded-lg font-extrabold">
        <span> {userInfo.phoneNumber}</span>
        <span className="font-medium text-gray-500 text-sm"> {userInfo?.fullName}</span>
      </div>,
      bgColor: "white",

      href: "/profile",
      icon: <Icon icon="iconamoon:profile-circle" width="30" height="30" />,
      className: "!bg-gray-50 mx-3  rounded-xl border !p-0 !py-2 !px-1 ",
    },

    {
      id: 2,
      title: "سفارش ها",
      bgColor: "white",
      href: "/orders",
      icon: <Icon icon="lsicon:order-outline" width="30" height="30" />,
    },

    {
      id: 3,
      title: "آدرس ها",
      bgColor: "white",
      href: "/address",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
    },


    {
      id: 3,
      title: "خروج",
      bgColor: "white",
      // href: "/address",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
    },


  ];

  const popoverSheetItems: Array<PopoverListIconType> = [
    {
      id: 2,
      title: "سفارش ها",
      bgColor: "white",
      href: "/orders",
      icon: <Icon icon="lsicon:order-outline" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className="text-xl" />
    },

    {
      id: 3,
      title: "آدرس ها",
      bgColor: "white",
      href: "/address",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className="text-xl" />
    },
    {
      id: 4,
      title: "خروج",
      bgColor: "white",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className="text-xl" />
    },
  ];
  return (
    <>
      {!token ? (
        <div className="flex items-center gap-3 md:p-2 lg:p-4">
          <CartIcon />
          <LoginButton />
        </div>
      ) : (
        <div className="flex items-center gap-3 lg:gap-5">
          <CartIcon />

          <PopoverListIcon
            sheetTitle={
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <IconTitleSubtitle
                  icon={"healthicons:ui-user-profile"}
                  title={userInfo.fullName || ""}
                  subTitle={userInfo.phoneNumber || ""}
                />
              </div>
            }
            icon="iconamoon:profile-circle-fill"
            items={popoverItems}
            sheetItems={popoverSheetItems}
          />
        </div>
      )}
    </>
  );
}
