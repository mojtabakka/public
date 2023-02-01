import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, AXIOS_TIMEdOUT } from "config/variables.config";
import { DONT_NEEDED_URLS_FOR_AUTHENTICATION } from "config/url.config";

class httpService {
  BearerToken = null;
  constructor() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = BASE_URL + "api";
    axios.defaults.timeout = AXIOS_TIMEdOUT;
    axios.interceptors.request.use(
      (config) => {
        const checkExist = DONT_NEEDED_URLS_FOR_AUTHENTICATION().filter(
          (item) => {
            return item.url.trim() === config.url.trim();
          }
        );

        if (this.BearerToken) {
          config.headers.Authorization = this.BearerToken;
        }
        // if (checkExist.length === 0) {
        // const token = `Bearer ${JSON.parse(user)?.token}`;
        // const BearerToken = `Bearer ${token}`;
        // config.headers.Authorization = BearerToken;

        // }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get(addres, item) {
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
