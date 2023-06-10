import React from "react";
import { Button, OrderButton } from "components";
import { MdOutlineDeliveryDining, MdOutlinePriceCheck } from "react-icons/md";
import { BiMemoryCard } from "react-icons/bi";

function BasketModalTemplate({
  items,
  onMouseLeave,
  onMouseOver,
  onClickPlus,
  onClickBin,
}) {
  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      className=" bg-white p-4 rounded-lg shadow-lg z-50 absolute  top-16  left-16 border overflow-scroll "
      style={{ width: "500px", height: "500px" }}
    >
      {items.map((item, index) => (
        <>
          <div className="mt-4" key={index}>
            <div className="flex justify-between text-right ">
              <div className=" w-full h-48 bg-red-200">hello</div>
              <div className="p-2 text-right  w-full">
                <h1 className="text-base">{item.products_model}</h1>
                <div className="py-2 text-xs">
                  <span className="pl-2">
                    <MdOutlineDeliveryDining className=" inline-block  text-sm" />
                  </span>
                  <span>{item.products_deliveryMethod}</span>
                </div>
                <div className=" text-xs">
                  <span className="pl-2">
                    <BiMemoryCard className=" inline-block  text-sm" />
                  </span>
                  <span>موجود در انبار </span>
                </div>
              </div>
            </div>
            <div className="my-6 flex justify-between">
              <div className="w-full ">
                <OrderButton
                  onClickPlus={onClickPlus}
                  onClickBin={onClickBin}
                  value={1}
                />
              </div>
              <div className=" text-right w-full flex justify-between ">
                <div className="text-base">1234553 تومان</div>
              </div>
            </div>
          </div>
          <hr />
        </>
      ))}
      <div className="mt-5 text-left">
        <Button>ثبت سفارش</Button>
      </div>
    </div>
  );
}

export { BasketModalTemplate };
