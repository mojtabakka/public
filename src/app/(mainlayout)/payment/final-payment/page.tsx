"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSumOfCart } from "@/redux/slices/generalSlice";

const FinalPayment = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // reset cart sum after successful payment
        dispatch(setSumOfCart(0));

        // redirect after 5 seconds
        const timer = setTimeout(() => {
            router.replace("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [dispatch, router]);

    return (
        <Card className="flex justify-center items-center h-[75vh]">
            <div className="px-4 text-center">

                {/* ICON */}
                <div className="flex justify-center mb-5">
                    <div className="flex justify-center items-center bg-green-100 p-6 rounded-full">
                        <Icon
                            icon="carbon:checkmark-filled"
                            className="text-green-600 text-7xl"
                        />
                    </div>
                </div>

                {/* TITLE */}
                <h2 className="font-semibold text-gray-800 text-lg">
                    پرداخت با موفقیت انجام شد
                </h2>

                {/* SUB TEXT */}
                <p className="mt-2 text-gray-500 text-sm">
                    تا چند ثانیه دیگر به صفحه اصلی منتقل می‌شوید...
                </p>

            </div>
        </Card>
    );
};

export default FinalPayment;