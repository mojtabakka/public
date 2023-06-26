// import { PATHS } from "./routes.config";

//products
export const PRODUCT = "/product/public";
export const GET_PRODUCT = "/product/public/:model";
export const PRODUCT_SERCH = "/product/public/product-search/product-search";

//auth
export const LOGIN = "/auth/send-otp";
export const POST_VERIFICATION = "/auth/verification";

//orders
export const ORDER = "/orders";
export const GET_CURRENT_ORDER = "/orders/get-current-order";
export const REMOVE_PRODUCT_FROM_BASKET =
  "/orders/remove-prodcuct-from-basket/:model";
export const GET_NUMBER_OF_PRODUCT_IN_BASKET =
  "/orders/number-of-product-in-basket/:model";
export const CURRENT_ORDERS_GET = "orders/current-orders";
export const PREVIOUS_ORDERS_GET = "orders/previous-orders";
export const ADD_TO_BASKET = "orders/addToBasket";
export const GET_CURRENT_BASKET = "orders/getCurrentBasket";
export const GET_ORDER = "/orders/:id";

//user
export const USER = "/users/public-user/user";
//address
export const ADDRESS = "/address";
export const GET_ACTIVE_ADDRESS = "/address/get-active-address";
export const CHANGE_ACTIVE_ADDRESS = "/address/change-active-address/:id";

//catertory
export const GET_CAT = "type/get-cat";

export const NEEDED_URLS_FOR_AUTHENTICATION = () => [
  { url: USER },
  { url: GET_NUMBER_OF_PRODUCT_IN_BASKET },
  { url: ADDRESS },
];
