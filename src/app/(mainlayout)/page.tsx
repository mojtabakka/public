
import { fetchProducts } from '@/actions/fetch-product.action';
import ProductList from '@/components/products-List';
import { Product } from '@/types/product.type'
import React from 'react'

export default async function Products(props: any) {
  let products: Array<Product> = []
  let hasmore: boolean = false
  try {
    const data = {
      type: props.searchParams?.type || "",
      brand: props.searchParams?.brand || "",
      properties: props.searchParams?.properties || "",
      catId: props.searchParams?.catergoryId || "",
    };
    const pro = await fetchProducts(1, data)
    products = pro.data
    hasmore = pro.meta.hasNextPage

  } catch (error) {
    console.log('error', error)
  }
  return (
    <div className=" ">
      <ProductList
        hasMore={hasmore}
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
