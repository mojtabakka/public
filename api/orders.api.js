import http from "service/http.service";
import { ORDER, ORDER_GET_ORDER, REMOVE_ORDER } from "config/url.config";

export function addOrder(data) {
  return new Promise((resolve, reject) => {
    http
      .post(ORDER, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function removeOrder(model) {
  return new Promise((resolve, reject) => {
    http
      .delete(REMOVE_ORDER.replace(":model", model))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getNumberOfProduct(data) {
  return new Promise((resolve, reject) => {
    http
      .get(ORDER_GET_ORDER.replace(":model", data), data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
