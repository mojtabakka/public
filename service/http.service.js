import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, AXIOS_TIMEdOUT } from "config/variables.config";
import { NEEDED_URLS_FOR_AUTHENTICATION } from "config/url.config";
import { getCookie } from "../lib/function.utils";
import { isEmptyArray, isEmptyObject } from "../utils/function.util";
// import { getCookie } from "cookie-parser";

class httpService {
  BearerToken = null;
  constructor() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://46.249.100.166:3003/api";

    // axios.defaults.baseURL = "http://localhost:3003/api";

    axios.defaults.timeout = AXIOS_TIMEdOUT;
    axios.interceptors.request.use(
      (config) => {
        const checkExist = NEEDED_URLS_FOR_AUTHENTICATION().filter((item) => {
          return item.url.trim() === config.url.trim();
        });
        if (this.BearerToken) {
          config.headers.Authorization = this.BearerToken;
        } else {
          config.headers.Authorization = "Bearer " + getCookie("token");
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error?.response?.data?.statusCode === 403) {
          localStorage.removeItem("user");
          window.location.href = "/";
        }
        if (isEmptyObject(error)) {
          toast("خطای داخلی سرور", {
            autoClose: 2000,
            type: toast.TYPE.ERROR,
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        if (error?.response?.data?.statusCode !== 401) {
          toast(
            isEmptyArray(error?.response?.data?.message)
              ? error.response?.data?.message
              : error.response?.data?.message[0],
            {
              autoClose: 2000,
              type: toast.TYPE.ERROR,
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return Promise.reject(error);
        }
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

  delete(address, data = {}, config = null) {
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
