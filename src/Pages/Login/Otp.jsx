//Api Integration Using Store In Redux
import React, { useState } from "react";
import { Grid, Paper, Typography, Button, Link } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PageContainer from "../../components/HOC/PageContainer";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { login, sendOtpLogin } from "../../apis/Service"; // Import login and sendOtpLogin APIs
import { setOtp, setAuthenticated, clearAuth } from "../../apis/authSlice";
import { toast } from "react-toastify";

export default function OtpLogin() {
  const [otpValue, setOtpValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, password } = useSelector((state) => state.auth); // Get username and password from Redux store

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { username, password, otp: otpValue };

    try {
      const response = await login(formData); // Verify OTP
      if (response.success) {
        dispatch(setOtp(otpValue)); // Store OTP in Redux
        dispatch(setAuthenticated(true)); // Set authenticated state to true
        toast.success("Login successful!");

        navigate("/dashboard");

        dispatch(clearAuth()); // Clear auth data after login success
      } else {
        toast.error("OTP does not match.");
      }
    } catch (error) {
      console.error(error);
      toast.error("OTP verification failed.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await sendOtpLogin({ username, password }); // Call API to resend OTP
      if (response.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resending OTP.");
    }
  };

  return (
    <PageContainer
      showheader
      showfooter
      className="bgImg"
      style={{ display: "grid", placeContent: "center" }}
    >
      <Grid container m={0}>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: "10px" }}>
            <Grid container p={2}>
              <form onSubmit={handleSubmit}>
                <Grid item xs={12} mt={2}>
                  <Typography
                    fontSize="x-large"
                    sx={{ color: "#0c1352", textAlign: "center" }}
                  >
                    Enter OTP To Verify E-Mail
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  mt={3}
                  display="flex"
                  justifyContent="center"
                >
                  <OTPInput
                    inputStyle={{
                      width: "2rem",
                      height: "4vh",
                      fontSize: "18px",
                    }}
                    value={otpValue}
                    onChange={setOtpValue}
                    numInputs={6}
                    renderSeparator={<span> &nbsp; &nbsp; </span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </Grid>
                <Grid item xs={12} mt={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ bgcolor: "#0c113b" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} textAlign="center" py={1}>
                  <Link
                    to="#"
                    style={{ textDecoration: "none" }}
                    onClick={handleResendOtp}
                  >
                    <Typography style={{ cursor: "pointer" }}>
                      Resend One-Time Password
                    </Typography>
                  </Link>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

// // //local storage storing data integration
// import React, { useState } from "react";
// import { Grid, Paper, Typography, Button, Link } from "@mui/material";
// import PageContainer from "../../components/HOC/PageContainer";
// import { useNavigate } from "react-router-dom";
// import OTPInput from "react-otp-input";
// import { login } from "../../apis/Service"; // Import the login service

// export default function OtpLogin() {
//   const [otpValue, setOtpValue] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Retrieve username and password from localStorage
//     const username = localStorage.getItem("username");
//     const password = localStorage.getItem("password");

//     const formData = { username, password, otp: otpValue };

//     try {
//       const response = await login(formData);
//       if (response.success) {
//         // Clear localStorage after login success
//         localStorage.removeItem("username");
//         localStorage.removeItem("password");

//         navigate("/dashboard");
//         // You can use a toast or any other notification here
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <PageContainer
//       showheader
//       showfooter
//       className="bgImg"
//       style={{ display: "grid", placeContent: "center" }}
//     >
//       <Grid container m={0}>
//         <Grid item xs={12}>
//           <Paper sx={{ borderRadius: "10px" }}>
//             <Grid container p={2}>
//               <form onSubmit={handleSubmit}>
//                 <Grid item xs={12} mt={2}>
//                   <Typography
//                     fontSize="x-large"
//                     sx={{ color: "#0c1352", textAlign: "center" }}
//                   >
//                     Enter OTP To Verify E-Mail
//                   </Typography>
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   mt={3}
//                   display="flex"
//                   justifyContent="center"
//                 >
//                   <OTPInput
//                     inputStyle={{
//                       width: "2rem",
//                       height: "4vh",
//                       fontSize: "18px",
//                     }}
//                     value={otpValue}
//                     onChange={setOtpValue}
//                     numInputs={6}
//                     renderSeparator={<span> &nbsp; &nbsp; </span>}
//                     renderInput={(props) => <input {...props} />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} mt={3} textAlign="center">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     sx={{ bgcolor: "#0c113b" }}
//                     type="submit"
//                   >
//                     Submit
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12} textAlign="center" py={1}>
//                   <Link to="#" style={{ textDecoration: "none" }}>
//                     <Typography>Resend One-Time Password</Typography>
//                   </Link>
//                 </Grid>
//               </form>
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// }
