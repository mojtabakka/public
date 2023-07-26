import { getCats } from "api";
import { IoCamera } from "react-icons/io5";
import { Card, Loading, MainLayout } from "components";
import { isEmptyArray } from "../utils/function.util";
import Link from "next/link";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  return (
    <MainLayout showFilters={false}>
      <Card className="text-center !p-0 mt-5 border-rounded  ">
        <span className="text-center lg:text-lg text-sm ">دسته بندی ها</span>
        <div className=" grid  grid-cols-3 mt-5">
          {!isEmptyArray(cats) &&
            cats.map((item) => (
              <div key={item.id} className=" mx-2 rounded ">
                <Link
                  href={item.id.toString()}
                  onClick={() => setLoading(true)}
                  key={item.id}
                >
                  <div className="text-center my-3   ">
                    <div className="flex justify-center ">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.title}
                          className=" border p-5 rounded-full sm:w-52 sm:h-52 md:w-60 md:h-60  w-32   h-32 shadow   lg:h-60 lg:w-60  "
                        />
                      ) : (
                        <IoCamera className=" border p-5 rounded-full sm:w-52 sm:h-52 md:w-60 md:h-60  w-32   h-32 shadow   lg:h-60 lg:w-60  text-gray-600 " />
                      )}
                    </div>
                    <h1 className="pb-4 mt-5   ">{item.title}</h1>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </Card>
      <Loading show={loading} />
    </MainLayout>
  );
}

export default Home;
