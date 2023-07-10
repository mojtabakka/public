import { BACK_URL, GENERAL_SET_SUM_CART } from "redux/types.js";
const initialState = {
  sumCart: 0,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_SET_SUM_CART:
      return { ...state, sumCart: action.data };
    default:
      return state;
  }
};

export default generalReducer;
