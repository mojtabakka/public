import React, { useState } from "react";
import CartBoxTemplate from "./CartBox.template";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { groupBy } from "../../utils/function.util";
import { useSelector } from "react-redux";

const CartBox = (props) => {
  const [cartItems, setCartItems] = useState();
  const cartCount = useSelector((item) => item.general.sumCart);
  useEffect(() => {
    getCartItems();
  }, [cartCount]);

  const getCartItems = () => {
    if (Cookies.get("cart")) {
      let data = JSON.parse(Cookies.get("cart"));
      data = groupBy(data, "model");
      setCartItems(data);
      props.onCartItems(data);
    }
  };

  return <CartBoxTemplate {...props} items={cartItems} />;
};

export { CartBox };
