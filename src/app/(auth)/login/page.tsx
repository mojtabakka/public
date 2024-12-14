
'use client'

import { Button, Form, Logo, TextFiled } from '@/components';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { endpoints } from '@/utils/end-points';
import { fetchInstance } from '@/utils/fetch';
export default function Login() {
  const router = useRouter()
  const defaultValues = {
    phoneNumber: ''
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
    const promise = fetchInstance<{ phoneNumber: string }>(endpoints.auth.sendOtp, { method: "POST", body: { phoneNumber: data.phoneNumber } })
    toast.promise(promise, {
      loading: "لطفا منتظر بمانید",
      success: "کد تایید به شماره همراه شما ارسال شد",
      error: (error) => error?.message[0] || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
    });
    try {
      await promise;
      router.push(`send-otp?phoneNumber=${data.phoneNumber}`)
    } catch (error) {
      console.log('error', error)
    }
  });

  return (
    <div className=" grid place-items-center h-screen  ">
      <div className="  bg-white items-center justify-center gap-6   w-1/5   rounded-lg px-4 py-4 ">
        <div className="">
          <Logo />
        </div>
        <h1 className="font-extrabold text-lg text-center mt-2">ورود | ثبت نام</h1>
        <Form onSubmit={onSubmit} methods={methods}>
          <div className=" mt-6 ">
            <span className="text-sm  opacity-50  leading-10 ">
              لطفا شماره موبایل خود را وارد نمایید
            </span>
            <TextFiled name="phoneNumber" />
          </div>
          <div className="py-4 text-center mt-10 ">
            <Button
              loading={isSubmitting}
              fullWidth
              variant='contained'

              className="  !w-full"
              type="submit"
            >
              ورود
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
