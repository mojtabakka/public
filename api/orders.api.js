import http from "service/http.service";
import { ORDER } from "config/url.config";

export function addOrder() {
  return new Promise((resolve, reject) => {
    http
      .post(ORDER)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
