import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { isFunction } from "lodash";
import { useRouter } from "next/navigation";

interface PropsType {
    depth?: number;
    depthStep?: number,
    icon?: string,
    items?: any,
    label?: string,
    onOpenSidebar?: () => void,
    path?: {
        query?: { type: string | number } | string | object,
        pathname?: string,
    };
    sidebarStatus?: boolean,
    onClickSidbarItem?: (path: {
        query?: { type: string | number } | string | object,
        pathname?: string,
    }) => void,
}

const SidebarItem = (props: PropsType) => {
    const router = useRouter()
    const {
        depth = 0,
        depthStep = 10,
        icon,
        items,
        label,
        path = {},
        sidebarStatus = false,
        onClickSidbarItem,
        ...rest
    } = props
    const [subNav, setSubNav] = useState(false);

    useEffect(() => {
        if (sidebarStatus === false) {
            setSubNav(false);
        }
    }, [sidebarStatus]);
    const showSubNav = () => {
        setSubNav(!subNav);
    };

    const handleClickTitle = () => {
        router.push(`${path.pathname}`);
        if (isFunction(onClickSidbarItem)) onClickSidbarItem(path);
    };

    const depthPadding = depth * 12;

    return (
        <>
            <div onClick={handleClickTitle}>
                <div
                    {...rest}
                    className={`flex items-center justify-between w-full cursor-pointer py-3 pr-4 pl-6 text-slate-700 hover:bg-[#423CAD]/5 hover:text-[#423CAD] transition-all duration-200 ${
                        depth > 0 ? "text-sm" : "text-sm font-medium"
                    }`}
                    style={{ paddingLeft: `${48 + depthPadding}px` }}
                >
                    <div className="flex items-center gap-2 truncate">
                        {icon && (
                            <span className="flex-shrink-0 text-base">
                                <Icon icon={icon} />
                            </span>
                        )}
                        <span className="truncate">{label}</span>
                    </div>

                    {Array.isArray(items) && items.length > 0 && (
                        <div
                            className="flex-shrink-0 pr-2 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                showSubNav();
                            }}
                        >
                            <Icon
                                icon="ep:arrow-left"
                                className={`text-slate-400 transition-transform duration-200 ${subNav ? "rotate-[-90deg]" : "rotate-0"}`}
                            />
                        </div>
                    )}
                </div>
            </div>

            {Array.isArray(items) && items.length > 0 && (
                <div
                    className={`overflow-hidden transition-all duration-250 ease-in-out ${subNav ? "max-h-full opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
                >
                    <div className="mr-4 space-y-0.5">
                        {items.map((subItem: any, index: string | number) => (
                            <div
                                key={`${subItem.name}-${index}`}
                                className={`transition-all duration-300 ease-in-out ${subNav ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                                style={{ transitionDelay: `${(index as number) * 50}ms` }}
                            >
                                <SidebarItem
                                    sidebarStatus={sidebarStatus}
                                    key={subItem.name}
                                    depth={depth + 1}
                                    depthStep={depthStep}
                                    {...subItem}
                                    onClickSidbarItem={onClickSidbarItem}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SidebarItem;
