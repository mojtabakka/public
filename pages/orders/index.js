import React, { useEffect, useState } from "react";
import MainLayout from "components/Layout/mainLayout";
import ProfileLayout from "components/Layout/profileLayout";
import { Tab } from "components";
import { MdArrowBackIos } from "react-icons/md";
import { CgTrashEmpty } from "react-icons/cg";
import { getCurrentOrders, getPreviousOrders } from "api";
import moment from "moment-jalaali";
import { groupBy, isEmptyArray } from "utils/function.util";
import { ModalAddress, Loading } from "components";
import { useRouter } from "next/router";

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
  const [isLoading, setIsLoading] = useState(false);
  const [tabAction, setTabAction] = useState();
  const router = useRouter();
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const orders = await getCurrentOrders();
    setOrders(orders.data);
  };
  const handleClickTabItem = async (item) => {
    try {
      setIsLoading(true);
      let orders;

      switch (item.action) {
        case ACTIONS.CURRENT_ORDERS:
          orders = item.action !== tabAction && (await getCurrentOrders());
          setTabAction(item.action);
          break;
        case ACTIONS.COMPLETED_ORDERS:
          orders = item.action !== tabAction && (await getPreviousOrders());
          setTabAction(item.action);
          break;
        default:
          break;
      }
      item.action !== tabAction && setOrders(orders.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOrder = (orderId) => {
    router.push(`order/${orderId}`);
  };
  return (
    <div className="  bg-white p-3 rounded">
      <Tab items={TAB_ITEMS} onClick={handleClickTabItem} />
      {!isEmptyArray(orders) && !isLoading ? (
        <div>
          {!isEmptyArray(orders) &&
            orders.map((order, key) => {
              const products = order?.cart?.products
                ? groupBy(order?.cart?.products, "model")
                : null;
              return (
                <div
                  onClick={() => handleClickOrder(order.id)}
                  className="p-3 border mt-5  rounded-lg  bg-gray-50 "
                  key={key}
                >
                  <div className=" flex justify-between">
                    <div className=" py-3 flex  justify-between">
                      <div className=" w-1/2   text-gray-500">
                        <div className="p-1">تاریخ</div>
                        <div className="p-1">شماره سفارش</div>
                        <div className="p-1">مبلغ خرید</div>
                      </div>
                      <div className=" w-full">
                        <div className="p-1">
                          {moment(order.created_at).format(
                            "dddd jD jMMMM jYYYY"
                          )}
                        </div>
                        <div className="p-1">{order.id}</div>
                        <div className="p-1">{order.priceForUser} تومان</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <MdArrowBackIos />
                    </div>
                  </div>
                  <div className="flex overflow-x-scroll bg-white rounded-lg">
                    {!isEmptyArray(products) &&
                      products.map((item, index) => {
                        const key = Object.keys(item)[0];
                        const data = item[key][0];
                        const number = item[key].length;
                        return (
                          <div className="flex p-2 mx-2 " key={index}>
                            <img
                              src={data.photos[0].src}
                              className="  w-16 h-16 lg:w-24 lg:h-24 md:w-24 md:h-24"
                            />
                            <div className="relative">
                              <span
                                className="bg-gray-400 p-1 rounded-3xl  absolute "
                                style={{ right: "-30px", bottom: "0px" }}
                              >
                                {number}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className=" text-left p-3 text-medium text-blue-500 mt-2 cursor-pointer">
                    مشاهده فاکتور
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex  justify-center p-20">
          <span>
            <CgTrashEmpty className=" text-8xl" />
            <div className="mt-3">سفارشی ثبت نشده است</div>
          </span>
        </div>
      )}
      <ModalAddress />
      <Loading show={isLoading} />
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
