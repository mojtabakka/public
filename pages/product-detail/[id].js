import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProduct, addOrder } from "api";
import { ProductFeatures, ProductImages, ProductPrice } from "components";
import Layout from "../layout";
import { PATHS } from "config/routes.config";
import { BACK_URL } from "redux/types.js";

const DetailProduct = ({ product }) => {
  const [numberOfOrder, setNumberOfOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClickPlus = async () => {
    setLoading(true);
    try {
      dispatch(setBackUrl(window.location.pathname));
      const token = localStorage.getItem("token");
      if (!token) {
        router.push(PATHS.login);
        return;
      }
      const data = { id: product._id };
      await addOrder(data);
      const userId = setNumberOfOrder((value) => {
        return value + 1;
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
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
  const result = await getProduct(context, id);
  const product = result.data;
  return { props: { product } };
}
export default DetailProduct;
