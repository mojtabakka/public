// import { PATHS } from "./routes.config";

//products
export const PRODUCT = "/product/public";
export const GET_PRODUCT = "/product/public/:model";

//auth
export const LOGIN = "/auth/send-otp";
export const POST_VERIFICATION = "/auth/verification";

//orders
export const ORDER = "/orders";
export const REMOVE_ORDER = "/orders/:model";
export const ORDER_GET_ORDER = "/orders/number-of-order-product/:model";

//user
export const USER = "/users/public-user/user";

export const NEEDED_URLS_FOR_AUTHENTICATION = () => [
  { url: USER },
  { url: ORDER_GET_ORDER },
];
