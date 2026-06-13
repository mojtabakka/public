
"use server"
import React from "react";
import SearchInput from "../searchInput";
import LoginText from "../login-text";
import Logo from "../logo";
import { Catergory } from "@/types/catergory.type";
import CategoryBox from "./CategoryBox";
import Sidebar from "./sidebar";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
export default async function Layout() {
  let categories: Array<Catergory> = []
  try {

    const cates = await fetchInstance(endpoints.category.getCatergoris)
    categories = cates.data.data
  } catch (error) {
    console.log('error', error)
  }
  return (
    <>
      <header className="bg-white shadow-lg">
        <div>
          <div className="lg:hidden flex justify-between items-center px-4 text-2xl">
            <Sidebar categories={categories} />
            <Logo />
          </div>

          <div className="flex justify-between items-center gap-14 px-4 lg:pt-3">
            <Logo className="hidden lg:inline-block" />
            <SearchInput />
            <LoginText />
          </div>
        </div>
      </header>

      <div className="top-0 z-10 lg:static sticky bg-white shadow-md lg:shadow-none">
        <CategoryBox categories={categories} />
      </div>
    </>
  );
}
