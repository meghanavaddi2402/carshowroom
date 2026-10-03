import { configureStore } from "@reduxjs/toolkit";
import favouriteCarReducer from "../features/favouriteCarSlice";

export const store = configureStore({
  reducer: {
    favouriteCars: favouriteCarReducer
  }
});