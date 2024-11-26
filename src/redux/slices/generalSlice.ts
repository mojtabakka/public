import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeneralState {
  sumCart: 0;
}

const initialState: GeneralState = {
  sumCart: 0,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setSumOfCart: (state, action: PayloadAction<number>) => {
      state.sumCart += action.payload;
    },
  },
});

export const { setSumOfCart } = generalSlice.actions;
export default generalSlice.reducer;
