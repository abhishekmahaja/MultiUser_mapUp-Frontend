import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240, // This should be the same as the drawerWidth
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen}) {

  return (
    <AppBar position="fixed" open={open}  sx={{ backgroundColor: '#8C000B' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon fontSize='large' />
        </IconButton>
        <Grid container justifyContent={'space-between'} flexWrap={'nowrap'}>
          <Box py={1.2}>
            <Typography sx={{
              fontSize: {
                xs: 'large', // small screens
                sm: 'large', // medium screens
                md: 'x-large', // large screens
                lg: 'x-large', // extra-large screens
              }
            }}>Oil & Natural Gas Corporation</Typography>
            <Typography sx={{
              fontSize: {
                xs: 'medium', // small screens
                sm: 'medium', // medium screens
                md: 'large', // large screens
                lg: 'large', // extra-large screens
              }
            }}>Real Time Well Monitoring System</Typography>
          </Box>
          {/* <Box mt={1} >
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize='large'/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    marginLeft:'100px',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    marginLeft:'100px',
                  }}
                  style={{
                    left: '-60px', // Move menu 150px to the left
                    top: '10px', // Move menu 50px down from the top
                  }}
          
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Log out</MenuItem>

                </Menu>
              </div>)}
          </Box> */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
