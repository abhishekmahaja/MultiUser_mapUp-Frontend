import React, { useState } from "react";
import { Grid, Typography, TextField, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PageContainer from "../../components/HOC/PageContainer";
import CallIcon from "@mui/icons-material/Call";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate, Link } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { setRegisterDetails } from "../../apis/authSlice";
import { toast } from "react-toastify";
import { sendOtpRegister } from "../../apis/Service";

function Signup() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    contactNumber: "",
    employeeID: "",
    assetName: "",
    department: "",
    roleInRTMS: "",
    idCardPhoto: null, // Store file
    passportPhoto: null, // Store file
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0], // Store the actual file object, not just the name
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    // Integration: File Upload and OTP Sending
    try {
      // Assuming you have an API that handles file uploads and returns URLs
      const imageUploadResponse = await sendOtpRegister(formData);
      if (imageUploadResponse?.success) {
        // Extract URLs for the images
        const passportPhotoURL = imageUploadResponse?.passportPhoto;
        const idCardPhotoURL = imageUploadResponse?.idCardPhoto;

        // Dispatch the data to Redux store with the image URLs
        dispatch(
          setRegisterDetails({
            // ...formValues, // Spread existing form data
            username: formValues.username,
            email: formValues.email,
            contactNumber: formValues.contactNumber,
            employeeID: formValues.employeeID,
            assetName: formValues.assetName,
            department: formValues.department,
            roleInRTMS: formValues.roleInRTMS,
            passportPhoto: passportPhotoURL || formValues.passportPhoto, // Store the image URL
            idCardPhoto: idCardPhotoURL || formValues.idCardPhoto, // Store the image URL
          })
        );

        // Proceed with sending OTP
        const otpResponse = await sendOtpRegister({
          ...formValues,
          passportPhoto: passportPhotoURL,
          idCardPhoto: idCardPhotoURL,
        });

        if (otpResponse?.success) {
          toast.success("OTP Sent Successfully!");
          navigate("/otpsignup");
        } else {
          toast.error("Invalid Provided Details");
        }
      } else {
        toast.error("Image Upload Failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup Failed");
    }
  };

  return (
    <PageContainer className="bgImg" showheader="true" showfooter="true">
      <Grid container>
        <Grid item padding={2} width={600}>
          <Card>
            <CardContent orientation="vertical">
              <Grid item pt={1} sx={{ textAlign: "center" }}>
                <Typography variant="h4">Registration</Typography>
                <Typography variant="h6" color="#800000">
                  Create a New RTMS Account
                </Typography>
              </Grid>
              <Grid item px={4} alignItems={"center"}>
                <form onSubmit={handleSubmit}>
                  <Grid
                    item
                    gap="9px"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        label="Username"
                        variant="standard"
                        name="username"
                        value={formValues.username}
                        onChange={handleUsernameChange}
                        fullWidth
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <EmailIcon sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        fullWidth
                        label="Email"
                        variant="standard"
                        name="email"
                        value={formValues.email}
                        onChange={handleUsernameChange}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <CallIcon sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        fullWidth
                        label="Mobile"
                        name="contactNumber"
                        variant="standard"
                        value={formValues.contactNumber}
                        onChange={handleUsernameChange}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        fullWidth
                        label="Employee ID"
                        name="employeeID"
                        variant="standard"
                        value={formValues.employeeID}
                        onChange={handleUsernameChange}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        fullWidth
                        label="Organization"
                        name="assetName"
                        variant="standard"
                        value={formValues.assetName}
                        onChange={handleUsernameChange}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        variant="standard"
                        value={formValues.department}
                        onChange={handleUsernameChange}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle sx={{ mr: 1 }} fontSize="large" />
                      <TextField
                        fullWidth
                        label="Role in RTMS"
                        name="roleInRTMS"
                        variant="standard"
                        value={formValues.roleInRTMS}
                        onChange={handleUsernameChange}
                      />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <CameraAltIcon sx={{ mr: 1 }} fontSize="large" />
                        <Button variant="outlined" component="label" fullWidth>
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            name="passportPhoto"
                            onChange={handleUsernameChange}
                            hidden
                          />
                        </Button>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <CameraAltIcon sx={{ mr: 1 }} fontSize="large" />
                        <Button variant="outlined" component="label" fullWidth>
                          Upload ID Card
                          <input
                            type="file"
                            accept="image/*"
                            name="idCardPhoto"
                            onChange={handleUsernameChange}
                            hidden
                          />
                        </Button>
                      </Box>
                    </Box>

                    <Button variant="contained" fullWidth type="submit">
                      Next
                    </Button>
                  </Grid>
                </form>
                <Grid item textAlign="center" mt={0.5}>
                  <Typography fontSize={"medium"}>
                    Already have an account?{" "}
                    <Link
                      to="/"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      Login
                    </Link>
                  </Typography>
                  <Typography fontSize={"medium"}>
                    Have Registration?{" "}
                    <Link
                      to="/Popup"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      Check Status
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Signup;
