
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
        <div className="right-0 gap-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 w-full h-full overflow-x-scroll">
            <div className="hidden sm:hidden lg:block md:inline-block">
                <div className="top-2 z-0 bg-white shadow-sm mt-5 mr-3 pb-40 rounded stickyz-0">
                    <div className="flex justify-between items-center p-3">
                        <div>
                            <div className="flex items-center p-3">
                                <div className="p-2">
                                    <Icon icon="fluent:person-circle-28-filled" className="text-gray-500 text-6xl" />
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <Link href="/profile">
                                <Icon icon="lucide:edit-2" className="text-blue-400 text-2xl cursor-pointer" />
                                <span className="text-blue-400 text-xs">ویرایش</span>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <Link href="/orders">
                        <div className="p-3 cursor-pointer">
                            <span className="p-3">
                                <Icon icon="akar-icons:shopping-bag" className="inline-block text-xl" />
                            </span>
                            <span>سفارش ها </span>
                        </div>
                    </Link>
                    <hr />
                    <Link href="/address">
                        <div className="p-3 cursor-pointer">
                            <span className="p-3">
                                <Icon icon="fa6-regular:address-card" className="inline-block text-xl" />
                            </span>
                            آدرس ها
                        </div>
                    </Link>
                    <hr />
                    <div className="p-3 cursor-pointer">
                        <span className="p-3">
                            <Icon icon="fluent:arrow-exit-20-regular" className="inline-block text-xl" />
                        </span>
                        خروج
                    </div>
                </div>
            </div>
            <div className="col-span-3 rounded">{children}</div>
        </div>
    )
}

