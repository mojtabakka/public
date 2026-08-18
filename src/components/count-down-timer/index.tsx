"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { englishToPersianNumbers } from "@/utils/function.utils";

interface PropsType {
    initialSeconds?: number;
    onResend?: () => void;
}

export default function CountDownTimer({
    initialSeconds = 120,
    onResend,
}: PropsType) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const isExpired = seconds <= 0;

    useEffect(() => {
        if (isExpired) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isExpired]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleResend = () => {
        setSeconds(initialSeconds);
        if (onResend) onResend();
    };

    const isUrgent = !isExpired && seconds <= 30;

    return (
        <div className="flex flex-col items-center gap-2 py-3">
            {!isExpired ? (
                <>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500 dark:text-gray-400">
                            منقضی می‌شود در
                        </span>
                        <div
                            className={`inline-flex items-center gap-0.5 px-2.5 py-1 bg-slate-50 dark:bg-gray-700/50 rounded-lg font-mono font-bold text-base transition-all duration-300 ${
                                isUrgent
                                    ? "text-red-500 animate-pulse"
                                    : "text-slate-700 dark:text-gray-300"
                            }`}
                        >
                            <span>{englishToPersianNumbers(formatTime(seconds))}</span>
                        </div>
                    </div>
                </>
            ) : (
                <button
                    onClick={handleResend}
                    className="flex items-center gap-2 text-sm font-medium text-[#423CAD] hover:text-[#423CAD]/80 hover:bg-[#423CAD]/5 rounded-xl px-4 py-2 transition-all duration-200 hover:scale-105"
                >
                    <Icon icon="mdi:refresh" className="text-base" />
                    ارسال مجدد کد تایید
                </button>
            )}
        </div>
    );
}
