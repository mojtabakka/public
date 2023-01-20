import { PATHS } from "./routes.config";

export const NEEDED_URLS_FOR_AUTHENTICATION = () => [
  { url: "/auth" + PATHS.login },
  { url: "/auth" + PATHS.register },
];

//products
export const PRODUCT = "/product/product";
export const GET_PRODUCT = "/product/product/:id";

//auth
export const LOGIN = "/auth-public/send-otp";
export const POST_VERIFICATION = "/auth-public/verification";

//orders
export const ORDER = "/order";
