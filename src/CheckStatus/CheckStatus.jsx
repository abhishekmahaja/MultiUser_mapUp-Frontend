import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../components/HOC/PageContainer";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

function CheckStatus() {
  // Fetch the values from the Redux store
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
    isApprovedByManager,
    isApprovedByOwner,
    status,
  } = useSelector((state) => state?.checkStatusAuth?.checkAuth); 

  // Define the steps and icons based on approval status
  const steps = [
    {
      label: "Manager Approval",
      status: isApprovedByManager,
    },
    {
      label: "Owner Approval",
      status: isApprovedByOwner,
    },
    {
      label: "Password Emailed",
      status: isApprovedByManager && isApprovedByOwner, // Can only be true if both approvals are done
    },
  ];

  // Function to get the appropriate icon for each step
  const getStepIcon = (status) => {
    if (status === true) {
      return <CheckCircleIcon color="success" />;
    } else if (status === false) {
      return <CancelIcon color="error" />;
    } else {
      return <HourglassEmptyIcon color="action" />;
    }
  };

  return (
    <PageContainer
      showheader="true"
      showfooter="true"
      style={{ padding: "5%" }}
    >
      <Paper elevation={3}>
        <Grid container p={5} gap={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} md={4} lg={4} gap={3}>
              <Typography fontSize="large">REGISTRATION DETAILS :-</Typography>
              <Typography fontSize="large">User Name: {username}</Typography>
              <Typography fontSize="large">Email Address: {email}</Typography>
              <Typography fontSize="large">
                Contact Number: {contactNumber}
              </Typography>
              <Typography fontSize="large">
                Employee ID: {employeeID}
              </Typography>
              <Typography fontSize="large">Asset Name: {organizationName}</Typography>
              <Typography fontSize="large">Department: {department}</Typography>
              <Typography fontSize="large">
                Role in RTMS: {roleInRTMS}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Paper elevation={3}>
                    <img
                      src={idCardPhoto}
                      alt="User_ID Card"
                      style={{ objectFit: "contain", width: "100%" }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Paper elevation={3}>
                    <img
                      src={passportPhoto}
                      alt="User_Passport Photo"
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
          {/* Stepper */}
          <Grid container textAlign="center" gap={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stepper activeStep={-1} alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel icon={getStepIcon(step.status)}>
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>
          {/* Status and Close Button */}
          <Grid container gap={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h5" textAlign="left">
                {status}
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
  );
}

export default CheckStatus;
