
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
            console.log('hello')
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
            console.log('errrororor', error)
        }
    });
    return (
        phoneNumber && <div className="place-items-center grid h-screen">
            <div className="justify-center items-center gap-6 bg-white px-4 py-4 rounded-lg w-full md:w-1/2 lg:w-1/5">
                <div className="">
                    <Logo />
                </div>
                <h1 className="mt-2 font-extrabold text-lg text-center">کد تایید</h1>
                <Form onSubmit={onSubmit} methods={methods}>
                    <div className="mt-6">
                        <span className="opacity-50 text-sm leading-10">
                            لطفا کد تایید را وارد کنید
                        </span>
                        <TextFiled inputMode='numeric' name="otp" mask='9     9     9     9 ' />
                    </div>
                    <div className="mt-10 py-4 text-center">
                        <Button
                            loading={isSubmitting}
                            fullWidth
                            variant='contained'
                            className="!w-full"
                            type="submit"
                        >
                            تایید
                        </Button>

                    </div>
                    <div className='text-center'>
                        <Link href="/login" replace className='w-full text-blue-400 text-xs text-center underline'>اطلاح شماره همراه</Link>
                    </div>
                </Form>
            </div>
        </div >
    )
}
