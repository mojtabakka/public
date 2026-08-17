"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="top-0 z-50 sticky bg-white/80 backdrop-blur-md border-slate-200 border-b">
                <div className="flex justify-between items-center px-4 lg:px-8 py-3">

                    {/* LEFT - LOGO + MENU */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpen(true)}
                            className="hover:bg-slate-100 p-2 rounded-xl transition"
                        >
                            <MenuIcon />
                        </button>

                        <div className="font-extrabold text-[#423CAD] text-lg">
                            MYSHOP
                        </div>
                    </div>

                    {/* CENTER - SEARCH */}
                    <div className="hidden md:flex flex-1 mx-6">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="جستجو در محصولات..."
                                className="bg-slate-100 px-4 py-3 pr-10 rounded-2xl outline-none focus:ring-[#423CAD]/30 focus:ring-2 w-full text-sm transition"
                            />
                            <span className="top-3 right-3 absolute text-slate-400">
                                🔍
                            </span>
                        </div>
                    </div>

                    {/* RIGHT - CART */}
                    <div className="flex items-center gap-3">
                        <button className="relative hover:bg-slate-100 p-2 rounded-xl transition">
                            <ShoppingCartIcon />

                            <span className="-top-1 -right-1 absolute bg-[#423CAD] px-1.5 py-0.5 rounded-full text-[10px] text-white">
                                2
                            </span>
                        </button>
                    </div>
                </div>

                {/* MOBILE SEARCH */}
                <div className="md:hidden px-4 pb-3">
                    <input
                        type="text"
                        placeholder="جستجو..."
                        className="bg-slate-100 px-4 py-3 rounded-2xl outline-none focus:ring-[#423CAD]/30 focus:ring-2 w-full text-sm"
                    />
                </div>
            </header>

            {/* MOBILE DRAWER */}
            {open && (
                <div className="z-50 fixed inset-0">
                    <div
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    <div className="top-0 right-0 absolute bg-white shadow-xl p-4 w-72 h-full">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-[#423CAD]">
                                MENU
                            </span>

                            <button onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </button>
                        </div>

                        <nav className="space-y-3 text-slate-700">
                            <div className="hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
                                خانه
                            </div>
                            <div className="hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
                                محصولات
                            </div>
                            <div className="hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
                                دسته‌بندی‌ها
                            </div>
                            <div className="hover:bg-slate-100 p-2 rounded-xl cursor-pointer">
                                تماس
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}