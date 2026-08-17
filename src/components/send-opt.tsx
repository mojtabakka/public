
'use client'
import { Button, Form, Logo, TextFiled } from '@/components'
import { fetchInstance } from '@/utils/fetch';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form';
import { isArray } from 'lodash';
import { endpoints } from '@/utils/end-points';
import { fetchInstanceClient } from '@/utils/fetch-client';
import toast from 'react-hot-toast';

export default function SendOtp() {
    const searchParams = useSearchParams();
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
            body: { otp: data.otp.replaceAll(" ", ""), phoneNumber }
        })
        toast.promise(promise, {
            loading: "لطفا منتظر بمانید",
            error: (error) => isArray(error?.message) ? error?.message[0] : error?.message || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
        });
        try {
            const result = await promise;
            const cartId = localStorage.getItem("cartId") || "0"
            if (cartId) {
                const response = await fetchInstance(endpoints.order.addtoCartAfterLogin.replace(":id", cartId))
                localStorage.setItem("cartId", response.data.cartId)
            }

            if (result.data.token && phoneNumber) localStorage.setItem("phoneNumber", phoneNumber);
            localStorage.setItem("authenticated", "true");
            if (back_url)
                router.replace(decodeURIComponent(back_url || "/"))
            else router.replace("/");
        } catch (error) {
            console.error('verify error:', error)
        }
    });
    return (
        phoneNumber && (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-gray-800 shadow-xl border border-slate-200 dark:border-gray-700 rounded-xl p-6 w-full animate-in fade-in-0 duration-300">
                        <div className="flex justify-center">
                            <Logo />
                        </div>

                        <h1 className="mt-2 font-extrabold text-lg text-center text-gray-900 dark:text-white">
                            کد تایید
                        </h1>

                        <Form onSubmit={onSubmit} methods={methods}>
                            <div className="mt-6">
                                <span className="block opacity-60 text-sm text-gray-500 dark:text-gray-400 leading-10 text-center">
                                    لطفا کد تایید را وارد کنید
                                </span>

                                <TextFiled
                                    inputMode='numeric'
                                    name="otp"
                                    mask='9     9     9     9 '
                                    className="!text-center"
                                />
                            </div>

                            <div className="mt-10 py-4 text-center">
                                <Button
                                    loading={isSubmitting}
                                    fullWidth
                                    variant='contained'
                                    className="!rounded-xl"
                                    type="submit"
                                >
                                    تایید
                                </Button>
                            </div>

                            <div className='text-center mt-4'>
                                <Link href="/login" replace className='text-[#423CAD] text-xs hover:text-[#423CAD]/80 transition-colors underline'>
                                    اطلاح شماره همراه
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div >
        )
    );
}
