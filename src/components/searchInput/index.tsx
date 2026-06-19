"use client";

import SearchBoxSkeleton from "@/skeletons/search-box.skeleton";
import SearchBox from "../search-box";
import useOutsideClick from "@/hooks/useOutsideClick";
import { endpoints } from "@/utils/end-points";
// import { fetchInstance } from "@/utils/fetch";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

import { Drawer } from "vaul";
import {
  InputBase,
  Divider,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { fetchInstanceClient } from "@/utils/fetch-client";

export default function SearchInput() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showCard, setShowCard] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const [items, setItems] = useState<{
    [key: string]: {
      id: string;
      category_title: string;
      productCount: string;
      product_model: string;
      product_priceForUser: string;
      title: string;
      brand: string;
    }[];
  }>();

  const debouncedChangeHandler = useMemo(() => {
    const handler = debounce(async (newValue: string) => {
      try {
        console.log(newValue)
        const response = await fetchInstanceClient(
          `${endpoints.product.searchProduct}?search=${newValue}`,
          {
            cache: "no-cache",
          }
        );

        setItems(response.data);
      } catch (error) {
        console.error(error);
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;

    setValue(newValue);

    if (!newValue.trim()) {
      setItems(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);
    debouncedChangeHandler(newValue);
  };

  const handleDesktopFocus = () => {
    if (isMobile) {
      setMobileOpen(true);
    } else {
      setShowCard(true);
    }
  };

  const ref = useOutsideClick(() => {
    setShowCard(false);
  }) as React.RefObject<HTMLDivElement>;

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden md:block relative w-1/2">
        <div className="relative">
          <input
            type="search"
            value={value}
            onChange={handleChange}
            onFocus={handleDesktopFocus}
            placeholder="جستجوی محصول..."
            className="bg-gray-100 py-3 pr-12 pl-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 w-full text-sm transition-all"
          />

          <Icon
            icon="solar:magnifer-linear"
            className="top-1/2 right-4 absolute text-gray-500 text-xl -translate-y-1/2"
          />
        </div>

        {showCard && (
          <div
            ref={ref}
            className="top-full z-50 absolute bg-white shadow-xl mt-2 rounded-2xl w-full overflow-hidden"
          >
            {loading ? (
              <SearchBoxSkeleton />
            ) : (
              items && (
                <SearchBox
                  items={items}
                  onClick={() => setShowCard(false)}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Trigger */}
      <div className="md:hidden pb-2 w-full">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-gray-100 px-4 rounded-xl w-full h-9 text-gray-500"
        >
          <Icon icon="solar:magnifer-linear" className="md:text-xl" />
          <span className="text-xs md:text:base">جستجو </span>
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      <Drawer.Root open={mobileOpen} onOpenChange={setMobileOpen}  >

        <Drawer.Overlay className="fixed inset-0 bg-black/40" style={{ zIndex: 9000 }} />

        <Drawer.Content className="right-0 bottom-0 left-0 fixed flex flex-col bg-white rounded-t-[32px] h-[90vh] overflow-hidden" style={{ zIndex: 10000 }}>

          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="bg-gray-300 rounded-full w-12 h-1.5" />
          </div>

          {/* Header */}
          <div className="flex justify-between items-center px-4 pb-3">
            <h2 className="font-bold text-sm">جستجوی محصولات</h2>

            {/* <IconButton onClick={() => setMobileOpen(false)}>
                <Icon icon="solar:close-circle-linear" width={24} />
              </IconButton> */}
          </div>

          <Divider />

          {/* Search */}
          <div className="p-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-2xl">
              <Icon icon="solar:magnifer-linear" className="text-gray-500 text-2xl" />
              <InputBase
                fullWidth
                value={value}
                onChange={handleChange}
                placeholder="نام محصول را جستجو کنید..."
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 px-4 pb-10 overflow-y-auto">
            {loading ? (
              <SearchBoxSkeleton />
            ) : (
              items && (
                <SearchBox
                  items={items}
                  onClick={() => setMobileOpen(false)}
                />
              )
            )}
          </div>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}