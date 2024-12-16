
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
            body: { otp: data.otp.replaceAll(" ", ""), phoneNumber }
        })
        toast.promise(promise, {
            loading: "لطفا منتظر بمانید",
            error: (error) => isArray(error?.message) ? error?.message[0] : error?.message || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
        });
        try {
            const result = await promise;
            const cartId = localStorage.getItem("cartId") || "0"
            const response = await fetchInstance(endpoints.order.addtoCartAfterLogin.replace(":id", cartId))
            localStorage.setItem("cartId", response.data.cartId)
            if (result.data.token && phoneNumber) localStorage.setItem("phoneNumber", phoneNumber);
            localStorage.setItem("authenticated", "true");
            if (back_url)
                router.push(back_url)
            else router.push("/");
        } catch (error) {
            console.log('errrororor', error)
        }
    });
    return (
        phoneNumber && <div className=" grid place-items-center h-screen  ">
            <div className="  bg-white items-center justify-center gap-6   w-full md:w-1/2  lg:w-1/5   rounded-lg px-4 py-4 ">
                <div className="">
                    <Logo />
                </div>
                <h1 className="font-extrabold text-lg text-center mt-2">کد تایید</h1>
                <Form onSubmit={onSubmit} methods={methods}>
                    <div className=" mt-6 ">
                        <span className="text-sm  opacity-50  leading-10 ">
                            لطفا کد تایید را وارد کنید
                        </span>
                        <TextFiled name="otp" mask='9     9     9     9 ' />
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
        </div >
    )
}
