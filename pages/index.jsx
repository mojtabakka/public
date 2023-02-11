import Layout from "components/layout";
import { Card } from "components";
import { getProducts } from "api";

export async function getServerSideProps(context) {
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
    <div className="grid lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-4 grid-cols-2  h-100">
      {products &&
        products.length > 0 &&
        products.map((item) => <Card items={item} key={item._id} />)}
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
