import React, { useEffect, useRef, useState } from "react";
import FilterItem from "./filterItem";
import { isEmpty, isFunction, uniq, without } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";

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
    const filterItemsRef = useRef<Array<string>>([]);

    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const router = useRouter();

    useEffect(() => {
        init();
    }, [category]);

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

    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        const updatedItems = checked
            ? uniq([...filterItemsRef.current, value])
            : without(filterItemsRef.current, value);

        filterItemsRef.current = updatedItems;

        const ids = updatedItems.join(",");
        const currentParams = Object.fromEntries(searchParams.entries());
        const updatedParams = { ...currentParams, properties: ids };
        const queryString = new URLSearchParams(updatedParams).toString();

        router.push(`?${queryString}`);
        if (isFunction(props.onChangeFilter)) props.onChangeFilter(updatedItems);
    };

    const handleReset = () => {
        filterItemsRef.current = [];
        const params = Object.fromEntries(searchParams.entries());
        delete params.properties;
        const queryString = new URLSearchParams(params).toString();
        router.push(`?${queryString}`);
    };

    return (
        <>
            {!isEmpty(menuItems) && (
                <div className="bg-white">
                    {menuItems.map((sidebarItem) => (
                        <FilterItem
                            key={`${sidebarItem.id}-${sidebarItem.name}`}
                            id={sidebarItem.id}
                            label={sidebarItem.label}
                            name={sidebarItem.name}
                            items={sidebarItem.items}
                            onChangeCheckbox={handleChangeCheckbox}
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
