
"use client"
import { isEmpty } from 'lodash'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductCard from '../product-card'
import { fetchProducts } from '@/actions/fetch-product.action'
import ProductCardSkeleton from '@/skeletons/product-cart-skeleton'

interface propsType {
    hasMore: boolean;
    initLoading: boolean;
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
    const [loading, setLoading] = useState(props.initLoading)
    const [currentPage, setCurrentPage] = useState(2);
    useEffect(() => {
        // setLoading(false)
        setItems(props.initialData)
        setLoading(props.initLoading)
    }, [props.initLoading])
    const loadMore = async () => {
        setLoading(true)
        setCurrentPage((data) => data++)
        const res = await fetchProducts(currentPage, props.filterData)
        console.log('res', res)
        if (res.data.length === 0) {
            setLoading(false)
            setHasmore(false)
        } else { setHasmore(true) }
        // setHasmore(res.meta.hasNextPage)
        setItems([...items, ...res.data,])
        setLoading(false)
    };

    return (
        <div className=" ">
            <InfiniteScroll
                dataLength={8}
                next={loadMore}
                className="mx-0 md:mx-5"
                hasMore={hasmore}
                loader={
                    <div className="flex justify-center text-4xl text-center">
                        {loading && <Icon icon="svg-spinners:12-dots-scale-rotate" />}
                    </div>
                }
                scrollableTarget="scrollableDiv"
            >
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-0 md:mt-1 w-full h-full">
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
            </InfiniteScroll >
            {!loading && isEmpty(items) && < div className="flex justify-center md:mt-32 p-10 w-full">
                <div
                    className="flex flex-col justify-center items-center py-12 text-center"
                >
                    <Icon
                        icon="solar:magnifer-broken"
                        className="mb-3 text-gray-300 text-6xl"
                    />

                    <h3 className="font-medium text-gray-700">
                        نتیجه‌ای پیدا نشد
                    </h3>

                    <p className="mt-1 text-gray-500 text-sm">
                        درحال حاضر کالایی در این دسته بندی موجود نمی باشد.
                    </p>
                </div>
            </div>}
        </div >
    )
}
