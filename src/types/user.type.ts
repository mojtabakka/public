import { Address } from "./address.type";
import { Order } from "./order.type";
import { Product } from "./product.type";
import { Role } from "./role.type";
import { Share } from "./share.type";
import { UserPhoto } from "./userPhoto.type";

export interface User extends Share {
  addresses: Array<Address>;
  avatar: UserPhoto;
  email: string;
  isWorkMate: boolean;
  lastName: string;
  name: string;
  nationalCode: string;
  orders: Array<Order>;
  password: string;
  phoneNumber: string;
  photos: Array<UserPhoto>;
  product: Array<Product>;
  roles: Array<Role>;
  username: string;
}
