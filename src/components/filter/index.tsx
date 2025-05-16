import React, { useEffect, useState } from "react";
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
    const [filterItems, setFilterItems] = useState<Array<string>>([]);
    const [menuItems, setMenuItems] = useState<Array<DataType>>([]);
    const [sidebarStatus, setSidebarStatus] = useState(true);

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
            const menuItems = propertyTitles.map((item) => ({
                id: item.id,
                name: item.property,
                label: item.title,
                items: item.properties?.map((el) => ({
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

    const handleChangeCheckbox = (e) => {
        const { checked, value } = e.target;
        console.log(filterItems)
        setFilterItems((prevItems) => {
            const updatedItems = checked
                ? uniq([...prevItems, value])
                : without(prevItems, value);

            const ids = updatedItems.join(",");
            const currentParams = Object.fromEntries(searchParams.entries());
            const updatedParams = { ...currentParams, properties: ids };
            const queryString = new URLSearchParams(updatedParams).toString();

            router.push(`?${queryString}`);
            if (isFunction(props.onChangeFilter)) props.onChangeFilter(updatedItems);

            return updatedItems;
        });
    };

    const handleOpneSidebarFromChild = () => {
        if (!sidebarStatus) setSidebarStatus(true);
    };

    return (
        <>
            {!isEmpty(menuItems) && (
                <div className="overflow-hidden bg-white text-white">
                    {menuItems.map((sidebarItem) => (
                        <div key={sidebarItem.id}>
                            <FilterItem
                                onOpenSidebar={handleOpneSidebarFromChild}
                                sidebarStatus={sidebarStatus}
                                id={sidebarItem.id}
                                label={sidebarItem.label}
                                items={sidebarItem.items}
                                onChangeCheckbox={handleChangeCheckbox}
                                name={sidebarItem.name}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export { Filter };
