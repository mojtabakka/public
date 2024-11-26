import { Share } from "./share.type";
import { User } from "./user.type";

export interface Role extends Share {
  id: number;
  role: string;
  user: User;
}
