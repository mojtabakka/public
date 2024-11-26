import { Share } from "./share.type";

export interface PropertyTitle extends Share {
  id: string;
  category: string;
  properties: [];
  title: string;
}
