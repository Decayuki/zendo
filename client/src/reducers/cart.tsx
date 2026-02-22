import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    productId: "",
    size: "",
    color: "",
    quantity: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addcart: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    deletecart: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((cart) => cart !== action.payload);
    },
  },
});

export const { addcart, deletecart } = cartSlice.actions;
export default cartSlice.reducer;
