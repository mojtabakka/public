"use client";

import { Icon } from "@iconify/react";
import Modal from "../modal";
import { useState } from "react";

export default function ProjectInfoModal() {
    const [show, setShow] = useState<boolean>(true)
    return (
        <Modal
            onClose={() => setShow(false)}
            show={show}
            title={
                <div className="flex items-center gap-2">
                    <Icon
                        icon="solar:info-circle-bold"
                        className="text-xl text-blue-500"
                    />
                    <span>درباره پروژه</span>
                </div>
            }
            sheetContent={
                <div className="max-h-[80vh] overflow-y-auto p-6">
                    {/* Header */}
                    <div className="text-center">

                        <h2 className="text-2xl font-extrabold text-slate-800">
                            فروشگاه اینترنتی
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            این پروژه یک فروشگاه اینترنتی Full Stack است که با استفاده
                            از تکنولوژی‌های مدرن Frontend و Backend پیاده‌سازی شده است.
                        </p>
                    </div>

                    {/* Technologies */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {/* Frontend */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <Icon
                                    icon="solar:code-bold"
                                    className="text-xl text-blue-500"
                                />
                                <h3 className="font-bold text-slate-800">
                                    Frontend
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <TechItem icon="logos:nextjs-icon" title="Next.js" />
                                <TechItem icon="logos:redux" title="Redux Toolkit" />
                                <TechItem icon="logos:material-ui" title="Material UI" />
                                <TechItem icon="logos:tailwindcss-icon" title="Tailwind CSS" />
                            </div>
                        </div>

                        {/* Backend */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <Icon
                                    icon="solar:server-bold"
                                    className="text-xl text-green-500"
                                />
                                <h3 className="font-bold text-slate-800">
                                    Backend
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <TechItem icon="logos:nestjs" title="NestJS" />
                                <TechItem icon="logos:nodejs-icon" title="Node.js" />
                                <TechItem icon="logos:mysql" title="MySQL" />
                                <TechItem icon="logos:redis" title="Redis" />
                                <TechItem icon="logos:typeorm" title="TypeORM" />
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <Icon
                                icon="solar:shield-check-bold"
                                className="text-xl text-blue-600"
                            />
                            <h3 className="font-bold text-slate-800">
                                امکانات پروژه
                            </h3>
                        </div>

                        <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                            <div>✅ مدیریت محصولات</div>
                            <div>✅ مدیریت دسته‌بندی‌ها</div>
                            <div>✅ سبد خرید</div>
                            <div>✅ ثبت سفارش</div>
                            <div>✅ احراز هویت کاربران</div>
                            <div>✅ کشینگ Redis</div>
                            <div>✅ REST API</div>
                            <div>✅ پنل مدیریت</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-slate-400">
                        توسعه داده شده با Next.js و NestJS
                    </div>
                </div>
            }
            modalContent={
                <div className="max-h-[80vh] overflow-y-auto p-6">
                    {/* Header */}
                    <div className="text-center">

                        <h2 className="text-2xl font-extrabold text-slate-800">
                            فروشگاه اینترنتی
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            این پروژه یک فروشگاه اینترنتی Full Stack است که با استفاده
                            از تکنولوژی‌های مدرن Frontend و Backend پیاده‌سازی شده است.
                        </p>
                    </div>

                    {/* Technologies */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {/* Frontend */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <Icon
                                    icon="solar:code-bold"
                                    className="text-xl text-blue-500"
                                />
                                <h3 className="font-bold text-slate-800">
                                    Frontend
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <TechItem icon="logos:nextjs-icon" title="Next.js" />
                                <TechItem icon="logos:redux" title="Redux Toolkit" />
                                <TechItem icon="logos:material-ui" title="Material UI" />
                                <TechItem icon="logos:tailwindcss-icon" title="Tailwind CSS" />
                            </div>
                        </div>

                        {/* Backend */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <Icon
                                    icon="solar:server-bold"
                                    className="text-xl text-green-500"
                                />
                                <h3 className="font-bold text-slate-800">
                                    Backend
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <TechItem icon="logos:nestjs" title="NestJS" />
                                <TechItem icon="logos:nodejs-icon" title="Node.js" />
                                <TechItem icon="logos:mysql" title="MySQL" />
                                <TechItem icon="logos:redis" title="Redis" />
                                <TechItem icon="logos:typeorm" title="TypeORM" />
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <Icon
                                icon="solar:shield-check-bold"
                                className="text-xl text-blue-600"
                            />
                            <h3 className="font-bold text-slate-800">
                                امکانات پروژه
                            </h3>
                        </div>

                        <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                            <div>✅ مدیریت محصولات</div>
                            <div>✅ مدیریت دسته‌بندی‌ها</div>
                            <div>✅ سبد خرید</div>
                            <div>✅ ثبت سفارش</div>
                            <div>✅ احراز هویت کاربران</div>
                            <div>✅ کشینگ Redis</div>
                            <div>✅ REST API</div>
                            <div>✅ پنل مدیریت</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-slate-400">
                        توسعه داده شده با Next.js و NestJS
                    </div>
                </div>
            }
        />
    );
}

function TechItem({
    icon,
    title,
}: {
    icon: string;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md">
            <Icon icon={icon} className="text-2xl" />
            <span className="font-medium text-slate-700">
                {title}
            </span>
        </div>
    );
}