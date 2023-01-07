import http from "service/http.service";
import { LOGIN, POST_VERIFICATION } from "config/url.config";

export function sendOtp(data) {
  return new Promise((resolve, reject) => {
    http
      .post(LOGIN, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function verification(data) {
  return new Promise((resolve, reject) => {
    http
      .post(POST_VERIFICATION, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
