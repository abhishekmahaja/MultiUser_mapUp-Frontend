import { createSlice } from "@reduxjs/toolkit";

// initial state for Login
const initialState = {
  username: "",
  password: "",
  otp: "",
  isAuthenticated: false,
};

// initial state for Signup
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

// initial state for check status
const checkInitialState = {
  checkAuth: {
    username: "",
    email: "",
    contactNumber: "",
    employeeID: "",
    assetName: "",
    department: "",
    roleInRTMS: "",
    idCardPhoto: "", //here ftech image URL
    passportPhoto: "", //here ftech image URL
  },
  isAuthenticated: false,
};

//forgot initial api

//for login
const authSlice = createSlice({
  name: "auth",
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
      state.username = "";
      state.password = "";
      state.otp = "";
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

//for check status
const checkAuthSlice = createSlice({
  name: "checkStatusAuth",
  initialState: checkInitialState,
  reducers: {
    setCheckDetails: (state, action) => {
      state.checkAuth = action.payload; // Storing all fetched data in `checkAuth`
    },
    setCheckAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearCheckAuth: (state) => {
      state.checkAuth = {}; // Clearing auth details on logout/clear
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
export const { setCheckDetails, setCheckAuthenticated, clearCheckAuth } =
  checkAuthSlice.actions;

// Export reducers with unique names
export const authReducer = authSlice.reducer;
export const registerAuthReducer = registerAuthSlice.reducer;
export const checkAuthReducer = checkAuthSlice.reducer;
