"use client"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Button } from "..";
import { setSumOfCart } from "@/redux/slices/generalSlice";
import { isFunction } from "lodash";
import { englishToPersianNumbers } from "@/utils/function.utils";

interface propsType {
    model: string,
    showAddButton?: boolean,
    onNumberOfOrder?: (number: number) => void
}

export default function OrderButton(props: propsType) {
    const { showAddButton = true } = props
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false)
    const [numberOfOrder, setNumberOfOrder] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        getNumberOfProductFunc();
    }, []);
    const getNumberOfProductFunc = async () => {

        const CartId = localStorage.getItem("cartId") || ''

        if (CartId) {
            setLoading2(true)
            try {
                const response = await fetchInstance(`${endpoints.order.getCurrentCartWithProductModel.replace(":id", CartId)}?model=${props.model}`)
                setNumberOfOrder(response.data.total || 0)
                if (isFunction(props.onNumberOfOrder)) props.onNumberOfOrder(response.data.count || 0)
            } catch (error) {
                console.error('error', error)
            } finally {
                setLoading2(false)
            }
        }
    };

    const handleClickBin = async () => {
        setLoading(true)
        const CartId = localStorage.getItem('cartId')
        try {
            const response = await fetchInstance(endpoints.order.reomoveFormCart, {
                method: "POST",
                cache: "no-cache", body: {
                    model: props.model,
                    cartId: CartId ? CartId : ''
                }
            });
            setNumberOfOrder(response.data.count)
            if (isFunction(props.onNumberOfOrder)) props.onNumberOfOrder(response.data.count || 0)
            dispatch(setSumOfCart(response.data.total));

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    const handleClickPlus = async () => {
        setLoading(true);
        const CartId = localStorage.getItem('cartId')
        try {
            const response = await fetchInstance(endpoints.order.addToCart, {
                method: "POST",
                cache: "no-cache", body: {
                    model: props.model,
                    cartId: CartId ? CartId : ''
                }
            });
            if (!CartId) localStorage.setItem('cartId', response.data?.cartId ? response.data.cartId : '')
            setNumberOfOrder(+response.data.count)
            if (isFunction(props.onNumberOfOrder)) props.onNumberOfOrder(response.data.count || 0)
            dispatch(setSumOfCart(response.data.total));
        } catch (error) {
            console.error("error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {numberOfOrder > 0 && (
                <div className="inline-flex items-center bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-1.5 py-1 shadow-sm transition-all duration-200">
                    <button
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-gray-400 hover:text-[#423CAD] hover:bg-[#423CAD]/5 transition-all duration-200"
                        onClick={handleClickPlus}
                    >
                        <Icon icon="ic:baseline-plus" className="text-lg" />
                    </button>

                    <span className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white">
                        {loading ? (
                            <ThreeDots
                                height="12"
                                width="12"
                                radius="9"
                                color="#9CA3AF"
                                ariaLabel="three-dots-loading"
                                visible={loading}
                            />
                        ) : (
                            englishToPersianNumbers(numberOfOrder)
                        )}
                    </span>

                    <button
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                        onClick={handleClickBin}
                    >
                        <Icon icon="gravity-ui:trash-bin" className="text-base" />
                    </button>
                </div>
            )}
            {
                numberOfOrder === 0 && !loading2 && showAddButton && <Button variant="contained" className="!rounded-xl w-full" onClick={handleClickPlus}>افزودن به سبد خرید</Button>
            }
            {loading2 && (
                <div className="animate-pulse">
                    <div className="bg-slate-200 dark:bg-gray-600 rounded-xl h-10 w-full"></div>
                </div>
            )}

        </>
    );
}
