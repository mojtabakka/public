import { Order } from "./order.type";
import { Product } from "./product.type";
import { Share } from "./share.type";
import { User } from "./user.type";
export interface Cart extends Share {
  purePrice: number;
  finalPrice: number;
  benefit: number;
  shippingPrice: number;
  user: User;
  products: Array<Product>;
  orders: Array<Order>;
}
