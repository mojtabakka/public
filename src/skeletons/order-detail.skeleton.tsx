
import { Card, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonText = ({ width, height }: { width: number | string, height: number }) => (
    <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={width} height={height} />
);

export default function OrderDetailSkeleton() {
    return (
        <>
            <Card className="w-full shadow-sm rounded-xl border border-slate-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-200 dark:border-gray-700">
                    <SkeletonText width={180} height={25} />
                </div>

                <div className="p-4 space-y-3">

                    {/* Order Info */}
                    <Card className="shadow-none !p-4 rounded-lg border border-slate-200 dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="space-y-3 text-xs md:text-sm">
                            <div className="py-2 flex gap-6">
                                <span className="px-1 text-gray-400 dark:text-gray-500 text-small">
                                    <SkeletonText width={70} height={25} />
                                    <SkeletonText width={100} height={25} />
                                </span>
                                <span className="px-1">
                                    <SkeletonText width={70} height={25} />
                                    <SkeletonText width={100} height={25} />
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* User Info */}
                    <Card className="shadow-none !p-4 rounded-lg border border-slate-200 dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="space-y-3 text-xs md:text-sm">
                            <div className="py-2 flex gap-6">
                                <SkeletonText width={70} height={25} />
                                <SkeletonText width={120} height={25} />
                            </div>
                            <div className="py-2 flex gap-6">
                                <SkeletonText width={70} height={25} />
                                <SkeletonText width={200} height={25} />
                            </div>
                        </div>
                    </Card>

                    {/* Price Info */}
                    <Card className="shadow-none !p-5 rounded-lg border border-slate-200 dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="space-y-3 text-xs md:text-sm">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="py-2 flex justify-between gap-6">
                                    <SkeletonText width={70} height={25} />
                                    <SkeletonText width={70} height={25} />
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <div className="mb-2 inline-block">
                                <SkeletonText width={100} height={25} />
                            </div>
                            <Skeleton variant="rounded" height={10} width="100%" />
                        </div>
                    </Card>

                    {/* Products */}
                    <div className="space-y-3 text-xs md:text-sm">
                        {[...Array(2)].map((_, index) => (
                            <Card key={index} className="shadow-none !p-4 rounded-lg border border-slate-200 dark:border-gray-700 dark:bg-gray-800/50">
                                <div className="mb-3 flex gap-6">
                                    <SkeletonText width={70} height={25} />
                                    <SkeletonText width={70} height={25} />
                                </div>
                                <div className="flex border dark:border-gray-600 rounded-lg p-4 gap-4">
                                    <div className="flex-shrink-0">
                                        <Skeleton variant="rounded" height={80} width={80} />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <SkeletonText width={150} height={25} />
                                        <SkeletonText width={70} height={25} />
                                        <SkeletonText width={70} height={25} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Card>
        </>
    );
}
