import React, { useState } from "react";
import Layout from "../layout";
import { getProduct } from "api";
import { ProductFeatures, ProductImages, ProductPrice } from "components";

const DetailProduct = ({ product }) => {
  const [numberOfOrder, setNumberOfOrder] = useState(0);
  const handleClickPlus = () => {
    console.log("hello");
    setNumberOfOrder((value) => {
      return value + 1;
    });
  };
  const handleClickBin = () => {
    if (numberOfOrder > 0)
      setNumberOfOrder((value) => {
        return value - 1;
      });
  };
  const handleShowOrders = () => {
    console.log("hello");
  };
  return (
    <Layout>
      <div className=" lg:flex">
        <ProductImages product={product} />
        <ProductFeatures product={product} />
        <ProductPrice
          product={product}
          onClickPlus={handleClickPlus}
          onClickBin={handleClickBin}
          numberOfOrder={numberOfOrder}
          showOrders={handleShowOrders}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const result = await getProduct(id);
  const product = result.data;
  return { props: { product } };
}
export default DetailProduct;
