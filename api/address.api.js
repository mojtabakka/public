import {
  ADDRESS,
  GET_ACTIVE_ADDRESS,
  CHANGE_ACTIVE_ADDRESS,
  ADDRESS_DELETE,
} from "config/url.config";
import http from "service/http.service";
export function getAddresses() {
  return new Promise((resolve, reject) => {
    http
      .get(ADDRESS)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function addAddresses(data) {
  return new Promise((resolve, reject) => {
    http
      .post(ADDRESS, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function getActiveAddress(data) {
  return new Promise((resolve, reject) => {
    http
      .get(GET_ACTIVE_ADDRESS, data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function changeActiveAddress(id) {
  return new Promise((resolve, reject) => {
    http
      .post(CHANGE_ACTIVE_ADDRESS.replace(":id", id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export function deleteAddress(data) {
  return new Promise((resolve, reject) => {
    http
      .delete(ADDRESS_DELETE.replace(":id", data.id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
