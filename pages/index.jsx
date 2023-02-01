import { Card } from "components";
import Layout from "./layout";
import { getProducts } from "api";

export async function getServerSideProps(context) {
  try {
    const data = {
      context,
    };
    const result = await getProducts(data);
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
      <div className="grid lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-4 grid-cols-2  h-100">
        {products &&
          products.length > 0 &&
          products.map((item) => <Card items={item} key={item._id} />)}
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
