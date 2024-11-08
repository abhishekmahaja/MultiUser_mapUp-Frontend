import axios from "axios";
import { External_API, ORGANIZATION_API, USER_API } from "../apis/Client";
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
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Correct the Content-Type header
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//register API
export const register = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Correct the Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// check status api
export const checkStatus = async (formData) => {
  try {
    const response = await axios.post(
      `${USER_API}/registration-status`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//forgot password api
export const forgotPassword = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/forgot-password`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//reset password Api
export const resetPassword = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/reset-password`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// GET all Users Not approved By Manager
export const getNotApprovedManagerUser = async (organizationName) => {
  try {
    const response = await axios.get(
      `${USER_API}/get-not-approved-manager-user?organizationName=${organizationName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// GET All Users Not Approved By Owner
export const getNotApprovalOwnerUser = async (organizationName) => {
  try {
    const response = await axios.get(
      `${USER_API}/get-not-approval-owner-user?organizationName=${organizationName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//User Approved by Manger
export const ApproveByManager = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/approve-by-manager`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// User Approved by Owner
export const approveByOwner = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/approve-by-owner`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//User Reject by Manger
export const rejectByManager = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/reject-user-by-manager`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// User Reject by Owner
export const rejectByOwner = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/reject-user-by-owner`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//organization dropdown in signuppage
export const organizationDropDown = async () => {
  try {
    const response = await axios.get(
      `${ORGANIZATION_API}/organization-drop-down`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//Post Api department-base-org-name-dropdown
export const departmentDropdown = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/department-base-org-name-dropdown`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//live data show
// http://localhost:5000/api/v1/externaldevice/live-data-show
export const liveDataShow = async () => {
  try {
    const response = await axios.get(`${External_API}/live-data-show`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
