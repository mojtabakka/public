import { PATHS } from "./routes.config";

export const NEEDED_URLS_FOR_AUTHENTICATION = () => [
  { url: "/auth" + PATHS.login },
  { url: "/auth" + PATHS.register },
];

//products
export const PRODUCT = "/product/product";
export const GET_PRODUCT = "/product/product/:id";
