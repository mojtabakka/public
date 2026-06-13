import React, { useEffect, useState } from "react";
import { colors } from "@/config/sibarMenu.config";
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
    return (
        <>
            <div onClick={handleClickTitle}>
                <div  {...rest} className="cursor-pointer w-full  ">
                    <div
                        style={{
                            marginLeft: depth * depthStep,
                            backgroundColor: colors[depth].backgroundColor,
                            color: colors[depth].color,
                        }}
                        className={`p-2 rounded justify-between flex bg-red-50 w-full`}
                    >
                        <div>
                            <span
                                className={`pl-4 text-center inline-block ${sidebarStatus ? "inline-block text-base  " : "text-4xl"
                                    } `}
                                style={{ transition: "200ms linear" }}
                            >
                                {icon}
                            </span>
                            <span className="text-xs" onClick={() => {


                            }}>{label}</span>
                        </div>
                        {Array.isArray(items) ? (
                            <div
                            className="pr-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showSubNav();
                                }}
                            >
                                <Icon icon="ep:arrow-left"
                                    style={{ transition: "200ms linear" }}
                                    className={`${subNav ? "-rotate-90" : "rotate-0"
                                        }  transform-gpu"  ${sidebarStatus ? "null" : "mt-6 "
                                        } text-xl `}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {Array.isArray(items) ? (
                <div
                    style={{
                        maxHeight: `${subNav ? items.length * 200 + "px" : "0px"}`,
                        overflow: "hidden",
                        transition: "200ms linear",
                    }}
                >
                    <div>
                        {items.map((subItem, index: string | number) => (
                            <div key={index}>
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
            ) : null}
            {/* <Loading show={true} /> */}
        </>
    );
};

export default SidebarItem;
