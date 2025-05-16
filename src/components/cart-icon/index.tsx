

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
import { englishToPersianNumbers } from '@/utils/function.utils';

export default function CartIcon() {
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
            <Badge badgeContent={englishToPersianNumbers(cartCount)} color="error" sx={{
                '& .MuiBadge-badge': {
                    fontSize: '0.7rem', // سایز پیش‌فرض
                    height: '20px',
                    minWidth: '20px',
                    '@media (max-width: 600px)': {
                        fontSize: '0.6rem', // سایز در حالت موبایل
                        height: '17px',
                        minWidth: '18px',
                    },
                },
            }}>
                <Link href={"/cart"} >
                    <Icon icon="uil:cart" className=" cursor-pointer  lg:text-3xl text-2xl" />
                </Link>
            </Badge>

        </>
    )
}
