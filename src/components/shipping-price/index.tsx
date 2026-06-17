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
                <Card className="shadow-sm mb-20 md:mb-0 rounded-xl">
                    <div className="p-5">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b">
                                <span className="text-gray-600 text-sm">
                                    قیمت کالاها
                                </span>

                                <span className="font-semibold text-sm">
                                    {getToman(Number(purePrice) || 0)} تومان
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b">
                                <span className="text-gray-600 text-sm">
                                    هزینه ارسال
                                </span>

                                <span className="font-semibold text-sm">
                                    {getToman(Number(shippingPrice) || 0)} تومان
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-bold">
                                    قابل پرداخت
                                </span>

                                <span className="font-bold text-green-600 text-lg">
                                    {getToman(Number(finalPrice) || 0)} تومان
                                </span>
                            </div>
                        </div>

                        {/* Desktop Button */}
                        <div className="hidden md:block mt-6">
                            {shippingPermision ? (
                                <Button
                                    className="!rounded-lg w-full"
                                    size="large"
                                    onClick={onClick}
                                >
                                    ثبت سفارش
                                </Button>
                            ) : (
                                <Button
                                    className="!rounded-lg w-full"
                                    size="large"
                                >
                                    {inValidTextButton}
                                </Button>
                            )}
                        </div>

                        {/* Mobile Sticky Footer */}
                        <div className="md:hidden right-0 bottom-0 left-0 z-50 fixed bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 border-t">
                            <div className="flex justify-between items-center gap-4">
                                <div>
                                    <div className="text-gray-400 text-xs">
                                        مبلغ قابل پرداخت
                                    </div>

                                    <div className="font-bold text-green-600 text-sm">
                                        {getToman(Number(finalPrice) || 0)} تومان
                                    </div>
                                </div>

                                {shippingPermision ? (
                                    <Button
                                        className="flex-1 !rounded-lg"
                                        onClick={onClick}
                                    >
                                        ثبت سفارش
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1 !rounded-lg"
                                    >
                                        {inValidTextButton}
                                    </Button>
                                )}
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
