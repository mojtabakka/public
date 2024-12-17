import { ReactNode } from "react";

export interface PopoverListIconType {
  key?: string;
  color?: string;
  id?: number | string;
  title?: string | ReactNode;
  bgColor?: string;
  border?: boolean;
  icon?: ReactNode;
  secondIcon?: string | ReactNode;
  subTitle?: string;
  url?: string;
  href?: string;
  className?: string;
}
