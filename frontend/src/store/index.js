import userReducer from './userStore';
import productReducer from './productStore';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
      user: userReducer,
      product: productReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
  });
  
  export default store;