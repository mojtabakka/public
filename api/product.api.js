import http from "service/http.service";
import { PRODUCT, GET_PRODUCT } from "config/url.config";

export function getProducts(data) {
  return new Promise((resolve, reject) => {
    http
      .get(PRODUCT, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getProduct(data) {
  const { id } = data;
  return new Promise((resolve, reject) => {
    http
      .get(GET_PRODUCT.replace(":id", id), data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
