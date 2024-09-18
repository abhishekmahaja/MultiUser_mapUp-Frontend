import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import account1 from "/assets/account1.png";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../HOC/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../apis/Service";
import {
  clearForgotAuth,
  setForgotAuthenticated,
  setForgotEmailOtp,
} from "../../apis/authSlice";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Reset() {
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.forgotAuth); // get email from redux store

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = { email, newPassword, confirmPassword, otp: forgotOtp };

    // API integration
    try {
      const response = await resetPassword(formData);
      if (response.success) {
        dispatch(setForgotEmailOtp(forgotOtp)); // store OTP in Redux
        dispatch(setForgotAuthenticated(true)); // set authenticated state to true
        toast.success("Password reset successful! Please log in.");

        navigate("/");

        dispatch(clearForgotAuth()); // clear auth data after password reset success
      } else {
        toast.error(response.message || "OTP does not match");
      }
    } catch (error) {
      console.error(error);
      toast.error("Password reset failed");
    }
  };

  // Toggle visibility of passwords
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <PageContainer
      showheader
      showfooter
      bgcolor="#646d90"
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="bgImg"
    >
      <Grid
        container
        style={{ backgroundColor: "white" }}
        lg={4}
        md={4}
        sm={6}
        xs={12}
        p={"5%"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            borderRadius: "20px",
            border: "1px solid #ddd",
            padding: "2%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Grid item textAlign="center">
                <img src={account1} style={{ width: "100px" }} alt="Account" />
              </Grid>
              <Grid item sx={{ textAlign: "center", pb: 1 }}>
                <Typography variant="h4">Reset Password</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { my: 1 },
            }}
          >
            <TextField
              label="Enter Verification Code"
              variant="outlined"
              value={forgotOtp}
              onChange={(e) => setForgotOtp(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              fullWidth
              color="primary"
              type="submit"
            >
              Change Password
            </Button>
            <Typography textAlign={"center"} pt={2}>
              <Link to="/" style={{ textDecoration: "none" }}>
                Back to Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Grid>
    </PageContainer>
  );
}

export default Reset;