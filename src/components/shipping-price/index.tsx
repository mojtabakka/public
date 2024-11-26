

import { isFunction } from 'lodash';
import React, { useEffect, useState } from 'react'
import Card from '../card';
import { getToman } from '@/utils/function.utils';
import Button from '../button';
import { Cart } from '@/types/cart.type';
import { fetchInstance } from '@/utils/fetch';
import { endpoints } from '@/utils/end-points';

interface propsType {
    shippingPermision: boolean,
    onClick: () => void
    inValidTextButton?: string
    onCartItem: (item: Cart) => void
}

export default function ShippingPrice(props: propsType) {
    const {
        shippingPermision,
        onClick,
        onCartItem,
        inValidTextButton = "  انتخاب زمان سفارش",
    } = props
    const [cart, setCart] = useState<Cart>();
    const [finalPrice, setFinalPrice] = useState<number>();
    const [purePrice, setPurePrice] = useState<number>();
    const [shippingPrice, setShippingPrice] = useState();
    const [price, setPrice] = useState<number>();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        let mySumFinalPrice = 0;
        try {
            const cart = await fetchInstance(endpoints.order.getCurrentBasket, { cache: "no-cache" });
            console.log(cart.data)
            setPurePrice(cart.data.finalPrice);
            setFinalPrice(cart.data.finalPrice - cart.data.shippingPrice);
            setShippingPrice(cart.data.shippingPrice);
            isFunction(props.onCartItem) && props.onCartItem(cart.data);
            setCart(cart.data);
            setPrice(mySumFinalPrice);
        } catch (error) {

            console.log('error', error)
        }

    };
    return (
        <div className="w-full text-xs   mt-4 mx-0 md:mx-2 lg:mx-2  md:mt-0 lg:mt-0  md:w-1/2 lg:w-1/3 ">
            <Card>
                <div className="border  w-full rounded-lg p-4">
                    <div className="flex justify-between my-4">
                        <div>قیمت کالاها</div>
                        <div>
                            <span className="px-1">{getToman(Number(purePrice))} </span> تومان
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between my-4">
                        <div>هزینه ارسال</div>
                        <div>
                            <span className="px-1">{getToman(Number(shippingPrice))} </span> تومان
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between my-4">
                        <div> قابل پرداخت</div>
                        <div>
                            <span className="px-1">{getToman(Number(finalPrice))} </span> تومان
                        </div>
                    </div>
                    <div className="mt-14 lg:flex md:flex justify-center hidden ">
                        {shippingPermision ? (
                            <Button variant='contained' className="w-full" onClick={onClick}>
                                ثبت سفارش
                            </Button>
                        ) : (
                            <Button className="w-ful" color="primary" variant='contained'  >
                                {inValidTextButton}
                            </Button>
                        )}
                    </div>
                    <div className="fixed border rounded-lg lg:hidden md:hidden   bottom-0 right-0 flex justify-between items-center bg-white w-full p-5 shadow-lg  ">
                        <div>
                            {shippingPermision ? (
                                <Button className="w-full" onClick={onClick}>
                                    ثبت سفارش
                                </Button>
                            ) : (
                                <Button className="w-ful" color="primary" >
                                    {inValidTextButton}
                                </Button>
                            )}
                        </div>
                        <div className=" text-center">
                            <div className="text-xs text-gray-400">قیمت نهایی</div>
                            <span className="px-1 text-xs">{getToman(Number(finalPrice))} </span>
                            <span className="text-xs">تومان</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

