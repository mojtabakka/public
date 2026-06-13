import { Skeleton } from "@mui/material";

export default function SearchBoxSkeleton() {
    return (
        <div className="space-y-6 p-2">
            {/* Products Section */}
            <div>
                <Skeleton
                    variant="text"
                    width={120}
                    height={30}
                    sx={{ borderRadius: 2 }}
                />

                <div className="mt-3 space-y-2">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-3
              "
                        >
                            <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                            />

                            <div className="flex-1">
                                <Skeleton
                                    variant="text"
                                    width="70%"
                                    height={24}
                                />

                                <Skeleton
                                    variant="text"
                                    width="40%"
                                    height={18}
                                />
                            </div>

                            <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div>
                <Skeleton
                    variant="text"
                    width={100}
                    height={30}
                    sx={{ borderRadius: 2 }}
                />

                <div className="mt-3 space-y-2">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-3
              "
                        >
                            <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                            />

                            <div className="flex-1">
                                <Skeleton
                                    variant="text"
                                    width="60%"
                                    height={24}
                                />
                            </div>

                            <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}