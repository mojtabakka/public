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
import { Icon } from "@iconify/react";


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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1 text-slate-600 dark:text-gray-300 hover:text-[#423CAD] transition-colors"
                    >
                        <Icon icon="ep:arrow-left" className="text-lg" />
                        <span className="text-sm">بازگشت</span>
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="text-slate-600 dark:text-gray-300 hover:text-[#423CAD] transition-colors"
                    >
                        <Icon icon="mdi:home-outline" className="text-xl" />
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xl border border-slate-200 dark:border-gray-700 rounded-xl p-6 w-full animate-in fade-in-0 duration-300">
                    <div className="flex justify-center">
                        <Logo />
                    </div>

                    <h1 className="mt-2 font-extrabold text-lg text-center text-gray-900 dark:text-white">
                        ورود | ثبت نام
                    </h1>

                    <Form onSubmit={onSubmit} methods={methods}>
                        <div className="mt-6">
                            <span className="block opacity-60 text-sm text-gray-500 dark:text-gray-400 leading-10 text-center">
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
                                className="!rounded-xl"
                            >
                                ورود
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}