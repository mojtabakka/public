
'use client'
import { Button, Form, Logo, TextFiled } from '@/components';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { endpoints } from '@/utils/end-points';
import { fetchInstance } from '@/utils/fetch';
// import { isArray } from 'lodash';
export default function Login({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

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
    const promise = fetchInstance<{ phoneNumber: string }>(endpoints.auth.sendOtp, { method: "POST", body: { phoneNumber: data.phoneNumber.replaceAll(" ", "") } })
    toast.promise(promise, {
      loading: "لطفا منتظر بمانید",
      success: "کد تایید به شماره همراه شما ارسال شد",
      error: (error) => error.message || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
    });
    try {
      const loginData = await promise;
      toast.success('کد تایید :' + loginData.data.otpCode, {
        duration: 5000,
        position: "top-center"
      });

      const params = new URLSearchParams();
      if (searchParams?.back_url) params.set("back_url", searchParams?.back_url);
      params.set("phoneNumber", data.phoneNumber.replaceAll(" ", ""));
      router.replace(`send-otp?${params}`)
    } catch (error) {
      console.log('error', error)
    }
  });

  return (
    <div className=" grid place-items-center h-screen  ">
      <div className="  bg-white items-center justify-center gap-6   w-full md:w-1/2  lg:w-1/5   rounded-lg px-4 py-4 ">
        <div className="">
          <Logo />
        </div>
        <h1 className="font-extrabold text-lg text-center mt-2">ورود | ثبت نام</h1>
        <Form onSubmit={onSubmit} methods={methods}>
          <div className=" mt-6 ">
            <span className="text-sm  opacity-50  leading-10 ">
              لطفا شماره موبایل خود را وارد نمایید
            </span>
            <TextFiled mask='9 9 9 9 9 9 9 9 9 9 9' name="phoneNumber" className='  !text-left' />
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
