import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
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
import { useSelector } from "react-redux";
import {
  ApproveByManager,
  approveByOwner,
  getNotApprovalOwnerUser,
  getNotApprovedManagerUser,
  rejectByManager,
  rejectByOwner,
} from "../../../apis/Service";
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
// -----------------------------Table for Mobile-------------------------------------
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
export default function BasicCard() {
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [users, setUsers] = useState([]); // State to store fetched users
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for modal
  const role = useSelector((state) => state.auth.role); // Get user role from Redux
  const authToken = useSelector((state) => state.auth.authToken); // Get auth token from Redux

  // Function to fetch users based on role
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    let fetchFunction;

    if (role === "manager") {
      fetchFunction = getNotApprovedManagerUser;
    } else if (role === "owner") {
      fetchFunction = getNotApprovalOwnerUser;
    } else {
      setError("Invalid role");
      setLoading(false);
      return;
    }

    try {
      const response = await fetchFunction();
      // console.log("API Response:", response);
      if (response.success) {
        // Adjust this line according to the response structure
        setUsers(
          response.approvedOwnerUsers || response.approvedManagerUsers || []
        );
      } else {
        setError(response.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Function to approve users
  const handleApprove = async (user) => {
    let response;
    const formData = { employeeID: user.employeeID }; // Prepare the request body

    try {
      if (role === "manager") {
        // Call ApproveByManager API with Bearer token in the header
        response = await ApproveByManager(formData, authToken);
      } else if (role === "owner") {
        // Call approveByOwner API with Bearer token in the header
        response = await approveByOwner(formData, authToken);
      }

      if (response && response.success) {
        // Update the user list after approval
        alert("User approved successfully");
        fetchUsers(); // Refetch users to update the list
      } else {
        alert(response.message || "Approval failed");
      }
    } catch (error) {
      console.error("Approval error:", error);
      alert("An error occurred while approving the user");
    }
  };

  //reject user api
  const handleReject = async (user) => {
    let response;
    const formData = { employeeID: user.employeeID };

    try {
      if (role === "manager") {
        response = await rejectByManager(formData, authToken);
      } else if (role === "owner") {
        response = await rejectByOwner(formData, authToken);
      }

      if (response && response.success) {
        alert("User rejected successfully");
        fetchUsers();
      } else {
        alert(response.message || "Rejection failed");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      alert("An error occurred while rejecting the user");
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    // console.log("Role:", role);
    // console.log("Auth Token:", authToken);
    if (role === "manager" || role === "owner") {
      fetchUsers();
    }
  }, [role, authToken]);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} container alignItems="center">
        <IconButton>
          <ForwardToInboxIcon sx={{ fontSize: 30, color: "green " }} />
        </IconButton>
        <Typography variant="h4" mt={1}>
          Message Box
        </Typography>
      </Grid>

      {/* Loading and Error States */}
      <Grid item xs={12}>
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
      </Grid>

      {/* -------------------------Table for Mobile----------------------------- */}
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
                {users?.map((user, index) => (
                  <Grid container key={user._id || index} mb={2}>
                    {/* Header Section */}
                    <StyledGridItem item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {`User ${index + 1}`}
                      </Typography>
                    </StyledGridItem>
                    {/* Content Section */}
                    <StyledContent item xs={8}>
                      <Typography variant="body1">{user.username}</Typography>
                      <Typography variant="body1">{user.email}</Typography>
                      <Typography variant="body1">
                        {user.contactNumber}
                      </Typography>
                      {/* Add more fields as necessary */}
                      <IconButton
                        onClick={() => handleClickOpen(user)}
                        sx={{
                          color: "black",
                          "&:hover": { color: "darkred" },
                          marginTop: 1,
                        }}
                      >
                        <RemoveRedEyeIcon fontSize="large" />
                      </IconButton>
                    </StyledContent>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </TabPanel>
          <TabPanel>
            {/* Add Well Approval Content Here */}
            <Typography variant="body1">Add Well Approval Content</Typography>
          </TabPanel>
        </Tabs>
      </Grid>

      {/* -------------------------Table for Desktop--------------------------- */}

      <Grid container>
        <Grid
          item
          md={12}
          lg={12}
          sm={12}
          xs={12}
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
              <TableContainer
                component={Paper}
                sx={{ border: "1px solid black", maxHeight: 500 }}
              >
                <Table aria-label="customized table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Number</StyledTableCell>
                      <StyledTableCell align="left">Username</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">
                        Phone No.
                      </StyledTableCell>
                      <StyledTableCell align="left">Department</StyledTableCell>
                      <StyledTableCell align="center">
                        Approval Status
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users?.map((user, index) => (
                      <StyledTableRow key={user._id || index}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {user.username}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.contactNumber}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {user.department || "N/A"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.isApprovedByManager
                            ? "Approved By Manager! Waiting Owner Approval"
                            : "Pending Approval"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box display={"flex"} justifyContent={"space-evenly"}>
                            <IconButton
                              onClick={() => handleClickOpen(user)}
                              sx={{
                                color: "black",
                                "&:hover": { color: "darkred" },
                                marginRight: "5px",
                              }}
                            >
                              <RemoveRedEyeIcon fontSize="large" />
                            </IconButton>
                            {/* Add more action buttons if needed */}
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              {/* Add Well Approval Content Here */}
              <Typography variant="body1">Add Well Approval Content</Typography>
            </TabPanel>
          </Tabs>
        </Grid>
      </Grid>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle variant="h4" textAlign={"center"}>
          Approval User
        </DialogTitle>
        <DialogContent>
          {selectedUser ? (
            <Grid container spacing={3}>
              <Grid container spacing={4}>
                <Grid item ml={3} xs={12} sm={4} md={5} lg={5}>
                  <DialogTitle variant="h6" mt={2}>
                    REGISTRATION DETAILS :-
                  </DialogTitle>
                  <Typography fontSize="large">
                    <strong>Employee ID:</strong> {selectedUser.employeeID}
                  </Typography>
                  <Typography fontSize="large">
                    <strong>Username:</strong> {selectedUser.username}
                  </Typography>
                  <Typography fontSize="large">
                    <strong>Email:</strong> {selectedUser.email}
                  </Typography>
                  <Typography fontSize="large">
                    <strong>Contact Number:</strong>{" "}
                    {selectedUser.contactNumber}
                  </Typography>
                  <Typography fontSize="large">
                    <strong>Asset Name:</strong>{" "}
                    {selectedUser.organizationName || "N/A"}
                  </Typography>
                  <Typography fontSize="large">
                    <strong>Department:</strong>{" "}
                    {selectedUser.department || "N/A"}
                  </Typography>
                  <Typography fontSize="large">
                    <strong>Role in RTMS:</strong> {selectedUser.roleInRTMS}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={6}
                  gap={2}
                  sx={{ display: "flex", alignItems: "end" }}
                >
                  <Grid item xs={12}>
                    <Paper elevation={1}>
                      <Box paddingTop={2} paddingBottom={2}>
                        <img
                          src={selectedUser.idCardPhoto}
                          alt="User ID Card"
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "25vh",
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={1}>
                      <Box paddingTop={2} paddingBottom={2}>
                        <img
                          src={selectedUser.passportPhoto}
                          alt="User Passport Photo"
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "25vh",
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" mt={2} ml={1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" textAlign="left">
                    Status:{" "}
                    {selectedUser.isApprovedByManager
                      ? "Approved By Manager! Waiting Owner Approval"
                      : "Pending Approval"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} textAlign={"end"}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleApprove(selectedUser)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => handleReject(selectedUser)}
                    >
                      Reject
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography>No user selected.</Typography>
          )}
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

