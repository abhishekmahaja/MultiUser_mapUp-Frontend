import React from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/Header/DashHeader.jsx';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setMobileOpen(false);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(false);
    setIsClosing(true);
  };

  const handleDrawerTransitionEnd = () => {
    if (isClosing) {
      setIsClosing(false);
    }
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar
        open={open}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }} mt={2}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}