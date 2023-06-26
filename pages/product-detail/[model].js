import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getProduct,
  getNumberOfProductInBasket,
  removeProductFromBasket,
  addToBasket,
} from "api";
import { ProductFeatures, ProductImages, ProductPrice } from "components";
import Layout from "components/layout/mainLayout";
import { PATHS } from "config/routes.config";
import { BACK_URL } from "redux/types.js";
import { getCookie } from "lib/function.utils.js";

const DetailProduct = (props) => {
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
      await addToBasket(data);
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
      if (numberOfOrder > 0) {
        await removeProductFromBasket(product.model);
        setNumberOfOrder((value) => {
          return value - 1;
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const setBackUrl = (back_url = null) => ({
    type: BACK_URL,
    data: back_url,
  });

  const handleShowOrders = () => {};
  return (
    <div className=" lg:flex">
      <ProductImages product={product} />
      <ProductFeatures product={product} />
      <ProductPrice
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
  return <Layout>{page}</Layout>;
};
export default DetailProduct;
