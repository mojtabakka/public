"use client";

import { Icon } from "@iconify/react";

const features = [
    {
        title: "ارسال سریع",
        description: "ارسال به سراسر کشور",
        icon: "solar:delivery-bold",
    },
    {
        title: "ضمانت بازگشت",
        description: "۷ روز ضمانت بازگشت کالا",
        icon: "solar:shield-check-bold",
    },
    {
        title: "پشتیبانی ۲۴ ساعته",
        description: "همیشه کنار شما هستیم",
        icon: "solar:headphones-round-bold",
    },
    {
        title: "گارانتی معتبر",
        description: "ضمانت اصالت کالا",
        icon: "solar:verified-check-bold",
    },
];

export default function FeaturesWidget() {
    return (
        <section className="mx-auto container py-4">
            <div className="mb-6 md:mb-10 text-center">
                <h2 className="font-black text-slate-900 text-xl sm:text-2xl md:text-3xl">
                    چرا از عقاب استفاده کنید؟
                </h2>
                <p className="mt-2 text-slate-500 text-sm">
                    تضمینی برای خرید آسان و مطمئن
                </p>
            </div>

            <div className="gap-3 lg:gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">

                {features.map((item) => (
                    <div
                        key={item.title}
                        className="group bg-white/90 shadow-lg hover:shadow-2xl backdrop-blur-xl p-4 md:p-6 border border-gray-200 hover:border-[#423CAD]/30 rounded-lg md:rounded-lg transition-all hover:-translate-y-2 duration-300"
                    >
                         <div className="flex justify-center items-center bg-gradient-to-br from-[#423CAD] to-[#6A63F6] shadow-lg mx-auto rounded-xl md:rounded-xl w-14 md:w-16 h-14 md:h-16 text-white group-hover:scale-110 transition-all duration-300">

                            <Icon
                                icon={item.icon}
                                className="text-2xl md:text-3xl"
                            />

                        </div>

                        <h3 className="mt-4 md:mt-5 font-extrabold text-gray-900 text-sm md:text-lg text-center">
                            {item.title}
                        </h3>

                        <p className="mt-2 text-gray-500 text-xs md:text-sm text-center leading-5 md:leading-6">
                            {item.description}
                        </p>

                    </div>
                ))}

            </div>
        </section>
    );
}