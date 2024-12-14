import React from "react";
import PopoverListIcon from "../popover-list-icon";
import Link from "next/link";
import IconTitleSubtitle from "../icon-title-subtitle";
import { cookies } from "next/headers";
import { Icon } from '@iconify/react'
import CartIcon from "../cart-icon";
import { PopoverListIconType } from "@/types/client/PopoverListIcon.type";

export default function LoginText() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const popoverItems: Array<PopoverListIconType> = [
    {
      id: 1,
      title: "09124482013",
      bgColor: "white",
      border: true,
      href: "/profile",
      icon: < Icon icon="octicon:feed-person-16" className=" text-xl inline-block" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },

    {
      id: 2,
      title: "سفارش ها",
      bgColor: "white",
      href: "/orders",
      icon: <Icon icon="lsicon:order-filled" className=" text-xl" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },

    {
      id: 3,
      title: "آدرس ها",
      bgColor: "white",
      href: "/address",
      icon: <Icon icon="fa6-solid:map-location-dot" className=" text-xl" />,
      secondIcon: <Icon icon="ep:arrow-left" className=" text-xl" />
    },
  ];
  return (
    <>
      {!!!token ? (
        <div
          className="  lg:p-4 md:p-2    flex gap-2 items-center "
        >
          <CartIcon carts={cookieStore.get("cart")?.value || ""} />
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
        <div className="flex gap-4">
          <CartIcon carts={cookieStore.get("cart")?.value || ""} />
          <PopoverListIcon
            sheetTitle={
              <IconTitleSubtitle
                icon={"healthicons:ui-user-profile"}
                title={"مجتبی کریم"}
                subTitle={"09124482013"}
              />
            }
            icon="iconamoon:profile-circle-fill"
            items={popoverItems}
          />
        </div>
      )}
    </>
  );
}
