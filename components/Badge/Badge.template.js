import React from "react";

const BadgeTemplate = ({ children, className }) => {
  return (
    <span
      className={` bg-red-500 text-white p-1   rounded-full ${className}  `}
    >
      {children}
    </span>
  );
};

export default BadgeTemplate;
