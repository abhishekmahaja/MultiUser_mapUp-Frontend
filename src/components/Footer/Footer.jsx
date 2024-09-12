import React from 'react'
// import { Grid, Typography } from '@mui/material'
// import '../../Stylesheet/Footer.css'
import { Box, Grid, Typography } from '@mui/material'
// import  from '@mui/material/Box';
function Footer() {
  return (
    <div>
      <Grid container sx={{ display: "flex", justifyContent: "center", background: "#000", p:0.8  }} >
        <Grid item lg={12} md={12} sm={12} xs={12} textAlign='center' sx={{display: { sm: "block", xs: "none", md: "block", lg: "block" }}}>
          <Typography variant='inherit' color={'white'}  >
            Foxboro Instrument company: All Right Reserved Best display resolution  [ 1920*1080 ]
          </Typography>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} textAlign='center' sx={{display: { sm: "none", xs: "block", md: "none", lg: "none" }}}>
          <Typography fontSize='small' color={'white'}  >
            Foxboro Instrument company: All Right Reserved
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
