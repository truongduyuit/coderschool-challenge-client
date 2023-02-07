import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MainSliceState = {
  loading: boolean;
  tags: string[];
};

const initialState: MainSliceState = {
  loading: false,
  tags: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
  },
});

export const { setLoading, setTags } = mainSlice.actions;
export default mainSlice.reducer;
