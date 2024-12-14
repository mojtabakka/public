"use client";

import SearchBoxSkeleton from "@/skeletons/search-box.skeleton";
import { debounce } from "lodash";
import React, { useMemo, useState, useEffect } from "react";
import SearchBox from "../search-box";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function SearchInput() {
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<{
    [key: string]: {
      id: string
      category_title: string,
      productCount: string,
      product_model: string,
      product_priceForUser: string,
      title: string,
      brand: string
    }[]
  }>();

  const debouncedChangeHandler = useMemo(() => {
    const handler = debounce(async (newValue) => {
      try {
        const response = await fetchInstance(
          `${endpoints.product.searchProduct}?search=${newValue}`,
          { cache: "no-cache" }
        );
        setItems(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return handler;
  }, []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setLoading(true);

    if (newValue) {
      setShowCard(true);
      debouncedChangeHandler(newValue);
    } else {
      setShowCard(false);
      setLoading(false);
    }
  };

  const handleClickOutside = () => {
    setShowCard(false);
  };
  const ref = useOutsideClick(handleClickOutside) as React.RefObject<HTMLDivElement>;

  return (
    <div className="text-right w-1/2 pb-4 relative">
      <form>
        <div className="relative w-full mt-4">
          <input
            type="search"
            id="default-search"
            className="bg-gray-100 rounded-lg text-right w-full p-2 pr-10 text-sm text-gray-900 outline-0"
            placeholder="جستجو"
            required
            value={value}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </form>
      {showCard && (
        <div className="absolute bg-white shadow-lg w-full p-2" ref={ref}>
          {loading ? (
            <SearchBoxSkeleton />
          ) : (
            items && <SearchBox items={items} onClick={() => { setShowCard(false) }} />
          )}
        </div>
      )}
    </div>
  );
}
