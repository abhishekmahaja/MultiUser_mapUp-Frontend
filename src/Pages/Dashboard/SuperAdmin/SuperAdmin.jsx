import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import HttpsIcon from "@mui/icons-material/Https";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import StoreIcon from "@mui/icons-material/Store";

function SuperAdim() {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [visible, setVisible] = useState(false);
  const handleClickShowPassword = () => {
    setVisible((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputs = (e) => {
    setFormValues((pre) => ({ ...pre, [e.target?.name]: e.target?.value }));
  };
  
  return (
    <div>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        height="100%"
        alignItems={"center"}
        p="5%"
      >
        <Grid item padding={2} width={550}>
          <Card>
            <CardContent orientation="vertical">
              <Grid item sx={{ textAlign: "center" }}>
                <Typography variant="h4" color="green">
                  NEW CUSTOMER
                </Typography>
              </Grid>
              <Grid item px={4} alignItems={"center"}>
                <form>
                  <Grid
                    item
                    gap="9px"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid item>
                      <Box
                        mt={0.5}
                        sx={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <StoreIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          fontSize="large"
                        />
                        <TextField
                          fullWidth
                          className="custom-textfield"
                          label="Organization "
                          variant="standard"
                          color="info"
                          name="Organization Name"
                        />
                      </Box>

                      <Box
                        mt={0.5}
                        sx={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <AccountCircle
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          fontSize="large"
                        />
                        <TextField
                          label="User ID"
                          name="User ID"
                          variant="standard"
                          color="info"
                          fullWidth
                          className="custom-textfield"
                        />
                      </Box>

                      <Box
                        mt={0.5}
                        sx={{ display: "flex", alignItems: "flex-end" }}
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
                      </Box>

                      <Box
                        mt={0.5}
                        sx={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <EmailIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          fontSize="large"
                        />

                        <TextField
                          label="Email"
                          name="email"
                          variant="standard"
                          color="info"
                          fullWidth
                          className="custom-textfield"
                        />
                      </Box>
                      <Box
                        mt={0.5}
                        sx={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <CallIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          fontSize="large"
                        />
                        <TextField
                          fullWidth
                          label=" Mobile"
                          name="contactNumber"
                          variant="standard"
                          color="info"
                          className="custom-textfield"
                        />
                      </Box>
                    </Grid>

                    <Grid item mt={2}>
                      <Link style={{ textDecoration: "none", color: "white" }}>
                        <Button
                          variant="contained"
                          // className="btn-primary"
                          sx={{ bgcolor: "green" }}
                          fullWidth
                        >
                          <Typography variant="h6">
                            Create A New Customer
                          </Typography>
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default SuperAdim;
