import React, { useState } from "react";
import Layout from "../layout";
import { getProduct } from "api";
import { ProductFeatures, ProductImages, ProductPrice } from "components";
import { useDispatch, useSelector } from "react-redux";
import { BACK_URL } from "redux/types.js";

const DetailProduct = ({ product }) => {
  const [numberOfOrder, setNumberOfOrder] = useState(0);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClickPlus = () => {
    console.log("state", state);
    dispatch(setBackUrl(window.location.pathname));
    const userId = setNumberOfOrder((value) => {
      return value + 1;
    });
  };
  const handleClickBin = () => {
    if (numberOfOrder > 0)
      setNumberOfOrder((value) => {
        return value - 1;
      });
  };

  const setBackUrl = (back_url = null) => ({
    type: BACK_URL,
    data: back_url,
  });

  const handleShowOrders = () => {};
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
