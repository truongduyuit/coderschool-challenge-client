import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MainSliceState = {
  loading: boolean;
  tags: string[];
  keywords: string[];
};

const initialState: MainSliceState = {
  loading: false,
  tags: [],
  keywords: [],
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
    setKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
  },
});

export const { setLoading, setTags, setKeywords } = mainSlice.actions;
export default mainSlice.reducer;
