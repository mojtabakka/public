
import { Skeleton } from '@mui/material';
import React from 'react'

export default function AddressSkeleton() {
    return (
        <div className=" bg-white   rounded">
            <div className="border p-2 rounde4">
                <div className='mb-5'>
                    <Skeleton variant='text' width={50} height={15} />
                </div>
                {
                    Array(2).fill(0).map((item, index) => (
                        <div key={index} className="flex justify-between border p-4 mb-2 rounded">
                            <div className="w-full">
                                <div className=" w-full">
                                    <Skeleton variant='text' width={100} height={15} />
                                    <div className="mt-3 flex gap-6">
                                        <Skeleton variant='rounded' width={20} height={20} />
                                        <Skeleton variant='text' width={50} height={15} />
                                    </div>
                                    <div className="mt-3 flex gap-6">
                                        <Skeleton variant='rounded' width={20} height={20} />
                                        <Skeleton variant='text' width={50} height={15} />
                                    </div>
                                    <div className="mt-3 flex gap-6">
                                        <Skeleton variant='rounded' width={20} height={20} />
                                        <Skeleton variant='text' width={50} height={15} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                <div className="mt-3 flex gap-6">
                    <Skeleton variant='rounded' width={20} height={30} className='!w-full' />
                </div>
            </div>
        </div>
    )
}
