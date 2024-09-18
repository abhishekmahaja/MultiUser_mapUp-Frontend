

// //this is add role to pass token and access
// import React, { Suspense, lazy } from "react";
// import { useRoutes } from "react-router-dom";
// import AppSk from "./components/Skeletons/AppSk.jsx";
// import OtpSignUp from "./Pages/Signup/OtpSignup.jsx";
// import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Lazy loaded components
// const Home = lazy(() => import("./Pages/Dashboard/Home/Home.jsx"));
// const Login = lazy(() => import("./Pages/Login/Login.jsx"));
// const Signup = lazy(() => import("./Pages/Signup/Signup.jsx"));
// const Dashboard = lazy(() => import("./Pages/Dashboard/index.jsx"));
// const Forgot = lazy(() => import("./Pages/Forgot/Forgot.jsx"));
// const Reset = lazy(() => import("./components/Reset/Reset.jsx"));
// const Virtual = lazy(() => import("./Pages/Dashboard/Virtual/Virtual.jsx"));
// const Monitor = lazy(() => import("./Pages/Dashboard/Monitor/Monitor.jsx"));
// const Crystal = lazy(() => import("./Pages/Dashboard/Crystal/Crystal.jsx"));
// const ComplaintHistory = lazy(() =>
//   import("./Pages/Dashboard/ComplaintHistory/ComplaintHistory.jsx")
// );
// const NotificationHistory = lazy(() =>
//   import("./Pages/Dashboard/NotificationHistory/NotificationHistory.jsx")
// );
// const Edit = lazy(() => import("./Pages/Dashboard/Edit/Edit.jsx"));
// const Logout = lazy(() => import("./Pages/Dashboard/Logout/Logout.jsx"));
// const PopUp = lazy(() => import("./CheckStatus/PopUp.jsx"));
// const CheckStatus = lazy(() => import("./CheckStatus/CheckStatus.jsx"));
// const Otp = lazy(() => import("./Pages/Login/Otp.jsx"));
// const WellMaster = lazy(() => import("./Pages/WellMaster/WellMaster.jsx"));
// const SingleWell = lazy(() =>
//   import("./Pages/Dashboard/SingleWell/SingleWell.jsx")
// );
// const AddWell = lazy(() => import("./Pages/WellMaster/AddWell/AddWell.jsx"));
// const ManageAsset = lazy(() =>
//   import("./Pages/Dashboard/ManageAsset/ManageAsset.jsx")
// );
// const DeviceManage = lazy(() =>
//   import("./Pages/Dashboard/DeviceManage/DeviceManage.jsx")
// );
// const AddDevice = lazy(() =>
//   import("./Pages/Dashboard/DeviceManage/AddDevice/AddDevice.jsx")
// );
// const Network = lazy(() => import("./Pages/Dashboard/Network/Network.jsx"));
// const AddDevices = lazy(() =>
//   import("./Pages/Dashboard/Network/AddNetwork/AddNetwork.jsx")
// );
// const Approval = lazy(() =>
//   import("./Pages/Dashboard/MessageBox/Approval.jsx")
// );

// function App() {
//   // Fetch the role from Redux
//   const role = useSelector((state) => state.auth.role);

//   // Define common routes (visible to everyone)
//   const routes = [
//     { path: "", element: <Home /> },
//     { path: "monitor", element: <Monitor /> },
//     { path: "virtual", element: <Virtual /> },
//     { path: "crystal", element: <Crystal /> },
//     { path: "complaint", element: <ComplaintHistory /> },
//     { path: "notification", element: <NotificationHistory /> },
//     { path: "edit", element: <Edit /> },
//     { path: "logout", element: <Logout /> },
//     { path: "wellmaster", element: <WellMaster /> },
//     { path: "addwell", element: <AddWell /> },
//     { path: "singlewell", element: <SingleWell /> },
//     { path: "DeviceManage", element: <DeviceManage /> },
//     { path: "AddDevice", element: <AddDevice /> },
//     { path: "Network", element: <Network /> },
//     { path: "AddDevices", element: <AddDevices /> },
//   ];

//   // Add role-specific routes
//   if (role === "owner") {
//     // Owner sees all routes
//     routes.push(
//       { path: "ManageAsset", element: <ManageAsset /> },
//       { path: "message", element: <Approval /> }
//     );
//   } else if (role === "manager") {
//     // Manager sees all routes except "ManageAsset"
//     routes.push({ path: "message", element: <Approval /> });
//   } else if (role === "employee") {
//     // Employee does not see "ManageAsset" and "message"
//     // All other routes are already visible
//   }

//   const route = useRoutes([
//     { path: "/", element: <Login /> },
//     { path: "/signup", element: <Signup /> },
//     {
//       path: "/dashboard",
//       element: <Dashboard />,
//       children: routes,
//     },
//     { path: "/CheckStatus", element: <CheckStatus /> },
//     { path: "/popup", element: <PopUp /> },
//     { path: "/reset", element: <Reset /> },
//     { path: "/otp", element: <Otp /> },
//     { path: "/forgot", element: <Forgot /> },
//     { path: "/otpsignup", element: <OtpSignUp /> },
//   ]);

