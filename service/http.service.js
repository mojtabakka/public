import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, AXIOS_TIMEdOUT } from "config/variables.config";
import { NEEDED_URLS_FOR_AUTHENTICATION } from "config/url.config";
import { getCookie } from "../lib/function.utils";

class httpService {
  BearerToken = null;
  constructor() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = BASE_URL + "api";
    axios.defaults.timeout = AXIOS_TIMEdOUT;
    axios.interceptors.request.use(
      (config) => {
        const checkExist = NEEDED_URLS_FOR_AUTHENTICATION().filter((item) => {
          return item.url.trim() === config.url.trim();
        });
        if (checkExist.length > 0 && (this.BearerToken || getCookie("token"))) {
          if (getCookie("token")) {
            config.headers.Authorization = "Bearer " + getCookie("token");
            console.log("Bearer " + getCookie("token"));
          } else {
            config.headers.Authorization = this.BearerToken;
          }
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get(addres, item = {}) {
    const { data, context } = item;
    if (context && context?.req?.cookies?.token) {
      const BearerToken = `Bearer ${context?.req?.cookies?.token}`;
      this.BearerToken = BearerToken;
    }
    return axios.get(addres, { params: data });
  }

  post(address, data = {}, config = null) {
    config = { headers: { "Content-Type": " application/json" } };
    return axios.post(address, data, config);
  }

  delete(address, data = null, config = null) {
    config = config || { headers: { "content-type": "application/json" } };
    return axios.delete(address, { data });
  }

  patch(address, data = null, config = null) {
    config = config || { headers: { "content-type": "application/json" } };
    return axios.patch(address, data, config);
  }

  put(address, data = null, config = null) {
    config = config || { headers: { "content-type": "application/json" } };
    return axios.put(address, data, config);
  }
}

export default new httpService();
