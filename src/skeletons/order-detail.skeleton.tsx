import { Card, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonText = ({ width, height }: { width: number | string, height: number }) => (
    <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={width} height={height} />
);

export default function OrderDetailSkeleton() {
    return (
        <>
            <Card className="mt-5 !p-3">
                <div className="border rounded p-2">
                    <div className="py-2 flex gap-6">
                        <span className="px-1 text-gray-400 text-small">
                            <SkeletonText width={100} height={25} />
                        </span>
                        <span className="px-1">
                            <SkeletonText width={100} height={25} />
                        </span>
                    </div>
                    <div className="py-2 flex gap-6">
                        <div>
                            <SkeletonText width={70} height={25} />
                        </div>
                        <div>
                            <SkeletonText width={25} height={25} />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="mt-2 p-3">
                <div className="border p-3 rounded">
                    <div className="py-2 flex gap-6">
                        <SkeletonText width={70} height={25} />
                        <SkeletonText width={70} height={25} />
                    </div>
                    <div className="py-2 flex gap-6">
                        <SkeletonText width={70} height={25} />
                        <SkeletonText width={200} height={25} />
                    </div>
                </div>
            </Card>

            <Card className="mt-2 p-3">
                <div className="border rounded">
                    <div className="flex justify-between p-2">
                        <div>
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="py-2 flex gap-6">
                                    <SkeletonText width={70} height={25} />
                                    <SkeletonText width={70} height={25} />
                                </div>
                            ))}
                        </div>
                        <SkeletonText width={70} height={25} />
                    </div>

                    <div className="mt-5 px-3">
                        <div className="my-2">
                            <SkeletonText width={70} height={25} />
                        </div>
                        <SkeletonText width={70} height={15} />
                    </div>

                    <div className="overflow-x-scroll my-5 rounded-lg">
                        {Array(1).fill(0).map((_, index) => (
                            <div key={index} className="flex border rounded-lg p-5 mx-2 w-full mt-2">
                                <div className="w-full">
                                    {[...Array(3)].map((_, idx) => (
                                        <div key={idx} className="mb-5 flex gap-6">
                                            <SkeletonText width={70} height={25} />
                                            <SkeletonText width={70} height={25} />
                                        </div>
                                    ))}
                                    <hr />
                                    <div className="flex items-center">
                                        <Skeleton variant="text" width={250} height={250} />
                                        <div className="p-2 text-right w-full flex flex-col gap-2">
                                            {[...Array(6)].map((_, idx) => (
                                                <SkeletonText key={idx} width={70} height={25} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </>
    );
}
