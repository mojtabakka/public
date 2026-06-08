
import '../../globals.css'
import React, { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'


export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
};

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="  h-full  grid grid-cols-1  lg:grid-cols-4  md:grid-cols-4 gap-1   pb-40 fixed w-full  overflow-x-scroll ">
            <div className="   hidden lg:block md:inline-block sm:hidden ">
                <div className="    bg-white rounded shadow-sm   pb-40     mt-5 mr-3  top10   sticky top-2   ">
                    <div className="flex p-3 items-center justify-between">
                        <div>
                            <div className="flex p-3 items-center">
                                <div className="p-2">
                                    <Icon icon="fluent:person-circle-28-filled" className=" text-6xl text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <Link href="/profile">
                                <Icon icon="lucide:edit-2" className="text-blue-400  text-2xl cursor-pointer" />
                                <span className="text-blue-400  text-xs">ویرایش</span>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <Link href="/orders">
                        <div className="p-3 cursor-pointer">
                            <span className="p-3">
                                <Icon icon="akar-icons:shopping-bag" className=" inline-block text-xl" />
                            </span>
                            <span>سفارش ها </span>
                        </div>
                    </Link>
                    <hr />
                    <Link href="/address">
                        <div className="p-3 cursor-pointer">
                            <span className="p-3">
                                <Icon icon="fa6-regular:address-card" className=" inline-block text-xl" />
                            </span>
                            آدرس ها
                        </div>
                    </Link>
                    <hr />
                    <div className="p-3 cursor-pointer ">
                        <span className="p-3">
                            <Icon icon="fluent:arrow-exit-20-regular" className=" inline-block text-xl" />
                        </span>
                        خروج
                    </div>
                </div>
            </div>
            <div className="    pl-5  col-span-3 rounded">{children}</div>
        </div>
    )
}

