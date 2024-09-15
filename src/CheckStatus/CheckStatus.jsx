import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PageContainer from "../components/HOC/PageContainer";
import { bgcolor, Box, color, display, width } from "@mui/system";
import { yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";

const steps = ["ASSET MANAGER", "DEPARTMENT HEAD", "PASSWORD EMAILED"];

function CheckStatus() {
  return (
    <>
      <PageContainer
        showheader="true"
        showfooter="true"
        style={{ padding: "5%" }}
      >
        <Paper elevation={3}>
          <Grid container p={5} gap={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} md={4} lg={4} gap={3}>
                <Typography fontSize="large">REGISTRATION ID</Typography>
                <Typography fontSize="large">User Name</Typography>
                <Typography fontSize="large">Email Address</Typography>
                <Typography fontSize="large">Contact Number</Typography>
                <Typography fontSize="large">Employee ID</Typography>
                <Typography fontSize="large">Asset Name</Typography>
                <Typography fontSize="large">Department</Typography>
                <Typography fontSize="large">Role in RTMS</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Paper elevation={3}>
                      <img
                        src="https://t4.ftcdn.net/jpg/01/42/20/17/240_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.jpg"
                        alt="User_ID Card"
                        style={{ objectFit: "contain", width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Paper elevation={3}>
                      <img
                        src="https://t3.ftcdn.net/jpg/02/53/98/06/240_F_253980681_a8hAmy7gbe28SjtRPoUo0EShW87oXVTy.jpg"
                        alt="User_ID Card"
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container textAlign="center" gap={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stepper
                  activeStep={1}
                  alternativeLabel
                  sx={{
                    fontSize: "300px",
                    "& .MuiStepConnector-line": {
                      marginTop: "12px",
                      marginRight: "10px",
                      marginLeft: "10px",
                    },
                  }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        sx={{
                          "& .MuiStepIcon-root": {
                            width: 50,
                            height: 50,
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </Grid>
            <Grid container gap={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="h5" textAlign="left">
                  Status:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} textAlign={"center"}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" color="primary" size="large">
                    Close
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </PageContainer>
    </>
  );
}

export default CheckStatus;
