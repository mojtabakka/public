import React from "react";
import { Modal, Input, Button } from "components";
import { INPUT_NAMES } from "./ModalAddAddress.config";
import { FormProvider } from "react-hook-form";

function ModalAddAddressTemplate({
  onClickClose,
  show,
  loading,
  methodsModal,
  methodsSheet,
  onSubmitModal,
  onSubmitSheet,
}) {
  const content = (id, methods) => (
    <FormProvider {...methods}>
      <form id={id}>
        <div className="md:h-96 lg:h-96   overflow-scroll px-6 mb-4">
          <Input
            label={"نشانی پستی"}
            name={INPUT_NAMES.address}
            validations={{
              required: {
                value: true,
                message: "لطفا این قسمت را پر کنید",
              },
            }}
            // onChange={(e) => onChangInput(e.target.value, INPUT_NAMES.address)}
          />

          <hr />

          <div class="grid grid-cols-2 gap-4 mt-3">
            <div>
              <Input
                label={"استان "}
                name={INPUT_NAMES.state}
                validations={{
                  required: {
                    value: true,
                    message: "لطفا این قسمت را پر کنید",
                  },
                }}
              />
            </div>
            <div>
              <Input
                label={"شهر"}
                name={INPUT_NAMES.city}
                validations={{
                  required: {
                    value: true,
                    message: "لطفا این قسمت را پر کنید",
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-3">
            <Input label={"محله"} name={INPUT_NAMES.district} />
          </div>

          <div class="grid grid-cols-4 gap-4 mt-3">
            <div className="col-span-1">
              <Input
                label={"پلاک"}
                name={INPUT_NAMES.plaque}
                validations={{
                  required: {
                    value: true,
                    message: "لطفا این قسمت را پر کنید",
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <Input label={"واحد"} name={INPUT_NAMES.unit} />
            </div>
            <div className="col-span-2">
              <Input
                name={INPUT_NAMES.postalCode}
                label={"کد پستی"}
                subText="کدپستی باید ۱۰ رقم و بدون خط خوردگی باشد"
                validations={{
                  required: {
                    value: true,
                    message: "لطفا این قسمت را پر کنید",
                  },
                  minLength: {
                    value: 10,
                    message: "لطفا ۱۰ رقم وارد کنید",
                  },
                  maxLength: {
                    value: 10,
                    message: "لطفا ۱۰ رقم وارد کنید",
                  },
                }}
              />
            </div>
          </div>
          <hr className="mt-3" />
          <div className=" grid grid-cols-2 gap-4 mt-3 w-full">
            <div className=" col-span-1">
              <Input name={INPUT_NAMES.receivername} label={"نام گیرنده"} />
            </div>
            <div className=" col-span-1">
              <Input
                name={INPUT_NAMES.receiverlastname}
                label={"نام خانوادگی گیرنده"}
              />
            </div>
          </div>
          <div className=" col-span-1 w-1/2 mt-2">
            <Input
              name={INPUT_NAMES.recivermobile}
              label={"شماره همراه گیرنده "}
              subText="مثال :۰۹۱۲۱۲۳۴۵۶۷"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
  return (
    <Modal
      show={show}
      name
      title="افزودن آدرس"
      onClickClose={onClickClose}
      isForm={true}
      modalContent={content("add-address-modal", methodsModal)}
      modalFooter={
        <>
          <Button
            className="mx-3 w-full"
            type="submit"
            loading={loading}
            form="add-address-modal"
            onClick={onSubmitModal}
          >
            ثبت آدرس
          </Button>
        </>
      }
      sheetContent={content("add-address-sheet", methodsSheet)}
      sheetFooter={
        <>
          <Button
            className="mx-3 w-full"
            type="submit"
            loading={loading}
            form="add-address-sheet"
            onClick={onSubmitSheet}
          >
            ثبت آدرس
          </Button>
        </>
      }
    />
  );
}

export default ModalAddAddressTemplate;
