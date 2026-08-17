import Link from "next/link";
import { Card } from "@mui/material";
import { Icon } from "@iconify/react";

export default function CategoriesWidget({ cats }: any) {
    return (
        <section className="shadow-lg mt-16 p-2 border rounded-lg">

            {/* Header */}

            <div className="mb-10 text-center">
                {/* 
                <span className="inline-flex bg-[#423CAD]/10 px-4 py-2 rounded-full font-semibold text-[#423CAD] text-sm">
                    دسته بندی ها
                </span> */}

                <h2 className="mt-4 font-black text-slate-900 text-lg">
                    دسته بندی محصولات
                </h2>
                {/* 
                <p className="mt-3 text-slate-500">
                    محصول مورد نیاز خود را انتخاب کنید.
                </p> */}

            </div>

            <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {cats?.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/products?category=${item.id}`}
                        className="group"
                    >
                        <Card
                            elevation={0}
                            className="bg-white hover:shadow-[0_20px_50px_rgba(66,60,173,.12)] border border-slate-100 hover:border-[#423CAD]/30 rounded-[24px] overflow-hidden transition-all hover:-translate-y-2 duration-500"
                        >

                            {/* Image */}

                            <div className="relative flex bg-gradient-to-br from-[#f8f7ff] to-white w-full aspect-square overflow-hidden">

                                <img
                                    height={100}
                                    width={100}
                                    src={item.photo}
                                    alt={item.title}
                                    className="p-2 rounded-2xl w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />


                                {/* Hover Overlay */}

                                <div className="absolute inset-0 bg-[#423CAD]/0 group-hover:bg-[#423CAD]/5 transition duration-500" />

                            </div>

                            {/* Footer */}

                            <div className="p-5 border-slate-100 border-t">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-extrabold text-slate-800 group-hover:text-[#423CAD] transition">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-slate-500 text-sm">
                                            مشاهده محصولات
                                        </p>

                                    </div>

                                    <div className="flex justify-center items-center bg-[#423CAD]/10 group-hover:bg-[#423CAD] rounded-full w-10 h-10 text-[#423CAD] group-hover:text-white transition duration-300">

                                        <Icon
                                            icon="solar:arrow-left-linear"
                                            width={20}
                                        />

                                    </div>

                                </div>

                            </div>

                        </Card>
                    </Link>
                ))}

            </div>
        </section>
    );
}