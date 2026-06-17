import { Skeleton } from "@mui/material";

export default function SelectShippingTimeSkeleton() {
    return (
        <div className="px-4 py-3">
            {/* title */}
            <Skeleton width={160} height={28} className="mb-4" />

            <div className="gap-3 grid grid-cols-1 md:grid-cols-2">

                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-1 border rounded-xl"
                    >
                        {/* text */}
                        <div className="space-y-2">
                            <Skeleton width={140} height={20} />
                            <Skeleton width={100} height={16} />
                        </div>

                        {/* radio */}
                        <Skeleton
                            variant="circular"
                            width={22}
                            height={22}
                        />
                    </div>
                ))}

            </div>
        </div>
    );
}