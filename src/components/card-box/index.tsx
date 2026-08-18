"use client";

import { isEmpty } from "lodash";
import Link from "next/link";
import { Icon } from "@iconify/react";

import CartBoxSkeleton from "@/skeletons/cart-box.skeleton";
import CartHeader from "./cart-header";
import CartEmpty from "./cart-empty";
import CartItem from "./cart-item";

interface Props {
    items?: Array<Record<string, any>>;
}

export default function CartBox({ items }: Props) {
    const loading = items === undefined;

    if (loading) {
        return (
            <>
                <CartHeader loading />
                <CartBoxSkeleton />
            </>
        );
    }

    const cartItems = items
        .map((item) => item[Object.keys(item)[0]]?.[0])
        .filter(Boolean);

    return (
        <div className="w-full min-h-[calc(100vh-6rem)] flex flex-col">
            <CartHeader loading={false} itemCount={cartItems.length} />

            {isEmpty(cartItems) ? (
                <div className="flex-1 flex items-center justify-center">
                    <CartEmpty />
                </div>
            ) : (
                <div className="mb-5 space-y-3">
                    {cartItems.map((item, index) => (
                        <CartItem
                            key={`${item.model}-${index}`}
                            data={item}
                        />
                    ))}
                </div>
            )}

            {!isEmpty(cartItems) && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                    <Link href="/products">
                        <span className="inline-flex items-center justify-center bg-[#423CAD] hover:bg-[#423CAD]/90 text-white text-sm font-medium py-2.5 px-6 rounded-xl transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg cursor-pointer">
                            <Icon icon="mdi:shopping" className="ml-1.5 text-base" />
                            شروع خرید
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
}
