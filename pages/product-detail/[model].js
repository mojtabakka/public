import React from "react";
import { getProduct } from "api";
import { ProductFeatures, ProductImages, ProductPrice } from "components";
import { MainLayout } from "components/layout/mainLayout";

const DetailProduct = (props) => {
  const { product } = props;

  const handleShowOrders = () => {};
  return (
    <div className=" lg:flex">
      <ProductImages product={product} />
      <ProductFeatures product={product} />
      <ProductPrice product={product} showOrders={handleShowOrders} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { model } = context.query;
  const result = await getProduct({ context, model });
  const product = result.data;
  return { props: { product } };
}
DetailProduct.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default DetailProduct;
