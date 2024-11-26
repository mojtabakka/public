import { Skeleton } from '@mui/material'
import React from 'react'

export default function CartBoxSkeleton() {
    return (
        <div>
            {Array(2).fill(1).map((index) =>
                <div className="mb-5">
                    <div className="mt-5" key={index}>
                        <div className="flex border rounded-lg">
                            <div className="flex flex-col justify-between py-5 px-5">

                                <Skeleton variant="rectangular" height={96} width={96} className=" rounded-lg !h-24 !w-24" />
                                <div className="  text-center">
                                    <Skeleton variant="rounded" height={30} width={96} />
                                </div>
                            </div>

                            <div className=" pt-3">
                                <div className="p-2 text-right  w-full">
                                    <Skeleton variant="text" sx={{ fontSize: '4rem' }} height={20} />

                                    {
                                        Array(6).fill(0).map(() =>
                                            <div className="py-1">
                                                <span className=" flex invisible  gap-10 items-center">
                                                    <Skeleton variant="circular" width={10} height={10} className=' mx-2' />
                                                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={50} height={15.5} ></Skeleton>
                                                </span>
                                            </div>
                                        )
                                    }
                                    <div className="py-2">
                                        <span className="pl-2 flex  gap-3 items-center">
                                            <Skeleton variant="circular" width={15} height={15} className='mx-2' />
                                            <Skeleton variant="text" sx={{ fontSize: '4rem' }} height={20} width={50} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

