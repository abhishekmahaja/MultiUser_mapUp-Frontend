import React, { useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import { Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";
import { checkStatus } from "../apis/Service";
import {
  clearCheckAuth,
  setCheckAuthenticated,
  setCheckDetails,
} from "../apis/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function PopUp() {
  const [employeeId, setEmployeeId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await checkStatus({ employeeID: employeeId });
      if (response?.success) {
        // Store the data in Redux
        dispatch(setCheckDetails(response.data));
        dispatch(setCheckAuthenticated(true));
        toast.success("Your Registration Details Fetch Successfull!");

        navigate("/CheckStatus");
      } else {
        toast.error("EmployeeId does not match.");
      }
    } catch (error) {
      console.error(error);
      toast.error("EmployeeId verification failed.");
    }
  };

  return (
    <PageContainer
      showheader
      showfooter
      display="flex"
      alignItems="center"
      className="bgImg"
    >
      <Grid container justifyContent="center">
        <Paper sx={{ borderRadius: "20px" }}>
          <Grid item p={3}>
            <form onSubmit={handleSubmit}>
              <Box item mt={2}>
                <Typography variant="h5" fontSize="x-large" textAlign="center">
                  Enter Employee ID.
                </Typography>
              </Box>

              <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  justifyContent="center"
                  label="Enter Employee ID"
                  name="employeeId"
                  value={employeeId}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              </Box>
              <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="medium"
                  type="submit"
                >
                  Check Status
                </Button>
              </Box>
              <Grid item mt={2} textAlign="center">
                <Link to="/" style={{ textDecoration: "none" }}>
                  Back to SignUp
                </Link>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </PageContainer>
  );
}

export default PopUp;
