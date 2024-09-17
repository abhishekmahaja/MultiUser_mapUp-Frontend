import { Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageContainer from "../../components/HOC/PageContainer";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../apis/Service";
import { setForgotDetails } from "../../apis/authSlice";
import { toast } from "react-toastify";

export default function Forgot() {
  const [formValues, setFormValues] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setFormValues((pre) => ({ ...pre, [e.target?.name]: e.target?.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //integration
    try {
      const response = await forgotPassword(formValues);
      if (response.success) {
        //stire data in redux store
        dispatch(
          setForgotDetails({
            email: formValues.email,
          })
        ); 
        toast.success("OTP Sent Successfully!");
        navigate("/Reset");
      } else {
        toast.error("Invalid Email");
      }
    } catch (error) {
      console.error(error);
      toast.error("Forgot Password Falied.");
    }
  };

  return (
    <PageContainer
      showheader
      showfooter
      display="flex"
      alignItems="center"
      className="bgImg"
      justifyContent="center"
    >
      {/* <Grid container > */}
      <Paper sx={{ borderRadius: "20px", mx: "5%", width: "45rem" }}>
        <Grid item p={3}>
          <form onSubmit={handleSubmit}>
            <Grid item mt={2}>
              <Typography variant="h5" fontSize="x-large" textAlign="center">
                Forgot Your Password?
              </Typography>
            </Grid>
            <Grid item mt={2}>
              <Typography fontSize="large" textAlign="center">
                Enter Your Registered Email.{" "}
              </Typography>
            </Grid>
            <Grid item mt={3}>
              <TextField
                name="email"
                justifyContent="center"
                label="Enter Email Address"
                variant="outlined"
                size="small"
                value={formValues?.email}
                onChange={handleInputs}
                fullWidth
              />
            </Grid>
            <Grid item mt={3}>
              <Link to="/Reset">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Send Verification Code
                </Button>
              </Link>
            </Grid>
            <Grid item mt={2} textAlign="center">
              <Link to="/" style={{ textDecoration: "none" }}>
                Back to Login
              </Link>
            </Grid>
          </form>
        </Grid>
      </Paper>
      {/* </Grid> */}
    </PageContainer>
  );
}
