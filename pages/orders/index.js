import React, { useEffect, useState } from "react";
import MainLayout from "components/Layout/mainLayout";
import ProfileLayout from "components/Layout/profileLayout";
import { Tab } from "components";
import { getCurrentOrders } from "api";
import moment from "moment-jalaali";
import { isEmptyArray, isEmptyObject } from "../../utils/function.util";

const ACTIONS = {
  CURRENT_ORDERS: "current-orders",
  COMPLETED_ORDERS: "completed-orders",
};

const TAB_ITEMS = [
  {
    title: "سفارش های جاری",
    action: ACTIONS.CURRENT_ORDERS,
  },
  {
    title: "تحویل شده",
    action: ACTIONS.COMPLETED_ORDERS,
  },
];
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const handleClickTabItem = async (item) => {
    switch (item.action) {
      case ACTIONS.CURRENT_ORDERS:
        const orders = await getCurrentOrders();
        setOrders(orders.data);
        break;
      case ACTIONS.COMPLETED_ORDERS:
        getCurrentOrders;
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <Tab items={TAB_ITEMS} onClick={handleClickTabItem} />
      <div>
        {!isEmptyArray(orders) &&
          orders.map((order) => (
            <div className="p-3 border mt-5  rounded-lg  bg-gray-50 ">
              <div className=" py-3 flex  justify-between">
                <div className=" w-1/2   text-gray-500">
                  <div className="p-1">تاریخ</div>
                  <div className="p-1">شماره سفارش</div>
                  <div className="p-1">مبلغ خرید</div>
                </div>
                <div className=" w-full">
                  <div className="p-1">
                    {moment(order.created_at).format("dddd jD jMMMM jYYYY")} {}
                  </div>
                  <div className="p-1">{order.id}</div>
                  <div className="p-1">{order.priceForUser} تومان</div>
                </div>
              </div>
              <hr />
              {/* <div className=" grid grid-cols-6 bg-white border gap-4 rounded-xl mt-3 h-48 border-1 overflow-x-scroll">ƒ
                {!isEmptyArray(order.products) &&
                  order.products.map((product) => (
                    <div className="border p-3 my-5 mx-3">hello</div>
                  ))}
              </div> */}
              <div className=" text-left p-3 text-medium text-blue-500 mt-2 cursor-pointer">
                مشاهده بیشتر
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // const { id } = context.query;
  // const data = {
  //   context,
  //   id,
  // };
  // const result = await getProduct(data);
  // const product = result.data;
  return { props: { product: [{ id: 1 }] } };
}

Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  );
};
export default Orders;
