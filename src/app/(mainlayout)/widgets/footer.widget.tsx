
import { Logo } from "@/components";
import { Card } from "@mui/material";

export default function FooterWidget() {
    return (
        <Card className="bg-white shadow-sm mt-10 border border-slate-100 rounded-lg overflow-hidden">

            {/* Top Section */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-6 md:p-8">

                {/* About */}
                <div>
                    <div className="flex justify-start">
                        <Logo width={100} height={10}/>
                    </div>

                    <p className="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed">
                        آدرس: تهران پاساژ علادین ۲ طبقه چهار پلاک ۳۰۵
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold text-slate-800 text-base md:text-lg">
                        تماس با ما
                    </h3>

                    <ul className="space-y-2 mt-3 text-slate-600 text-xs md:text-sm">
                        <li>📞 09107195182</li>
                        <li>📍 ایران</li>
                        <li>⏰ پشتیبانی: 9 تا 18</li>
                    </ul>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-bold text-slate-800 text-base md:text-lg">
                        شبکه‌های اجتماعی
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            className="bg-slate-50 hover:bg-[#EEF2FF] px-3 py-1.5 rounded-xl text-slate-600 hover:text-[#423CAD] text-xs md:text-sm transition"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://wa.me/989107195182"
                            target="_blank"
                            className="bg-slate-50 hover:bg-[#EEF2FF] px-3 py-1.5 rounded-xl text-slate-600 hover:text-[#423CAD] text-xs md:text-sm transition"
                        >
                            WhatsApp
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            className="bg-slate-50 hover:bg-[#EEF2FF] px-3 py-1.5 rounded-xl text-slate-600 hover:text-[#423CAD] text-xs md:text-sm transition"
                        >
                            LinkedIn
                        </a>


                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-4 border-slate-100 border-t text-center">
                <p className="text-slate-400 text-xs">
                    © {new Date().getFullYear()} تمامی حقوق محفوظ است
                </p>
            </div>

        </Card>
    );
}