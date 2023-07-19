import React, { useEffect, useState } from "react";
import {
  removeProductFromBasket,
  addToBasket,
  getNumberOfProductInBasket,
  getProductsNotReserved,
} from "api";
import { setSumOfCart } from "redux/action/general.action";
import OrderButtonTemplate from "./OrderButton.template";
import { PATHS } from "config/routes.config";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { isEmptyArray } from "../../utils/function.util";

const OrderButton = (props) => {
  const [loading, setLoading] = useState(false);

  const [numberOfOrder, setNumberOfOrder] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getNumberOfProductFunc();
  });
  const getNumberOfProductFunc = async () => {
    try {
      let products = JSON.parse(localStorage.getItem("cart"));
      products =
        !isEmptyArray(products) &&
        products.filter((item) => item?.model === props.model);
      const cartCount =
        products && !isEmptyArray(products) ? products.length : 0;
      setNumberOfOrder((value) => {
        return cartCount;
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickBin = async () => {
    const ids = [];
    try {
      let localStorageCart = localStorage.getItem("cart");

      if (localStorageCart) {
        localStorageCart = JSON.parse(localStorage.getItem("cart"));
        if (localStorageCart.length > 0) {
          localStorageCart.pop();
          isEmptyArray(!localStorageCart) &&
            localStorageCart.forEach((element) => {
              ids.push(element.id);
            });
          dispatch(setSumOfCart(localStorageCart.length));
          localStorageCart = JSON.stringify(localStorageCart);
          localStorage.setItem("cart", localStorageCart);
          setNumberOfOrder((value) => {
            return value - 1;
          });
          await addToBasket(ids);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickPlus = async () => {
    const ids = [];
    setLoading(true);
    try {
      let localStorageCart = localStorage.getItem("cart");
      if (!localStorageCart) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      localStorageCart = JSON.parse(localStorage.getItem("cart"));
      isEmptyArray(!localStorageCart) &&
        localStorageCart.forEach((element) => {
          ids.push(element.id);
        });
      const data = {
        ids,
      };
      let product = (await getProductsNotReserved(data)).data;
      if (product) {
        const chekck = localStorageCart.find(
          (item) => item?.id === product?.id
        );
        !chekck && localStorageCart.push(product);
        ids.push(product.id);
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
        dispatch(setSumOfCart(localStorageCart.length));
        setNumberOfOrder((value) => {
          return value + 1;
        });
        console.log(ids);
        await addToBasket(ids);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderButtonTemplate
      {...props}
      onClickBin={handleClickBin}
      onClickPlus={handleClickPlus}
      loading={loading}
      value={numberOfOrder}
    />
  );
};

export { OrderButton };
