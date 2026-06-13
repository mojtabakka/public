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
            className="flex items-center gap-2 px-4 border-x font-bold text-xs sm:text-sm md:text-base lg:text-base text"
            href={`/login?back_url=${encodeURIComponent(backUrl)}`}
        >
            <Icon icon="tabler:login" className="font-extrabold text-2xl" />
            <h1>
                <span className="hidden md:inline-block">ثبت نام |</span>
                ورود
            </h1>
        </Link>
    );
}
