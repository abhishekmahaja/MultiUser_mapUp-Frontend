import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Card } from "@mui/joy";
// -------------import for table--------------------------------//
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { Box } from "@mui/system";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";

// ---------FUNCTIONS OF TABLE--------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "10px", // Increase padding
    height: "20px", // Set a specific height
    fontSize: "16px", // Optionally adjust font size for header
    lineHeight: "1.5", // Adjust line height if needed
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const CardWrapper = styled(Card)(() => ({
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  ".card-Content-text": {
    padding: "0 !important",
  },
}));

// -----------------------------Table for Moblie-------------------------------------

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[100],
}));

const StyledContent = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: "white",
}));

let data = {
  "Well No": "1",
  Location: "New York",
  Installation: "01/01/2021",
  Latitude: "40.7128 N",
  Longitude: "74.0060 W",
};

let Tata = {
  "Well No": "2",
  Location: "Delhi",
  Installation: "01/01/2021",
  Latitude: "40.7128 N",
  Longitude: "74.0060 W",
};

let Mata = {
  "Well No": "3",
  Location: "UP",
  Installation: "01/01/2021",
  Latitude: "40.7128 N",
  Longitude: "74.0060 W",
};

let Sata = {
  "Well No": "4",
  Location: "MP",
  Installation: "01/01/2021",
  Latitude: "40.7128 N",
  Longitude: "74.0060 W",
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1"),
  createData("2"),
  createData("3"),
  createData("4"),
  createData("5"),
  createData("6"),
  createData("7"),
  createData("8"),
];

