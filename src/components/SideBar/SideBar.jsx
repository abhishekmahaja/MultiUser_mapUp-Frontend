import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import PrintReportIcon from "@mui/icons-material/Print";
import DeviceManagerIcon from "@mui/icons-material/Memory";
import ComplaintIcon from "@mui/icons-material/AccessAlarm";
import AssetsIcon from "@mui/icons-material/AccountBalance";
import NotificationsIcon from "@mui/icons-material/NotificationsActive";
import Networkicon from "@mui/icons-material/CellTower";
import { patch, useMediaQuery } from "@mui/material";
import WellmasterIcon from "@mui/icons-material/Settings";
import WellmonitorIcon from "@mui/icons-material/Search";
import GeoIcon from "@mui/icons-material/Place";
import ongc_logo from "/assets/ongc2.png";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar({
  open,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  handleDrawerToggle,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const role = useSelector((state) => state.auth.role);

  // Define your menu items here
  const menuItems = [
    {
      name: "Admin",
      icon: <AdminPanelSettingsIcon sx={{ color: "black" }} />,
      path: "/dashboard/Admin",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Dashboard",
      icon: <HomeIcon sx={{ color: "black" }} />,
      path: "/dashboard",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Organization",
      icon: <AssetsIcon sx={{ color: "black" }} />,
      path: "/dashboard/ManageAsset",
      roles: ["owner"],
    },
    {
      name: "Well Master",
      icon: <WellmasterIcon sx={{ color: "black" }} />,
      path: "/dashboard/wellmaster",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Manage Node",
      icon: <DeviceManagerIcon sx={{ color: "black" }} />,
      path: "/dashboard/DeviceManage",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Manage Gateway",
      icon: <Networkicon sx={{ color: "black" }} />,
      path: "/dashboard/Network",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Well Monitor",
      icon: <WellmonitorIcon sx={{ color: "black" }} />,
      path: "/dashboard/monitor",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Complaints",
      icon: <ComplaintIcon sx={{ color: "black" }} />,
      path: "/dashboard/complaint",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Notifications",
      icon: <NotificationsIcon sx={{ color: "black" }} />,
      path: "/dashboard/notification",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Print Report",
      icon: <PrintReportIcon sx={{ color: "black" }} />,
      path: "/dashboard/crystal",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Geo Location",
      icon: <GeoIcon sx={{ color: "black" }} />,
      path: "/dashboard/virtual",
      roles: ["owner", "manager", "employee"],
    },
    {
      name: "Message Box",
      icon: <ForwardToInboxIcon sx={{ color: "black" }} />,
      path: "/dashboard/message",
      roles: ["owner", "manager"],
    },
    {
      name: "Technical Support",
      icon: <SupportAgentIcon sx={{ color: "black" }} />,
      path: "/dashboard/technicalSupport",
      roles: ["owner", "manager", "employee"],
    },
  ];

  // Filter menu items based on the user's role
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles?.includes(role)
  );

  const handleListItemClick = () => {
    if (isMobile) {
      handleDrawerClose();
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img src={ongc_logo} alt="logo" width="83%" />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {filteredMenuItems.length === 0 ? (
          <ListItem>
            <ListItemText primary="No items available" />
          </ListItem>
        ) : (
          filteredMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleListItemClick}
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ justifyContent: open ? "initial" : "center" }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </Drawer>
  );
}
