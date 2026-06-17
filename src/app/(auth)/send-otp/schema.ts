import { z as zod } from "zod";
export const LoginSchema = zod.object({
    phoneNumber: zod
        .string()
        .min(1, { message: "شماره موبایل را وارد کنید" })
        .transform((val) => val.replace(/\s/g, "")) // حذف فاصله‌ها
        .refine((val) => /^09\d{9}$/.test(val), {
            message: "شماره موبایل معتبر نیست",
        }),
});