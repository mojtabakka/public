import { TabType } from "@/types/client/tab.type";
import React, { useEffect, useState } from "react";

interface PropsType {
    items: Array<TabType>;
    onClick: (item: TabType) => void;
    defaultTab?: TabType;
}

export default function Tab({
    items,
    onClick,
    defaultTab,
}: PropsType) {
    const [selectedTab, setSelectedTab] = useState<TabType | null>(
        defaultTab ?? items[0] ?? null
    );

    useEffect(() => {
        if (defaultTab) {
            setSelectedTab(defaultTab);
        }
    }, [defaultTab]);

    const handleTabClick = (item: TabType) => {
        setSelectedTab(item);
        onClick(item);
    };

    return (
        <div className="border-slate-200 border-b">
            <div
                className="flex gap-6 overflow-x-auto scrollbar-none"
                role="tablist"
            >
                {items.map((item) => {
                    const isActive = selectedTab?.id === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => handleTabClick(item)}
                            className={`
                                relative shrink-0 py-4
                                text-sm md:text-base
                                transition-all duration-200
                                whitespace-nowrap
                                ${isActive
                                    ? "text-slate-900 font-semibold"
                                    : "text-slate-500 hover:text-slate-700"
                                }
                            `}
                        >
                            {item.title}

                            <span
                                className={`
                                    absolute bottom-0 left-0 h-[3px]
                                    rounded-full bg-blue-500
                                    transition-all duration-300
                                    ${isActive
                                        ? "w-full opacity-100"
                                        : "w-0 opacity-0"
                                    }
                                `}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}