import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { isFunction } from "lodash";

interface DataType {
    id?: string,
    name?: string,
    label?: string,
    items?: Array<{
        id: string,
        name: string,
        label: string,
    }>
}
interface PropsType {
    onChangeCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    depth?: number,
    icon?: React.ReactNode,
    items?: Array<DataType>,
    label?: string,
    onOpenSidebar?: (item: any) => void,
    path?: string,
    sidebarStatus?: boolean,
    id?: string | number,
    name?: string,
    selectedIds?: Array<string>
}

const FilterItem = ({
    onChangeCheckbox,
    depth = 0,
    icon,
    items,
    label,
    onOpenSidebar,
    sidebarStatus = false,
    id,
    selectedIds = [],
    ...rest
}: PropsType) => {
    const [subNav, setSubNav] = useState(false);

    useEffect(() => {
        if (sidebarStatus === false) {
            setSubNav(false);
        }
    }, [sidebarStatus]);

    const showSubNav = () => {
        setSubNav(!subNav);
    };

    const hasChildren = Array.isArray(items) && items.length > 0;
    const paddingLeft = 16 + depth * 12;

    return (
        <>
            <div
                {...rest}
                className={`cursor-pointer py-2.5 px-3 rounded-lg text-slate-700 dark:text-gray-200 text-sm font-medium transition-all duration-200 hover:bg-[#423CAD]/5 hover:text-[#423CAD]`}
                style={{ paddingLeft: `${paddingLeft}px` }}
            >
                <div
                    className="flex items-center justify-between w-full"
                    onClick={() => {
                        if (hasChildren && isFunction(onOpenSidebar)) onOpenSidebar("");
                    }}
                >
                    <div className="flex items-center gap-2 truncate">
                        {!hasChildren && (
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 text-[#423CAD] focus:ring-[#423CAD] cursor-pointer transition-colors"
                                value={id}
                                checked={selectedIds.includes(String(id))}
                                onChange={onChangeCheckbox}
                            />
                        )}
                        {icon && (
                            <span className={`flex-shrink-0 ${depth > 0 ? "text-sm" : "text-base"}`}>
                                {icon}
                            </span>
                        )}
                        <span className={`truncate ${!hasChildren && selectedIds.includes(String(id)) ? "text-[#423CAD] font-semibold" : ""}`}>{label}</span>
                        {!hasChildren && selectedIds.includes(String(id)) && (
                            <Icon icon="ep:check" width="14" height="14" className="text-[#423CAD] flex-shrink-0" />
                        )}
                    </div>

                    {hasChildren && (
                        <div className="flex-shrink-0 pr-2 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                showSubNav();
                            }}
                            >
                            <Icon
                                icon="hugeicons:arrow-left-01"
                                width="20"
                                height="20"
                                className={`text-slate-400 dark:text-gray-500 transition-transform duration-250 ${subNav ? "rotate-[-90deg]" : "rotate-0"}`}
                            />
                        </div>
                    )}
                </div>
            </div>

            {hasChildren && (
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${subNav ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
                        >
                            <div className="border-t border-slate-200 dark:border-gray-600/30 mr-[48px]">
                        {items!.map((subItem, index) => (
                            <div key={`${subItem.name}-${index}`}>
                                <FilterItem
                                    onChangeCheckbox={onChangeCheckbox}
                                    sidebarStatus={sidebarStatus}
                                    key={subItem.name}
                                    depth={depth + 1}
                                    id={subItem.id}
                                    label={subItem.label}
                                    name={subItem.name || ''}
                                    items={subItem.items}
                                    onOpenSidebar={onOpenSidebar}
                                    selectedIds={selectedIds}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterItem;
