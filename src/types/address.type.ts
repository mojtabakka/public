import { Order } from "./order.type";
import { Share } from "./share.type";
import { User } from "./user.type";

export interface Address extends Share {
  id: number;
  plaque: string;
  unit: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
  user: User;
  orders: Array<Order>;
  active: boolean;
  receivername: string;
  receiverlastname: string;
  recivermobile: string;
  address: string;
}
