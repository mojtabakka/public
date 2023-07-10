import { GENERAL_SET_SUM_CART } from "../types";

export const setSumOfCart = (data) => {
  return {
    type: GENERAL_SET_SUM_CART,
    data: data,
  };
};
