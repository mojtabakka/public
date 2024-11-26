import { ReactNode } from "react";

export interface PopoverListIconType {
  key?: string;
  color?: string;
  id?: number | string;
  title?: string;
  bgColor?: string;
  border?: boolean;
  icon?: ReactNode;
  secondIcon?: string;
  subTitle?: string;
  url?: string;
  href?: string;
}
