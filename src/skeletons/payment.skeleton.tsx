
import { Card } from '@/components';
import { Skeleton } from '@mui/material';
import React from 'react'

export default function PaymentSkeleton() {
    return (
        <Card className="w-full lg:mx-2 md:mx-2 mx-0">
            <div className="border w-full h-full p-3 rounded-lg  ">
                <Skeleton variant='text' height={15} width={100} />

                <div className="text-xs overflow-y-scroll  mt-10">
                    {
                        Array(2).fill(0).map((item, index) => (
                            <div
                                className=" flex  gap-6 mt-2 p-4 px-5 rounded mx-2"
                                key={item.value + index}
                            >
                                <Skeleton variant='rounded' height={15} width={15} />
                                <Skeleton variant='text' height={15} width={50} className='' />
                            </div>
                        ))}
                </div>
                <div className=" md:mt-32 lg:mt-32  mt-16 py-5 px-2 text-base">
                    <Skeleton variant='text' height={15} width={50} className='' />

                </div>
                <div className="border p-3 rounded-lg  ">

                    <div className="flex overflow-x-scroll">
                        <div className="border p-3 rounded-lg mt-5">
                            <div className="flex gap-6 overflow-x-scroll">
                                {
                                    Array(2).fill(0).map((_, index) => {
                                        return (
                                            <Skeleton variant='rounded' height={100} width={100} className=' mx-10' key={index} />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
