import http from "service/http.service";
import { GET_CAT } from "config/url.config";

export function getCat() {
  console.log("heo");
  return new Promise((resolve, reject) => {
    http
      .get(GET_CAT, {data:{id:6}})
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
