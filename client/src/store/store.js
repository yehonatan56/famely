import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import editReducer from "./slices/edit.slice";
export const store = configureStore({
  devTools: true,
  reducer: {
    users: userReducer,
    edit: editReducer,
  },
});

export const dispatch = (action) => {
  return store?.dispatch(action);
};

export const getState = () => {
  return store?.getState();
};
