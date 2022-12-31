import { combineReducers } from "redux";
import { APP_SET_RESET } from "redux/types";
import UserReducer from "./user.reducer";

const appReducer = combineReducers({
  user: UserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === APP_SET_RESET) {
    const { configs } = state.general;
    const newState = { general: { configs } };
    return appReducer(newState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
