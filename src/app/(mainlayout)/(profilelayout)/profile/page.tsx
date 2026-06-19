"use client"
import React, { useEffect, useState } from "react";
import { Button, Form, InputLable, TextFiled } from "@/components";
import { z as zod } from 'zod'
import { useForm } from "react-hook-form";
import { User } from "@/types/user.type";
import { isArray } from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
export const dynamic = "force-dynamic";

const INPUT_NAMES = {
    name: "name",
    lastname: "lastName",
    nationalCode: "nationalCode",
    email: "email",
    phoneNumber: "phoneNumber",
    password: "password",
    birthDate: "birthDate"
};
import moment from '@/utils/momentJalali.util'
import { getUser } from "./actions";
import toast from "react-hot-toast";
import { editUser } from "@/actions/user.action";

export default function Profile() {
    const [user, setUser] = useState<User>();
    const [defaultValues, setDefaultValues] = useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        nationalCode: user?.nationalCode || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        password: user?.password || "",
        birthDate: ""
    })
    useEffect(() => {
        getProfileUser();
    }, []);
    const getProfileUser = async () => {
        const promise = getUser()
        toast.promise(promise, {
            loading: "لطفا منتظر بمانید",
            error: (error) => (isArray(error?.message) ? error?.message[0] : error.message) || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
        });
        try {

            const user = await promise

            setValue("name", user.data.name || "");
            setValue("lastName", user.data.lastName || "");
            setValue("nationalCode", user.data.nationalCode || "");
            setValue("phoneNumber", user.data.phoneNumber || "");
            setValue("email", user.data.email || "");
            setValue("birthDate", moment(user?.data?.birthDate).format('jYYYY/jMM/jDD') || "");
            setDefaultValues({
                name: "",
                lastName: "",
                nationalCode: "",
                email: "",
                phoneNumber: "",
                password: "",
                birthDate: "",
            })
            setUser(user.data);
        } catch (error) {
            console.log('error', error)
        }
    };
    const UserQuickEditSchema = zod.object({
        name: zod.string().trim().min(1, { message: "نام را وارد کنید" }),
        lastName: zod.string().trim().min(1, { message: "نام خانوادگی را وارد کنید" }),
        nationalCode: zod
            .string()
            .trim()
            .min(10, { message: "کدملی باید حداقل ۱۰ رقم باشد" })
            .max(10, { message: "کدملی باید حداکثر ۱۰ رقم باشد" })
            .regex(/^\d{10}$/, { message: "کدملی فقط باید شامل اعداد باشد" }),
        email: zod
            .string()
            .trim()
            .email({ message: "ایمیل معتبر وارد کنید" }),
        phoneNumber: zod.string().trim().min(11, { message: "شماره تلفن همراه باید 11 رقم باشد" }).max(11, { message: "شماره تلفن همراه باید 11 رقم باشد" }).regex(/^09\d{9}$/, { message: "شماره تلفن همراه باید با 09 شروع شود" }),
        password: zod
            .string()
            .trim()
            .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }).optional(),
        birthDate: zod
            .string()
            .trim()
            .regex(/^\d{4}\/\d{2}\/\d{2}$/, { message: "تاریخ تولد باید به فرمت YYYY/MM/DD باشد" }),
    });

    const methods = useForm({
        mode: 'all',
        defaultValues,
        resolver: zodResolver(UserQuickEditSchema),
    });
    const {
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = methods;
    const onSubmit = handleSubmit(async (data) => {
        data.birthDate = moment(data.birthDate, "jYYYY/jMM/jDD").format("YYYY/MM/DD");
        const promise = editUser(data)
        toast.promise(promise, {
            loading: "لطفا منتظر بمانید",
            success: "ویرایش اطلاعات شما با موفقیت انجام شد ",
            error: (error) => (isArray(error?.message) ? error?.message[0] : error.message) || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
        });
        try {
            await promise;
        } catch (error) {
            console.log('error', error)
        }
    });
    return (
        <div className="bg-white mt-5 p-5 rounded w-full h-full">
            <Form
                methods={methods}
                onSubmit={onSubmit}>
                <div className="md:flex lg:flex md:justify-center lg:justify-center w-full">
                    <div className="px-3 w-full">
                        <div className="py-1">
                            <InputLable>نام</InputLable>
                            <TextFiled
                                name={INPUT_NAMES.name}
                            />
                        </div>
                        <div className="py-1">
                            <InputLable >شماره ملی</InputLable>
                            <TextFiled
                                mask="9999999999"
                                textAlign="right"
                                name={INPUT_NAMES.nationalCode}
                            />
                        </div>
                        <div className="py-1">
                            <InputLable>شماره تلفن همراه</InputLable>
                            <TextFiled
                                textAlign="right"
                                mask="99999999999"
                                name={INPUT_NAMES.phoneNumber}
                            />
                        </div>
                        <div className="p-1">
                            <InputLable>ایمیل</InputLable>
                            <TextFiled
                                type="email"
                                name={INPUT_NAMES.email}
                            />
                        </div>
                    </div>
                    <div className="px-3 w-full">
                        <div className="p-1">
                            <InputLable>نام خانوادگی</InputLable>
                            <TextFiled
                                name={INPUT_NAMES.lastname}
                            />
                        </div>
                        <div className="p-1">

                            <InputLable>تاریخ تولد</InputLable>
                            <TextFiled
                                textAlign="right"
                                mask="9999/99/99"
                                name={INPUT_NAMES.birthDate}
                            />
                        </div>
                        <div className="p-1">

                            <InputLable>رمز عبور</InputLable>
                            <TextFiled
                                type="password"
                                name={INPUT_NAMES.password}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-4 text-left">
                    <Button type="submit" variant="contained" loading={isSubmitting}>تایید</Button>
                </div>
            </Form>

        </div>

    );
}
