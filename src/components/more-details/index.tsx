

"use client"
import React, { useState } from 'react'
import Card from '../card'
import Tab from '../tab'
import { TabType } from '@/types/client/tab.type'
import Properties from '../properties'
import { Product } from '@/types/product.type'

interface PropsType {
    product: Product
}
export default function MoreDetails(props: PropsType) {
    const { product } = props
    const [tabValue, setTabValue] = useState<TabType>({
        id: 1,
        key: "properties",
        title: "مشخصات",
        action: "properties",
    },)
    const tabItems: Array<TabType> = [
        {
            id: 1,
            key: "properties",
            title: "مشخصات",
            action: "properties",
        },
        {
            id: 2,
            key: "consider",
            title: "بررسی تخصصی",
            action: "consider",
        }
    ]
    return (
        <Card className='mx-1 roueded mt-2 mb-28 lg:mb-0' >
            <Tab items={tabItems} onClick={(item) => setTabValue(item)} />
            {tabValue?.action === "properties" && <Properties className='mt-4 text-xs md:text-sm lg:text-base'   properties={product.properties} />}
        </Card >
    )
} 
