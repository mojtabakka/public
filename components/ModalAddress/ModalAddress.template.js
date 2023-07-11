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
    <>
      <form onSubmit={onSubmit}>
        <Modal
          show={show}
          title="انتخاب آدرس"
          onClickClose={onClickClose}
          footer={
            !isEmptyArray(addresses) && (
              <div
                className="text-blue-400 cursor-pointer"
                onClick={onClickAddAddress}
              >
                <BiLocationPlus className=" inline-block text-lg" />

                <span className="px-2 text-medium">افزودن ادرس جدید</span>
              </div>
            )
          }
        >
          <div className="lg:h-96 md:h-96 overflow-scroll">
            {!isEmptyArray(addresses) ? (
              addresses.map((item, index) => {
                return (
                  <div
                    className="border mt-2  rounded-lg p-3 flex items-center bg-white "
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
                        <span className=" mx-2 text-gray-400 ">
                          {" "}
                          {item.postalCode}
                        </span>
                      </div>

                      <div className="my-4">
                        <CiMobile1 className=" inline-block text-base" />
                        <span className=" mx-2 text-gray-400 ">
                          {" "}
                          {item.recivermobile}
                        </span>
                      </div>

                      <div className="my-4">
                        <BsPerson className=" inline-block text-base" />
                        <span className=" mx-2 text-gray-400 ">
                          {" "}
                          {item.receivername} {item.receiverlastname}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center h-full">
                <span onClick={onClickAddAddress} className=" cursor-pointer">
                  <div className="text-center flex justify-center">
                    <BiLocationPlus className="  text-5xl text-blue-400" />
                  </div>
                  <div className="px-2 text-medium text-blue-400">
                    افزودن ادرس جدید
                  </div>
                </span>
              </div>
            )}
          </div>
        </Modal>
      </form>
      <Loading show={loading} />
    </>
  );
}

export default ModalAddressTemplate;
