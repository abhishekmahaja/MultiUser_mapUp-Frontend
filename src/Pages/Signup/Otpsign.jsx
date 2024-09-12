import { Grid, Paper, Typography, TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";
import PageContainer from "../../components/HOC/PageContainer";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import services from "../Signup/Service/signupService";


export default function Otpsign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const state = useSelector((state) => state.signup.signupUsers ) || {};
  console.log("otppp", state.username, state.email, otp)

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    dispatch(services.authRegister(state.username, state.email, otp))
    // navigate('/dashboard')


  }


  return (
    <PageContainer
      showheader='true'
      showfooter='true'
      className='bgImg'
      style={{ display: 'grid', placeContent: 'center' }}
    >
      <Grid container m={0}>
        <Grid item xs={12} md={12} sm={12}>
          <Paper sx={{ borderRadius: "10px" }} >
            <Grid item p={2}>
              <form>
                <Grid item xs={12} md={12} sm={12} lg={12} mt={2}>
                  <Typography fontSize={"x-large"} sx={{ color: "#0c1352", textAlign: 'center' }}>
                    Enter OTP To Verify Mobile
                  </Typography>
                </Grid>

                {/* Input otp value  */}
                <Grid item xs={12} md={12} sm={12} lg={12} mt={3} display='flex' justifyContent={'center'}>
                  <OTPInput
                    // style={{ width: '2em', height: '4vh', textAlign: 'center',bgcolor:'red' }}
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>&nbsp; &nbsp; </span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </Grid>
                <Grid
                  item
                  xs={12} md={12} sm={12} lg={12} mt={3} justifyContent="center" sx={{ textAlign: "center" }}>
                  <Link>
                    <Button
                      onClick={handleOtpSubmit}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ bgcolor: "#0c113b" }}
                    >
                      <Typography>Submit</Typography>
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12} textAlign="center" py={1}>
                  <Link to="" style={{ textDecoration: "none" }}>
                    <Typography >
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
