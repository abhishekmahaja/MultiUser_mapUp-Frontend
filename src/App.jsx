//this is add role to pass token and access
import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AppSk from "./components/Skeletons/AppSk.jsx";
import OtpSignUp from "./Pages/Signup/OtpSignup.jsx";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./apis/PrivateRoutes.jsx";

// Lazy loaded components
const Home = lazy(() => import("./Pages/Dashboard/Home/Home.jsx"));
const Login = lazy(() => import("./Pages/Login/Login.jsx"));
const Signup = lazy(() => import("./Pages/Signup/Signup.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard/index.jsx"));
const Forgot = lazy(() => import("./Pages/Forgot/Forgot.jsx"));
const Reset = lazy(() => import("./components/Reset/Reset.jsx"));
const Virtual = lazy(() => import("./Pages/Dashboard/Virtual/Virtual.jsx"));
const Monitor = lazy(() => import("./Pages/Dashboard/Monitor/Monitor.jsx"));
const ComplaintHistory = lazy(() =>
  import("./Pages/Dashboard/ComplaintHistory/ComplaintHistory.jsx")
);
const NotificationHistory = lazy(() =>
  import("./Pages/Dashboard/NotificationHistory/NotificationHistory.jsx")
);
const PopUp = lazy(() => import("./CheckStatus/PopUp.jsx"));
const CheckStatus = lazy(() => import("./CheckStatus/CheckStatus.jsx"));
const Otp = lazy(() => import("./Pages/Login/Otp.jsx"));
const WellMaster = lazy(() => import("./Pages/WellMaster/WellMaster.jsx"));
const AddWell = lazy(() => import("./Pages/WellMaster/AddWell/AddWell.jsx"));
const DeviceManage = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/DeviceManage.jsx")
);
const AddDevice = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/AddDevice/AddDevice.jsx")
);
const Network = lazy(() => import("./Pages/Dashboard/Network/Network.jsx"));
const Approval = lazy(() =>
  import("./Pages/Dashboard/MessageBox/Approval.jsx")
);
const TechnicalSupport = lazy(() =>
  import("./Pages/Dashboard/TechnicalSupport/TechnicalSupport.jsx")
);
const Real_time = lazy(() => import("../src/components/real_time.jsx"));

function App() {
  const role = useSelector((state) => state.auth.role);

  // Define common routes (visible to everyone)
  const commonRoutes = [
    { path: "", element: <Home /> },
    { path: "monitor", element: <Monitor /> },
    { path: "virtual", element: <Virtual /> },
    { path: "real_time", element: <Real_time /> },
    { path: "complaint", element: <ComplaintHistory /> },
    { path: "notification", element: <NotificationHistory /> },
    { path: "wellmaster", element: <WellMaster /> },
    { path: "addwell", element: <AddWell /> },
    { path: "DeviceManage", element: <DeviceManage /> },
    { path: "AddDevice", element: <AddDevice /> },
    { path: "Network", element: <Network /> },
    { path: "AddDevices", element: <AddDevice /> },
    { path: "technicalSupport", element: <TechnicalSupport /> },
  ];

  // Add role-specific routes
  if (role === "owner") {
    commonRoutes.push(
      { path: "message", element: <Approval /> }
    );
  } else if (role === "manager") {
    commonRoutes.push({ path: "message", element: <Approval /> });
    // } else if (role === "admin") {
    //   // Admin sees only the admin route
    //   // commonRoutes.length = 0; // Clear the commonRoutes
    //   // commonRoutes.push({ path: "", element: <SuperAdmin /> }); // Only admin route
  } else if (role === "employee") {
    // Employee does not see "ManageAsset" and "message" amd "Super Admin"
  }

  // Configure the routes with children under "/dashboard"
  const route = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/otp", element: <Otp /> },
    { path: "/signup", element: <Signup /> },
    { path: "/otpsignup", element: <OtpSignUp /> },
    { path: "/forgot", element: <Forgot /> },
    { path: "/reset", element: <Reset /> },
    { path: "/popup", element: <PopUp /> },
    { path: "/CheckStatus", element: <CheckStatus /> },
    {
      path: "/dashboard",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          children: commonRoutes,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <Suspense fallback={<AppSk />}>{route}</Suspense>
    </>
  );
}

export default App;
