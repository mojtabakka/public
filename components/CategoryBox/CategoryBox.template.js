import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { isEmptyArray } from "utils/function.util";

const CategoryBoxTemplate = ({
  brands,
  cats,
  properties,
  types,
  catId,
  onMouseLeaveCatMenue,
  onMouseOverCat,
}) => {
  return (
    <div className=" fixed    justify-center flex  w-5/6 h-4/6 ">
      <div
        onMouseLeave={onMouseLeaveCatMenue}
        className={` 
         px-3 mt-3  py-4 shadow  bg-white w-1/3 h-full rounded  `}
      >
        {cats.map((item) => (
          <div
            className="flex justify-between  items-center cursor-pointer hover:text-blue-400 p-3 rounded hover:bg-gray-100"
            onMouseOver={() => onMouseOverCat(item.id)}
          >
            <div className="text-base">{item.title}</div>
            <IoIosArrowBack className="text-lg" />
          </div>
        ))}
      </div>
      <div className="bg-white mx-1 h-full   p-4 mt-3 shadow rounded w-full">
        <div className="grid grid-cols-4">
          <div className="">
            <div className="mb-5 text-base text-gray-400">برندها</div>
            <div>
              {!isEmptyArray(brands) &&
                brands.map((item) => (
                  <Link
                    className="p-1 block"
                    href={{ pathname: `/${catId}`, query: { brand: item.id } }}
                  >
                    {item.brand}
                    <span className="text-gray-500">{` ( ${item.title} )`}</span>
                  </Link>
                ))}
            </div>
          </div>
          <div className="">
            <div className="mb-5 text-base text-gray-400">انواع</div>
            <div>
              {!isEmptyArray(types) &&
                types.map((item) => (
                  <Link
                    className="p-1 block"
                    href={{ pathname: `/${catId}`, query: { type: item.id } }}
                  >
                    {item.type}
                  </Link>
                ))}
            </div>
          </div>

          <div className="">
            <div className="mb-5 text-base text-gray-400">ویژگی ها</div>
            <div>
              {!isEmptyArray(properties) &&
                properties.map((item) => (
                  <Link
                    className="p-1 block"
                    href={{
                      pathname: `/${catId}`,
                      query: { properties: item.id },
                    }}
                  >
                    {item.title}
                    <span className="text-gray-500  text-xs">{` ( ${item.property} )`}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CategoryBoxTemplate };
