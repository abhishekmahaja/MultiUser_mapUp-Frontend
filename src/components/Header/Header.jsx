import React from "react";
import logo from "/assets/logo.svg";
import MQTT1 from "/assets/MQTT1.png";
import { Grid, Typography, Box } from "@mui/material";
import Technical from "/assets/Technical.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const organizationName = useSelector((state) => state.auth.organization);

  return (
    <>
      <Grid container bgcolor="black" color="#fff" p={1}>
        <Grid
          item
          md={8}
          lg={8}
          sm={12}
          display="flex"
          gap="2"
          alignItems="center"
        >
          <Box>
            <img src={logo} style={{ width: "5rem", height: "5rem" }} />
          </Box>

          <Typography sx={{
            fontSize: {
              xs: '110%', // small screens
              sm: 'x-large', // medium screens
              md: 'x-large', // large screens
              lg: 'x-large', // extra-large screens
            }
          }}>
            {/* {organizationName || "OIL & NATURAL GAS CORPORATION"} */}
            OIL & NATURAL GAS CORPORATION
            <Typography sx={{
              fontSize: {
                xs: 'small', // small screens
                sm: 'large', // medium screens
                md: 'large', // large screens
                lg: 'large', // extra-large screens
              },
            }}>
              Real Time Well Monitoring System
            </Typography>
          </Typography>
        </Grid>

        <Grid
          item
          md={4}
          lg={4}
          // sm={4}
          sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}
        >
          <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
            <Link to=''><img src={Technical} style={{ objectFit: "cover", width: "70px", marginRight: "24px" }} /></Link>
            <img src={MQTT1} style={{ objectFit: "cover", width: "151px" }} />
          </Box>

          {/* <a href='' alt='contain' ><Typography style={{textDecoration:'none'}}>Technical Support</Typography></a> */}
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
