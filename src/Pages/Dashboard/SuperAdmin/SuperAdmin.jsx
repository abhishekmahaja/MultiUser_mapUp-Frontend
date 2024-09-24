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
// import PageContainer from '../../components/HOC/PageContainer';

// -------------------------------popupOTP----------------------------------------------
import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import OTPInput from "react-otp-input";

export default function SuperAdmin() {
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

  // ---------------------popupOTP----------------------------------------------
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                          label="Mobile"
                          name="contactNumber"
                          variant="standard"
                          color="info"
                          className="custom-textfield"
                        />
                      </Box>
                    </Grid>

                    <Grid item mt={2}>
                      <TriggerButton
                        variant="contained"
                        sx={{
                          bgcolor: "green",
                          "&:hover": {
                            bgcolor: "green", // Hover par bhi green rahega
                          },
                        }}
                        fullWidth
                        onClick={handleOpen}
                      >
                        <Typography variant="h6" color={"white"}>
                          Create A New Customer
                        </Typography>
                      </TriggerButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: StyledBackdrop }}
        >
          <Fade in={open}>
            <ModalContent sx={style}>
              {/* <Grid item xs={12} md={12} sm={12}> */}
              {/* <Paper sx={{ borderRadius: "10px" }}> */}
              <Grid container>
                <form>
                  <Grid item xs={12} md={12} sm={12} lg={12} mt={2}>
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
                    md={12}
                    sm={12}
                    lg={12}
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
                      // value={otpValue}
                      // onChange={setOtpValue}
                      numInputs={6}
                      renderSeparator={<span> &nbsp; &nbsp; </span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    mt={3}
                    textAlign="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ bgcolor: "#0c113b" }}
                      type="submit"
                    >
                      <Typography>Submit</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} textAlign="center" py={1}>
                    <Link
                      to="#"
                      style={{ textDecoration: "none" }}
                      // onClick={handleResendOtp}
                    >
                      <Typography style={{ cursor: "pointer" }}>
                        Resend One-Time Password
                      </Typography>
                    </Link>
                  </Grid>
                </form>
              </Grid>
              {/* </Paper> */}
              {/* </Grid> */}
            </ModalContent>
          </Fade>
        </Modal>
      </Grid>
    </div>
  );
}

// --------------------------------------------popupOTP-------------------------------------------
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  // background-color: rgb(87 89 88 / 0.5);
  background-color: rgb(0 0 0 / 0.8);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
