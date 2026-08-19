
import { Skeleton } from '@mui/material';
import React from 'react'

export default function AddressSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
            <div className="border border-slate-200 dark:border-gray-700 p-2 rounded-lg">
                <div className='mb-5'>
                    <Skeleton variant='text' width={50} height={15} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                </div>
                {
                    Array(2).fill(0).map((item, index) => (
                        <div key={index} className="flex justify-between border border-slate-200 dark:border-gray-700 p-4 mb-2 rounded-lg">
                            <div className="w-full">
                                <div className="w-full">
                                    <Skeleton variant='text' width={100} height={15} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                    <div className="mt-3 flex gap-6">
                                        <Skeleton variant='rounded' width={20} height={20} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                        <Skeleton variant='text' width={50} height={15} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                    </div>
                                    <div className="mt-3 flex gap-6">
                                        <Skeleton variant='rounded' width={20} height={20} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                        <Skeleton variant='text' width={50} height={15} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                    </div>
                                    <div className="mt-3 flex gap-6">
                                        <Skeleton variant='rounded' width={20} height={20} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                        <Skeleton variant='text' width={50} height={15} sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                <div className="mt-3 flex gap-6">
                    <Skeleton variant='rounded' width={20} height={30} className='!w-full' sx={{ bgcolor: { xs: '#e5e7eb', dark: '#374151' } }} />
                </div>
            </div>
        </div>
    )
}
