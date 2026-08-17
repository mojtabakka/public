"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
    "/images/hero1.png",
    "/images/hero2.png",
    "/images/hero3.png",
    "/images/hero4.png",
];

export default function Hero() {
    return (
        <section className="mx-auto mt-10 container">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 5000,
                }}
                pagination={{
                    clickable: true,
                }}
                loop
                className="rounded-3xl overflow-hidden"
            >
                {slides.map((image) => (
                    <SwiperSlide key={image}>
                        <div className="relative h-[560px]">

                            <Image
                                src={image}
                                fill
                                alt=""
                                className="object-cover"
                                priority
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-[#120d38]/95 via-[#423CAD]/50 to-transparent" />

                            <div className="absolute inset-0 flex items-center">

                                <div className="px-20 max-w-xl">

                                    <span className="inline-block bg-white/10 backdrop-blur mb-4 px-4 py-2 rounded-full text-white">
                                        سیستم های امنیتی هوشمند
                                    </span>

                                    <h1 className="font-black text-white text-6xl leading-tight">
                                        امنیت را
                                        <br />
                                        حرفه‌ای تجربه کنید
                                    </h1>

                                    <p className="mt-6 text-gray-200 text-lg leading-9">
                                        فروش انواع دوربین مداربسته، دستگاه DVR و NVR،
                                        تجهیزات شبکه و نصب تخصصی در سراسر کشور.
                                    </p>

                                    <div className="flex gap-4 mt-10">

                                        <button className="bg-white px-8 py-4 rounded-xl font-bold text-[#423CAD]">
                                            مشاهده محصولات
                                        </button>

                                        <button className="bg-white/10 backdrop-blur px-8 py-4 border border-white/40 rounded-xl text-white">
                                            مشاوره رایگان
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}