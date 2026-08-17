import React, { useEffect, useMemo, useState } from "react";
import FilterItem from "./filterItem";
import { isEmpty, isFunction, uniq, without } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Icon } from "@iconify/react";

interface PropsType {
    onChangeFilter?: (item: Array<string>) => void;
}

interface DataType {
    id: string;
    name: string;
    label: string;
    items?: Array<{
        id: string;
        name: string;
        label: string;
    }>;
}

const Filter = (props: PropsType) => {
    const [menuItems, setMenuItems] = useState<Array<DataType>>([]);
    const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const router = useRouter();

    useEffect(() => {
        init();
    }, [category]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        if (params.properties) {
            const ids = params.properties.split(",").map(p => p.trim()).filter(Boolean);
            setSelectedIds(ids);
        }
    }, [searchParams]);

    const init = async () => {
        try {
            const result = await fetchInstance(`${endpoints.category.getCatergory}?id=${category}`);
            const propertyTitles = result.data?.propertyTitles || [];
            const menuItems = propertyTitles.map((item: any) => ({
                id: item.id,
                name: item.property,
                label: item.title,
                items: item.properties?.map((el: any) => ({
                    id: el.id,
                    name: el.title,
                    label: el.property,
                })) || [],
            }));
            setMenuItems(menuItems);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const labelMap = useMemo(() => {
        const map: Record<string, string> = {};
        const build = (items: Array<DataType> | undefined) => {
            if (!items) return;
            items.forEach((item) => {
                map[item.id] = item.label;
                build(item.items);
            });
        };
        build(menuItems);
        return map;
    }, [menuItems]);

    const updateUrl = (ids: Array<string>) => {
        const params = Object.fromEntries(searchParams.entries());
        if (ids.length > 0) {
            params.properties = ids.join(",");
        } else {
            delete params.properties;
        }
        const queryString = new URLSearchParams(params).toString();
        router.push(`?${queryString}`);
    };

    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const isCurrentlySelected = selectedIds.includes(value);
        const updatedIds = isCurrentlySelected
            ? without(selectedIds, value)
            : uniq([...selectedIds, value]);

        setSelectedIds(updatedIds);
        updateUrl(updatedIds);
        if (isFunction(props.onChangeFilter)) props.onChangeFilter(updatedIds);
    };

    const removeItem = (id: string) => {
        const updatedIds = without(selectedIds, id);
        setSelectedIds(updatedIds);
        updateUrl(updatedIds);
        if (isFunction(props.onChangeFilter)) props.onChangeFilter(updatedIds);
    };

    const handleReset = () => {
        setSelectedIds([]);
        updateUrl([]);
    };

    return (
        <>
            {!isEmpty(menuItems) && (
                <div className="bg-white">
                    {/* Selected Filters Chips */}
                    {selectedIds.length > 0 && (
                        <div className="p-4 border-b border-slate-100">
                            <div className="flex flex-wrap items-center gap-1.5">
                                {selectedIds.map((id) => (
                                    <span
                                        key={id}
                                        className="flex items-center gap-1 px-2.5 py-1 bg-[#423CAD]/10 text-[#423CAD] text-xs rounded-full"
                                    >
                                        <span className="truncate max-w-[120px]">{labelMap[id] || id}</span>
                                        <button
                                            onClick={() => removeItem(id)}
                                            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#423CAD]/20 transition-colors"
                                        >
                                            <Icon icon="ep:close" width="10" height="10" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {menuItems.map((sidebarItem) => (
                        <FilterItem
                            key={`${sidebarItem.id}-${sidebarItem.name}`}
                            id={sidebarItem.id}
                            label={sidebarItem.label}
                            name={sidebarItem.name}
                            items={sidebarItem.items}
                            onChangeCheckbox={handleChangeCheckbox}
                            selectedIds={selectedIds}
                        />
                    ))}

                    <div className="p-4 border-t border-slate-100">
                        <button
                            onClick={handleReset}
                            className="w-full py-2 text-sm text-slate-600 hover:text-[#423CAD] transition-colors"
                        >
                            <span className="ml-1">↺</span>
                            بازنشانی فیلترها
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export { Filter };
