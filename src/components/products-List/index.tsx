
"use client"
import { isEmpty } from 'lodash'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductCard from '../product-card'
import { Product } from '@/types/product.type'
import { fetchProducts } from '@/actions/fetch-product.action'
import ProductCardSkeleton from '@/skeletons/product-cart-skeleton'
interface propsType {
    hasMore: boolean;
    initialData: Array<
        {
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
        }>;
    filterData: {
        type: string
        brand: string,
        properties: string,
        catId: string | number
    }
}

export default function ProductList(props: propsType) {
    const [hasmore, setHasmore] = useState<boolean>(props.hasMore)
    const [items, setItems] = useState(props.initialData);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(2);
    useEffect(() => {
        if (props.initialData) setLoading(false)
    }, [props.initialData])
    const loadMore = async () => {
        setLoading(true)
        setCurrentPage((data) => data++)
        const res = await fetchProducts(currentPage, props.filterData)
        setHasmore(res.meta.hasNextPage)
        setItems([...items, ...res.data,])
        setLoading(false)
    };

    return (
        <div className=" ">
            <InfiniteScroll
                dataLength={8}
                next={loadMore}
                className="md:mx-5    mx-0"
                hasMore={hasmore}
                loader={
                    <div className="text-center flex justify-center text-4xl">
                        <Icon icon="svg-spinners:12-dots-scale-rotate" />
                    </div>
                }
                scrollableTarget="scrollableDiv"
            >
                <div className="  mt-5 w-full md:mt-1   grid lg:grid-cols-4 mx-0   md:grid-cols-3 sm:grid-cols-2 grid-cols-1  h-full gap-2">
                    {!isEmpty(items) &&
                        items.map((item, index) => (
                            <span key={`${index}${item.product_id}`}>
                                <ProductCard
                                    items={item}
                                    key={item.product_id}
                                />
                            </span>
                        ))}

                    {
                        loading && Array(8).fill(9).map((_, index) => <div key={index}> <ProductCardSkeleton /></div>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    )
}
