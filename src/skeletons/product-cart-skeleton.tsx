'use client';

import React from "react";
import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <div className="w-full h-full">
            <div className="relative flex flex-col bg-white shadow-sm border rounded-lg h-full overflow-hidden">

                {/* Image */}
                <div className="flex justify-center items-center p-4 border-b h-52">
                    <Skeleton variant="rounded" width={160} height={160} />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 justify-between p-4">

                    <div>
                        {/* Title */}
                        <Skeleton variant="text" width="80%" height={28} />

                        {/* Stock */}
                        <div className="mt-2">
                            <Skeleton variant="text" width={120} height={20} />
                        </div>

                        {/* Delivery */}
                        <div className="flex items-center gap-2 mt-3">
                            <Skeleton variant="circular" width={18} height={18} />
                            <Skeleton variant="text" width={140} height={18} />
                        </div>

                        {/* Warranty */}
                        <div className="flex items-center gap-2 mt-2">
                            <Skeleton variant="circular" width={18} height={18} />
                            <Skeleton variant="text" width={120} height={18} />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mt-4">
                        <Skeleton variant="rounded" width={50} height={24} />

                        <div className="text-left">
                            <Skeleton variant="text" width={90} height={26} />
                            <Skeleton variant="text" width={60} height={18} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;