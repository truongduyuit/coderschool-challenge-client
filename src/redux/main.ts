import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MainSliceState = {
  loading: boolean;
};

const initialState: MainSliceState = {
  loading: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = mainSlice.actions;
export default mainSlice.reducer;
