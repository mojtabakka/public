import React from "react";
import { useRouter } from "next/router";
import ProductCardTemplate from "./ProductCard.template";
import { isFunction } from "utils/function.util.js";

const ProductCard = (props) => {
  const router = useRouter();

  const handleClick = () => {
    isFunction(props.onClick) && props.onClick(props.items.model);
  };

  return <ProductCardTemplate {...props} onClick={handleClick} />;
};

export { ProductCard };
