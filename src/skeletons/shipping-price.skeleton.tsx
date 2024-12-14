
import { Card } from '@/components'
import { Skeleton } from '@mui/material'
import React from 'react'

export default function ShippingPriceSkeleton() {
    return (
        <div className="w-full p-10 text-xs mt-4 mx-0 md:mx-2 lg:mx-2 md:mt-0 lg:mt-0 md:w-1/2 lg:w-1/3">
            <Card className='!px-10'>
                <div className="border w-full rounded-lg p-4">
                    <div className="flex justify-between my-4">
                        <Skeleton variant='text' width={70} height={15} />
                        <Skeleton variant='text' width={70} height={15} />
                    </div>
                    <hr />
                    <div className="flex justify-between my-4">
                        <Skeleton variant='text' width={70} height={15} />
                        <Skeleton variant='text' width={70} height={15} />
                    </div>
                    <hr />
                    <div className="flex justify-between my-4">
                        <Skeleton variant='text' width={70} height={15} />
                        <Skeleton variant='text' width={70} height={15} />
                    </div>
                    <div className="mt-14 lg:flex md:flex justify-center hidden">
                        <Skeleton variant='rounded' className=' w-full' height={40} />
                    </div>
                </div>
            </Card>
        </div>
    )
}
