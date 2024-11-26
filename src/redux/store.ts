// store.ts
import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./slices/generalSlice";

const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
