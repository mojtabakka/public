import { BACK_URL } from "redux/types.js";
const initialState = {};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case BACK_URL:
      return { ...state, back_url: action.data };
    default:
      return state;
  }
};

export default generalReducer;
