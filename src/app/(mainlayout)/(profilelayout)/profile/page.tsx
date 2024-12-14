"use client"
import React, { useEffect, useState } from "react";
import { Button, Form, InputLable, TextFiled } from "@/components";
import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
// import { z as zod } from 'zod'
import { useForm } from "react-hook-form";
import { User } from "@/types/user.type";
import { toast } from "sonner";
import { isArray } from "lodash";
const INPUT_NAMES = {
    name: "name",
    lastname: "lastName",
    nationalCode: "nationalCode",
    email: "email",
    phoneNumber: "phoneNumber",
    password: "password",
    birthDate: "birthDate"
};

export default function Profile() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        getProfileUser();
    }, []);
    const getProfileUser = async () => {
        const promise = fetchInstance(endpoints.user.user, { cache: "no-cache" });
        toast.promise(promise, {
            loading: "لطفا منتظر بمانید",
            error: (error) => (isArray(error?.message) ? error?.message[0] : error.message) || "مشکلی پیش آمده لطفا بعدا امتحان کنید",
        });
        try {
            const user = await promise
            console.log(user.data)
            setUser(user.data);
        } catch (error) {
            console.log('error', error)
        }
    };

    const defaultValues = {
        name: user?.name || "",
        // lastName: user?.lastName || "",
        // nationalCode: user?.nationalCode || "",
        // email: user?.email || "",
        // phoneNumber: user?.phoneNumber || "",
        // password: user?.password || "",
        // birthDate: "f"
    };
    // const UserQuickEditSchema = zod.object({
    //     name: zod.string().trim().min(1, { message: "نام را وارد کنید" }),
    //     lastName: zod.string().trim().min(1, { message: "نام خانوادگی را وارد کنید" }),
    //     nationalCode: zod.string().trim().min(1, { message: " کدملی را وارد کنید" }),
    //     email: zod.string().trim().min(1, { message: " ایمیل را وارد کنید" }),
    //     phoneNumber: zod.string().trim().min(1, { message: " شماره تلفن همراه را وارد کنید" }),
    //     password: zod.string().trim().min(1, { message: " رمز عبور را وارد" }),
    //     birthDate: zod.string().trim().min(1, { message: " تاریخ تولد را وارد کنید" }),
    // });

    const methods = useForm({
        mode: 'all',
        defaultValues,
        // resolver: zodResolver(UserQuickEditSchema),
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        console.log(data)
        const promise = fetchInstance(endpoints.user.user, { method: "PATCH", body: { ...data } })
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
        <div className=" bg-white rounded w-full h-full p-5 mt-5">
            <Form
                methods={methods}
                onSubmit={onSubmit}>
                <div className=" lg:flex  lg:justify-center md:flex  md:justify-center w-full">
                    <div className="w-full px-3 ">
                        <div className="py-1">
                            <InputLable>نام</InputLable>
                            <TextFiled
                                name={INPUT_NAMES.name}
                            />
                        </div>
                        <div className="py-1">
                            <InputLable>شماره ملی</InputLable>
                            <TextFiled
                                name={INPUT_NAMES.nationalCode}
                            />
                        </div>
                        <div className="py-1">
                            <InputLable>شماره تلفن همراه</InputLable>
                            <TextFiled
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
                    <div className="w-full px-3">
                        <div className="p-1">
                            <InputLable>نام خانوادگی</InputLable>
                            <TextFiled
                                name={INPUT_NAMES.lastname}
                            />
                        </div>
                        <div className="p-1">

                            <InputLable>تاریخ تولد</InputLable>
                            <TextFiled
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
                <div className=" text-left p-4">
                    <Button type="submit" variant="contained" loading={isSubmitting}>تایید</Button>
                </div>
            </Form>

        </div>

    );
}
