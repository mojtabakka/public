import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/layout/mainLayout";
import { getProducts } from "api";
import { ProductCard, Loading, SearchKader } from "components";
import InfiniteScroll from "react-infinite-scroll-component";


export async function getServerSideProps(context) {
  try {
    const data = {
      properties: context.query.properties,
    };
    const result = await getProducts(data);
    const products = result.data;
    const paginations = result.meta;
    return {
      props: {
        products,
        paginations,
      },
    };
  } catch (error) {
    console.log(error);
  } finally {
  }
}

function Home({ products, paginations }) {
  const [allProducts, setAllProducts] = useState([]);
  const [paginationsnotssr, setPaginationsnotssr] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAllProducts([...products]);
    setPaginationsnotssr({ ...paginations });
  }, []);
  const handleChangeFilter = (item) => {
    router.push({
      query: {
        properties: item,
      },
    });
  };
  const handleClick = (model) => {
    setLoading(true);
    router.push({
      pathname: `/product-detail/${model}`,
    });
  };

  const handleNest = async (item) => {
    const result = await getProducts({ page: page + 1 });
    setAllProducts([...allProducts, ...result.data]);
    setPaginationsnotssr({ ...result.meta });
    setPage(page + 1);
  };

  return (
    <Layout onChangeFilter={handleChangeFilter} showFilters={true}>
      <SearchKader />
      <div className=" ">
        <InfiniteScroll
          dataLength={10}
          next={handleNest}
          className="md:mx-5  sm:mx-5 lg:mx-5 mx-5"
          // hasMore={paginations.hasNextPage}
          hasMore={paginationsnotssr.hasNextPage}
          // loader={
          //   <div className="text-center flex justify-center text-sm">
          //     <FadeLoader className=" inline-block !text-sm" />
          //   </div>
          // }
          scrollableTarget="scrollableDiv"
        >
          <div className="  mt-5 w-full md:mt-1 lg:mt-1  grid lg:grid-cols-4 mx-0   md:grid-cols-3 sm:grid-cols-2 grid-cols-1  h-full">
            {allProducts &&
              // !isEmptyArray(allProducts) &&
              allProducts.map((item, index) => (
                <span key={index + item.id}>
                  <ProductCard
                    onClick={handleClick}
                    items={item}
                    key={item.id}
                  />
                </span>
              ))}
          </div>
        </InfiniteScroll>

        <Loading show={loading} />
      </div>
    </Layout>
  );
}

export default Home;
