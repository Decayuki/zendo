import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favorisSlice = createSlice({
  name: "favoris",
  initialState,
  reducers: {
    addFavoris: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    deleteFavoris: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((favoris) => favoris !== action.payload);
    },
  },
});

export const { addFavoris, deleteFavoris } = favorisSlice.actions;
export default favorisSlice.reducer;
