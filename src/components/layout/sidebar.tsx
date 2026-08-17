'use client'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import SidebarItem from './SidebarItem'
import { Catergory } from '@/types/catergory.type';
import { Icon } from '@iconify/react'
import { Drawer } from '@mui/material';
import Logo from '../logo';

interface propsType {
    categories: Array<Catergory>
}
interface menueDataType {
    name?: string,
    label?: string,
    path?: {
        query: { type: string | number } | string | object,
        pathname: string,
    };
    items?: Array<{
        name?: string,
        label?: string,
        path?: {
            query: { type: string | number } | string | object,
            pathname: string,
        };
    }>
}


export default function Sidebar(props: propsType) {
    const {
        categories
    } = props
    const [sidbarItems, setSidbarItems] = useState<Array<menueDataType>>([]);
    const [SidebarStatus, SetSidebarStatus] = useState<boolean>(false);
    const handleOpneSidebarFromChild = () => {
        if (SidebarStatus === false) {
            SetSidebarStatus(true);
        }
    };
    useEffect(() => {
        CreateSidebarItem()
    }, [])

    const CreateSidebarItem = () => {
        const items: Array<menueDataType> = [];
        if (!isEmpty(categories))
            categories?.forEach((item) => {
                const catId = item.id;
                const data: menueDataType = {};
                const brands: menueDataType = {};
                const types: menueDataType = {};
                const properties: menueDataType = {};
                data.name = item.title;
                data.label = item.title;
                data.path = {
                    query: {},
                    pathname: `products?category=${catId}`,
                };
                data.items = []

                if (!isEmpty(item.brands)) {
                    brands.name = "برندها";
                    brands.label = "برندها";
                    brands.items = [];
                    brands.path = {
                        query: '',
                        pathname: `products?category=${catId}`,
                    };
                    if (!isEmpty(item.brands)) item.brands.forEach((item) => {
                        if (brands.items) brands.items.push({
                            name: item.title,
                            label: item.brand,
                            path: {
                                query: { type: item.id },
                                pathname: `products?category=${catId}&brand=${item.id}`,
                            },
                        });
                    });
                }
                data.items.push(brands);

                if (!isEmpty(item.productTypes)) {
                    types.name = "انواع";
                    types.label = "انواع";
                    types.items = [];
                    types.path = {
                        query: '',
                        pathname: `products?category=${catId}`,
                    };
                    if (!isEmpty(item.productTypes)) item.productTypes.forEach((item) => {
                        if (types.items) types.items.push({
                            name: item.title,
                            label: item.type,
                            path: {
                                query: { type: item.id },
                                pathname: `products?category=${catId}&type=${item.id}`,
                            },
                        });
                    });
                }
                data.items.push(types);

                if (!isEmpty(item.propertyTitles)) {
                    properties.name = "ویژگی ها";
                    properties.label = "ویژگی ها";
                    properties.items = [];
                    properties.path = {
                        query: "",
                        pathname: "/" + catId,
                    };
                    if (!isEmpty(item.propertyTitles)) item.propertyTitles.forEach((item) => {
                        if (properties.items) properties.items.push({
                            name: item.title,
                            label: item.title,
                            path: {
                                query: { properties: item.id },
                                pathname: "/" + catId,
                            },
                        });
                    });
                }
                // if (!isEmpty(properties)) data.items.push(properties);
                items.push(data);
            });
        setSidbarItems(items);
    };
    return (

        <div className="lg:hidden">
            <button
                onClick={() => SetSidebarStatus(true)}
                className="group flex justify-center items-center w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-[#423CAD]/10 text-slate-700 hover:text-[#423CAD] transition-all duration-250"
            >
                <Icon
                    icon="gg:menu"
                    className="text-2xl group-hover:scale-110 transition-transform duration-250"
                />
            </button>

            <Drawer
                open={SidebarStatus}
                onClose={() => SetSidebarStatus(false)}
                anchor="right"
                PaperProps={{
                    className: "rounded-l-3xl border-l-0 shadow-2xl",
                }}
                sx={{
                    width: "320px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "320px",
                        boxSizing: 'border-box',
                        backgroundColor: '#ffffff',
                    },
                }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <Logo imgClassName="w-[80px]" />
                        <button
                            onClick={() => SetSidebarStatus(false)}
                            className="flex justify-center items-center w-8 h-8 text-slate-500 hover:text-[#423CAD] hover:bg-slate-100 rounded-lg transition-all duration-250"
                        >
                            <Icon icon="ep:close" className="text-xl" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto">
                        {(!isEmpty(sidbarItems)) &&
                            sidbarItems.map((sidebarItem, index) => (
                                <SidebarItem
                                    onOpenSidebar={handleOpneSidebarFromChild}
                                    sidebarStatus={SidebarStatus}
                                    key={`${sidebarItem.name}${index}`}
                                    {...sidebarItem}
                                    onClickSidbarItem={() => SetSidebarStatus(false)}
                                />
                            ))
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
