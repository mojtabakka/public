import React from "react";
import InputTemplate from "./Input.template";

const Input = (props) => {
  const handleOnKeyDown = (e) => {
    if (e.target.max && e.target.value.split("").length > e.target.max)
      e.target.value = e.target.value.slice(0, e.target.max);
  };
  return <InputTemplate {...props} onKeyDown={handleOnKeyDown} />;
};

export { Input };
