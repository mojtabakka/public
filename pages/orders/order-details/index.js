import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOrder } from "api";
import { Card, Progressbar, MainLayout, ProfileLayout } from "components";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { AiOutlineNumber } from "react-icons/ai";
import { groupBy, isEmptyArray, getToman } from "utils/function.util";
import { getCompleteDateToPersian } from "../../../utils/function.util";
import { ORDER_STATUS } from "config/general.config";

const orderDetails = () => {
  const [order, setOrder] = useState();
  const [products, setProducts] = useState();
  const router = useRouter();
  const orderId = router.query.id;
  useEffect(() => {
    getOrderItems();
  }, [router]);

  const getOrderItems = async () => {
    {
      if (router.query.id) {
        const result = await getOrder(orderId);
        const products = result?.data?.products
          ? groupBy(result?.data?.products, "model")
          : null;

        setProducts(products);
        setOrder(result.data);
      }
    }
  };

  return (
    <>
      <Card className="mt-5 !p-3">
        <div className="  border rounded p-2">
          <div className="py-2 ">
            <span className="px-1 text-gray-400 text-small">
              تاریخ ثبت سفارش
            </span>
            <span className="px-1">
              {" "}
              {getCompleteDateToPersian(order?.updated_at)}{" "}
            </span>
          </div>
          <div className="py-2">
            <span className="px-1  text-gray-400"> کد پیگیری </span>
            <span className="px-1"> {order?.id} </span>
          </div>
        </div>
      </Card>
      <Card className="mt-2 !p-3">
        <div className="  border p-3  rounded">
          <div className="py-2">
            <span className="px-1  text-gray-400"> شماره تماس </span>
            <span className="px-2">{order?.user?.phoneNumber} </span>
          </div>
          <div className="py-2">
            <span className="px-1  text-gray-400">آدرس</span>
            <span className="px-2"> {order?.address?.address} </span>
          </div>
        </div>
      </Card>

      <Card className="mt-2 !p-3">
        <div className="  border  rounded">
          <div className="flex justify-between">
            <div>
              <div className="py-2">
                <span className="px-2  text-gray-400"> مبلغ </span>
                <span className="px-1 font-bold">
                  {getToman(order?.finalPrice)}{" "}
                </span>
                <span className=" font-bold">تومان </span>
              </div>
              <div className="py-2">
                <span className="px-2  text-gray-400"> هزینه ارسال </span>
                <span className="px-1">
                  <span className="px-1 font-bold">
                    {getToman(order?.shippingPrice)}
                  </span>
                </span>
                <span className="">تومان </span>
              </div>

              <div className="py-2">
                <span className="px-2  text-gray-400"> زمان ارسال </span>
                <span className="px-1">
                  <span className="px-1 font-bold">
                    {getCompleteDateToPersian(order?.shippingTime, true)}
                  </span>
                </span>
              </div>
            </div>
            <div className="p-3 text-blue-400 cursor-pointer ">
              مشاهده فاکتور
            </div>
          </div>
          {order?.status && (
            <div className="mt-5 px-3">
              <div
                className="my-2"
                style={{ color: ORDER_STATUS[order.status].color }}
              >
                {ORDER_STATUS[order.status].text}
              </div>
              <Progressbar
                color={ORDER_STATUS[order.status].color}
                width={ORDER_STATUS[order.status].progress}
              />
            </div>
          )}

          <div className=" overflow-x-scroll my-5 rounded-lg">
            {!isEmptyArray(products) &&
              products.map((item, index) => {
                const key = Object.keys(item)[0];
                const data = item[key][0];
                const number = item[key].length;
                return (
                  <div className="flex border rounded-lg p-5 mx-2 w-full mt-2">
                    <div className="w-full">
                      <div className="mb-5">
                        <span className="text-gray-400  px-2">
                          کدپیگیری مرسوله
                        </span>
                        <span className=""> {data?.id}</span>
                      </div>
                      <div className="mb-5">
                        <span className="text-gray-400  px-2">قیمت</span>
                        <span className="">
                          {getToman(data?.priceForUser)}
                          <span className="mx-1">تومان</span>
                        </span>
                      </div>

                      <div className="mb-5">
                        <span className="text-gray-400  px-2">
                          سود شما از این خرید
                        </span>
                        <span className="">
                          {getToman(data?.priceForUser * (data.off / 100))}
                          <span className="mx-1">تومان</span>
                        </span>
                      </div>

                      <hr />
                      <div className="flex p-2 mx-2 items-center " key={index}>
                        <img
                          src={data.photos[0].src}
                          className="  w-16 h-16 lg:w-24 lg:h-24 md:w-24 md:h-24"
                        />
                        <div className=" pt-3">
                          <div className="p-2 text-right  w-full">
                            <h1 className=" text-lg text-black ">
                              {data.model}
                            </h1>
                            <div className="py-2">
                              <span className="pl-2">
                                <AiOutlineNumber className=" inline-block text-sm" />
                              </span>
                              تعداد ( {number} )
                            </div>
                            {data.warranty && (
                              <>
                                <div className="py-2">
                                  <span className="pl-2">
                                    <IoShieldCheckmark className=" inline-block text-sm" />
                                  </span>
                                  {data.warranty}
                                </div>
                              </>
                            )}
                            {data.deliveryMethod && (
                              <div className="py-2 text-xs text-gray-500 ">
                                <span className="pl-2">
                                  <MdOutlineDeliveryDining className=" inline-block  text-sm" />
                                </span>
                                <span>{data.deliveryMethod}</span>
                              </div>
                            )}
                            <div className="mt-3 font-black text-lg">
                              {getToman(
                                Number(data.priceForUser) -
                                  Number(data.priceForUser) * (data.off / 100)
                              )}
                              <span className="px-1">تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Card>
    </>
  );
};

orderDetails.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page} </ProfileLayout>
    </MainLayout>
  );
};
export default orderDetails;
