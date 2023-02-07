import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserSliceState = {
  userId?: string;
  email?: string;
};

const initialState: UserSliceState | undefined = {
  userId: undefined,
  email: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserSliceState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
