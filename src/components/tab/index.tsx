import { TabType } from "@/types/client/tab.type";
import React, { useState, useEffect } from "react";

interface PropsType {
    items: Array<TabType>;
    onClick: (item: TabType) => void;
    defaultTab?: TabType; // Optional prop for default tab
}

export default function Tab(props: PropsType) {
    const { items, onClick, defaultTab } = props;

    // Set the initial selected tab to the defaultTab prop (if provided)
    const [selectedTab, setSelectedTab] = useState<TabType | null>(defaultTab || items[0] || null);

    const handleTabClick = (item: TabType) => {
        setSelectedTab(item); // Update the selected tab
        onClick(item); // Call the onClick handler passed in props
    };

    // Optionally, if you want to update the selectedTab when the items array changes
    useEffect(() => {
        if (items.length > 0 && !selectedTab) {
            setSelectedTab(items[0]); // Set the default tab if it's not set yet
        }
    }, [items, selectedTab]);

    return (
        <div className="font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px" role="tablist">
                {items.map((item) => (
                    <li
                        key={item.id}  // Assuming `item.id` exists
                        className={`mr-2 cursor-pointer ${selectedTab?.id === item.id
                                ? "text-blue-600 border-b-2 border-blue-300 font-bold"  // Apply blue underline and bold font on active tab
                                : "text-gray-500 border-b-2 border-transparent font-normal" // Default tab style
                            }`}
                        onClick={() => handleTabClick(item)}
                        role="tab"
                        aria-selected={selectedTab?.id === item.id ? "true" : "false"}
                    >
                        <span
                            className="inline-block p-4 rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {item.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
