import { Address } from "./address.type";
import { Cart } from "./cart.type";
import { Product } from "./product.type";
import { Share } from "./share.type";
import { User } from "./user.type";

export interface Order extends Share {
  address: Address;
  cart: Cart;
  finalPrice: number;
  price: number;
  products: Array<Product>;
  shippingPrice: number;
  shippingTime: string;
  status: "notPayed" | "payed" | "preparing" | "isSendig" | "completed";
  user: User;
  value: string;
}