//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={5000} />
//       <Suspense fallback={<AppSk />}>{route}</Suspense>
//     </>
//   );
// }

// export default App;

//this is protected route not jump one route to another
// import React, { Suspense, lazy, useEffect } from "react";
// import { useRoutes, Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AppSk from "./components/Skeletons/AppSk.jsx";
// import OtpSignUp from "./Pages/Signup/OtpSignup.jsx";

// // Lazy loaded components
// const Home = lazy(() => import("./Pages/Dashboard/Home/Home.jsx"));
// const Login = lazy(() => import("./Pages/Login/Login.jsx"));
// const Signup = lazy(() => import("./Pages/Signup/Signup.jsx"));
// const Dashboard = lazy(() => import("./Pages/Dashboard/index.jsx"));
// const Forgot = lazy(() => import("./Pages/Forgot/Forgot.jsx"));
// const Reset = lazy(() => import("./components/Reset/Reset.jsx"));
// const Virtual = lazy(() => import("./Pages/Dashboard/Virtual/Virtual.jsx"));
// const Monitor = lazy(() => import("./Pages/Dashboard/Monitor/Monitor.jsx"));
// const Crystal = lazy(() => import("./Pages/Dashboard/Crystal/Crystal.jsx"));
// const ComplaintHistory = lazy(() =>
//   import("./Pages/Dashboard/ComplaintHistory/ComplaintHistory.jsx")
// );
// const NotificationHistory = lazy(() =>
//   import("./Pages/Dashboard/NotificationHistory/NotificationHistory.jsx")
// );
// const Edit = lazy(() => import("./Pages/Dashboard/Edit/Edit.jsx"));
// const Logout = lazy(() => import("./Pages/Dashboard/Logout/Logout.jsx"));
// const PopUp = lazy(() => import("./CheckStatus/PopUp.jsx"));
// const CheckStatus = lazy(() => import("./CheckStatus/CheckStatus.jsx"));
// const Otp = lazy(() => import("./Pages/Login/Otp.jsx"));
// const WellMaster = lazy(() => import("./Pages/WellMaster/WellMaster.jsx"));
// const SingleWell = lazy(() =>
//   import("./Pages/Dashboard/SingleWell/SingleWell.jsx")
// );
// const AddWell = lazy(() => import("./Pages/WellMaster/AddWell/AddWell.jsx"));
// const ManageAsset = lazy(() =>
//   import("./Pages/Dashboard/ManageAsset/ManageAsset.jsx")
// );
// const DeviceManage = lazy(() =>
//   import("./Pages/Dashboard/DeviceManage/DeviceManage.jsx")
// );
// const AddDevice = lazy(() =>
//   import("./Pages/Dashboard/DeviceManage/AddDevice/AddDevice.jsx")
// );
// const Network = lazy(() => import("./Pages/Dashboard/Network/Network.jsx"));
// const AddDevices = lazy(() =>
//   import("./Pages/Dashboard/Network/AddNetwork/AddNetwork.jsx")
// );
// const Approval = lazy(() =>
//   import("./Pages/Dashboard/MessageBox/Approval.jsx")
// );

// function App() {
//   const role = useSelector((state) => state.auth.role);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const location = useLocation();

//   // Function to show different toast messages based on the page
//   const showToast = (message) => {
//     toast.info(message, {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   // UseEffect to show a toast message for different routes
//   useEffect(() => {
//     if (location.pathname === "/signup") {
//       showToast("Create your account to access amazing features!");
//     } else if (location.pathname === "/forgot") {
//       showToast("Forgot your password? Let's Forgot it!");
//     } else if (location.pathname === "/CheckStatus") {
//       showToast("Checking your status...");
//     } else if (!isAuthenticated && location.pathname !== "/") {
//       showToast("Please login to access this page.");
//     }
//   }, [location, isAuthenticated]);

//   const routes = [
//     { path: "", element: <Home /> },
//     { path: "monitor", element: <Monitor /> },
//     { path: "virtual", element: <Virtual /> },
//     { path: "crystal", element: <Crystal /> },
//     { path: "complaint", element: <ComplaintHistory /> },
//     { path: "notification", element: <NotificationHistory /> },
//     { path: "edit", element: <Edit /> },
//     { path: "logout", element: <Logout /> },
//     { path: "wellmaster", element: <WellMaster /> },
//     { path: "addwell", element: <AddWell /> },
//     { path: "singlewell", element: <SingleWell /> },
//     { path: "DeviceManage", element: <DeviceManage /> },
//     { path: "AddDevice", element: <AddDevice /> },
//     { path: "Network", element: <Network /> },
//     { path: "AddDevices", element: <AddDevices /> },
//   ];

//   if (role === "owner") {
//     routes.push(
//       { path: "ManageAsset", element: <ManageAsset /> },
//       { path: "message", element: <Approval /> }
//     );
//   } else if (role === "manager") {
//     routes.push({ path: "message", element: <Approval /> });
//   }

