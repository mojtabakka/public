import http from "service/http.service";
import { USER } from "config/url.config";

export function getUser() {
  return new Promise((resolve, reject) => {
    http
      .get(USER)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
