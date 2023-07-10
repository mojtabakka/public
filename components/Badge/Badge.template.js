import React from "react";

const BadgeTemplate = ({ children, className, style }) => {
  return (
    <div
      className={` bg-red-500 w-5 h-5 text-white  flex justify-center items-center rounded-full text-xs  ${className}  `}
      style={style}
    >
      {children}
    </div>
  );
};

export default BadgeTemplate;
