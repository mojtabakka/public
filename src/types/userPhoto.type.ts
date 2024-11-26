import { Share } from "./share.type";
import { User } from "./user.type";

export interface UserPhoto extends Share {
  src: string;
  user: User;
}
