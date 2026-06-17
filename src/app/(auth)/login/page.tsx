'use client'

import { Button, Form, Logo, TextFiled } from '@/components';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { endpoints } from '@/utils/end-points';
import { fetchInstance } from '@/utils/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../send-otp/schema';


export default function Login({
  searchParams,
}: {
  
  searchParams: { [key: string]: string | undefined };
}) {
  const router = useRouter();

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      phoneNumber: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // data.phoneNumber الان already clean هست (بدون فاصله)
      const promise = fetchInstance<{ phoneNumber: string }>(
        endpoints.auth.sendOtp,
        {
          method: 'POST',
          body: {
            phoneNumber: data.phoneNumber,
          },
        }
      );

      toast.promise(promise, {
        loading: 'لطفا منتظر بمانید',
        success: 'کد تایید به شماره همراه شما ارسال شد',
        error: (error) =>
          error.message || 'مشکلی پیش آمده لطفا بعدا امتحان کنید',
      });

      const loginData = await promise;

      toast.success('کد تایید: ' + loginData.data.otpCode, {
        duration: 5000,
        position: 'top-center',
      });

      const params = new URLSearchParams();

      if (searchParams?.back_url) {
        params.set('back_url', searchParams.back_url);
      }

      params.set('phoneNumber', data.phoneNumber);

      router.replace(`send-otp?${params.toString()}`);
    } catch (error) {
      console.log('error', error);
    }
  });

  return (
    <div className="place-items-center grid h-[90vh]">
      <div className="justify-center items-center gap-6 bg-white px-4 py-4 rounded-lg w-full md:w-1/2 lg:w-1/5">

        <Logo />

        <h1 className="mt-2 font-extrabold text-lg text-center">
          ورود | ثبت نام
        </h1>

        <Form onSubmit={onSubmit} methods={methods}>
          <div className="mt-6">
            <span className="opacity-50 text-sm leading-10">
              لطفا شماره موبایل خود را وارد نمایید
            </span>

            <TextFiled
              name="phoneNumber"
              inputMode="numeric"
              mask="9 9 9 9 9 9 9 9 9 9 9"
              className="!text-left"
            />
          </div>

          <div className="mt-10 py-4 text-center">
            <Button
              loading={isSubmitting}
              fullWidth
              variant="contained"
              type="submit"
            >
              ورود
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}