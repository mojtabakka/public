import React from "react";
import Layout from "../../components/layout";

const Orders = () => {
  return <Layout></Layout>;
};

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

Orders.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Orders;
