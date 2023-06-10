import React, { useEffect, useState } from "react";
import ShippingPriceTemplate from "./ShippingPrice.template";
import { getCurrentBasket } from "api";
import { isFunction } from "../../utils/function.util";

function ShippingPrice(props) {
  const [cart, setCart] = useState(false);
  const [finalPrice, setFinalPrice] = useState(false);
  const [purePrice, setPurePrice] = useState(false);
  const [shippingPrice, setShippingPrice] = useState();
  const [price, setPrice] = useState();
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    let mySumFinalPrice = 0;
    const cart = await getCurrentBasket();
    setPurePrice(cart.data[0].basket_finalPrice);
    setFinalPrice(
      cart.data[0].basket_finalPrice - cart.data[0].basket_shippingPrice
    );
    setShippingPrice(cart.data[0].basket_shippingPrice);
    isFunction(props.onCartItem) && props.onCartItem(cart.data);
    setCart(cart.data);
    setPrice(mySumFinalPrice);
  };

  const handleClick = () => {
    isFunction(props.onClick) && props.onClick();
  };
  return (
    <ShippingPriceTemplate
      {...props}
      price={price}
      onClick={handleClick}
      finalPrice={finalPrice}
      purePrice={purePrice}
      shippingPrice={shippingPrice}
    />
  );
}

export { ShippingPrice };
