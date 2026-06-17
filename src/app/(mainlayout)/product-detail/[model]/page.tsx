
import MoreDetails from '@/components/more-details'
import ProductFeatures from '@/components/product-features'
import ProductImages from '@/components/product-images'
import ProductPrice from '@/components/product-price'
import { endpoints } from '@/utils/end-points'
import { isEmpty } from 'lodash'
import React from 'react'
import { Icon } from "@iconify/react";
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
      <div className="lg:flex lg:flex-row flex-col justify-between">
        {!isEmpty(product) && <ProductImages product={product} />}
        {!isEmpty(product) && <ProductFeatures product={product} />}
        {!isEmpty(product) && < ProductPrice product={product} />}
      </div>
      <div>
        {!isEmpty(product) && <MoreDetails product={product} />}
        {isEmpty(product) &&
          <div
            className="flex flex-col justify-center items-center sm:mt-44 py-12 text-center"
          >
            <Icon
              icon="solar:magnifer-broken"
              className="mb-3 text-gray-300 text-6xl"
            />

            <h3 className="font-medium text-gray-700">
              نتیجه‌ای پیدا نشد
            </h3>

            <p className="mt-1 text-gray-500 text-sm">
              عبارت دیگری را جستجو کنید
            </p>
          </div>
        }
      </div>
    </>
  )
}
