import React from "react";
import { Grid, Typography } from "@mui/material";

function Footer() {
  return (
    <div>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#000",
          p: 0.8,
        }}
      >
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          textAlign="center"
          sx={{
            display: { sm: "block", xs: "none", md: "block", lg: "block" },
          }}
        >
          <Typography variant="inherit" color={"white"}>
            Instrument company: All Right Reserved Best display resolution [
            1920*1080 ]
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
