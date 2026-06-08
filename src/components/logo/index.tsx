import React from "react";
import Image from "next/image";
import Link from "next/link";
interface PropsType {
  className?: string;
  width?: number;
  height?: number
}

export default function Logo(props: PropsType) {
  const { className, height = 100, width = 100 } = props;
  return (
    <div className={`text-center ${className}`}>
      <Link href="/">
        <Image
          src={"/images/logo.png"}
          alt="Picture of the author"
          width={width}
          height={height}
          className=" inline-block cursor-pointer"
        />
      </Link>
    </div>
  );
}
