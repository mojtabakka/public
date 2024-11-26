import { Brand } from "./brand.type";
import { Product } from "./product.type";
import { ProductType } from "./productType.type";
import { PropertyTitle } from "./propertyTitle.type";
import { Share } from "./share.type";

export interface Catergory extends Share {
  brands: Array<Brand>;
  photo: string;
  products: Array<Product>;
  productTypes: Array<ProductType>;
  propertyTitles: Array<PropertyTitle>;
  title: string;
}
