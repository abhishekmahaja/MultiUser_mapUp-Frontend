import React from "react";
// import PageContainer from "../../components/HOC/PageContainer";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import AssetsIcon from "@mui/icons-material/AccountBalance";

function SuperAdim() {
  return (
    // <PageContainer className="login-form-bg-image">
    <Grid
      container
      height="87vh"
      margin={0}
      padding={0}
      boxSizing={"border-box"}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Grid item p={2}>
          <IconButton>
            <AssetsIcon sx={{ fontSize: 30, color: "green " }} />
            <Typography variant="h4" mt={1}>
              {" "}
              Create a New Organization{" "}
            </Typography>
          </IconButton>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Organization Name </Typography>
              <TextField variant="outlined" size="small" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Email</Typography>
              <TextField variant="outlined" size="small" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Contact Number</Typography>
              <TextField variant="outlined" size="small" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Username</Typography>
              <TextField variant="outlined" size="small" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Password</Typography>
              <TextField variant="outlined" size="small" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">State</Typography>
              <TextField variant="outlined" size="small" fullWidth value={""} />
            </Grid>
          </Grid>
          <Grid display={"flex"} justifyContent={"end"} mt={2} gap={2}>
            <Button variant="contained" sx={{ backgroundColor: "green" }}>
              Submit
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "green" }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    // </PageContainer>
  );
}

export default SuperAdim;
