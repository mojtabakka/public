import Layout from "components/layout/mainLayout";
import { ProductCard } from "components";
import { getProducts } from "api";
import { Router, useRouter } from "next/router";

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
  const router = useRouter();
  const handleClick = (model) => {
    router.push({
      pathname: `/product-detail/${model}`,
    });
  };
  return (
    <div className="grid lg:grid-cols-5  md:mx-5  sm:mx-5 lg-mx-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-1  h-full ">
      {products &&
        products.length > 0 &&
        products.map((item) => (
          <ProductCard onClick={handleClick} items={item} key={item.id} />
        ))}
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
