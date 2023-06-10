import http from "service/http.service";
import {
  ADD_TO_BASKET,
  CURRENT_ORDERS_GET,
  GET_CURRENT_BASKET,
  GET_CURRENT_ORDER,
  GET_NUMBER_OF_PRODUCT_IN_BASKET,
  ORDER,
  PREVIOUS_ORDERS_GET,
  REMOVE_PRODUCT_FROM_BASKET,
} from "config/url.config";

export function addOrder(data) {
  return new Promise((resolve, reject) => {
    http
      .post(ORDER, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function removeProductFromBasket(model) {
  return new Promise((resolve, reject) => {
    http
      .delete(REMOVE_PRODUCT_FROM_BASKET.replace(":model", model))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getNumberOfProductInBasket(data) {
  return new Promise((resolve, reject) => {
    http
      .get(GET_NUMBER_OF_PRODUCT_IN_BASKET.replace(":model", data), data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getCurrentOrders() {
  return new Promise((resolve, reject) => {
    http
      .get(CURRENT_ORDERS_GET)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function addToBasket(data) {
  return new Promise((resolve, reject) => {
    http
      .post(ADD_TO_BASKET, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getCurrentBasket() {
  return new Promise((resolve, reject) => {
    http
      .get(GET_CURRENT_BASKET)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getCurrentOrder() {
  return new Promise((resolve, reject) => {
    http
      .get(GET_CURRENT_ORDER)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getPreviousOrders() {
  return new Promise((resolve, reject) => {
    http
      .get(PREVIOUS_ORDERS_GET)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
