import React from "react";
import Image from "next/image";
import Link from "next/link";
interface PropsType {
  imgClassName?: string;
  className?: string;
  width?: number;
  height?: number
}

export default function Logo(props: PropsType) {
  const { className, height = 80, width = 80, imgClassName } = props;
  return (
    <div className={`text-center ${className}`}>
      <Link href="/">
        <Image
          src={"/images/logo.jpg"}
          alt="Picture of the author"
          width={width}
          height={height}
          className={`inline-block  cursor-pointer ${imgClassName}`}
        />
      </Link>
    </div>
  );
}
