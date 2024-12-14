
import { Skeleton } from '@mui/material'
import React from 'react'

export default function SelectShippingTimeSkeleton() {
    return (
        <div className="text-xs overflow-y-scroll p-2">
            {
                Array(5).fill(0).map((item, index) => (
                    <div
                        className=" flex  gap-2 bg-gray-100  mt-2 p-4 px-5 rounded" style={{ paddingRight: 50 }}
                        key={item.value + index}
                    >
                        <Skeleton variant='rounded' height={15} width={15} />
                        <Skeleton variant='text' height={15} width={50} className='' />
                    </div>
                ))}
        </div>
    )
}