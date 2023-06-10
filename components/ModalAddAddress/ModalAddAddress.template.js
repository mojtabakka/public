import React from "react";
import { Modal, Input, Button } from "components";
import { INPUT_NAMES } from "./ModalAddAddress.config";

function ModalAddAddressTemplate({ onClickClose, show, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit}>
      <Modal
        show={show}
        title="افزودن آدرس"
        onClickClose={onClickClose}
        footer={
          <>
            <Button className="mx-3" type="submit" loading={loading}>
              تایید
            </Button>
          </>
        }
      >
        {/* {addresses.map((item) => {})} */}
        <Input label={"نشانی پستی"} name={INPUT_NAMES.address} />
        <hr />

        <div class="grid grid-cols-2 gap-4 mt-3">
          <div>
            <Input label={"استان "} name={INPUT_NAMES.state} />
          </div>
          <div>
            <Input label={"شهر"} name={INPUT_NAMES.city} />
          </div>
        </div>

        <div className="mt-3">
          <Input label={"محله"} name={INPUT_NAMES.district} />
        </div>

        <div class="grid grid-cols-4 gap-4 mt-3">
          <div className="col-span-1">
            <Input label={"پلاک"} name={INPUT_NAMES.plaque} />
          </div>
          <div className="col-span-1">
            <Input label={"واحد"} name={INPUT_NAMES.unit} />
          </div>
          <div className="col-span-2">
            <Input
              name={INPUT_NAMES.postalCode}
              label={"کد پستی"}
              subText="کدپستی باید ۱۰ رقم و بدون خط خوردگی باشد"
            />
          </div>
        </div>
      </Modal>
    </form>
  );
}

export default ModalAddAddressTemplate;
