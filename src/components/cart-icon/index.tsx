

'use client'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSumOfCart } from '@/redux/slices/generalSlice';
import { fetchInstance } from '@/utils/fetch';
import { endpoints } from '@/utils/end-points';
interface propsType {
    carts: string
}


export default function CartIcon(props: propsType) {
    const dispatch = useDispatch();
    useEffect(() => {
        getCartCount()

    }, [])

    const getCartCount = async () => {
        const cartId = localStorage.getItem("cartId") || ""
        const response = await fetchInstance(`${endpoints.order.getCurrentCartWithProductModel.replace(":id", cartId)}`)
        dispatch(setSumOfCart(response.data.total || 0));
    }

    const cartCount = useSelector((item: RootState) => item.general.sumCart);

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
