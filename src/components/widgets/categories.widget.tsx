import Link from "next/link";
import { Card } from "@mui/material";
import { Icon } from "@iconify/react";

export default function CategoriesWidget({ cats }: any) {
    return (
        <section className="bg-white shadow-sm p-4 md:p-8 border rounded-3xl">

            {/* Header */}
            <div className="mb-6 md:mb-10 text-center">
                <h2 className="font-black text-slate-900 text-xl sm:text-2xl md:text-3xl">
                    دسته بندی محصولات
                </h2>
                <p className="mt-2 text-slate-500 text-sm">
                    محصولات مرتبط با هر دسته را ببینید
                </p>
            </div>

            <div className="gap-4 sm:gap-5 lg:gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {cats?.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/products?category=${item.id}`}
                        className="block group"
                    >
                        <Card
                            elevation={0}
                            className="bg-white hover:shadow-[0_20px_50px_rgba(66,60,173,.15)] border border-slate-100 hover:border-[#423CAD]/30 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03]"
                        >
                            {/* Image */}
                            <div className="relative bg-gradient-to-br from-[#f8f7ff] to-white aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className="p-4 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-[#423CAD]/0 group-hover:bg-[#423CAD]/5 transition-colors duration-300" />
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-slate-100">
                                <div className="flex justify-between items-center gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-extrabold text-slate-800 group-hover:text-[#423CAD] text-sm md:text-base truncate transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="mt-0.5 text-slate-500 text-xs">
                                            مشاهده محصولات
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0 flex justify-center items-center bg-[#423CAD]/10 group-hover:bg-[#423CAD] rounded-full w-8 h-8 text-[#423CAD] group-hover:text-white transition-all duration-300">
                                        <Icon
                                            icon="solar:arrow-left-linear"
                                            width={16}
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
