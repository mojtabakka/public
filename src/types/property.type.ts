import { Product } from "./product.type";
import { Share } from "./share.type";

export interface Property extends Share {
  id: string;
  products: Array<Product>;
  property: string;
  propertyTitle: string;
  title: string;
}
