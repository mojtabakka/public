import http from "service/http.service";
import { PRODUCT, GET_PRODUCT } from "config/url.config";

export function getProducts() {
  return new Promise((resolve, reject) => {
    http
      .get(PRODUCT)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getProduct(item) {
  const { id } = item;
  return new Promise((resolve, reject) => {
    http
      .get(GET_PRODUCT.replace(":id", id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
