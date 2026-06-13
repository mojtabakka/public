"use client";

import SearchBoxSkeleton from "@/skeletons/search-box.skeleton";
import SearchBox from "../search-box";
import useOutsideClick from "@/hooks/useOutsideClick";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";

import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

import {
  Drawer,
  IconButton,
  InputBase,
  Box,
  Divider,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";

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
        const response = await fetchInstance(
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
      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            height: "90vh",
            borderTopLeftRadius: "32px",
            borderTopRightRadius: "32px",
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 -10px 40px rgba(0,0,0,.12)",
          },
        }}
      >
        <Box className="flex flex-col h-full">
          {/* Handle */}
          <Box className="flex justify-center py-3">
            <Box
              sx={{
                width: 48,
                height: 5,
                borderRadius: 999,
                backgroundColor: "#d1d5db",
              }}
            />
          </Box>

          {/* Header */}
          <Box className="flex justify-between items-center px-4 pb-3">
            <h2 className="font-bold text-sm">
              جستجوی محصولات
            </h2>

            <IconButton
              onClick={() => setMobileOpen(false)}
            >
              <Icon
                icon="solar:close-circle-linear"
                width={24}
              />
            </IconButton>
          </Box>

          <Divider />

          {/* Search Input */}
          <Box className="p-4">
            <Box
              className="flex items-center bg-gray-100 px-3 py-2 rounded-2xl"
            >
              <Icon
                icon="solar:magnifer-linear"
                className="text-gray-500 text-2xl"
              />

              <InputBase
                autoFocus
                fullWidth
                value={value}
                onChange={handleChange}
                placeholder="نام محصول را جستجو کنید..."
                sx={{
                  mr: 1,
                }}
              />
            </Box>
          </Box>

          {/* Results */}
          <Box
            className="flex-1 px-4 pb-10 overflow-y-auto"
          >
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
          </Box>
        </Box>
      </Drawer>
    </>
  );
}