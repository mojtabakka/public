
import Link from 'next/link'
import React from 'react'
import { Icon } from '@iconify/react'
import { isEmpty } from 'lodash'
interface propsType {
    items: {
        [key: string]: {
            id: string
            category_title: string,
            productCount: string,
            product_model: string,
            product_priceForUser: string,
            title: string,
            brand: string
        }[]
    },
    onClick: () => void
}


export default function SearchBox(props: propsType) {
    const {
        items,
        onClick
    } = props
    console.log(items)
    return (
        <div className='p-3 flex  flex-col gap-4'>
            {!isEmpty(items.products) && <div>
                <div className=' text-sm p-3  text-blue-400'>محصولات</div>
                {items.products.map((item, index) => <Link key={index} className=' p-3 flex gap-3 w-full font-extrabold' href={`/product-detail/${item.product_model}`} onClick={onClick}>
                    <Icon icon="iconamoon:search-thin" width="24" height="24" className=' font-extrabold' />
                    <h1>{item.product_model}</h1>
                </Link>)}
            </div>}

            {/* {!isEmpty(items.brands) && < div >
                <div className=' text-sm p-4 text-blue-400'>برندها</div>
                {items.brands.map((item) => <Link className=' flex gap-3 w-full font-extrabold' href={`?brand=1`} onClick={onClick}>
                    <Icon icon="iconamoon:search-thin" width="24" height="24" className=' font-extrabold' />
                    <h1>{item.brand}</h1>
                </Link>)}
            </div>} */}

            {!isEmpty(items.category) && < div >
                <div className=' text-sm  text-blue-400'>دسته بندی ها </div>
                {items.category
                    .map((item, index) => <Link key={index} className=' p-5 px-1  flex gap-2 w-full items-center font-extrabold' href={`/products?category=${item.id}`} onClick={onClick}>
                        <Icon icon="iconamoon:search-thin" className=' text-lg font-extrabold' />
                        <h1 className=' text-sm lg:text-base'>{item.title}</h1>
                    </Link>)}
            </div>}


            {isEmpty(items.category) && isEmpty(items.products) && <div className=' w-full  text-gray-500 justify-center items-center'> نتیجه ای یافت نشد</div>}
        </div >
    )
}
