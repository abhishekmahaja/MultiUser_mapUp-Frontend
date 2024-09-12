import axios from "axios";
import { USER_API } from "../apis/Client";
import { catchError } from "../helper/helper";

// Function to send OTP for login
export const sendOtpLogin = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/send-otp-login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Function to handle login after OTP verification
export const login = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//register OTP API
export const sendOtpRegister = async (formData) => {
  try {
    const response = await axios.post(
      `${USER_API}/send-otp-register`,
      {
        headers: {
          contentType: "multipart/formdata",
        },
      },
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//register api
export const register = async (formdata) => {
  try {
    const response = await axios.post(
      `${USER_API}/register`,
      {
        headers: {
          contentType: "multipart/formdata",
        },
      },
      formdata
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
