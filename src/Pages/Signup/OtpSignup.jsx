import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
import PageContainer from "../../components/HOC/PageContainer";
import { Button, Grid, Paper, Typography } from "@mui/material";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { register, sendOtpRegister } from "../../apis/Service";
import { toast } from "react-toastify";
import {
  clearRegisterAuth,
  setRegisterAuthenticated,
} from "../../apis/authSlice";

export default function Otpsign() {
  const [emailOtpValue, setEmailOtpValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    username,
    email,
    contactNumber,
    employeeID,
    organizationName,
    department,
    roleInRTMS,
    idCardPhoto,
    passportPhoto,
  } = useSelector((state) => state.registerAuth);

  console.log(
    "form value",
    username,
    email,
    contactNumber,
    employeeID,
    organizationName,
    department,
    roleInRTMS,
    idCardPhoto,
    passportPhoto
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contactNumber", contactNumber);
    formData.append("employeeID", employeeID);
    formData.append("organizationName", organizationName);
    formData.append("department", department);
    formData.append("roleInRTMS", roleInRTMS);
    formData.append("emailOtp", emailOtpValue);
    // Append the files from Redux (ensure they are File objects)
    if (passportPhoto instanceof File)
      formData.append("passportPhoto", passportPhoto);
    if (idCardPhoto instanceof File)
      formData.append("idCardPhoto", idCardPhoto);

    // // Debugging: Log formData fields to verify they're populated correctly
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1], "formdata print1");
    // }

    try {
      const response = await register(formData); // Verify OTP
      if (response.success) {
        dispatch(setRegisterAuthenticated(true)); // Set authorized state to true
        toast.success(
          "Signup successful! Please wait for approval and check your status here."
        );

        navigate("/popup");

        dispatch(clearRegisterAuth()); // Clear auth data after login success
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(response.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await sendOtpRegister({ email, contactNumber }); // Resend OTP API call
      if (response.success) {
        toast.success("OTP Resent Successfully!");
      } else {
        toast.error("Failed to Resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Resending OTP");
    }
  };

  return (
    <PageContainer
      showheader="true"
      showfooter="true"
      className="bgImg"
      style={{ display: "grid", placeContent: "center" }}
    >
      <Grid container m={0}>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: "10px" }}>
            <Grid item p={2}>
              <form onSubmit={handleSubmit}>
                <Grid item xs={12} mt={2}>
                  <Typography
                    fontSize={"x-large"}
                    sx={{ color: "#0c1352", textAlign: "center" }}
                  >
                    Enter OTP To Verify Mobile
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  mt={3}
                  display="flex"
                  justifyContent="center"
                >
                  <OTPInput
                    value={emailOtpValue}
                    onChange={setEmailOtpValue}
                    numInputs={6}
                    renderSeparator={<span>&nbsp; &nbsp;</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </Grid>
                <Grid item xs={12} mt={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ bgcolor: "#0c113b" }}
                    type="submit" // Changed to type="submit"
                  >
                    <Typography>Submit</Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} textAlign="center" py={1}>
                  <Link
                    to="#"
                    style={{ textDecoration: "none" }}
                    onClick={handleResendOtp}
                  >
                    <Typography style={{ cursor: "pointer" }}>
                      Resend One-Time Password
                    </Typography>
                  </Link>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
