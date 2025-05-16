import React from "react";
import PopoverListIcon from "../popover-list-icon";
import Link from "next/link";
import IconTitleSubtitle from "../icon-title-subtitle";
import { cookies } from "next/headers";
import { Icon } from '@iconify/react'
import CartIcon from "../cart-icon";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";
import { jwtDecode } from 'jwt-decode';
import { englishToPersianNumbers } from "@/utils/function.utils";

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
      title: <div className=" text-lg font-extrabold">
        <span> {englishToPersianNumbers(userInfo.phoneNumber || '')}</span>
        <span className=" font-medium  text-sm text-gray-500"> {userInfo?.fullName}</span>
      </div>,
      bgColor: "white",
      border: true,
      href: "/profile",
      icon: <Icon icon="iconamoon:profile-circle" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },

    {
      id: 2,
      title: "سفارش ها",
      bgColor: "white",
      href: "/orders",
      icon: <Icon icon="lsicon:order-outline" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },

    {
      id: 3,
      title: "آدرس ها",
      bgColor: "white",
      href: "/address",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },
  ];

  const popoverSheetItems: Array<PopoverListIconType> = [
    {
      id: 2,
      title: "سفارش ها",
      bgColor: "white",
      href: "/orders",
      icon: <Icon icon="lsicon:order-outline" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },

    {
      id: 3,
      title: "آدرس ها",
      bgColor: "white",
      href: "/address",
      icon: <Icon icon="pepicons-pencil:map" width="30" height="30" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },
  ];
  return (
    <>
      {!!!token ? (
        <div
          className="  lg:p-4 md:p-2    flex gap-2 items-center "
        >
          <CartIcon />
          <Link
            className="  text-xs lg:text-base md:text-base  sm:text-sm text  font-bold border-x  flex  items-center gap-2 px-4 "
            href={"/login"}
          >
            <Icon icon="tabler:login" className=" text-2xl font-extrabold" />
            <h1>
              <span className=" hidden md:inline-block  ">ثبت نام |</span>
              ورود
            </h1>
          </Link>
        </div>
      ) : (
        <div className="flex lg:gap-4 gap-2 ">
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
