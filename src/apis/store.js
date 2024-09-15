import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice'; 
import { registerAuthReducer  } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    registerAuth: registerAuthReducer, // Register it with a unique key
  },
});

export default store;
