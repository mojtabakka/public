import React from "react";
import { Modal } from "components";
import { isEmptyArray } from "utils/function.util";
import { AiOutlineMail } from "react-icons/ai";
import { CiMobile1 } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { BiLocationPlus } from "react-icons/bi";
import { Input } from "components";
import { Loading } from "../Loading";

function ModalAddressTemplate({
  onClickClose,
  show,
  onSubmit,
  loading,
  addresses,
  onChangeRadio,
  onClickAddAddress,
}) {
  return (
    <form onSubmit={onSubmit}>
      <Modal
        show={show}
        title="انتخاب آدرس"
        onClickClose={onClickClose}
        footer={
          <div
            className="text-blue-400 cursor-pointer"
            onClick={onClickAddAddress}
          >
            <BiLocationPlus className=" inline-block text-lg" />
            <span className="px-2 text-medium">افزودن ادرس جدید</span>
          </div>
        }
      >
        {!isEmptyArray(addresses) &&
          addresses.map((item, index) => {
            return (
              <div
                className="border mt-2  rounded-lg p-3 flex items-center "
                key={index}
              >
                <div className="mx-5">
                  <Input
                    type="radio"
                    name="active"
                    value={item.id}
                    onChange={onChangeRadio}
                    checked={item.active}
                  />
                </div>
                <div>
                  <div className="my-4">
                    <AiOutlineMail className=" inline-block text-base" />
                    <span className=" mx-2 text-gray-400 "> hdlld</span>
                  </div>

                  <div className="my-4">
                    <CiMobile1 className=" inline-block text-base" />
                    <span className=" mx-2 text-gray-400 "> hdlld</span>
                  </div>

                  <div className="my-4">
                    <BsPerson className=" inline-block text-base" />
                    <span className=" mx-2 text-gray-400 "> hdlld</span>
                  </div>
                </div>
              </div>
            );
          })}
      </Modal>
      <Loading show={loading} />
    </form>
  );
}

export default ModalAddressTemplate;
