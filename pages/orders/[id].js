import React from "react";
import Layout from "../layout";

const Orders = () => {
  return <Layout></Layout>;
};

export async function getServerSideProps(context) {
  return { props: { product: [] } };
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = {
    context,
    id,
  };
  const result = await getProduct(data);
  const product = result.data;
  return { props: { product } };
}
export default Orders;
