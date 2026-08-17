import { Icon } from "@iconify/react";
import React from "react";

interface PropsType {
  icon: string;
  title: string;
  subTitle: string;
}

export default function IconTitleSubtitle(props: PropsType) {
  const { icon, title, subTitle } = props;
  return (
    <div className="flex items-center gap-2">
      <Icon icon={icon} className="text-2xl" />
      <div className="flex flex-col gap-2">
        <div>{title}</div>
        <div className="text-gray-400">{subTitle}</div>
      </div>
    </div>
  );
}
