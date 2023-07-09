import http from "service/http.service";
import { GET_CAT, GET_CATS } from "config/url.config";

export function getCat(data) {
  return new Promise((resolve, reject) => {
    http
      .get(GET_CAT, { data  })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getCats() {
  return new Promise((resolve, reject) => {
    http
      .get(GET_CATS)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
