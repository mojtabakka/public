import { Card } from "@/components";
import { Skeleton } from "@mui/material";

export default function PaymentSkeleton() {
    return (
        <Card className="md:flex lg:flex gap-4 px-2 pt-5 rounded-xl w-full">
            {/* LEFT SIDE */}
            <div className="w-full">
                <div className="rounded-xl">
                    <div className="space-y-6 p-5">

                        {/* title */}
                        <Skeleton width={120} height={24} />

                        {/* payment methods */}
                        <div className="space-y-3">

                            <div className="flex justify-between items-center p-4 border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Skeleton variant="circular" width={24} height={24} />
                                    <Skeleton width={140} height={20} />
                                </div>
                                <Skeleton variant="circular" width={20} height={20} />
                            </div>

                            <div className="flex justify-between items-center p-4 border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Skeleton variant="circular" width={24} height={24} />
                                    <Skeleton width={140} height={20} />
                                </div>
                                <Skeleton variant="circular" width={20} height={20} />
                            </div>

                        </div>

                        {/* shipping time */}
                        <Skeleton width={200} height={20} />

                        {/* cart grid */}
                        <div className="p-3 border rounded-xl">
                            <div className="gap-3 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-center"
                                    >
                                        <Skeleton
                                            variant="rounded"
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Card>
    );
}