// import { IoCamera } from "react-icons/io5";
import Link from "next/link";
import { isArray, isEmpty } from "lodash";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Catergory } from "@/types/catergory.type";
import { Card } from "@mui/material";

export const dynamic = "force-dynamic";

export default async function Home() {
  let cats: Array<Catergory> = []
  try {
    const result = await fetchInstance(endpoints.category.getCatergoris, { cache: "no-cache" })
    cats = result.data.data
  } catch (error) {
    console.log('error', error)
  }
  return (
    <>
      <Card className="text-center !p-0     !rounded-lg  ">
        <h1 className="text-center lg:text-lg text-sm   mt-5  font-extrabold ">دسته بندی ها</h1>
        <div className=" grid  grid-cols-3 mt-2">
          {isArray(cats) && !isEmpty(cats) &&
            cats.map((item: any) => (
              <div key={item.id} >
                <Link
                  href={`products?category=${item.id}`}
                  key={item.id}
                >
                  <div className="text-center my-3   ">
                    <div className="flex justify-center ">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.title}
                          className="  rounded-fu ll sm:w-52 sm:h-52 md:w-60 md:h-60  w-20   rounded-full  h-20  shadow   lg:h-60 lg:w-60  "
                        />
                      ) : (
                        <></>
                        // <IoCamera className=" border p-5 rounded-full sm:w-52 sm:h-52 md:w-60 md:h-60  w-32   h-32 shadow   lg:h-60 lg:w-60  text-gray-600 " />
                      )}
                    </div>
                    <h1 className="pb-4 mt-2 text-xs md:text-lg  font-extrabold   ">{item.title}</h1>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </Card>
    </>

  );
}
