
import MoreDetails from '@/components/more-details'
import ProductFeatures from '@/components/product-features'
import ProductImages from '@/components/product-images'
import ProductPrice from '@/components/product-price'
import { endpoints } from '@/utils/end-points'
import { isEmpty } from 'lodash'
import React from 'react'
import Card from '@/components/card'
import { fetchInstance } from '@/utils/fetch'


async function getProduct(model: string) {
  try {
    const result = await fetchInstance(endpoints.product.getProduct.replace(":model", model), { method: "GET" })
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export default async function page(props: { params: { model: string } }) {
  const product = await getProduct(props.params.model)
  return (
    <>
      <div className=" lg:flex lg:flex-row  flex-col  justify-between">

        {!isEmpty(product) && <ProductImages product={product} />}
        {!isEmpty(product) && <ProductFeatures product={product} />}
        {!isEmpty(product) && < ProductPrice product={product} />}
      </div>
      <div>
        {!isEmpty(product) && <MoreDetails product={product} />}
        {isEmpty(product) && <Card className='w-full h-full flex justify-center  items-center font-extrabold text-xl'>نتیجه ای یافت نشد</Card>}
      </div>
    </>
  )
}
