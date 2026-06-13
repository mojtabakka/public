import React from "react";
import PopoverListIcon from "../popover-list-icon";
import IconTitleSubtitle from "../icon-title-subtitle";
import { cookies } from "next/headers";
import { Icon } from '@iconify/react'
import CartIcon from "../cart-icon";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";
import { jwtDecode } from 'jwt-decode';
import { englishToPersianNumbers } from "@/utils/function.utils";
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
      title: <div className="font-extrabold text-lg">
        <span> {englishToPersianNumbers(userInfo.phoneNumber || '')}</span>
        <span className="font-medium text-gray-500 text-sm"> {userInfo?.fullName}</span>
      </div>,
      bgColor: "white",
      border: true,
      href: "/profile",
      icon: <Icon icon="iconamoon:profile-circle" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className="text-xl" />
    },

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
      id: 3,
      title: "خروج",
      bgColor: "white",
      // href: "/address",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className="text-xl" />
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
      {!!!token ? (
        <div
          className="flex items-center gap-2 md:p-2 lg:p-4"
        >
          <CartIcon />
          <LoginButton />
        </div>
      ) : (
        <div className="flex gap-2 lg:gap-4">
          <CartIcon />
          <PopoverListIcon
            sheetTitle={
              <IconTitleSubtitle
                icon={"healthicons:ui-user-profile"}
                title={userInfo.fullName || ''}
                subTitle={englishToPersianNumbers(userInfo.phoneNumber || '')}
              />
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
