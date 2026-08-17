"use client";

import { isEmpty } from "lodash";

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
        <div className="w-full">
            <CartHeader loading={false} itemCount={cartItems.length} />

            <div className="mb-5 space-y-3">
                {isEmpty(cartItems) ? (
                    <CartEmpty />
                ) : (
                    cartItems.map((item, index) => (
                        <CartItem
                            key={`${item.model}-${index}`}
                            data={item}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
