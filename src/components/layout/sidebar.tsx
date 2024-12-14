

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
        if (isEmpty(categories))
            categories.forEach((item) => {
                const catId = item.id;
                const data: menueDataType = {};
                const brands: menueDataType = {};
                const types: menueDataType = {};
                const properties: menueDataType = {};
                data.name = item.title;
                data.label = item.title;
                data.path = {
                    query: {},
                    pathname: "/" + catId,
                };
                data.items = []

                if (!isEmpty(item.brands)) {
                    brands.name = "برندها";
                    brands.label = "برندها";
                    brands.items = [];
                    brands.path = {
                        query: '',
                        pathname: "/" + catId,
                    };
                    if (!isEmpty(item.brands)) item.brands.forEach((item) => {
                        if (brands.items) brands.items.push({
                            name: item.title,
                            label: item.brand,
                            path: {
                                query: { type: item.id },
                                pathname: "/" + catId,
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
                        pathname: "/" + catId,
                    };
                    if (!isEmpty(item.productTypes)) item.productTypes.forEach((item) => {
                        if (types.items) types.items.push({
                            name: item.title,
                            label: item.type,
                            path: {
                                query: { type: item.id },
                                pathname: "/" + catId,
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
                if (!isEmpty(properties)) data.items.push(properties);
                items.push(data);
            });
        // console.log(items)
        setSidbarItems(items);
    };


    return (

        <div>
            <Icon icon="gg:menu" className=' cursor-pointer' onClick={() => SetSidebarStatus(true)} />
            <Drawer open={SidebarStatus} onClose={() => SetSidebarStatus(false)} anchor='right' sx={{
                width: "50%",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: " 50%",
                    boxSizing: 'border-box',
                },
            }}>
                <div className="text-left mt-2 ">
                    <div className="text-center  shadow-lg  border-b-1">
                        <Logo />
                    </div>

                    <div className=" h-screen  z-0">
                        <div style={{ height: "92%" }} className="   overflow-y-scroll">
                            <div className={` w-full `}>
                                {(!isEmpty(sidbarItems)) &&
                                    sidbarItems.map((sidebarItem, index) => (
                                        <SidebarItem
                                            onOpenSidebar={handleOpneSidebarFromChild}
                                            sidebarStatus={SidebarStatus}
                                            key={`${sidebarItem.name}${index}`}
                                            {...sidebarItem}
                                            onClickSidbarItem={() => console.log('hello')}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>


            </Drawer>
        </div>
    )
}
