import React, { useState } from "react";
import ModalAddAddressTemplate from "./ModalAddAddress.template";
import { addAddresses } from "api";
import { isFunction } from "utils/function.util";
import { useForm } from "react-hook-form";
import { INPUT_NAMES } from "./ModalAddAddress.config";

const ModalAddAddress = (props) => {
  const methodsModal = useForm();
  const methodsSheet = useForm();
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    [INPUT_NAMES.plaque]: "",
    [INPUT_NAMES.unit]: null,
    [INPUT_NAMES.state]: null,
    [INPUT_NAMES.district]: null,
    [INPUT_NAMES.city]: null,
    [INPUT_NAMES.postalCode]: null,
    [INPUT_NAMES.address]: "hello",
    [INPUT_NAMES.receiverlastname]: null,
    [INPUT_NAMES.receiverlastname]: null,
    [INPUT_NAMES.recivermobile]: null,
  });

  const handleSubmitModal = methodsModal.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const result = await addAddresses(data);
      // target.reset();
      isFunction(props.onResult) && result && props.onResult(result);
    } catch (error) {
      // isFunction(props.onResult) && props.onResult();
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const handleSubmitSheet = methodsSheet.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const result = await addAddresses(data);
      // target.reset();
      isFunction(props.onResult) && result && props.onResult(result);
    } catch (error) {
      // isFunction(props.onResult) && props.onResult();
      console.log(error);
    } finally {
      setLoading(false);
    }
  });
  const handleChangeInput = (value, inputName) => {
    formValue[inputName] = value;
    setFormValue({ ...formValue });
  };
  return (
    <ModalAddAddressTemplate
      {...props}
      onSubmitModal={handleSubmitModal}
      onSubmitSheet={handleSubmitSheet}
      loading={loading}
      methodsModal={methodsModal}
      methodsSheet={methodsSheet}
      formValue={formValue}
      onChangInput={handleChangeInput}
    />
  );
};

export { ModalAddAddress };
