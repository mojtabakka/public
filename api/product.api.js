import http from "service/http.service";
import { PRODUCT, GET_PRODUCT, PRODUCT_SERCH } from "config/url.config";

export function getProducts(data) {
  return new Promise((resolve, reject) => {
    http
      .get(PRODUCT, { data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getProduct(item) {
  const { model } = item;
  return new Promise((resolve, reject) => {
    http
      .get(GET_PRODUCT.replace(":model", model))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function searchProduct(item) {
  return new Promise((resolve, reject) => {
    http
      .get(PRODUCT_SERCH, { data: item })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
