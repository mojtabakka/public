export { getProducts, getProduct } from "./product.api";
export { sendOtp, verification } from "./auth.api";
export {
  addOrder,
  getNumberOfProductInBasket,
  removeProductFromBasket,
  getCurrentOrders,
  addToBasket,
  getCurrentBasket,
  getCurrentOrder,
  getPreviousOrders,
} from "./orders.api";
export { getUser, editUser } from "./user.api";
export {
  getAddresses,
  addAddresses,
  getActiveAddress,
  changeActiveAddress,
} from "./address.api";
