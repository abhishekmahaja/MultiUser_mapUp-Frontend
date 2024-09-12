import { Grid, Paper, Typography, TextField, Button, Box } from "@mui/material";
import React from "react";
import PageContainer from "../../components/HOC/PageContainer";
import { Link } from "react-router-dom";


export default function OtpForget() {
  return (
    <PageContainer
     showheader='true'
      showfooter='true'
      className='bgImg'
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    
      <Paper sx={{ borderRadius: "20px", px:"5px" }} >
        <Grid item p={4}>
          <form>
            <Grid item mt={2}>
              <Typography fontSize={"xx-large"} sx={{ color: "#0c1352" }}>
                Please Enter The OTP To Verify Your Account
              </Typography>
            </Grid>
            <Grid item mt={2}>
              <Typography variant="h5" textAlign="center">
                OTP has been sent to your registered E-mail & Mobile
              </Typography>
            </Grid>
            {/* Input otp value  */}
            <Grid item mt={3} display="flex" gap={2} justifyContent="center" justifyItems="center">
              {/* < input type="number" inputProps={{ maxLength: 5 }}  style={{textAlign:"center"}}></input> */}
              <input type="text" className="otp-style"maxLength={1} style={{ textAlign:"center", height:"40px", width:"40px"}} />
              <input type="text" className="otp-style"maxLength={1} style={{textAlign:"center",  height:"40px", width:"40px"}} />
              <input type="text" className="otp-style"maxLength={1} style={{textAlign:"center", height:"40px", width:"40px"}} />
              <input type="text" className="otp-style"maxLength={1} style={{ textAlign:"center", height:"40px", width:"40px"}} />
              <input type="text" className="otp-style"maxLength={1} style={{ textAlign:"center", height:"40px", width:"40px"}} />
              <input type="text" className="otp-style"maxLength={1} style={{ textAlign:"center", height:"40px", width:"40px"}} />
              
            </Grid>
            <Grid
              item
              mt={3}
              justifyContent="center"
              sx={{ textAlign: "center" }}
            >
              <Link to="/">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ bgcolor: "#0c113b" }}
                >
                  <Typography>Reset Password</Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item mt={2} textAlign="center">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Resend One-Time Password
                </Typography>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </PageContainer>
  );
}