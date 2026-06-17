
import { Card } from '@/components';
import { Skeleton } from '@mui/material';
import React from 'react'
import SelectShippingTimeSkeleton from './SelectShippingTime.skeleton';

export default function ShippingSkeleton() {
    return (
        <Card className="w-full">
            <div className="p-3 border rounded-lg">
                <Skeleton variant='text' width={70} height={25} />
                <div className="flex items-center mt-5 text-base">
                    <Skeleton variant='text' width={100} height={25} />
                </div>
                <span className="flex justify-end mt-5">
                    <Skeleton variant='text' width={100} height={25} />
                </span>
            </div>
            <div className="mt-5 p-3 border rounded-lg">
                <div className="flex gap-6 overflow-x-scroll">
                    {
                        Array(2).fill(0).map((_, index) => {
                            return (
                                <Skeleton variant='rounded' height={100} width={100} className='mx-10' key={index} />
                            );
                        })}
                </div>
            </div>
            <div className="mt-3 border rounded-lg">
                
                <SelectShippingTimeSkeleton />
            </div>
        </Card>
    )

}
