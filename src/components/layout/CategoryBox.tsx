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
      <div className="lg:hidden bg-white mt-[-4px]">
        {category && pathname === "/products" && (
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1.5 hover:bg-[#423CAD]/5 px-4 py-2 rounded-xl text-slate-700 hover:text-[#423CAD] transition-all duration-250"
          >
            <Icon icon="mdi:filter" width="20" height="20" className="text-slate-600" />
            <span className="font-medium text-sm">فیلترها</span>
          </button>
        )}
      </div>
      <div className="flex items-center bg-white mt-[-4px]">
        <div className="w-fit" ref={ref}>
          <span className="group hidden lg:inline-flex items-center gap-1.5 px-4 text-slate-700 hover:text-[#423CAD] text-sm lg:text-base transition-all duration-250 cursor-pointer" onMouseOver={() => setMenustatus(true)}>
            <Icon icon="gg:menu" className="text-lg group-hover:rotate-180 transition-transform duration-250" />
            <span className="after:-bottom-0.5 after:left-0 after:absolute relative after:bg-[#423CAD] after:w-0 hover:after:w-full after:h-0.5 font-medium after:transition-all after:duration-250">
              دسته بندی‌ها
            </span>
          </span>
          <div className={`absolute top-12 right-0 z-50 transition-all duration-300 ${menustatus ? "visible opacity-100 translate-y-0 scale-100" : "invisible opacity-0 translate-y-3 scale-95 pointer-events-none"}`}>
            <div className="flex bg-white/95 shadow-2xl backdrop-blur-xl border border-[#423CAD] border-slate-200/50 border-l-3 rounded-xl min-h-[220px] overflow-hidden">

              {/* Category List */}
              <nav className="w-48 min-w-[180px]">
                {cats && isArray(cats) && cats.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => { router.push(`products?category=${item.id}`); setMenustatus(false) }}
                    className={`flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-200 ${catId === item.id
                      ? "bg-[#423CAD]/10 text-[#423CAD]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#423CAD]"
                      } first:rounded-t-lg last:rounded-b-lg`}
                    onMouseOver={() => { handleMouseOverCat(item?.id) }}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <span>{item.title}</span>
                    <Icon icon="ep:arrow-left-bold" className="text-xs" />
                  </div>
                ))}
              </nav>

              {/* Vertical Divider */}
              <div className="bg-slate-200/60 w-px"></div>

              {/* Brands / Types Panel */}
              <div className="bg-slate-50/80 p-4 min-w-[360px]">
                <div className="gap-6 grid grid-cols-2">
                  {!isEmpty(brands) && (
                    <div>
                      <h4 className="flex items-center gap-1.5 mb-3 font-bold text-slate-400 text-xs uppercase tracking-wider">
                        <span className="bg-[#423CAD] rounded-full w-1 h-4"></span>
                        برندها
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {brands.map((item, index) => (
                          <Link
                            key={index}
                            onClick={() => setMenustatus(false)}
                            className="group block py-1.5 text-slate-600 hover:text-[#423CAD] text-sm transition-all hover:translate-x-0.5 duration-150"
                            href={{
                              pathname: "products",
                              query: { category: catId, brand: item.id },
                            }}
                          >
                            <span className="font-medium group-hover:font-semibold">{item.brand}</span>
                            <span className="text-slate-400 text-xs"> ({item.title})</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {!isEmpty(types) && (
                    <div>
                      <h4 className="flex items-center gap-1.5 mb-3 font-bold text-slate-400 text-xs uppercase tracking-wider">
                        <span className="bg-[#423CAD] rounded-full w-1 h-4"></span>
                        انواع
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {types.map((item, index) => (
                          <Link
                            key={index}
                            onClick={() => setMenustatus(false)}
                            className="group block py-1.5 text-slate-600 hover:text-[#423CAD] text-sm transition-all hover:translate-x-0.5 duration-150"
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-700 hover:text-[#423CAD] text-sm lg:text-base transition-all duration-250 cursor-pointer"
        >
          {category && pathname === "/products" && <div className="flex items-center gap-1.5"
            onClick={() => setShowFilter(true)}
          >
            <Icon icon="mdi:filter" width="20" height="20" className="text-slate-500" />
            <span className="after:-bottom-0.5 after:left-0 after:absolute relative after:bg-[#423CAD] after:w-0 hover:after:w-full after:h-0.5 font-medium after:transition-all after:duration-250">
              فیلترها
            </span>
          </div>}

        </span>
      </div>

      <Modal
        onClose={() => setShowFilter(false)}
        title={"فیلترها"}
        modalContent={<Filter />}
        show={showFilter}
        sheetContent={<Filter />} />
    </>
  );
}
