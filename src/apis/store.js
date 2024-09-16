import { configureStore } from '@reduxjs/toolkit';
import { authReducer, checkAuthReducer } from './authSlice'; 
import { registerAuthReducer  } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    registerAuth: registerAuthReducer, // Register it with a unique key
    checkStatusAuth: checkAuthReducer,// check status it with a unique key
  },
});

export default store;
