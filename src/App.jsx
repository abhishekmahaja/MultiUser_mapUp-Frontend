import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AppSk from "./components/Skeletons/AppSk.jsx";
import { Toaster } from "react-hot-toast";

import OtpSignUp from './Pages/Signup/OtpSignup.jsx'
const Home = lazy(() => import('./Pages/Dashboard/Home/Home.jsx'))
const Login = lazy(() => import("./Pages/Login/Login.jsx"));
const Signup = lazy(() => import("./Pages/Signup/Signup.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard/index.jsx"));
const Forgot = lazy(() => import("./Pages/Forgot/Forgot.jsx"));
const Reset = lazy(() => import("./components/Reset/Reset.jsx"));
const Virtual = lazy(() => import("./Pages/Dashboard/Virtual/Virtual.jsx"));
const Monitor = lazy(() => import("./Pages/Dashboard/Monitor/Monitor.jsx"));
const Crystal = lazy(() => import("./Pages/Dashboard/Crystal/Crystal.jsx"));
const ComplaintHistory = lazy(() => import("./Pages/Dashboard/ComplaintHistory/ComplaintHistory.jsx"));
const NotificationHistory = lazy(() => import("./Pages/Dashboard/NotificationHistory/NotificationHistory.jsx"));
const Edit = lazy(() => import("./Pages/Dashboard/Edit/Edit.jsx"));
const Logout = lazy(() => import("./Pages/Dashboard/Logout/Logout.jsx"));
const PopUp = lazy(() => import("./CheckStatus/PopUp.jsx"));
const CheckStatus = lazy(() => import("./CheckStatus/CheckStatus.jsx"));
const Otp = lazy(() => import("./Pages/Login/Otp.jsx"));
const OtpForget = lazy(() => import("./Pages/Forgot/OtpForget.jsx"));
const WellMaster = lazy(() => import("./Pages/WellMaster/WellMaster.jsx"));
const SingleWell = lazy(() => import("./Pages/Dashboard/SingleWell/SingleWell.jsx"));
const AddWell = lazy(() => import("./Pages/WellMaster/AddWell/AddWell.jsx"));
const ManageAsset = lazy(() => import("./Pages/Dashboard/ManageAsset/ManageAsset.jsx"));
const DeviceManage = lazy(() => import("./Pages/Dashboard/DeviceManage/DeviceManage.jsx"));
const AddDevice = lazy(() => import("./Pages/Dashboard/DeviceManage/AddDevice/AddDevice.jsx"));
const Network = lazy(() => import("./Pages/Dashboard/Network/Network.jsx"));
const AddDevices = lazy(() => import("./Pages/Dashboard/Network/AddNetwork/AddNetwork.jsx"));


function App() {
  // const isDesktop = useMediaQuery('(min-width:768px)');

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
        { path: 'wellmaster', element: <WellMaster /> },
        { path: 'addwell', element: <AddWell /> },
        { path: "singlewell", element: <SingleWell /> },
        { path: "ManageAsset", element: <ManageAsset /> },
        { path: "DeviceManage", element: <DeviceManage /> },
        { path: "AddDevice", element: <AddDevice /> },
        { path: "Network", element: <Network /> },
        { path: "AddDevices", element: <AddDevices /> },
      ]
    },
    { path: "/CheckStatus", element: <CheckStatus /> },
    { path: "/popup", element: <PopUp /> },
    { path: "/reset", element: <Reset /> },
    { path: "/otp", element: <Otp /> },
    { path: "/forgot", element: <Forgot /> },
    { path: "/otpsignup", element: <OtpSignUp /> },
    { path: "/otpforget", element: <OtpForget /> },

  ]);

  return (
    <>
      <Toaster />
      <Suspense fallback={<AppSk />}>
        {route}
      </Suspense>
    </>
  );
}

export default App;
