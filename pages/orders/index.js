import React from "react";
import MainLayout from "components/Layout/mainLayout";
import ProfileLayout from "components/Layout/profileLayout";

const Orders = () => {
  return <div>hello</div>;
};

export async function getServerSideProps(context) {
  // const { id } = context.query;
  // const data = {
  //   context,
  //   id,
  // };
  // const result = await getProduct(data);
  // const product = result.data;
  return { props: { product: [{ id: 1 }] } };
}

Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};
export default Orders;
