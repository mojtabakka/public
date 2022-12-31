import Image from "next/image";
import React from "react";
import camera from "public/images/ camra2.jpeg";
import Link from "next/link";
import { Badge } from "components";

function CardTemplate({ items }) {
  return (
    <Link href={`/product-detail/${items._id}`}>
      <div className=" shadow-sm bg-white p-2 inline-block  hover:shadow-lg border">
        <div className="">
          <figure>
            <Image
              className="w-full"
              src={camera}
              alt="Picture of the author"
            />
          </figure>
          <h1 className="text-right pt-5 px-2 text-sm">{items.model}</h1>
          <div className="text-right pt-2 px-2 text-xs text-gray-500">
            تنها یک عدد باقی مانده
          </div>
          <div className=" flex px-2 pt-4 text-left justify-between w-full">
            <div className="flex-1 text-right w-full">
              <Badge className="  p-1 rounded-3xl text-sm">۱۳٪</Badge>
            </div>
            <div className=" flex-1  text-bold w-full text-left text-base ">
              <span className="p-1 text-sm">{items.priceForUser}</span>
              <span className="text-sm">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { CardTemplate };
