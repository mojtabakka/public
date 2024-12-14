
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

    const cates = await fetchInstance(endpoints.category.getCatergoris, { cache: "no-store" })
    categories = cates.data
  } catch (error) {
    console.log('error', error)
  }
  return (
    <>

      <header className="shadow-lg bg-white z-50 sticky">
        <div>
          <div
            className=" text-2xl flex justify-between items-center px-4  lg:hidden"
          >
            <Sidebar categories={categories} />
            <Logo />
          </div>
          <div className=" flex justify-between px-4 gap-14   items-center lg:pt-3    ">
            <Logo className=" hidden lg:inline-block" />
            <SearchInput />
            <LoginText />
          </div>
          <div>
            <CategoryBox categories={categories} />
          </div>
        </div>
      </header>
    </>
  );
}
