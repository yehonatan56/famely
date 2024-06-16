import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
// import imagesSlice from "./imagesSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    users: userReducer,
    // images: imagesSlice,
  },
});

export const dispatch = (action) => {
  return store?.dispatch(action);
};

export const getState = () => {
  return store?.getState();
};
