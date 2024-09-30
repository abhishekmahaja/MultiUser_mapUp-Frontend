import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#023861',
        zIndex: 100, // Ensure it's above other content if necessary
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          background: '#023861',
          p: 0.8,
        }}
      >
        {/* For larger screens */}
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          textAlign="center"
          sx={{ display: { sm: 'block', xs: 'none', md: 'block', lg: 'block' } }}
        >
          <Typography variant="inherit" color={'white'}>
            Foxboro Instrument company: All Right Reserved Best display resolution [ 1920*1080 ]
          </Typography>
        </Grid>

        {/* For smaller screens */}
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          textAlign="center"
          sx={{ display: { sm: 'none', xs: 'block', md: 'none', lg: 'none' } }}
        >
          <Typography fontSize="small" color={'white'}>
            Foxboro Instrument company: All Right Reserved
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
