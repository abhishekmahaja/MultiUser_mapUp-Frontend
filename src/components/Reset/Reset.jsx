import { Button, Grid, Paper, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import account1 from "/assets/account1.png";
import { Link } from "react-router-dom";
import PageContainer from "../HOC/PageContainer";

function Reset() {
  const [forgotOtp, setForgotOtp] = useState("");

  
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
      <Grid container lg={4} md={4} sm={6} xs={12} p={"5%"}>
        <Paper sx={{ borderRadius: "20px", border: "1px solid #ddd", p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Grid item textAlign="center">
                <img src={account1} style={{ width: "100px" }} />
              </Grid>
              <Grid item sx={{ textAlign: "center", pb: 1 }}>
                <Typography variant="h4">Reset Password</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { my: 1 },
            }}
          >
            <TextField
              label="Enter Verification Code"
              variant="outlined"
              fullWidth
            />
            <TextField label="New Password" variant="outlined" fullWidth />
            <TextField label="Confirm Password" variant="outlined" fullWidth />
            <Link to="/">
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
                color="primary"
              >
                Change Password
              </Button>
            </Link>
            <Typography textAlign={"center"} pt={2}>
              <Link to="/" style={{ textDecoration: "none" }}>
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </PageContainer>
  );
}

export default Reset;
