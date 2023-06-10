import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/layout/mainLayout";
import { getProducts } from "api";
import { ProductCard, Loading } from "components";

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
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleClick = (model) => {
    setLoading(true);
    router.push({
      pathname: `/product-detail/${model}`,
    });
  };
  return (
    <div className="grid lg:grid-cols-5 mx-5  md:mx-5  sm:mx-5 lg-mx-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-1  h-full ">
      {products &&
        products.length > 0 &&
        products.map((item, index) => (
          <ProductCard onClick={handleClick} items={item} key={item.id} />
        ))}
      <Loading show={loading} />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
