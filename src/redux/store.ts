import { configureStore } from "@reduxjs/toolkit";
import mainSlice, { MainSliceState } from "./main";
import userSlice, { UserSliceState } from "./user";

const store = configureStore({
  reducer: {
    app: mainSlice,
    user: userSlice,
  },
});

export type RootState = {
  app: MainSliceState;
  user: UserSliceState;
};

export default store;
