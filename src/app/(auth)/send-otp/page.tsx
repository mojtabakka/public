'use client'
import SendOtp from '@/components/send-opt'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <Suspense>
            <SendOtp />
        </Suspense>
    )
}
