import { Catergory } from "./catergory.type";
import { Product } from "./product.type";
import { Share } from "./share.type";

export interface Brand extends Share {
  brand: string;
  categories: Array<Catergory>;
  products: Array<Product>;
  title: string;
}
