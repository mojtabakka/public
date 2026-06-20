"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isFunction } from "lodash";

import Form from "../form";
import { Button, InputLable, TextFiled } from "..";
import ModalFooter from "../modal/modalFooter";

import { fetchInstance } from "@/utils/fetch";
import { endpoints } from "@/utils/end-points";
import { Address } from "@/types/address.type";

export const INPUT_NAMES = {
  plaque: "plaque",
  unit: "unit",
  state: "state",
  district: "district",
  city: "city",
  postalCode: "postalCode",
  address: "address",
  receivername: "receivername",
  receiverlastname: "receiverlastname",
  recivermobile: "recivermobile",
};

interface PropsType {
  address?: Address;
  onResult: (data: Address) => void;
}

const UserQuickEditSchema = zod.object({
  plaque: zod
    .string()
    .trim()
    .min(1, { message: "پلاک را وارد کنید" }),

  state: zod
    .string()
    .trim()
    .min(1, { message: "استان را وارد کنید" }),

  city: zod
    .string()
    .trim()
    .min(1, { message: "شهر را وارد کنید" }),

  postalCode: zod
    .string()
    .trim()
    .min(10, { message: "کدپستی باید 10 رقم باشد" }),

  address: zod
    .string()
    .trim()
    .min(5, { message: "نشانی پستی را وارد کنید" }),

  receivername: zod
    .string()
    .trim()
    .min(1, { message: "نام گیرنده را وارد کنید" }),

  receiverlastname: zod
    .string()
    .trim()
    .min(1, { message: "نام خانوادگی گیرنده را وارد کنید" }),

  recivermobile: zod
    .string()
    .trim()
    .min(11, { message: "شماره همراه معتبر وارد کنید" }),
});

export default function ModalForm(props: PropsType) {
  const defaultValues = {
    plaque: props.address?.plaque ?? "",
    unit: props.address?.unit ?? "",
    state: props.address?.state ?? "",
    district: props.address?.district ?? "",
    city: props.address?.city ?? "",
    postalCode: props.address?.postalCode ?? "",
    address: props.address?.address ?? "",
    receivername: props.address?.receivername ?? "",
    receiverlastname: props.address?.receiverlastname ?? "",
    recivermobile: props.address?.recivermobile ?? "",
  };

  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: zodResolver(UserQuickEditSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!props.address) {
        const result = await fetchInstance(
          endpoints.address.addAddress,
          {
            method: "POST",
            body: { ...data },
          }
        );

        if (isFunction(props.onResult) && result) {
          props.onResult(result.data);
        }
      } else {
        const result = await fetchInstance(
          `${endpoints.address.addAddress}/${props.address.id}`,
          {
            method: "PATCH",
            body: { ...data },
          }
        );

        if (isFunction(props.onResult) && result) {
          props.onResult(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      id="add-address-form-id"
    >
      <div className="space-y-6 px-6 py-5">
        {/* Address Section */}
        <div className="bg-gray-50/50 p-5 border border-gray-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Icon
              icon="mdi:map-marker-outline"
              className="text-blue-500 text-xl"
            />

            <h3 className="font-bold text-gray-800">
              اطلاعات آدرس
            </h3>
          </div>

          <div>
            <InputLable>نشانی پستی</InputLable>

            <TextFiled
              name={INPUT_NAMES.address}
              multiline
              rows={4}
              placeholder="خیابان، کوچه، پلاک و سایر جزئیات آدرس"
            />
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-4">
            <div>
              <InputLable>استان</InputLable>

              <TextFiled
                name={INPUT_NAMES.state}
                placeholder="مثال: تهران"
              />
            </div>

            <div>
              <InputLable>شهر</InputLable>

              <TextFiled
                name={INPUT_NAMES.city}
                placeholder="مثال: تهران"
              />
            </div>
          </div>

          <div className="mt-4">
            <InputLable>محله</InputLable>

            <TextFiled
              name={INPUT_NAMES.district}
              placeholder="مثال: سعادت آباد"
            />
          </div>
        </div>

        {/* Building Section */}
        <div className="p-5 border border-gray-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Icon
              icon="mdi:home-outline"
              className="text-orange-500 text-xl"
            />

            <h3 className="font-bold text-gray-800">
              مشخصات ساختمان
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div>
              <InputLable>پلاک</InputLable>

              <TextFiled
                name={INPUT_NAMES.plaque}
                placeholder="پلاک"
              />
            </div>

            <div>
              <InputLable>واحد</InputLable>

              <TextFiled
                name={INPUT_NAMES.unit}
                placeholder="واحد"
              />
            </div>

            <div className="md:col-span-2">
              <InputLable>کد پستی</InputLable>

              <TextFiled
                name={INPUT_NAMES.postalCode}
                mask="9999999999"
                textAlign="right"
                placeholder="کد پستی 10 رقمی"
              />
            </div>
          </div>
        </div>

        {/* Receiver Section */}
        <div className="p-5 border border-gray-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Icon
              icon="mdi:account-outline"
              className="text-green-500 text-xl"
            />

            <h3 className="font-bold text-gray-800">
              اطلاعات گیرنده
            </h3>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <InputLable>نام گیرنده</InputLable>

              <TextFiled
                name={INPUT_NAMES.receivername}
                placeholder="نام"
              />
            </div>

            <div>
              <InputLable>
                نام خانوادگی گیرنده
              </InputLable>

              <TextFiled
                name={INPUT_NAMES.receiverlastname}
                placeholder="نام خانوادگی"
              />
            </div>
          </div>

          <div className="mt-4 md:w-1/2">
            <InputLable>شماره همراه گیرنده</InputLable>

            <TextFiled
              name={INPUT_NAMES.recivermobile}
              mask="09999999999"
              textAlign="right"
              placeholder="09123456789"
            />
          </div>
        </div>
      </div>

      <ModalFooter className="hidden md:flex justify-end bg-white px-6 py-4 border-t">
        <Button
          variant="contained"
          type="submit"
          loading={isSubmitting}
          className="w-full md:w-auto min-w-[160px]"
        >
          {props.address
            ? "ذخیره تغییرات"
            : "افزودن آدرس"}
        </Button>
      </ModalFooter>
    </Form>
  );
}