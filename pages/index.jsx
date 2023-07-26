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
  const array = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  console.log(array.length);
  let count = 0;
  array.map((item) => {
    count = count + 3.2;
    console.log(count);
  });
  console.log(count);
  return (
    <MainLayout showFilters={false}>
      <Card className="text-center mx-2 mt-5 border-rounded  ">
        <span className="text-center lg:text-lg text-sm ">دسته بندی ها</span>
        <div className=" grid  grid-cols-3 mt-10">
          {!isEmptyArray(cats) &&
            cats.map((item) => (
              <div key={item.id} className=" border rounded shadow">
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
                          className="  h-20 w-20  "
                        />
                      ) : (
                        <IoCamera className="  h-20 w-20 text-gray-600" />
                      )}
                    </div>
                    <h1 className="pb-4 text-xs text-gray-400 ">
                      {item.title}
                    </h1>
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
