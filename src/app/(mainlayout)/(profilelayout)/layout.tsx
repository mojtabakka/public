
import '../../globals.css'
import React, { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
};

interface NavItem {
    href: string;
    icon: string;
    label: string;
}

const navItems: NavItem[] = [
    { href: "/orders", icon: "akar-icons:shopping-bag", label: "سفارش ها" },
    { href: "/address", icon: "fa6-regular:address-card", label: "آدرس ها" },
];

export default function ProfileLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 w-full">

                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
                        {/* User header */}
                        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    <Icon icon="fluent:person-circle-28-filled" className="text-gray-400 dark:text-gray-300 text-5xl" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        حساب کاربری
                                    </div>
                                </div>
                            </div>
                            <Link href="/profile">
                                <div className="flex items-center gap-1 text-[#423CAD] hover:opacity-80 transition-opacity cursor-pointer">
                                    <Icon icon="lucide:edit-2" className="text-xl" />
                                    <span className="text-xs font-medium">ویرایش</span>
                                </div>
                            </Link>
                        </div>

                        {/* Nav items */}
                        <nav className="py-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <div
                                            className={`flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
                                                isActive
                                                    ? "bg-[#423CAD]/10 text-[#423CAD] font-medium"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            <span className="flex-shrink-0">
                                                <Icon icon={item.icon} className="text-xl" />
                                            </span>
                                            <span>{item.label}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main content */}
                <main className="rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-4 lg:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
