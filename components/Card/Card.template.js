import React from "react";

const CardTemplate = ({ children, className }) => {
  return <div className={`bg-white  p-6 ${className}`}>{children}</div>;
};

export default CardTemplate;
