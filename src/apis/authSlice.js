import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  otp: "",
  isAuthenticated: false,
};

const registerInitialState = {
  username: "",
  email: "",
  contactNumber: "",
  employeeID: "",
  assetName: "",
  department: "",
  roleInRTMS: "",
  idCardPhoto: "", // this is Image Upload by the user
  passportPhoto: "", // this is Image Upload by the user
  emailOtp: "",
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

// For registration
const registerAuthSlice = createSlice({
  name: "registerAuth",
  initialState: registerInitialState,
  reducers: {
    setRegisterDetails: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.contactNumber = action.payload.contactNumber;
      state.employeeID = action.payload.employeeID;
      state.assetName = action.payload.assetName;
      state.department = action.payload.department;
      state.roleInRTMS = action.payload.roleInRTMS;
      state.idCardPhoto = action.payload.idCardPhoto; // this is Image Upload by the user
      state.passportPhoto = action.payload.passportPhoto; // this is Image Upload by the users
    },
    setEmailOtp: (state, action) => {
      state.emailOtp = action.payload;
    },
    setRegisterAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearRegisterAuth: (state) => {
      state.username = "";
      state.email = "";
      state.contactNumber = "";
      state.employeeID = "";
      state.assetName = "";
      state.department = "";
      state.roleInRTMS = "";
      state.idCardPhoto = ""; // this is Image Upload by the user
      state.passportPhoto = ""; // this is Image Upload by the user
      state.emailOtp = "";
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { setLoginDetails, setOtp, setAuthenticated, clearAuth } =
  authSlice.actions;
export const {
  setRegisterDetails,
  setEmailOtp,
  setRegisterAuthenticated,
  clearRegisterAuth,
} = registerAuthSlice.actions;

// Export reducers with unique names
export const authReducer = authSlice.reducer;
export const registerAuthReducer = registerAuthSlice.reducer; // Renamed to avoid conflict
