import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import PageContainer from "../../components/HOC/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLoginDetails } from "../../apis/authSlice";
import { sendOtpLogin } from "../../apis/Service";
import HttpsIcon from "@mui/icons-material/Https";
import { toast } from "react-toastify";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setVisible((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputs = (e) => {
    setFormValues((pre) => ({ ...pre, [e.target?.name]: e.target?.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Integaration
    try {
      const response = await sendOtpLogin(formValues);
      if (response.success) {
        // Store data in Redux store
        dispatch(
          setLoginDetails({
            // username: formValues.username,
            // password: formValues.password,
            formValues,
          })
        );

        toast.success("OTP sent successfully!");
        navigate("/otp");
      } else {
        toast.error("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed.");
    }
  };

  return (
    <PageContainer
      className="login-form-bg-image"
      showfooter="true"
      showheader="true"
      display={"flex"}
      justifyContent={"start"}
      alignContent={"center"}
    >
      <Grid item display={"flex"} alignItems={"center"} padding={"5%"}>
        <Card sx={{ flexWrap: "wrap" }}>
          <CardContent orientation="vertical">
            <Grid item sx={{ textAlign: "center" }} md={12} sm={12} xs={12}>
              <Typography pt={2} fontSize="xx-large">
                Welcome
              </Typography>
              <Typography fontSize="medium" color="#800000">
                Real Time Well Monitoring System
              </Typography>
            </Grid>
            <Grid item alignItems={"center"}>
              <form onSubmit={handleSubmit}>
                <Grid container padding={"5%"} spacing={2}>
                  <Grid
                    item
                    sx={{ display: "flex", alignItems: "flex-end" }}
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                  >
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1 }}
                      fontSize="large"
                    />
                    <TextField
                      className="custom-textfield"
                      label="Username"
                      name="username"
                      variant="standard"
                      value={formValues?.username}
                      onChange={handleInputs}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", alignItems: "flex-end" }}
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                    mt="5%"
                  >
                    <HttpsIcon
                      sx={{ color: "action.active", mr: 1 }}
                      fontSize="large"
                    />
                    <TextField
                      className="custom-textfield"
                      variant="standard"
                      name="password"
                      type={visible ? "text" : "password"}
                      label="Password"
                      value={formValues.password}
                      onChange={handleInputs}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  padding={5}
                  spacing={2}
                  direction="column"
                  py={2}
                >
                  <Grid item textAlign={"end"}>
                    <Link to="/forgot" style={{ textDecoration: "none" }}>
                      Forgot Password
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      className="btn-primary"
                      fullWidth
                      type="submit"
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item textAlign="center">
                    <Typography fontSize="small">
                      Don't have an account?
                      <Link
                        to="/signup"
                        style={{
                          textDecoration: "none",
                          margin: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </PageContainer>
  );
}

export default Login;

// //Api Integration Using Store In Redux
// import React, { useState } from "react";
// import {
//   Button,
//   Grid,
//   TextField,
//   Typography,
//   IconButton,
//   InputAdornment,
//   Card,
//   CardContent,
// } from "@mui/material";
// import PageContainer from "../../components/HOC/PageContainer";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { setLoginDetails } from "../../apis/authSlice";
// import { sendOtpLogin } from "../../apis/Service";
// import HttpsIcon from "@mui/icons-material/Https";
// import { toast } from "react-toastify";
// import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

// function Login() {
//   const [formValues, setFormValues] = useState({ username: "", password: "" });
//   const [visible, setVisible] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => {
//     setVisible((prev) => !prev);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleInputs = (e) => {
//     setFormValues((pre) => ({ ...pre, [e.target?.name]: e.target?.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     //Integaration
//     try {
//       const response = await sendOtpLogin(formValues);
//       if (response.success) {
//         // Store data in Redux store
//         dispatch(
//           setLoginDetails({
//             username: formValues.username,
//             password: formValues.password,
//           })
//         );

//         toast.success("OTP sent successfully!");
//         navigate("/otp");
//       } else {
//         toast.error("Invalid username or password.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Login failed.");
//     }
//   };

//   return (
//     <PageContainer
//       className="login-form-bg-image"
//       showfooter="true"
//       showheader="true"
//       display={"flex"}
//       justifyContent={"start"}
//       alignContent={"center"}
//     >
//       <Grid item display={"flex"} alignItems={"center"} padding={"5%"}>
//         <Card sx={{ flexWrap: "wrap" }}>
//           <CardContent orientation="vertical">
//             <Grid item sx={{ textAlign: "center" }} md={12} sm={12} xs={12}>
//               <Typography pt={2} fontSize="xx-large">
//                 Welcome
//               </Typography>
//               <Typography fontSize="medium" color="#800000">
//                 Real Time Well Monitoring System
//               </Typography>
//             </Grid>
//             <Grid item alignItems={"center"}>
//               <form onSubmit={handleSubmit}>
//                 <Grid container padding={"5%"} spacing={2}>
//                   <Grid
//                     item
//                     sx={{ display: "flex", alignItems: "flex-end" }}
//                     md={12}
//                     sm={12}
//                     lg={12}
//                     xs={12}
//                   >
//                     <AccountCircle
//                       sx={{ color: "action.active", mr: 1 }}
//                       fontSize="large"
//                     />
//                     <TextField
//                       className="custom-textfield"
//                       label="Username"
//                       name="username"
//                       variant="standard"
//                       value={formValues?.username}
//                       onChange={handleInputs}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid
//                     item
//                     sx={{ display: "flex", alignItems: "flex-end" }}
//                     md={12}
//                     sm={12}
//                     lg={12}
//                     xs={12}
//                     mt="5%"
//                   >
//                     <HttpsIcon
//                       sx={{ color: "action.active", mr: 1 }}
//                       fontSize="large"
//                     />
//                     <TextField
//                       className="custom-textfield"
//                       variant="standard"
//                       name="password"
//                       type={visible ? "text" : "password"}
//                       label="Password"
//                       value={formValues.password}
//                       onChange={handleInputs}
//                       fullWidth
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={handleClickShowPassword}
//                               onMouseDown={handleMouseDownPassword}
//                               edge="end"
//                             >
//                               {visible ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//                 <Grid
//                   container
//                   padding={5}
//                   spacing={2}
//                   direction="column"
//                   py={2}
//                 >
//                   <Grid item textAlign={"end"}>
//                     <Link
//                       to="/forgot"
//                       style={{ textDecoration: "none", cursor: "pointer" }}
//                     >
//                       Forgot Password
//                     </Link>
//                   </Grid>
//                   <Grid item>
//                     <Button
//                       variant="contained"
//                       className="btn-primary"
//                       fullWidth
//                       type="submit"
//                     >
//                       Login
//                     </Button>
//                   </Grid>
//                   <Grid item textAlign="center">
//                     <Typography fontSize="small">
//                       Don't have an account?
//                       <Link
//                         to="/signup"
//                         style={{
//                           textDecoration: "none",
//                           margin: "4px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Sign Up
//                       </Link>
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </form>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//     </PageContainer>
//   );
// }

// export default Login;

// // //local storage storing data integration
// // import React, { useState } from "react";
// // import { Button, Grid, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
// // import PageContainer from "../../components/HOC/PageContainer";
// // import AccountCircle from "@mui/icons-material/AccountCircle";
// // import HttpsIcon from "@mui/icons-material/Https";
// // import { Link, useNavigate } from "react-router-dom";
// // import Card from "@mui/joy/Card";
// // import CardContent from "@mui/joy/CardContent";
// // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // import { sendOtpLogin } from "../../apis/Service"; // Adjust the path

// // function Login() {
// //   const [formValues, setFormValues] = useState({ username: "", password: "" });
// //   const [visible, setVisible] = useState(false);
// //   const navigate = useNavigate();

// //   const handleClickShowPassword = () => {
// //     setVisible((prev) => !prev);
// //   };

// //   const handleMouseDownPassword = (event) => {
// //     event.preventDefault();
// //   };

// //   const handleInputs = (e) => {
// //     setFormValues((pre) => ({ ...pre, [e.target?.name]: e.target?.value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await sendOtpLogin(formValues);
// //       if (response.success) {
// //         // Store username and password in localStorage
// //         localStorage.setItem("username", formValues.username);
// //         localStorage.setItem("password", formValues.password);

// //         navigate('/otp');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <PageContainer className="login-form-bg-image" showfooter='true' showheader='true' display={"flex"} justifyContent={"start"} alignContent={"center"}>
// //       <Grid item display={'flex'} alignItems={'center'} padding={'5%'}>
// //         <Card sx={{ flexWrap: 'wrap' }}>
// //           <CardContent orientation="vertical">
// //             <Grid item sx={{ textAlign: "center" }} md={12} sm={12} xs={12}>
// //               <Typography pt={2} fontSize="xx-large">
// //                 Welcome
// //               </Typography>
// //               <Typography fontSize="medium" color="#800000">
// //                 Real Time Well Monitoring System
// //               </Typography>
// //             </Grid>
// //             <Grid item alignItems={"center"}>
// //               <form onSubmit={handleSubmit}>
// //                 <Grid container padding={'5%'} spacing={2}>
// //                   <Grid item sx={{ display: "flex", alignItems: "flex-end" }} md={12} sm={12} lg={12} xs={12}>
// //                     <AccountCircle sx={{ color: "action.active", mr: 1 }} fontSize="large" />
// //                     <TextField
// //                       className="custom-textfield"
// //                       label="Username"
// //                       name="username"
// //                       variant="standard"
// //                       value={formValues?.username}
// //                       onChange={handleInputs}
// //                       fullWidth
// //                     />
// //                   </Grid>
// //                   <Grid item sx={{ display: "flex", alignItems: "flex-end" }} md={12} sm={12} lg={12} xs={12} mt="5%">
// //                     <HttpsIcon sx={{ color: "action.active", mr: 1 }} fontSize="large" />
// //                     <TextField
// //                       className="custom-textfield"
// //                       variant="standard"
// //                       name="password"
// //                       type={visible ? "text" : "password"}
// //                       label="Password"
// //                       value={formValues.password}
// //                       onChange={handleInputs}
// //                       fullWidth
// //                       InputProps={{
// //                         endAdornment: (
// //                           <InputAdornment position="end">
// //                             <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
// //                               {visible ? <VisibilityOff /> : <Visibility />}
// //                             </IconButton>
// //                           </InputAdornment>
// //                         ),
// //                       }}
// //                     />
// //                   </Grid>
// //                 </Grid>
// //                 <Grid container padding={5} spacing={2} direction="column" py={2}>
// //                   <Grid item textAlign={"end"}>
// //                     <Link to="/forgot" style={{ textDecoration: "none" }}>
// //                       Forgot Password
// //                     </Link>
// //                   </Grid>
// //                   <Grid item>
// //                     <Button variant="contained" className="btn-primary" fullWidth type="submit">
// //                       Login
// //                     </Button>
// //                   </Grid>
// //                   <Grid item textAlign="center">
// //                     <Typography fontSize="small">
// //                       Don't have an account?
// //                       <Link to="/signup" style={{ textDecoration: "none", margin: "4px" }}>
// //                         Sign Up
// //                       </Link>
// //                     </Typography>
// //                   </Grid>
// //                 </Grid>
// //               </form>
// //             </Grid>
// //           </CardContent>
// //         </Card>
// //       </Grid>
// //     </PageContainer>
// //   );
// // }

// // export default Login;
