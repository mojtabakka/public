
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
        <div className="right-0 gap-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 w-full min-h-screen overflow-x-hidden">
            <div className="hidden sm:hidden lg:block md:inline-block p-1">
                <div className="sticky top-5 z-10 bg-white dark:bg-gray-800 shadow-sm mr-3 pb-40 rounded-xl transition-colors duration-200">
                    <div className="flex justify-between items-center p-3">
                        <div>
                            <div className="flex items-center p-3">
                                <div className="p-2">
                                    <Icon icon="fluent:person-circle-28-filled" className="text-gray-400 dark:text-gray-300 text-6xl transition-colors" />
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <Link href="/profile">
                                <Icon icon="lucide:edit-2" className="text-[#423CAD] text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                <span className="text-[#423CAD] text-xs transition-colors">ویرایش</span>
                            </Link>
                        </div>
                    </div>
                    <hr className="border-slate-200 dark:border-gray-600 transition-colors" />
                    <Link href="/orders">
                        <div className="p-3 cursor-pointer">
                            <span className="p-3">
                                <Icon icon="akar-icons:shopping-bag" className="inline-block text-xl transition-colors" />
                            </span>
                            <span className="transition-colors">سفارش ها </span>
                        </div>
                    </Link>
                    <hr className="border-slate-200 dark:border-gray-600 transition-colors" />
                    <Link href="/address">
                        <div className="p-3 cursor-pointer">
                            <span className="p-3">
                                <Icon icon="fa6-regular:address-card" className="inline-block text-xl transition-colors" />
                            </span>
                            آدرس ها
                        </div>
                    </Link>
                </div>
            </div>
            <div className="col-span-3 mt-5">{children}</div>
        </div>
    )
}

