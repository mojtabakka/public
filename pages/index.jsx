import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/layout/mainLayout";
import { getProducts, getCats } from "api";
import { ProductCard, Loading, SearchKader, Card } from "components";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmptyArray } from "../utils/function.util";
import Link from "next/link";

export async function getServerSideProps(context) {
  try {
    const result = await getCats();
    return {
      props: {
        cats: result.data,
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

function Home({ cats }) {
  return (
    <Layout showFilters={false}>
      <Card className="text-center mx-2 mt-5 border-rounded ">
        <span className="text-center text-lg ">دسته بندی ها</span>
        <div className="flex justify-center mt-10">
          {!isEmptyArray(cats) &&
            cats.map((item) => (
              <Link href={item.id.toString()}>
                <h1 className=" p-20     rounded-full shadow-lg mx-40 border">
                  {/* <div className="p-20 bg-blue-100 rounded-full text-right"> */}

                  {/* </div> */}
                </h1>
                <h1 className="pt-3  text-sm">{item.title}</h1>
              </Link>
            ))}
        </div>
      </Card>
    </Layout>
  );
}

export default Home;
