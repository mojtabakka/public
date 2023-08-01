import React, { useEffect, useState } from "react";
import { addToBasket, getProductsNotReserved } from "api";
import { setSumOfCart } from "redux/action/general.action";
import OrderButtonTemplate from "./OrderButton.template";
import { useDispatch } from "react-redux";
import { isEmptyArray } from "utils/function.util";
import Cookies from "js-cookie";

const OrderButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [numberOfOrder, setNumberOfOrder] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getNumberOfProductFunc();
    checkLogin();
  });
  const checkLogin = () => {
    const check = localStorage.getItem("authenticated");
    if (check) setIsLogin(true);
    else setIsLogin(false);
  };
  const getNumberOfProductFunc = async () => {
    try {
      let products = JSON.parse(Cookies.get("cart"));
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
    console.log("helo");
    const ids = [];
    try {
      setIsLogin(true);
      let cookieCart = Cookies.get("cart");

      if (cookieCart) {
        cookieCart = JSON.parse(Cookies.get("cart"));
        if (cookieCart.length > 0) {
          const filterModel = cookieCart.filter((item) => {
            return item.model === props.model;
          })[0];

          cookieCart = cookieCart.filter((item) => item.id !== filterModel.id);
          isEmptyArray(!cookieCart) &&
            cookieCart.forEach((element) => {
              ids.push(element.id);
            });
          dispatch(setSumOfCart(cookieCart.length));
          cookieCart = JSON.stringify(cookieCart);
          Cookies.set("cart", cookieCart);
          setNumberOfOrder((value) => {
            return value - 1;
          });

          isLogin && (await addToBasket(ids));
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
      let cookieCart = Cookies.get("cart");
      if (!cookieCart) {
        Cookies.set("cart", JSON.stringify([]));
      }
      cookieCart = JSON.parse(Cookies.get("cart"));
      isEmptyArray(!cookieCart) &&
        cookieCart.forEach((element) => {
          ids.push(element.id);
        });
      const data = {
        ids,
        model: props.model,
      };
      let product = (await getProductsNotReserved(data)).data;
      if (product) {
        const chekck = cookieCart.find((item) => item?.id === product?.id);
        !chekck && cookieCart.push(product);
        ids.push(product.id);
        Cookies.set("cart", JSON.stringify(cookieCart));
        dispatch(setSumOfCart(cookieCart.length));
        setNumberOfOrder((value) => {
          return value + 1;
        });
        isLogin && (await addToBasket(ids));
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
