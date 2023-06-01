import React from "react";

const BadgeTemplate = ({ children, className }) => {
  return (
    <span
      className={` bg-red-500 text-white p-3 rounded-full text-xs  ${className}  `}
    >
      {children}
    </span>
  );
};

export default BadgeTemplate;
