import { Skeleton } from "@mui/material";

export default function CartItemSkeleton() {
    return (
        <div className="bg-white shadow-sm mt-3 border rounded-xl overflow-hidden">
            <div className="flex sm:flex-row flex-col">
                {/* Image */}
                <div className="flex justify-center p-4 sm:border-l sm:w-48">
                    <Skeleton
                        variant="rounded"
                        className="!w-24 sm:!w-32 !h-24 sm:!h-32"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                    <Skeleton
                        variant="text"
                        width="60%"
                        height={35}
                    />

                    <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-2">
                            <Skeleton
                                variant="circular"
                                width={18}
                                height={18}
                            />
                            <Skeleton
                                variant="text"
                                width={180}
                                height={25}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton
                                variant="circular"
                                width={18}
                                height={18}
                            />
                            <Skeleton
                                variant="text"
                                width={150}
                                height={25}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton
                                variant="circular"
                                width={18}
                                height={18}
                            />
                            <Skeleton
                                variant="text"
                                width={120}
                                height={25}
                            />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden flex justify-between items-center mt-4 pt-4 border-t">
                        <div>
                            <Skeleton
                                variant="text"
                                width={90}
                                height={20}
                            />
                            <Skeleton
                                variant="text"
                                width={130}
                                height={35}
                            />
                        </div>

                        <Skeleton
                            variant="rounded"
                            width={110}
                            height={40}
                        />
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex flex-col justify-center items-center gap-4 p-4 border-r min-w-[220px]">
                    <div className="text-center">
                        <Skeleton
                            variant="text"
                            width={100}
                            height={20}
                        />
                        <Skeleton
                            variant="text"
                            width={140}
                            height={40}
                        />
                    </div>

                    <Skeleton
                        variant="rounded"
                        width={140}
                        height={42}
                    />
                </div>
            </div>
        </div>
    );
}