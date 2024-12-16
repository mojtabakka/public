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
    const [error, setError] = useState<string | null>(null); // Error state
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
            setError("Error fetching cart"); // Handle error
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
            {!loading && < div className="w-full text-xs mt-4 mx-0 md:mx-2 lg:mx-2 md:mt-0 lg:mt-0 md:w-1/2 lg:w-1/3">
                <Card>
                    <div className="border w-full rounded-lg p-4">
                        <div className="flex justify-between my-4">
                            <div>قیمت کالاها</div>
                            <div>
                                <span className="px-1">{getToman(Number(purePrice) || 0)} </span> تومان
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
                        <div className="mt-14 lg:flex md:flex justify-center hidden">
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
                        <div className="fixed border rounded-lg lg:hidden md:hidden bottom-0 right-0 flex justify-between items-center bg-white w-full p-5 shadow-lg">
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
                                <div className="text-xs text-gray-400">قیمت نهایی</div>
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
