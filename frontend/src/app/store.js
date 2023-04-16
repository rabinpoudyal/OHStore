import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "../features/login/loginSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
  },
});
