import api from "api/product.api";

export function getProducts(data) {
  return () => {
    return api
      .getProducts()
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  };
}
