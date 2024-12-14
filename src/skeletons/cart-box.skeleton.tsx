import { Skeleton } from '@mui/material';
import React from 'react';


const SkeletonText = ({ width, height, fontSize }: { width: number | string, height: number, fontSize?: string }) => (
    <Skeleton variant="text" sx={{ fontSize: fontSize || '2rem' }} width={width} height={height} />
);

const SkeletonCircular = ({ size }: { size: number }) => (
    <Skeleton variant="circular" width={size} height={size} className="mx-2" />
);

const SkeletonRectangular = ({ width, height }: { width: number, height: number }) => (
    <Skeleton variant="rectangular" width={width} height={height} className="rounded-lg" />
);

export default function CartBoxSkeleton() {
    return (
        <div>
            {Array(2).fill(1).map((_, index) => (
                <div key={index} className="mb-5">
                    <div className="mt-5">
                        <div className="flex border rounded-lg">
                            <div className="flex flex-col justify-between py-5 px-5">
                                <SkeletonRectangular width={96} height={96} />
                                <div className="text-center">
                                    <Skeleton variant="rounded" height={30} width={96} />
                                </div>
                            </div>
                            <div className="pt-3">
                                <div className="p-2 text-right w-full">
                                    <SkeletonText width={100} height={20} fontSize="4rem" />

                                    {Array(6).fill(0).map((_, idx) => (
                                        <div key={idx} className="py-1">
                                            <span className="flex invisible gap-10 items-center">
                                                <SkeletonCircular size={10} />
                                                <SkeletonText width={50} height={15.5} fontSize="2rem" />
                                            </span>
                                        </div>
                                    ))}
                                    <div className="py-2">
                                        <span className="pl-2 flex gap-3 items-center">
                                            <SkeletonCircular size={15} />
                                            <SkeletonText width={50} height={20} fontSize="4rem" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
