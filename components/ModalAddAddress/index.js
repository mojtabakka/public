import React from "react";
import ModalAddAddressTemplate from "./ModalAddAddress.template";
import { addAddresses } from "api";
import { isFunction } from "utils/function.util";

const ModalAddAddress = (props) => {
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const form = new FormData(event.target);
      const data = Object.fromEntries(form);
      const result = await addAddresses(data);
      isFunction(props.onResult) && props.onResult(result);
    } catch (error) {
      isFunction(props.onResult) && props.onResult();
      console.log(error);
    } finally {
    }
  };
  return <ModalAddAddressTemplate {...props} onSubmit={handleSubmit} />;
};

export { ModalAddAddress };
