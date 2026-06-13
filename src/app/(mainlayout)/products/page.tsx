
"use client"
import { fetchProducts } from '@/actions/fetch-product.action';
import ProductList from '@/components/products-List';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
export const dynamic = 'force-dynamic'

export default function Products(props: any) {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<Array<{
        model: string,
        product_id: 21,
        photos_id: 2,
        photos_created_at: string,
        photos_updated_at: string,
        photos_src: string,
        category_id: 1,
        category_created_at: string,
        category_updated_at: string,
        category_title: string,
        category_photo: string,
        productCount: string
        priceForUser: string,
        warranty: string,
        deliveryMethod: string,
        off: string
    }>>([]);
    // const [hasMore, setHasmore] = useState<boolean>(false)

    useEffect(() => {
        init()
    }, [])
    useEffect(() => {
        init()
    }, [
        searchParams.get("type"),
        searchParams.get("brand"),
        searchParams.get("properties"),
        searchParams.get("category")
    ])

    const init = async () => {
        try {
            setLoading(true)
            const data = {
                type: searchParams.get("type") || "",
                brand: searchParams.get("brand") || "",
                properties: searchParams.get("properties") || "",
                catId: searchParams.get("category"),
            };
            const pro = await fetchProducts(1, data)
            if (pro.data) setProducts([...pro.data])
            else setProducts([])
            // setHasmore(pro.data?.meta?.hasNextPage)
        } catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false)
        }

    }

    return (

        <div>
            <ProductList
                initLoading={loading}
                hasMore={true}
                initialData={products}
                filterData={{
                    type: props.searchParams?.type || "",
                    brand: props.searchParams?.brand || "",
                    properties: props.searchParams?.properties || "",
                    catId: props.params?.id || "",
                }} />
        </div>
    )
}
