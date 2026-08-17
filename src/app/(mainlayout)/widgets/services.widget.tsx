import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesWidget() {
    const services = [
        {
            title: "مشاوره رایگان",
            description: "قبل از خرید از کارشناسان ما مشاوره تخصصی بگیرید.",
            image: "/images/service1.png",
            button: "دریافت مشاوره",
            href: "/contact",
        },
        {
            title: "نصب و راه‌اندازی",
            description: "اجرای پروژه‌های نظارتی توسط تیم حرفه‌ای در سراسر کشور.",
            image: "/images/service2.png",
            button: "درخواست نصب",
            href: "/installation",
        },
        {
            title: "پکیج‌های تخفیفی",
            description: "پکیج‌های آماده همراه با تخفیف ویژه و گارانتی معتبر.",
            image: "/images/service3.png",
            button: "مشاهده پکیج‌ها",
            href: "/packages",
        },
    ];
    return (
        <section className="mt-20">
            <div className="gap-6 grid md:grid-cols-3">

                {services.map((item) => (
                    <div
                        key={item.title}
                        className="group relative bg-gradient-to-br from-white to-[#f8f7ff] shadow-sm hover:shadow-[0_20px_60px_rgba(66,60,173,.12)] p-8 border border-slate-200 hover:border-[#423CAD]/30 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-500"
                    >
                        {/* Glow */}
                        <div className="-top-20 -left-20 absolute bg-[#423CAD]/10 group-hover:bg-[#423CAD]/20 blur-3xl rounded-full w-40 h-40 transition" />

                        {/* Icon */}
                        <div className="relative flex justify-center items-center mb-2 w-28 h-28">

                            <Image
                                src={item.image}
                                alt={item.title}
                                width={120}
                                height={120}
                                className="object-contain group-hover:scale-110 transition-all group-hover:-translate-y-1 duration-500"
                            />

                        </div>

                        {/* Title */}
                        <h3 className="relative mt-6 font-black text-slate-900 text-xl">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="relative mt-3 text-slate-500 text-sm leading-7">
                            {item.description}
                        </p>

                        {/* Button */}
                        <Link
                            href={item.href}
                            className="inline-flex relative items-center gap-2 bg-[#423CAD] hover:bg-[#312b8d] mt-8 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300"
                        >
                            {item.button}

                            <Icon
                                icon="solar:arrow-left-linear"
                                width={18}
                            />
                        </Link>
                    </div>
                ))}

            </div>
        </section>
    );
}