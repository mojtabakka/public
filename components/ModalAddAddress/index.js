import React, { useState } from "react";
import ModalAddAddressTemplate from "./ModalAddAddress.template";
import { addAddresses } from "api";
import { isFunction } from "utils/function.util";

const ModalAddAddress = (props) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    setLoading(true);
    try {
      event.preventDefault();
      const form = new FormData(event.target);
      const data = Object.fromEntries(form);
      const result = await addAddresses(data);
      console.log("rresult", result);

      event.target.reset();
      isFunction(props.onResult) && result && props.onResult(result);
    } catch (error) {
      // isFunction(props.onResult) && props.onResult();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalAddAddressTemplate
      {...props}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export { ModalAddAddress };
