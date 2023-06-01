// import { PATHS } from "./routes.config";

//products
export const PRODUCT = "/product/public";
export const GET_PRODUCT = "/product/public/:model";

//auth
export const LOGIN = "/auth/send-otp";
export const POST_VERIFICATION = "/auth/verification";

//orders
export const ORDER = "/orders";
export const REMOVE_PRODUCT_FROM_BASKET =
  "/orders/remove-prodcuct-from-basket/:model";
export const GET_NUMBER_OF_PRODUCT_IN_BASKET =
  "/orders/number-of-product-in-basket/:model";
export const CURRENT_ORDERS_GET = "orders/current-orders";
export const ADD_TO_BASKET = "orders/addToBasket";

export const GET_CURRENT_BASKET = "orders/getCurrentBasket";

//user
export const USER = "/users/public-user/user";

export const NEEDED_URLS_FOR_AUTHENTICATION = () => [
  { url: USER },
  { url: GET_NUMBER_OF_PRODUCT_IN_BASKET },
];
