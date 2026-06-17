"use client"
import React, { useEffect } from "react";
import { Icon } from '@iconify/react'
import { useRouter } from "next/navigation";
import { Card } from "@mui/material";
import { setSumOfCart } from "@/redux/slices/generalSlice";
import { useDispatch } from "react-redux";

const FinalPayment = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSumOfCart(0));
        setTimeout(() => {
            router.replace("/");
        }, 5000);
    });
    return (
        <Card className="h-[75vh]">
            <div className="flex justify-center items-center h-full text-lg">
                <div className="w-full text-center">
                    <div className="flex justify-center">
                        <div className="flex justify-center items-center bg-green-600 p-5 border rounded-full w-32 h-32">
                            <Icon icon="carbon:checkmark-filled" className="bg-green-600 rounded-full text-white text-9xl" />
                        </div>
                    </div>
                <div className="mt-5">پردخت با موفقیت انجام شد</div>
                </div>
            </div>
        </Card>
    );
};

export default FinalPayment;
