"use client"
import React, { useEffect } from "react";
import { Icon } from '@iconify/react'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card } from "@mui/material";

const FinalPayment = () => {
    const router = useRouter();
    useEffect(() => {
        Cookies.remove("cart");
        setTimeout(() => {
            router.replace("/");
        }, 5000);
    });
    return (
        <Card className="h-screen">
            <div className="h-full  flex items-center  justify-center text-lg">
                <div className=" w-full text-center">
                    <div className=" flex justify-center">
                        <div className="  flex justify-center p-5 w-32 h-32 border rounded-full  items-center bg-green-600 ">
                            <Icon icon="carbon:checkmark-filled" className="   rounded-full bg-green-600 text-9xl text-white " />
                        </div>
                    </div>
                    <div className="mt-5">پرداخت با موفقیت انجام شد</div>
                </div>
            </div>
        </Card>
    );
};

export default FinalPayment;
