

'use client'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSumOfCart } from '@/redux/slices/generalSlice';
interface propsType {
    carts: string
}


export default function CartIcon(props: propsType) {
    const { carts } = props
    const dispatch = useDispatch();
    useEffect(() => {
        const products = carts ? JSON.parse(carts || "") : [];
        dispatch(setSumOfCart(products && !isEmpty(products) ? products.length : 0));
    }, [])

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
