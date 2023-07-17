import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getProduct,
  getNumberOfProductInBasket,
  removeProductFromBasket,
  addToBasket,
  getProductsNotReserved,
} from "api";
import { ProductFeatures, ProductImages, ProductPrice } from "components";
import { MainLayout } from "components/layout/mainLayout";
import { PATHS } from "config/routes.config";
import { BACK_URL } from "redux/types.js";
import { getCookie } from "lib/function.utils.js";
import { useDispatch } from "react-redux";
import { setSumOfCart } from "../../redux/action/general.action";

const DetailProduct = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const [numberOfOrder, setNumberOfOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getNumberOfProductFunc();
  });

  const getNumberOfProductFunc = async () => {
    const order = await getNumberOfProductInBasket(product.model);
    setNumberOfOrder(order.data.number);
  };

  const handleClickPlus = async () => {
    setLoading(true);
    try {
      // dispatch(setBackUrl(window.location.pathname));
      const token = getCookie("token");
      if (!token) {
        router.push(PATHS.login);
        return;
      }
      const data = { model: product.model };
      const result = await addToBasket(data);
      // const result = await getProductsNotReserved();
      console.log(result);

      dispatch(setSumOfCart(result.data?.products.length));
      const userId = setNumberOfOrder((value) => {
        return value + 1;
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClickBin = async () => {
    try {
      setLoading(true);
      if (numberOfOrder > 0) {
        const result = await removeProductFromBasket(product.model);
        dispatch(setSumOfCart(result.data?.products.length));
        setNumberOfOrder((value) => {
          return value - 1;
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowOrders = () => {};
  return (
    <div className=" lg:flex">
      <ProductImages product={product} />
      <ProductFeatures product={product} />
      <ProductPrice
        loading={loading}
        product={product}
        onClickPlus={handleClickPlus}
        onClickBin={handleClickBin}
        numberOfOrder={numberOfOrder}
        showOrders={handleShowOrders}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { model } = context.query;
  const result = await getProduct({ context, model });
  const product = result.data;
  return { props: { product } };
}
DetailProduct.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default DetailProduct;
