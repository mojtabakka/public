
'use client'
import { Button, Form, Logo, TextFiled } from '@/components'
import { fetchInstance } from '@/utils/fetch';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form';
import { isArray, isEmpty } from 'lodash';
import Cookies from 'js-cookie'
import { Product } from '@/types/product.type';
import { useDispatch } from 'react-redux';
import { setSumOfCart } from '@/redux/slices/generalSlice';
import { endpoints } from '@/utils/end-points';
import { fetchInstanceClient } from '@/utils/fetch-client';

export default function SendOtp() {
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const phoneNumber = searchParams.get("phoneNumber");
    const back_url = searchParams.get("back_url");
    const router = useRouter()
    useLayoutEffect(() => {
        if (!phoneNumber) router.replace("/login")
    })
    const defaultValues = {
        otp: ''
    };
    const methods = useForm({
        mode: 'all',
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {

        const promise = fetchInstanceClient(endpoints.auth.verification, {
            method: "POST",
            body: { otp: data.otp }
        })
        toast.promise(promise, {
            loading: "لطفا منتظر بمانید",
            error: (error) => isArray(error?.message) ? error?.message[0] : error?.message || "مشکلی پیش آمده لطفا بعدا امتحان کنید",

        });
        try {
            const result = await promise;
            if (result.data.token && phoneNumber) localStorage.setItem("phoneNumber", phoneNumber);
            changeBasket();
            localStorage.setItem("authenticated", "true");
            if (back_url)
                router.push(back_url)
            else router.push("/");
        } catch (error) {
            console.log('errrororor', error)
        }
    });


    const changeBasket = async () => {
        try {
            const mainProducts: Array<Product> = []
            const ids: Array<number | string> = [];
            const cart = await fetchInstance(endpoints.order.getCurrentBasket)
            const products = cart.data.products;
            const productsLength = !isEmpty(products) ? products.length : 0;
            const storageProducts = JSON.parse(Cookies.get("cart") || "");
            const storageProductsLengh = !isEmpty(storageProducts)
                ? storageProducts.length
                : 0;

            if (productsLength >= storageProductsLengh) {
                if (!isEmpty(products))
                    products.map((item: Product) => {
                        mainProducts.push(item);
                        if (!isEmpty(storageProducts))
                            storageProducts.map((data: Product) => {
                                const check = products.find((el: Product) => el.id == item.id);
                                if (!check) mainProducts.push(data);
                            });
                    });
            }
            if (productsLength < storageProductsLengh) {
                if (!isEmpty(storageProducts))
                    storageProducts.map((item: Product) => {
                        mainProducts.push(item);
                        if (!isEmpty(products))
                            products.map(() => {
                                const check = storageProducts.find((el: Product) => el.id == item.id);
                                if (!check) mainProducts.push(item);
                            });
                    });
            }
            if (!isEmpty(mainProducts))
                mainProducts.forEach((item: Product) => {
                    ids.push(item.id);
                });
            await fetchInstance(endpoints.order.addToCart, { method: 'POST', body: { ids } })
            Cookies.set("cart", JSON.stringify(mainProducts));

            dispatch(setSumOfCart(mainProducts.length));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        phoneNumber && <div className=" grid place-items-center h-screen  ">
            <div className="  bg-white items-center justify-center gap-6   w-1/5   rounded-lg px-4 py-4 ">
                <div className="">
                    <Logo />
                </div>
                <h1 className="font-extrabold text-lg text-center mt-2">کد تایید</h1>
                <Form onSubmit={onSubmit} methods={methods}>
                    <div className=" mt-6 ">
                        <span className="text-sm  opacity-50  leading-10 ">
                            لطفا کد تایید را وارد کنید
                        </span>
                        <TextFiled name="otp" />
                    </div>
                    <div className="py-4 text-center mt-10 ">
                        <Button
                            loading={isSubmitting}
                            fullWidth
                            variant='contained'
                            className="  !w-full"
                            type="submit"
                        >
                            تایید
                        </Button>

                    </div>
                    <div className=' text-center'>
                        <Link href="/login" className=' text-xs underline text-blue-400 text-center w-full '>اطلاح شماره همراه</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}
