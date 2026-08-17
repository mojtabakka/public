"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { Autoplay } from "swiper/modules";

import "swiper/css";

const slides = [
  {
    image: "/images/hero1.png",
    badge: "سیستم‌های امنیتی هوشمند",
    title: "امنیت را\nحرفه‌ای تجربه کنید",
    description:
      "فروش انواع دوربین مداربسته، دستگاه DVR و NVR، تجهیزات شبکه و نصب تخصصی با بهترین قیمت.",
  },
  {
    image: "/images/hero2.png",
    badge: "دوربین‌های حرفه‌ای",
    title: "نظارت دقیق\nدر هر لحظه",
    description:
      "دوربین‌های دام، بولت و اسپیددام با کیفیت تصویر فوق‌العاده و دید در شب.",
  },
  {
    image: "/images/hero3.png",
    badge: "پکیج‌های کامل",
    title: "همه تجهیزات\nدر یک پکیج",
    description:
      "پکیج‌های آماده نصب شامل دوربین، DVR، هارد و تجهیزات جانبی.",
  },
  {
    image: "/images/hero4.png",
    badge: "نصب تخصصی",
    title: "از خرید تا\nراه‌اندازی",
    description:
      "مشاوره رایگان، نصب تخصصی و پشتیبانی کامل توسط تیم حرفه‌ای.",
  },
];

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[500px] sm:h-[450px] md:h-[500px] lg:h-[500px] overflow-hidden">

              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#120D38_10%,rgba(66,60,173,.75)_40%,rgba(66,60,173,.2)_70%,transparent_100%)]" />

              {/* Content */}
              <div className="absolute inset-0 flex md:justify-end items-end md:items-center">

                <div className="md:flex md:justify-end px-5 sm:px-8 md:px-12 lg:px-20 pb-20 lg:pb-0 w-full">

                  <div className="max-w-full md:max-w-xl text-right">

                    <span className="inline-flex bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-full text-white text-xs sm:text-sm">
                      {slide.badge}
                    </span>

                    <h1 className="mt-4 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight whitespace-pre-line">
                      {slide.title}
                    </h1>

                    <p className="mt-4 md:mt-6 text-gray-200 text-sm sm:text-base md:text-lg leading-7 md:leading-9">
                      {slide.description}
                    </p>

                    <div className="flex sm:flex-row flex-col sm:justify-end gap-3 mt-8">

                      <button className="bg-white px-6 py-3 rounded-xl font-bold text-[#423CAD] hover:scale-105 transition duration-300">
                        مشاهده محصولات
                      </button>

                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 border border-white/20 rounded-xl text-white transition duration-300">
                        مشاوره رایگان
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      <div className="right-5 md:right-8 lg:right-10 bottom-5 md:bottom-8 lg:bottom-10 z-20 absolute flex gap-3">

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="group flex justify-center items-center bg-white/10 hover:bg-[#423CAD] backdrop-blur-xl border border-white/20 rounded-full w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 text-white transition-all duration-300"
        >
          <Icon
            icon="solar:arrow-right-linear"
            className="text-lg md:text-xl lg:text-2xl transition-transform group-hover:translate-x-1 duration-300"
          />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="group flex justify-center items-center bg-white/10 hover:bg-[#423CAD] backdrop-blur-xl border border-white/20 rounded-full w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 text-white transition-all duration-300"
        >
          <Icon
            icon="solar:arrow-left-linear"
            className="text-lg md:text-xl lg:text-2xl transition-transform group-hover:-translate-x-1 duration-300"
          />
        </button>

      </div>
    </section >
  );
}