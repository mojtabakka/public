import { isFunction } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import Card from '../card';
import { getToman } from '@/utils/function.utils';
import Button from '../button';
import { Cart } from '@/types/cart.type';
import { fetchInstance } from '@/utils/fetch';
import { endpoints } from '@/utils/end-points';
import ShippingPriceSkeleton from '@/skeletons/shipping-price.skeleton';

interface PropsType {
    shippingPermision: boolean;
    onClick: () => void;
    inValidTextButton?: string;
    onCartItem: (item: Cart) => void;
}

const ShippingPrice: React.FC<PropsType> = ({
    shippingPermision,
    onClick,
    onCartItem,
    inValidTextButton = " انتخاب زمان سفارش"
}) => {
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [purePrice, setPurePrice] = useState<number | null>(null);
    const [shippingPrice, setShippingPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const getCart = useCallback(async () => {
        try {
            setLoading(true)
            const cart = await fetchInstance(endpoints.order.getCurrentBasket.replace(":cartId", localStorage.getItem("cartId") || ""), { cache: "no-cache" });
            const { finalPrice, shippingPrice } = cart.data;
            setPurePrice(finalPrice);
            setFinalPrice(finalPrice + shippingPrice);
            setShippingPrice(shippingPrice);
            if (isFunction(onCartItem)) onCartItem(cart.data);
            setLoading(false); // Stop loading
        } catch (error) {
            setLoading(false); // Stop loading on error
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false)
        }
    }, [onCartItem]);

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            {!loading && < div className="mx-0 md:mx-2 lg:mx-2 mt-4 md:mt-0 lg:mt-0 w-full md:w-1/2 lg:w-1/3 text-xs">
                <Card className='mb-20 md:mb-0 lg:mb-0'>
                    <div className="p-4 border rounded-lg w-full">
                        <div className="flex justify-between my-4">
                            <div>قیمت کالاها</div>
                            <div>
                                <span className="px-1">{  getToman(Number(purePrice) || 0)} </span> تومان
                            </div>
                        </div>
                        <hr />
                        <div className="flex justify-between my-4">
                            <div>هزینه ارسال</div>
                            <div>
                                <span className="px-1">{getToman(Number(shippingPrice) || 0)} </span> تومان
                            </div>
                        </div>
                        <hr />
                        <div className="flex justify-between my-4">
                            <div>قابل پرداخت</div>
                            <div>
                                <span className="px-1">{getToman(Number(finalPrice) || 0)} </span> تومان
                            </div>
                        </div>
                        <div className="hidden md:flex lg:flex justify-center mt-14">
                            {shippingPermision ? (
                                <Button variant='contained' className="w-full" onClick={onClick}>
                                    ثبت سفارش
                                </Button>
                            ) : (
                                <Button className="w-full" color="primary" variant='contained'>
                                    {inValidTextButton}
                                </Button>
                            )}
                        </div>
                        <div className="md:hidden lg:hidden right-0 bottom-0 fixed flex justify-between items-center bg-white shadow-lg p-5 border rounded-lg w-full">
                            <div>
                                {shippingPermision ? (
                                    <Button className="w-full" onClick={onClick}>
                                        ثبت سفارش
                                    </Button>
                                ) : (
                                    <Button className="w-full" color="primary">
                                        {inValidTextButton}
                                    </Button>
                                )}
                            </div>
                            <div className="text-center">
                                <div className="text-gray-400 text-xs">قیمت نهایی</div>
                                <span className="px-1 text-xs">{getToman(Number(finalPrice) || 0)} </span>
                                <span className="text-xs">تومان</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div >}
            {
                loading && <ShippingPriceSkeleton />
            }
        </>
    );
};

export default ShippingPrice;
