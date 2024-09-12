import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  otp: '',
  isAuthenticated: false,
};


//for login 
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearAuth: (state) => {
      state.username = '';
      state.password = '';
      state.otp = '';
      state.isAuthenticated = false;
    },
  },
});

//for register

export const { setLoginDetails, setOtp, setAuthenticated, clearAuth } = authSlice.actions;

export default authSlice.reducer;
