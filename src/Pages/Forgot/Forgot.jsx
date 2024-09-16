import { Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/HOC/PageContainer";

export default function Forgot() {
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
          <form>
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
                justifyContent="center"
                label="Enter Email Address"
                variant="outlined"
                size="small"
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
