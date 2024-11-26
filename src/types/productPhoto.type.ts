import { Product } from "./product.type";
import { Share } from "./share.type";

export interface ProductPhoto extends Share {
  id: number;
  products: Array<Product>;
  src: string;
}
