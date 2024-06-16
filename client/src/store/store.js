import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import imagesSlice from "./imagesSlice";

export const store = configureStore({
    reducer: { 
        user: userReducer,
        images: imagesSlice,
    }
});
