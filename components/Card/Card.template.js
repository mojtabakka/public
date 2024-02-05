import React from "react";

const CardTemplate = ({ children, className }) => {
  console.log(className);
  return (
    <div className={`  bg-white items-center    p-6 ${className}`}>
      {children}
    </div>
  );
};

export default CardTemplate;