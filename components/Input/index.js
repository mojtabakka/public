import React from "react";
import InputTemplate from "./Input.template";

const Input = (props) => {
  const handleOnKeyDown = (e) => {
    if (
      e.target?.maxLength &&
      e.target?.maxLength !== -1 &&
      e.target.value.split("").length > e.target.maxLength
    )
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };
  return <InputTemplate {...props} onKeyDown={handleOnKeyDown} />;
};

export { Input };
