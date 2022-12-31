import { Card } from "components";
import Layout from "./layout";
import Link from "next/link";
import { connect } from "react-redux";
import { getProducts } from "api";
import { useEffect } from "react";

export async function getServerSideProps() {
  try {
    const result = await getProducts();
    const products = result.data;
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      props: {
        products: null,
      },
    };
  } finally {
  }
}
function Home({ products }) {
  return (
    <Layout>
      <div class="grid lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-4 grid-cols-2  h-100">
        {products &&
          products.length > 0 &&
          products.map((item) => <Card items={item} />)}
      </div>
    </Layout>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   getProducts: (data) => {
//     dispatch(getProducts(data));
//   },
// });

// const Home = connect(undefined, mapDispatchToProps)(HomePage);
export default Home;
