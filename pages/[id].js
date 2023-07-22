import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "components/Layout/MainLayout";
import { getProducts } from "api";
import { ProductCard, Loading, SearchKader } from "components";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmptyArray, isEmptyObject } from "../utils/function.util";

export async function getServerSideProps(context) {
  try {
    const data = {
      type: context.query.type,
      brand: context.query.brand,
      properties: context.query.properties,
      catId: context.query.id,
    };
    const result = await getProducts(data);
    return {
      props: {
        products: [...result.data],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        cats: null,
      },
    };
  } finally {
  }
}

const products = ({ products, paginations }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [paginationsnotssr, setPaginationsnotssr] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    !isEmptyArray(products)
      ? setAllProducts([...products])
      : setAllProducts([]);
    !isEmptyObject
      ? setPaginationsnotssr({ ...paginations })
      : setPaginationsnotssr({});
    setLoading(false);
  }, [products]);
  const handleChangeFilter = (item) => {
    router.replace({
      query: { ...router.query, properties: item },
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
    <MainLayout onChangeFilter={handleChangeFilter} showFilters={true}>
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
            {!isEmptyArray(allProducts) &&
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
    </MainLayout>
  );
};

export default products;
