'use client'
import React from "react";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { usePathname, useSearchParams } from "next/navigation";

export default function LoginButton() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const backUrl =
        pathname +
        (searchParams.toString()
            ? `?${searchParams.toString()}`
            : '');
    return (

        <Link
            className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base lg:text-base text"
            href={`/login?back_url=${encodeURIComponent(backUrl)}`}
        >

            <h1 className="text-sm">
                <span className="hidden md:inline-block px-2 border-gray-300 border-l-2 text-sm">ثبت نام </span>
                <span className="hidden md:inline-block px-2">ورود</span>
                <Icon icon="icon-park-outline:login" className="md:hidden" width="20" height="20" />

            </h1>
        </Link>
    );
}
