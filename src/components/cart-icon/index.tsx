

import React from 'react'
import { Icon } from '@iconify/react'
import { cookies } from "next/headers";
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { Badge } from '@mui/material';


export default function CartIcon() {
    const cookieStore = cookies();
    const carts = cookieStore.get("cart")?.value;
    const products = carts ? JSON.parse(carts || "") : [];
    const cartCount = products && !isEmpty(products) ? products.length : 0;
    return (
        <>
            <Badge badgeContent={cartCount} color="error">
                <Link href={"/cart"} >
                    <Icon icon="uil:cart" className=" cursor-pointer  text-4xl" />
                </Link>
            </Badge>

        </>
    )
}
