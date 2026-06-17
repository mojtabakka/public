import { Card } from "@/components";
import { Skeleton } from "@mui/material";

export default function ShippingPriceSkeleton() {
    return (
        <div className="mx-0 md:mx-2 lg:mx-2 md:w-1/2 lg:w-1/3 dw-full">
            <Card className="rounded-xl">
                <div className="rounded-xl">
                    <div className="space-y-6 p-5">

                        {/* price rows */}
                        <div className="space-y-4">

                            {/* row 1 */}
                            <div className="flex justify-between items-center pb-4 border-b">
                                <Skeleton width={120} height={20} />
                                <Skeleton width={80} height={20} />
                            </div>

                            {/* row 2 */}
                            <div className="flex justify-between items-center pb-4 border-b">
                                <Skeleton width={100} height={20} />
                                <Skeleton width={90} height={20} />
                            </div>

                            {/* row 3 */}
                            <div className="flex justify-between items-center">
                                <Skeleton width={110} height={22} />
                                <Skeleton width={100} height={28} />
                            </div>

                        </div>

                        {/* desktop button */}
                        <div className="hidden md:block mt-6">
                            <Skeleton
                                variant="rounded"
                                width="100%"
                                height={48}
                            />
                        </div>
                    </div>
                </div>

                {/* mobile sticky footer */}
                <div className="md:hidden right-0 bottom-0 left-0 z-50 fixed bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 border-t">
                    <div className="flex justify-between items-center gap-4">

                        <div className="space-y-2">
                            <Skeleton width={120} height={14} />
                            <Skeleton width={90} height={20} />
                        </div>

                        <Skeleton
                            variant="rounded"
                            width={120}
                            height={40}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}