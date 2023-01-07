import React from "react";
import Layout from "../layout";

const Orders = () => {
return <Layout></Layout>;
};

export async function getServerSideProps(context) {
  return { props: { product: [] } };
}
export default Orders;
