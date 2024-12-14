
import { Skeleton } from '@mui/material'
import React from 'react'

export default function SearchBoxSkeleton() {
    return (
        <div className=' flex flex-col gap-6 p-3'>
            {
                Array(3).fill(0).map((_, index) => <div key={index} className=' flex items-center gap-6'>
                    <Skeleton variant='rounded' width={30} height={30} />
                    <Skeleton variant='text' width={70} />
                </div>)
            }

        </div>
    )
}
