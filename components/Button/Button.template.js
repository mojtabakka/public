import React from "react";
import { COLORS } from "./Button.config";
const ButtonTemplate = ({
  onClick,
  color = "primary",
  children,
  type = "button",
  disabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ background: COLORS[color] }}
      disabled={disabled}
      type={type}
      className={`${
        disabled ? " opacity-50" : null
      } text-white font-bold py-2 px-4 rounded text-center  ${className} `}
    >
      {children}
    </button>
  );
};

export default ButtonTemplate;
