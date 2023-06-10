import React from "react";
import { COLORS } from "./Button.config";
import { Sppiner } from "../Sppiner";
const ButtonTemplate = ({
  onClick,
  color = "primary",
  children,
  type = "button",
  disabled = false,
  className,
  outline = false,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: !outline ? COLORS[color].bg : "white",
        color: outline ? COLORS[color].textColor : "white",
        border: `1px solid ${COLORS[color].border}`,
      }}
      disabled={disabled | loading}
      type={type}
      className={`${disabled ? " opacity-50" : null} ${
        !outline ? "text-white" : "text-white"
      }  font-bold py-2 px-4 rounded text-center  ${className} `}
    >
      {children}
      {loading && <Sppiner />}
    </button>
  );
};

export default ButtonTemplate;
