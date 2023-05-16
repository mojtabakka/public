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

export function editUser(data) {
  return new Promise((resolve, reject) => {
    http
      .patch(USER, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
