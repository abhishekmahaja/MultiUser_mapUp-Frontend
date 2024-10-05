import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Box, useMediaQuery, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Correct import for useTheme
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240; // Define drawerWidth

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen }) {
  const theme = useTheme(); // Correct theme hook import
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for managing menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: '#8C000B' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 4,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <Grid container justifyContent="space-between" alignItems="center" flexWrap="nowrap">
          {/* Header Text Section */}
          <Box py={1.2}>
            <Typography sx={{
              fontSize: {
                xs: 'medium', // Mobile size
                sm: 'large',  // Tablet size
                md: 'x-large', // Desktop size
                lg: 'x-large', // Larger screen size
              },
            }}>
              Oil & Natural Gas Corporation
            </Typography>
            <Typography sx={{
              fontSize: {
                xs: 'small', // Mobile size
                sm: 'medium',  // Tablet size
                md: 'large',  // Desktop size
                lg: 'large', // Larger screen size
              },
            }}>
              Real Time Well Monitoring System
            </Typography>
          </Box>

          {/* User Icon and Menu */}
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="user menu"
              onClick={handleMenuOpen}
              sx={{
                fontSize: isMobile ? 'medium' : 'large', // Adjust icon size based on screen size
                ...(isMobile ? { marginRight: 0 } : { marginRight: 2 }),
              }}
            >
              <AccountCircleIcon sx={{ fontSize: isMobile ? 30 : 40 }} /> {/* User Icon */}
            </IconButton>

            {/* User Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>View Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}