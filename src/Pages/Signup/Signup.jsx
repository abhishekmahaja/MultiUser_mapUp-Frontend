import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
import { organizationDropDown, sendOtpRegister } from "../../apis/Service";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPhotoName, setSelectedPhotoName] = useState(null); // To store the passport photo name
  const [idCardName, setIdCardName] = useState(null); // To store the ID card photo name
  const [organizations, setOrganizations] = useState([]);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    contactNumber: "",
    employeeID: "",
    organizationName: "",
    department: "",
    roleInRTMS: "",
    idCardPhoto: "", //this is Image Uploaded by User
    passportPhoto: "", //this is Image Uploaded by User
  });

  const handleUsernameChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0], // Store the actual file object
      }));

      // Update file name for preview
      if (name === "passportPhoto") {
        setSelectedPhotoName(files[0].name);
      } else if (name === "idCardPhoto") {
        setIdCardName(files[0].name);
      }
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
      formData.append(key, value);
    });

    // Integration
    try {
      const response = await sendOtpRegister(formData); // Ensure that sendOtpRegister can handle FormData
      // console.log("OTP Response:", response);
      if (response?.success) {
        // Store data in Redux Store
        const passportPhotoURL = response?.passportPhoto;
        const idCardPhotoURL = response?.idCardPhoto;
        dispatch(
          setRegisterDetails({
            username: formValues.username,
            email: formValues.email,
            contactNumber: formValues.contactNumber,
            employeeID: formValues.employeeID,
            organizationName: formValues.organizationName,
            department: formValues.department,
            roleInRTMS: formValues.roleInRTMS,
            passportPhoto: passportPhotoURL || formValues.passportPhoto, // Store the image URL
            idCardPhoto: idCardPhotoURL || formValues.idCardPhoto, // Store the image URL
          })
        );

        toast.success("OTP Sent Successfully!");
        // console.log("OTP sent, about to navigate...",response?.message);
        navigate("/otpsignup");
      } else {
        toast.error("Invalid Provided Details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup Failed");
    }
  };

  // Fetch organization data on component mount
  const fetchOrganizations = async () => {
    try {
      const response = await organizationDropDown(); // Get the full response
      // console.log("API Response:", response);
      if (response.success && Array.isArray(response.data)) {
        setOrganizations(response.data); // Access the `data` field
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      // console.error("Error fetching organizations:", error);
      toast.error(error.message);
    }
    //department dropdown
    try {
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

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
                        onChange={(e) => {
                          const value = e.target.value;
                          // Ensure the value starts with '+91'
                          if (value.startsWith("+91")) {
                            setFormValues((prev) => ({
                              ...prev,
                              contactNumber: value,
                            }));
                          } else {
                            setFormValues((prev) => ({
                              ...prev,
                              contactNumber: `+91${value}`,
                            }));
                          }
                        }}
                        placeholder="+91 (Mobile Number)"
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
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="organization-label">
                          Organization
                        </InputLabel>
                        <Select
                          labelId="organization-label"
                          name="organizationName"
                          value={formValues.organizationName}
                          onChange={handleUsernameChange}
                          label="Organization"
                        >
                          {Array.isArray(organizations) &&
                          organizations.length > 0 ? (
                            organizations.map((org) => (
                              <MenuItem
                                key={org._id}
                                value={org.organizationName}
                              >
                                {org.organizationName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">
                              No organizations available
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
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
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Role in RTMS</InputLabel>
                        <Select
                          name="roleInRTMS"
                          value={formValues.roleInRTMS}
                          onChange={handleUsernameChange}
                          label="Role in RTMS"
                        >
                          <MenuItem value="manager">Manager</MenuItem>
                          <MenuItem value="employee">Employee</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", mb: 2 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}
                      >
                        <CameraAltIcon sx={{ mr: 1 }} fontSize="large" />
                        <Button variant="outlined" component="label" fullWidth>
                          <input
                            type="file"
                            accept="image/*"
                            name="passportPhoto"
                            onChange={handleUsernameChange}
                            hidden
                          />
                          {!selectedPhotoName ? (
                            <Typography>Upload photo</Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {selectedPhotoName}
                            </Typography>
                          )}
                        </Button>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}
                      >
                        <CameraAltIcon sx={{ mr: 1 }} fontSize="large" />
                        <Button variant="outlined" component="label" fullWidth>
                          <input
                            type="file"
                            accept="image/*"
                            name="idCardPhoto"
                            onChange={handleUsernameChange}
                            hidden
                          />
                          {!idCardName ? (
                            <Typography>Upload ID Card</Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              {idCardName}
                            </Typography>
                          )}
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
