import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, AXIOS_TIMEdOUT } from "config/variables.config";
import { DONT_NEEDED_URLS_FOR_AUTHENTICATION } from "config/url.config";

class httpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL + "api";
    axios.defaults.timeout = AXIOS_TIMEdOUT;
  }

  get(addres, data = null) {
    return axios.get(addres, { params: data });
  }

  post(address, data = null, config = null) {
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
