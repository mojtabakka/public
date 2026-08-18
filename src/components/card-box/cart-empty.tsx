import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function CartEmpty() {
    return (
        <div className="flex flex-col items-center justify-center px-6 text-center w-full max-w-xs">
            <div className="relative mb-6 w-full max-w-[260px] sm:max-w-[300px]">
                <Image
                    src="/images/empty-cart.png"
                    alt="سبد خرید خالی"
                    width={300}
                    height={300}
                    className="w-full h-auto opacity-70 dark:opacity-80"
                />
                <div className="absolute -bottom-2 -right-2 text-4xl sm:text-5xl opacity-20">
                    <Icon icon="mdi:cart-outline" />
                </div>
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                سبد خرید شما خالی است
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
                همین حالا محصولات را مرور کنید.
            </p>

            <Link href="/products">
                <span className="inline-flex items-center justify-center bg-[#423CAD] hover:bg-[#423CAD]/90 text-white text-sm font-medium py-2.5 px-6 rounded-xl transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg cursor-pointer">
                    <Icon icon="mdi:shopping" className="ml-1.5 text-base" />
                    شروع خرید
                </span>
            </Link>
        </div>
    );
}