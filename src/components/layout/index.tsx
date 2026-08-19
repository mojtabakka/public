"use server";

import React from "react";
import LoginText from "../login-text";
import Logo from "../logo";
import { Catergory } from "@/types/catergory.type";
import CategoryBox from "./CategoryBox";
import Sidebar from "./sidebar";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import dynamic from "next/dynamic";

const SearchInput = dynamic(() => import("../searchInput"), {
  ssr: false,
});

export default async function Layout() {
  let categories: Array<Catergory> = [];

  try {
    const cates = await fetchInstance(endpoints.category.getCatergoris);
    categories = cates.data.data;
  } catch (error) {
    console.log("error", error);
  }

  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-lg px-4">
        <div className="flex flex-col p-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sidebar categories={categories} />
              <div>
                <Logo imgClassName="w-[70px] md:w-[105px]" />
              </div>
            </div>

            <div className="hidden md:flex md:flex-1 md:justify-center mt-4 px-16 w-1/2">
              <SearchInput />
            </div>

            <div className="flex">
              <LoginText />
            </div>
          </div>

          <div className="md:hidden flex justify-between items-center gap-14 pt-2 lg:pt-2">
            <SearchInput />
          </div>
        </div>
      </header>

      <div className="hidden md:block pt-1">
        <CategoryBox categories={categories} />
      </div>
    </div>
  );
}
