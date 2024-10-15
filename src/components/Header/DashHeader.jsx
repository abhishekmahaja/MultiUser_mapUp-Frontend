import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, Box, useMediaQuery, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const organizationName = useSelector((state) => state.auth.organization);

  // Retrieve values from localStorage
  const organizationLogo = localStorage.getItem("organizationLogo");
  const subtitlename = localStorage.getItem("subtitlename");

// console.log(subtitlename,"jhghj");

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
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "#8C000B" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 4,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
        >
          <Box py={1.2} display="flex" flexDirection="column" alignItems="left">
            
            <Typography
              sx={{
                fontSize: {
                  xs: "medium",
                  sm: "large",
                  md: "x-large",
                  lg: "x-large",
                },
              }}
            >
              {organizationName || "OIL & NATURAL GAS CORPORATION"}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "small",
                  sm: "medium",
                  md: "large",
                  lg: "large",
                },
              }}
            >
              {subtitlename || "Default Subtitle"}
            </Typography>
          </Box>
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="user menu"
              onClick={handleMenuOpen}
              sx={{
                fontSize: isMobile ? "medium" : "large",
                ...(isMobile ? { marginRight: 0 } : { marginRight: 2 }),
              }}
            >
              <AccountCircleIcon sx={{ fontSize: isMobile ? 30 : 40 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
