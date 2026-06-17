import { Card } from "@/components";
import { Skeleton } from "@mui/material";

export default function CartSummarySkeleton() {
    return (

        <Card className="mt-2 rounded-xl w-full md:w-1/2 lg:w-1/3">
            <div>
                <div className="space-y-4 p-4">

                    {/* row 1 */}
                    <div className="flex justify-between items-center pb-4 border-b">
                        <div className="flex items-center gap-2">
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton width={110} height={20} />
                        </div>
                        <Skeleton width={80} height={20} />
                    </div>

                    {/* row 2 */}
                    <div className="flex justify-between items-center pb-4 border-b">
                        <div className="flex items-center gap-2">
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton width={120} height={20} />
                        </div>
                        <Skeleton width={90} height={20} />
                    </div>

                    {/* row 3 */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton width={110} height={20} />
                        </div>
                        <Skeleton width={100} height={20} />
                    </div>

                    {/* button */}
                    <div className="pt-6">
                        <Skeleton variant="rounded" width="100%" height={45} />
                    </div>

                </div>
            </div>
        </Card>
    );
}