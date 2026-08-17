import { Skeleton } from "@mui/material";
import { Icon } from "@iconify/react";
import { englishToPersianNumbers } from "@/utils/function.utils";

interface Props {
    loading: boolean;
    itemCount?: number;
}

export default function CartHeader({ loading, itemCount }: Props) {
    if (loading) {
        return (
            <div className="p-4">
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem" }}
                    width={120}
                    height={32}
                />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-gray-700">
            <Icon
                icon="mdi:cart-outline"
                className="text-2xl text-[#423CAD]"
            />
            <h2 className="font-bold text-gray-900 dark:text-white text-lg">
                سبد خرید شما
            </h2>
            {itemCount !== undefined && itemCount > 0 && (
                <span className="flex items-center justify-center bg-[#423CAD]/10 text-[#423CAD] text-xs font-medium rounded-full w-6 h-6">
                    {englishToPersianNumbers(itemCount)}
                </span>
            )}
        </div>
    );
}