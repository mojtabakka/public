"use client"

import React from 'react'
import Form from '../form';
import { Button, InputLable, TextFiled } from '..';
import { useForm } from 'react-hook-form';
import ModalFooter from '../modal/modalFooter';
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchInstance } from '@/utils/fetch';
import { isFunction } from 'lodash';
import { Address } from '@/types/address.type';
import { endpoints } from '@/utils/end-points';
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

interface propsType {
  address?: Address | undefined
  onResult: (data: Address) => void
}

export default function ModalForm(props: propsType) {
  const defaultValues = {
    plaque: props.address ? props.address.plaque : "",
    unit: props.address ? props.address.unit : "",
    state: props.address ? props.address.state : "",
    district: props.address ? props.address.district : "",
    city: props.address ? props.address.city : "",
    postalCode: props.address ? props.address.postalCode : "",
    address: props.address ? props.address.address : "",
    receivername: props.address ? props.address.receiverlastname : "",
    receiverlastname: props.address ? props.address.receiverlastname : "",
    recivermobile: props.address ? props.address.recivermobile : "",
  };
  const UserQuickEditSchema = zod.object({
    plaque: zod.string().trim().min(1, { message: "پلاک را وارد کنید" }),
    state: zod.string().trim().min(1, { message: "استان را وارد کنید" }),
    city: zod.string().trim().min(1, { message: "لطفا شهر را وارد کنید" }),
    postalCode: zod.string().trim().min(1, { message: "لطفا کد پستی را وارد کنید" }),
    address: zod.string().trim().min(1, { message: "لطفا نشانی پستی را وارد کنید" }),
  });
  const methods = useForm({
    mode: 'all',
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
        const result = await fetchInstance(endpoints.address.addAddress, { method: "POST", body: { ...data } })
        if (isFunction(props.onResult) && result) props.onResult(result.data);
      }
      if (props.address) {
        const result = await fetchInstance(`${endpoints.address.addAddress}/${props?.address?.id}`, { method: "PATCH", body: { ...data } })
        if (isFunction(props.onResult) && result) props.onResult(result.data);
      }
    } catch (error) {
      // isFunction(props.onResult) && props.onResult();
      console.log(error);
    }
  });
  return (
    <Form methods={methods} onSubmit={onSubmit} id="add-address-form-id">
      <div className="mb-4 px-6 pt-5 pb-3 lg:pb-0 overflow-scrollf">

        <InputLable>نشانی پستی</InputLable>
        <TextFiled
          name={INPUT_NAMES.address}
        />
        <hr />
        <div className="gap-4 grid grid-cols-2 mt-3">
          <div>
            <InputLable>استان</InputLable>
            <TextFiled
              name={INPUT_NAMES.state}
            />
          </div>
          <div>
            <InputLable>شهر</InputLable>
            <TextFiled
              name={INPUT_NAMES.city}
            />
          </div>
        </div>

        <div className="mt-3">
          <InputLable>محله</InputLable>
          <TextFiled
            name={INPUT_NAMES.district}
          />
        </div>

        <div className="gap-4 grid grid-cols-4 mt-3">

          <div className="col-span-1">
            <InputLable>پلاک</InputLable>
            <TextFiled
              name={INPUT_NAMES.plaque}
            />
          </div>

          <div className="col-span-1">
            <InputLable>واحد</InputLable>
            <TextFiled name={INPUT_NAMES.unit}
            />
          </div>
          <div className="col-span-2">
            <InputLable>کدپستی</InputLable>
            <TextFiled
              name={INPUT_NAMES.postalCode}
              mask='99999999999'
              textAlign='right'
            // subText="کدپستی باید ۱۰ رقم و بدون خط خوردگی باشد"
            />
          </div>
        </div>
        <hr className="mt-3" />
        <div className="gap-4 grid grid-cols-2 mt-3 w-full">
          <div className="col-span-1">
            <InputLable>نام گیرنده</InputLable>
            <TextFiled
              name={INPUT_NAMES.receivername}
            />
          </div>
          <div className="col-span-1">
            <InputLable>نام و نام خانوادگی گیرنده</InputLable>
            <TextFiled
              name={INPUT_NAMES.receiverlastname}
            />
          </div>
        </div>
        <div className="col-span-1 mt-2 w-1/2">
          <InputLable>شماره همراه گیرنده</InputLable>
          <TextFiled
            textAlign='right'
            name={INPUT_NAMES.recivermobile}
            mask='99999999999'
          />
        </div>
      </div>
    </Form >
  )
}

