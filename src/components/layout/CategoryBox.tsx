'use client'
import { Brand } from "@/types/brand.type";
import { Catergory } from "@/types/catergory.type";
import { ProductType } from "@/types/productType.type";
import { PropertyTitle } from "@/types/propertyTitle.type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isEmpty } from 'lodash'
import { Property } from "@/types/property.type";
import { Icon } from "@iconify/react";
import useOutsideClick from "@/hooks/useOutsideClick";

interface PropsType {
  categories: Array<Catergory>
}
export default function CategoryBox(props: PropsType) {
  const {
    categories
  } = props
  const [menustatus, setMenustatus] = useState<boolean>(false)
  const [cats, setCats] = useState<Array<Catergory>>([]);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const [types, setTypes] = useState<Array<ProductType>>([]);
  const [properties, setProperties] = useState<Array<Property | PropertyTitle>>([]);
  const [catId, setCatId] = useState<string | number>();
  useEffect(() => {
    init();
  }, []);

  const handleMouseOverCat = (id: string | number) => {
    if (id) setCatId(id);
    const filterCat = cats.filter((item) => {
      return item.id == id;
    });

    setBrands(filterCat[0]?.brands);
    setTypes(filterCat[0]?.productTypes);
    createProperties(filterCat[0]?.propertyTitles);
  };
  const init = async () => {
    setBrands(categories[0]?.brands);
    setTypes(categories[0]?.productTypes);
    setProperties(categories[0]?.propertyTitles);
    createProperties(categories[0]?.propertyTitles);
    setCats(categories);
  };

  const createProperties = (propertyTitle: Array<PropertyTitle>) => {
    const properties: Array<PropertyTitle> = [];
    if (!isEmpty(propertyTitle))
      propertyTitle.map((item) => {
        if (!isEmpty(item.properties))
          item.properties.map((data) => {
            properties.push(data);
          });
      });
    setProperties(properties);
  };
  const handleClickOutside = () => {
    setCatId(0)
    setMenustatus(false);
  };

  const ref = useOutsideClick(handleClickOutside) as React.RefObject<HTMLDivElement>;
  return (
    <div className=" flex ">
      <div className="w-fit" ref={ref}>
        <span className="px-6   lg:text-base text-sm  lg:flex gap-1 pb-4  w-fit   hidden menue-title items-center cursor-pointer" onMouseOver={() => setMenustatus(true)}>
          <Icon icon="gg:menu" className="cursor-pointer" />
          <div style={{ fontFamily: "shabnam" }} className="cursor-pointer">دسته بندی ها</div>
        </span>
        <div className={`absolute    justify-center flex  w-5/6   ${menustatus ? " flex" : "hidden"} `}  >
          <div
            // onMouseLeave={onMouseLeaveCatMenue}
            className={`  px-3 mt-3  py-4 shadow-2xl  min-h-96 bg-white w-1/3 h-full rounded  `}
          >
            {cats.map((item, index) => (
              <div key={index}
                className={`flex justify-between  items-center cursor-pointer p-3 rounded ${catId === item.id ? " text-blue-400  bg-gray-100" : ""} `}
                onMouseOver={() => { handleMouseOverCat(item?.id) }}
              >
                <div className="text-base">{item.title}</div>
                <Icon icon="ep:arrow-left-bold" />
              </div>
            ))}
          </div>
          <div className=" min-h-96 bg-white  shadow-2xl mx-1 h-full   p-4 mt-3  rounded w-full">
            <div className="grid grid-cols-3">
              {!isEmpty(brands) && (
                <div className="">
                  <div className="mb-5 text-base text-gray-400">برندها</div>
                  <div>
                    {brands.map((item, index) => (
                      <Link
                        key={index}
                        className="p-1 block  hover:text-blue-400  "
                        onClick={() => setMenustatus(false)}
                        href={{
                          pathname: `/${catId}`,
                          query: { brand: item.id },
                        }}
                      >
                        {item.brand}
                        <span >{` ( ${item.title} )`}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {!isEmpty(types) && (
                <div className="">
                  <div className="mb-5 text-base text-gray-400">انواع</div>
                  <div>
                    {types.map((item, index) => (
                      <Link
                        key={index}
                        onClick={() => setMenustatus(false)}
                        className="p-1 block  hover:text-blue-400 "
                        href={{
                          pathname: `/${catId}`,
                          query: { type: item.id },
                        }}
                      >
                        {item.type}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {isEmpty(properties) && (
                <div className="">
                  <div className="mb-5 text-base text-gray-400">ویژگی ها</div>
                  <div>
                    {properties.map((item: any, index) => (
                      <Link
                        key={index}
                        onClick={() => setMenustatus(false)}
                        className="p-1 block  hover:text-blue-400 "
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
