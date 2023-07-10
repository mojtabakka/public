import React from "react";
import { Badge } from "components";

function CardProdcutTemplate({ items, key, onClick }) {
  const src = `${items.src}`;
  return (
    <div onClick={onClick} key={key} className=" cursor-pointer">
      <div className=" shadow-sm bg-white p-2 inline-block  hover:shadow-lg border">
        <div className="">
          <figure>
            <img src={src} className="  h-60 w-48" width={200} height={200} />
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
    </div>
  );
}
export default CardProdcutTemplate;
