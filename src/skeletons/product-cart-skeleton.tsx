'use client';

import React from "react";
import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <div className="w-full h-full">
            <div className="relative flex flex-col bg-white shadow-md border border-slate-100/50 rounded-2xl h-full overflow-hidden">

                {/* Image */}
                <div className="flex justify-center items-center p-3 md:p-4 h-36 md:h-48">
                    <Skeleton variant="rounded" width={160} height={160} className="!bg-slate-200" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 gap-2 p-3 md:p-4">

                    {/* Title */}
                    <Skeleton variant="text" width="80%" height={24} className="!bg-slate-200" />

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-1.5 mt-1.5 md:mt-2">
                        <div className="flex items-center gap-1">
                            <Skeleton variant="circular" width={16} height={16} className="!bg-slate-200" />
                            <Skeleton variant="text" width={80} height={16} className="!bg-slate-200 aspect-[2]" />
                        </div>

                        <div className="flex items-center gap-1">
                            <Skeleton variant="circular" width={16} height={16} className="!bg-slate-200" />
                            <Skeleton variant="text" width={60} height={16} className="!bg-slate-200 aspect-[2]" />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mt-auto pt-2 md:pt-3">
                        <div className="flex flex-col items-end gap-0.5">
                            <Skeleton variant="text" width={90} height={20} className="!bg-slate-200 aspect-[3]" />
                            <Skeleton variant="text" width={50} height={14} className="!bg-slate-200 aspect-[3]" />
                        </div>

                        <Skeleton variant="rounded" width={32} height={20} className="!bg-slate-200" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
