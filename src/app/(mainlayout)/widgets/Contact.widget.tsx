import { Card } from "@mui/material";

export default function ContactWidget() {
    return (
        <Card className="bg-white shadow-sm p-4 sm:p-6 md:p-8 border border-slate-100 rounded-lg text-center">

            {/* Title */}
            <h2 className="font-bold text-[#423CAD] text-base sm:text-lg md:text-xl">
                نیاز به مشاوره دارید؟
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
                قبل از خرید با کارشناسان ما تماس بگیرید
            </p>

            {/* Button */}
            <a
                href="tel:09107195182"
                className="inline-flex justify-center items-center bg-[#423CAD] hover:bg-[#3730A3] mt-5 px-5 py-3 rounded-xl w-full sm:w-auto font-bold text-white text-xs sm:text-base active:scale-[0.98] transition"
            >
                تماس با کارشناس
            </a>

        </Card>
    );
}