//   const route = useRoutes([
//     {
//       path: "/",
//       element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login />,
//     },
//     { path: "/otp", element: <Otp /> },
//     { path: "/signup", element: <Signup /> },
//     {
//       path: "/otpsignup",
//       element: isAuthenticated ? <OtpSignUp /> : <Navigate to="/signup" />,
//     },
//     { path: "/forgot", element: <Forgot /> },
//     {
//       path: "/reset",
//       element: isAuthenticated ? <Reset /> : <Navigate to="/forgot" />,
//     },
//     { path: "/popup", element: <PopUp /> },
//     {
//       path: "/CheckStatus",
//       element: isAuthenticated ? <CheckStatus /> : <Navigate to="/popup" />,
//     },
//     {
//       path: "/dashboard",
//       element: isAuthenticated ? <Dashboard /> : <Navigate to="/" />,
//       children: routes,
//     },
//   ]);

//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={5000} />
//       <Suspense fallback={<AppSk />}>{route}</Suspense>
//     </>
//   );
// }

// export default App;

//this old route for testing
import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AppSk from "./components/Skeletons/AppSk.jsx";
import OtpSignUp from "./Pages/Signup/OtpSignup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./Pages/Dashboard/Home/Home.jsx"));
const Login = lazy(() => import("./Pages/Login/Login.jsx"));
const Signup = lazy(() => import("./Pages/Signup/Signup.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard/index.jsx"));
const Forgot = lazy(() => import("./Pages/Forgot/Forgot.jsx"));
const Reset = lazy(() => import("./components/Reset/Reset.jsx"));
const Virtual = lazy(() => import("./Pages/Dashboard/Virtual/Virtual.jsx"));
const Monitor = lazy(() => import("./Pages/Dashboard/Monitor/Monitor.jsx"));
const Crystal = lazy(() => import("./Pages/Dashboard/Crystal/Crystal.jsx"));
const ComplaintHistory = lazy(() =>
  import("./Pages/Dashboard/ComplaintHistory/ComplaintHistory.jsx")
);
const NotificationHistory = lazy(() =>
  import("./Pages/Dashboard/NotificationHistory/NotificationHistory.jsx")
);
const Edit = lazy(() => import("./Pages/Dashboard/Edit/Edit.jsx"));
const Logout = lazy(() => import("./Pages/Dashboard/Logout/Logout.jsx"));
const PopUp = lazy(() => import("./CheckStatus/PopUp.jsx"));
const CheckStatus = lazy(() => import("./CheckStatus/CheckStatus.jsx"));
const Otp = lazy(() => import("./Pages/Login/Otp.jsx"));
const WellMaster = lazy(() => import("./Pages/WellMaster/WellMaster.jsx"));
const SingleWell = lazy(() =>
  import("./Pages/Dashboard/SingleWell/SingleWell.jsx")
);
const AddWell = lazy(() => import("./Pages/WellMaster/AddWell/AddWell.jsx"));
const ManageAsset = lazy(() =>
  import("./Pages/Dashboard/ManageAsset/ManageAsset.jsx")
);
const DeviceManage = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/DeviceManage.jsx")
);
const AddDevice = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/AddDevice/AddDevice.jsx")
);
const Network = lazy(() => import("./Pages/Dashboard/Network/Network.jsx"));
const AddDevices = lazy(() =>
  import("./Pages/Dashboard/Network/AddNetwork/AddNetwork.jsx")
);
const Approval = lazy(() =>
  import("./Pages/Dashboard/MessageBox/Approval.jsx")
);

function App() {

  const route = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        { path: "", element: <Home /> },
        { path: "monitor", element: <Monitor /> },
        { path: "virtual", element: <Virtual /> },
        { path: "crystal", element: <Crystal /> },
        { path: "complaint", element: <ComplaintHistory /> },
        { path: "notification", element: <NotificationHistory /> },
        { path: "edit", element: <Edit /> },
        { path: "logout", element: <Logout /> },
        { path: "wellmaster", element: <WellMaster /> },
        { path: "addwell", element: <AddWell /> },
        { path: "singlewell", element: <SingleWell /> },
        { path: "ManageAsset", element: <ManageAsset /> },
        { path: "DeviceManage", element: <DeviceManage /> },
        { path: "AddDevice", element: <AddDevice /> },
        { path: "Network", element: <Network /> },
        { path: "AddDevices", element: <AddDevices /> },
        { path: "message", element: <Approval /> },
      ],
    },
    { path: "/CheckStatus", element: <CheckStatus /> },
    { path: "/popup", element: <PopUp /> },
    { path: "/reset", element: <Reset /> },
    { path: "/otp", element: <Otp /> },
    { path: "/forgot", element: <Forgot /> },
    { path: "/otpsignup", element: <OtpSignUp /> },
  ]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <Suspense fallback={<AppSk />}>{route}</Suspense>
    </>
  );
}

export default App;
