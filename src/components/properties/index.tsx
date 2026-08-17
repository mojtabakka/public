import { Property } from "@/types/property.type";
import { englishToPersianNumbers } from "@/utils/function.utils";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useState } from "react";

interface PropsType {
    properties: Array<Property>;
    className?: string;
}

const ITEMS_PER_PAGE = 5;

export default function Properties({
    properties,
    className,
}: PropsType) {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const hasMore = visibleCount < properties.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <div
            className={clsx(
                "bg-white dark:bg-gray-800 shadow-sm dark:border dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200",
                className
            )}
        >
            <div className="divide-y divide-slate-100 dark:divide-gray-700">
                {properties.slice(0, visibleCount).map((item, index) => (
                    <div
                        key={index}
                        className="gap-4 grid grid-cols-12 hover:bg-slate-50 dark:hover:bg-gray-700/50 px-5 py-4 transition-colors duration-200"
                    >
                        <div className="col-span-5 md:col-span-4 lg:col-span-3">
                            <span className="text-slate-500 dark:text-gray-400 text-sm">
                                {englishToPersianNumbers(item.title)}
                            </span>
                        </div>

                        <div className="col-span-7 md:col-span-8 lg:col-span-9">
                            <span className="font-medium text-slate-900 dark:text-white">
                                {englishToPersianNumbers(item.property)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center py-4 border-t border-slate-100 dark:border-gray-700">
                    <button
                        onClick={loadMore}
                        className="flex items-center gap-1.5 text-sm font-medium text-[#423CAD] hover:text-[#423CAD]/80 transition-colors duration-200"
                    >
                        <Icon icon="ep:arrow-down" className="text-base" />
                        مشاهده بیشتر
                    </button>
                </div>
            )}
        </div>
    );
}