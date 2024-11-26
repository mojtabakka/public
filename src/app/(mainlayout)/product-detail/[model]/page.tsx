
import ProductFeatures from '@/components/product-features'
import ProductImages from '@/components/product-images'
import ProductPrice from '@/components/product-price'
import { endpoints } from '@/utils/end-points'
import { fetchInstance } from '@/utils/fetch'
import { fetchInstanceClient } from '@/utils/fetch-client'
import React from 'react'


async function getProduct(model: string) {
  try {
    const result = await fetchInstanceClient(endpoints.product.getProduct.replace(":model", model), { method: "GET" })
    return result.data
  } catch (error) {
    console.log(error)
    // throw Error("مشکلی پیش آمده است")
  }
}

export default async function page(props: { params: { model: string } }) {
  const product = await getProduct(props.params.model)
  // const product = await getProduct(props.params.model)
  return (
    <div className=" lg:flex">
      <ProductImages product={product} />
      <ProductFeatures product={product} />
      <ProductPrice product={product} />
    </div>
  )
}
