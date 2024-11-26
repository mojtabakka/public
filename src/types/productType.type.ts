import { Catergory } from "./catergory.type";
import { Product } from "./product.type";
import { Share } from "./share.type";

export interface ProductType extends Share {
  categories: Array<Catergory>;
  products: Array<Product>;
  title: string;
  type: string;
}