export default function BasicCard() {
  const [open, setOpen] = useState(false); // State to control modal visibility

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container>
      <IconButton>
        <ForwardToInboxIcon sx={{ fontSize: 30, color: "green " }} />
      </IconButton>
      <Typography variant="h4" mt={1}>
        Message Box
      </Typography>
      {/* -------------------------Table for Moblie----------------------------- */}
      <Grid
        container
        sx={{ display: { sm: "block", xs: "block", md: "none", lg: "none" } }}
      >
        <Tabs>
          <TabList>
            <Tab style={{ whiteSpace: "break-spaces" }}>
              <Typography fontSize={"large"}>User Approval</Typography>
            </Tab>
            <Tab>
              <Typography fontSize={"large"}>Add Well Approval</Typography>
            </Tab>
          </TabList>
          <TabPanel>
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 600 }}>
              <Grid container mt={2} direction="column">
                {Object.keys(data).map((header, index) => (
                  <Grid container key={index}>
                    {/* Header Section */}
                    <StyledGridItem item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {header}
                      </Typography>
                    </StyledGridItem>
                    {/* Content Section */}
                    <StyledContent item xs={8}>
                      <Typography variant="body1">{data[header]}</Typography>
                    </StyledContent>
                  </Grid>
                ))}
              </Grid>
              {/* ----------------------Dreak---------------------------------- */}
              <Grid container mt={2} direction="column">
                {Object.keys(Tata).map((header, index) => (
                  <Grid container key={index}>
                    {/* Header Section */}
                    <StyledGridItem item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {header}
                      </Typography>
                    </StyledGridItem>
                    {/* Content Section */}
                    <StyledContent item xs={8}>
                      <Typography variant="body1">{Tata[header]}</Typography>
                    </StyledContent>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </TabPanel>
          {/* ----------------------Dreak---------------------------------- */}
          <TabPanel>
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 600 }}>
              <Grid container mt={2} direction="column">
                {Object.keys(Mata).map((header, index) => (
                  <Grid container key={index}>
                    {/* Header Section */}
                    <StyledGridItem item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {header}
                      </Typography>
                    </StyledGridItem>
                    {/* Content Section */}
                    <StyledContent item xs={8}>
                      <Typography variant="body1">{Mata[header]}</Typography>
                    </StyledContent>
                  </Grid>
                ))}
              </Grid>
              {/* ----------------------Dreak---------------------------------- */}
              <Grid container mt={2} direction="column">
                {Object.keys(Sata).map((header, index) => (
                  <Grid container key={index}>
                    {/* Header Section */}
                    <StyledGridItem item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {header}
                      </Typography>
                    </StyledGridItem>
                    {/* Content Section */}
                    <StyledContent item xs={8}>
                      <Typography variant="body1">{Sata[header]}</Typography>
                    </StyledContent>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </TabPanel>
        </Tabs>
      </Grid>

      {/* -------------------------Table for Desktop--------------------------- */}

      <Grid container>
        <Grid
          item
          md={12}
          lg={12}
          sm={5}
          xs={4}
          sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}
        >
          <Tabs>
            <TabList>
              <Tab style={{ whiteSpace: "break-spaces" }}>
                <Typography fontSize={"large"}>User Approval</Typography>
              </Tab>
              <Tab>
                <Typography fontSize={"large"}>Add Well Approval</Typography>
              </Tab>
            </TabList>
            <TabPanel>
              <TableContainer sx={{ border: "1px solid black" }}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Number</StyledTableCell>
                      <StyledTableCell align="left">Username</StyledTableCell>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Email</StyledTableCell>
                      <StyledTableCell align="left">Phone No.</StyledTableCell>
                      <StyledTableCell align="left">
                        Approval Status
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ width: "10%" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ width: "10%" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ width: "10%" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ width: "10%" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ width: "10%" }}
                        ></StyledTableCell>
                        <StyledTableCell sx={{ width: "25%" }}>
                          <Box display={"flex"} justifyContent={"space-evenly"}>
                            <IconButton
                              onClick={handleClickOpen}
                              sx={{
                                color: "black",
                                "&:hover": { color: "darkred" },
                                marginRight: "5px",
                              }}
                            >
                              <RemoveRedEyeIcon fontSize="large" />
                            </IconButton>
                          </Box>{" "}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer sx={{ border: "1px solid black" }}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Complaint No.</StyledTableCell>
                      <StyledTableCell align="left">Data/Time</StyledTableCell>
                      <StyledTableCell align="left">
                        Raiser Name
                      </StyledTableCell>
                      <StyledTableCell align="left">Taker Name</StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="center">
                        Description
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ width: "10%" }}
                      >
                        {" "}
                        Notification No.
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "10%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "10%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "10%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "10%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "25%" }}></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Tabs>
        </Grid>
      </Grid>
      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h4" textAlign={"center"}>
          Approval User
        </DialogTitle>
        <DialogContent>
          <Grid container gap={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} md={4} lg={6} gap={3}>
                <Typography fontSize="large">REGISTRATION ID</Typography>
                <Typography fontSize="large">employeeID</Typography>
                <Typography fontSize="large">username</Typography>
                <Typography fontSize="large">email</Typography>
                <Typography fontSize="large">contactNumber</Typography>
                <Typography fontSize="large">employeeID</Typography>
                <Typography fontSize="large">assetName</Typography>
                <Typography fontSize="large">department</Typography>
                <Typography fontSize="large">roleInRTMS</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={6}>
                <Grid container spacing={2} direction="column">
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <img
                        src="https://t4.ftcdn.net/jpg/01/42/20/17/240_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.jpg"
                        alt="User_ID Card"
                        style={{ objectFit: "contain", width: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <img
                        src="https://t3.ftcdn.net/jpg/02/53/98/06/240_F_253980681_a8hAmy7gbe28SjtRPoUo0EShW87oXVTy.jpg"
                        alt="User_ID Card"
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container gap={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="h5" textAlign="left">
                  Status:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={12} textAlign={"end"}>
                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  {/* <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" color="primary" size="large">
                    Close
                  </Button>
                </Link> */}
                  <Button variant="contained" color="primary" size="large">
                    Approve
                  </Button>
                  <Button variant="contained" color="primary" size="large">
                    Reject
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
