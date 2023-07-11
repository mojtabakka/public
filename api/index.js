export { getProducts, getProduct, searchProduct } from "./product.api";
export { sendOtp, verification } from "./auth.api";
export {
  addOrder,
  addToBasket,
  getCurrentBasket,
  getCurrentOrder,
  getCurrentOrders,
  getNumberOfProductInBasket,
  getOrder,
  getPreviousOrders,
  removeProductFromBasket,
  getCurrentBasketCount,
} from "./orders.api";
export { getUser, editUser } from "./user.api";
export {
  addAddresses,
  changeActiveAddress,
  getActiveAddress,
  getAddresses,
  deleteAddress,
} from "./address.api";
export { getCat, getCats } from "./category.api";
