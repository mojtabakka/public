'use client'
import { Brand } from "@/types/brand.type";
import { Catergory } from "@/types/catergory.type";
import { ProductType } from "@/types/productType.type";
import { PropertyTitle } from "@/types/propertyTitle.type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isArray, isEmpty } from 'lodash'
// import { Property } from "@/types/property.type";
import { Icon } from "@iconify/react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Modal from "../modal";
import { Filter } from "../filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Filter } from "../filter";
// import Modal from "../modal";

interface PropsType {
  categories: Array<Catergory>
}
export default function CategoryBox(props: PropsType) {
  const router = useRouter()
  const {
    categories
  } = props
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [menustatus, setMenustatus] = useState<boolean>(false)
  const [cats, setCats] = useState<Array<Catergory>>([]);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const [types, setTypes] = useState<Array<ProductType>>([]);
  // const [properties, setProperties] = useState<Array<Property | PropertyTitle>>([]);
  const [catId, setCatId] = useState<string | number>();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const pathname = usePathname();
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
    // setProperties(categories[0]?.propertyTitles);
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
    // setProperties(properties);
  };
  const handleClickOutside = () => {
    setCatId(0)
    setMenustatus(false);
  };

  const ref = useOutsideClick(handleClickOutside) as React.RefObject<HTMLDivElement>;
  return (
    <>
      <div className="md:hidden bg-gray-200 px-2 w-full h-[0.5px]">
      </div>
      <div className="flex">
        {category && pathname === "/products" && <div className="lg:hidden flex items-center gap-1 px-6 pb-3 font-extrabold text-sm"
          onClick={() => setShowFilter(true)}
        >

          <span className="flex justify-center items-center mt-3">
            <Icon icon="mdi:filter" width="20" height="20" className="font-light text-gray-700 !text-xs" />
            <div style={{ fontFamily: "shabnam" }} className="font-light text-xs cursor-pointer">فیلترها</div>
          </span>
        </div>}
        <div className="w-fit" ref={ref}>
          <span className="hidden lg:flex items-center gap-1 px-6 pb-4 w-fit text-sm lg:text-base cursor-pointer menue-title" onMouseOver={() => setMenustatus(true)}>
            <Icon icon="gg:menu" className="cursor-pointer" />
            <div style={{ fontFamily: "shabnam" }} className="cursor-pointer">دسته بندی ها</div>
          </span>
          <div className={`absolute    justify-center flex  w-5/6   ${menustatus ? " flex" : "hidden"} `}  >
            <div
              // onMouseLeave={onMouseLeaveCatMenue}
              className={`  px-3 mt-3  py-4 shadow-2xl  min-h-96 bg-white w-1/3 h-full rounded  `}
            >
              {cats && isArray(cats) && cats.map((item, index) => (
                <div key={index}
                  onClick={() => { router.push(`products?category=${item.id}`); setMenustatus(false) }}
                  className={`flex justify-between  items-center cursor-pointer p-3 rounded ${catId === item.id ? " text-blue-400  bg-gray-100" : ""} `}
                  onMouseOver={() => { handleMouseOverCat(item?.id) }}
                >
                  <div className="text-base">{item.title}</div>
                  <Icon icon="ep:arrow-left-bold" />
                </div>
              ))}
            </div>
            <div className="bg-white shadow-2xl mx-1 mt-3 p-4 rounded w-full h-full min-h-96">
              <div className="grid grid-cols-3">
                {!isEmpty(brands) && (
                  <div className="">
                    <div className="mb-5 text-gray-400 text-base">برندها</div>
                    <div>
                      {brands.map((item, index) => (
                        <Link
                          key={index}
                          className="block p-1 hover:text-blue-400"
                          onClick={() => setMenustatus(false)}
                          href={{
                            pathname: "products",
                            query: { category: catId, brand: item.id },
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
                    <div className="mb-5 text-gray-400 text-base">انواع</div>
                    <div>
                      {types.map((item, index) => (
                        <Link
                          key={index}
                          onClick={() => setMenustatus(false)}
                          className="block p-1 hover:text-blue-400"
                          href={{
                            pathname: "products",
                            query: { category: catId, type: item.id },
                          }}
                        >
                          {item.type}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {/* {isEmpty(properties) && (
                <div className="">
                  <div className="mb-5 text-gray-400 text-base">ویژگی ها</div>
                  <div>
                    {properties.map((item: any, index) => (
                      <Link
                        key={index}
                        onClick={() => setMenustatus(false)}
                        className="block p-1 hover:text-blue-400"
                        href={{
                          pathname: "products",
                          query: { category: catId, properties: item.id },
                        }}
                      >
                        {item.title}
                        <span className="text-gray-500 text-xs">{` ( ${item.property} )`}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )} */}
              </div>
            </div>
          </div>
        </div>

        <span className="hidden lg:flex items-center gap-1 px-2 pb-4 w-fit text-sm lg:text-base cursor-pointer menue-title"
        >
          {category && pathname === "/products" && <div className="flex items-center gap-2"
            onClick={() => setShowFilter(true)}
          >
            <Icon icon="mdi:filter" width="24" height="24" />
            {/* <div style={{ fontFamily: "shabnam" }} className="cursor-pointer">فیلترها</div> */}
          </div>}
          <Modal
            onClose={() => setShowFilter(false)}
            title={"فیلترها"}
            modalContent={<Filter />}
            show={showFilter}
            sheetContent={<Filter />} />
        </span>
      </div >
    </>
  );
}
