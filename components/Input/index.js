import React from "react";
import InputTemplate from "./Input.template";
import { isFunction } from "utils/function.util";

const Input = (props) => {
  console.log(props.value);

  // const handleKeyDown = (e) => {
  //   if (
  //     e.target?.maxLength &&
  //     e.target?.maxLength !== -1 &&
  //     e.target.value.split("").length > e.target.maxLength
  //   )
  //     e.target.value = e.target.value.slice(0, e.target.maxLength);
  // };

  const handleClick = (e) => {
    isFunction(props?.onClick) && props.onClick(e);
  };
  const handleChange = (e) => {

    isFunction(props?.onChange) && props.onChange(e);
  };

  return (
    <InputTemplate
      {...props}
      // onKeyDown={handleKeyDown}
      onClick={handleClick}
      onChange={handleChange}
    />
  );
};

export { Input };
