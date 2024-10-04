import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import AssetsIcon from "@mui/icons-material/AccountBalance";
import { useSelector } from "react-redux";
import {
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  addDepartment,
  departmentDropdown,
  addPosition,
  addApprovalChain,
  getPosition,
  getApprovalChain,
  organizationAddData,
  getOrganizationData,
  UpdateDepartment,
} from "../../../apis/Service";

function ManageAsset() {
  const organizationName = useSelector((state) => state.auth.organization);
  const inputRefDepartment = useRef(null);
  const [DepartmentLoading, setDepartmentLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [selectedPositionDepartment, setSelectedPositionDepartment] =
    useState("");
  const [position, setPosition] = useState("");
  const [positionRows, setPositionRows] = useState([]);
  const [positionLoading, setPositionLoading] = useState(true);
  const [approvalChainLoading, setApprovalChainLoading] = useState(true);
  const [approvalChains, setApprovalChains] = useState(""); // For Action
  const [level1, setLevel1] = useState(""); // For Level-1
  const [level2, setLevel2] = useState(""); // For Level-2
  const [approvalChainRows, setApprovalChainRows] = useState([]);
  const [selectedApprovalDepartment, setSelectedApprovalDepartment] =
    useState("");
  //organization Data Add
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone: "",
    fax: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [organiatioLoading, setOrganiationLoading] = useState(false);

  //integration for add department
  // const handleAddDepartment = async () => {
  //   const inputValue = inputRefDepartment.current
  //     ? inputRefDepartment.current.value
  //     : "";
  //   const value = inputValue.trim();

  //   if (!organizationName) {
  //     toast.error("Organization name is missing");
  //     return;
  //   }
  //   if (value) {
  //     try {
  //       const formData = {
  //         organizationName: organizationName, // Use dynamic organization name
  //         departmentName: value,
  //       };
  //       const result = await addDepartment(formData);
  //       if (result && result.success) {
  //         setDepartments((prevDepartments) => [...prevDepartments, value]);
  //         inputRefDepartment.current.value = ""; // Clear input
  //         toast.success(result.message || "Department added successfully");
  //       } else {
  //         toast.error(result.message || "Failed to add department");
  //       }
  //     } catch (error) {
  //       console.error("API call error: ", error.response || error.message);
  //       toast.error(
  //         "Error adding department: " +
  //           (error.response?.data?.message || error.message)
  //       );
  //     }
  //   } else {
  //     toast.error("Department name cannot be empty");
  //   }
  // };

  // Function to initiate editing
  const handleEditClick = (index) => {
    setNewDepartmentName(departments[index]); // Set current department name to input
    setIsEditing(true); // Set editing mode
    setEditingIndex(index); // Set index of the department being edited
  };

  //Update Department Integration
  const handleAddOrUpdateDepartment = async () => {
    const value = newDepartmentName.trim();

    if (!organizationName) {
      toast.error("Organization name is missing");
      return;
    }

    if (value) {
      try {
        const formData = {
          organizationName: organizationName,
        };
        if (isEditing) {
          // Handle updating the department
          const oldDepartmentName = departments[editingIndex]; // Current department name
          formData.oldDepartmentName = oldDepartmentName; // Set the old department name
          formData.newDepartmentName = value; // Set the new department name
          const result = await UpdateDepartment(formData); // Call the update API
          if (result && result.success) {
            const updatedDepartments = [...departments];
            updatedDepartments[editingIndex] = value; // Update the department name
            setDepartments(updatedDepartments);
            toast.success(result.message || "Department updated successfully");
          } else {
            toast.error(result.message || "Failed to update department");
          }
        } else {
          // Handle adding the department
          formData.departmentName = value; // Set the new department name for adding
          const result = await addDepartment(formData);
          if (result && result.success) {
            setDepartments((prevDepartments) => [...prevDepartments, value]);
            toast.success(result.message || "Department added successfully");
          } else {
            toast.error(result.message || "Failed to add department");
          }
        }
        // Reset state after operation
        setNewDepartmentName(""); // Clear input
        setIsEditing(false); // Reset editing mode
        setEditingIndex(null); // Reset editing index
      } catch (error) {
        console.error("API call error: ", error.response || error.message);
        toast.error(
          "Error: " + (error.response?.data?.message || error.message)
        );
      }
    } else {
      toast.error("Department name cannot be empty");
    }
  };

  //ADD position from api on the base of department
  const handlePositionSubmit = async (event) => {
    event.preventDefault();
    if (!organizationName) {
      toast.error("Organization name is required.");
      return;
    }
    // Check if department and position are selected
    if (!selectedPositionDepartment || !position) {
      toast.error("Please select a department and enter a position.");
      return;
    }
    const formData = {
      organizationName,
      departmentName: selectedPositionDepartment,
      positions: [position],
    };
    try {
      const response = await addPosition(formData);
      if (response.data.success) {
        toast.message(response.data.message);
        setPositionRows((prevRows) => [
          ...prevRows,
          { name: selectedPositionDepartment, position },
        ]);
        toast.success(response.message || "Position Add Successfully");
        setPosition("");
      } else {
        toast.success(response.message || "Position Add Successfully");
      }
    } catch (error) {
      console.error("Error adding position:", error.message);
    }
  };

  //ADD approval chain from api on the base of department
  const handleApprovalChainSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields are filled out
    if (!organizationName) {
      toast.error("Organization Name is required");
      return;
    }
    if (!selectedApprovalDepartment) {
      toast.error("Please select a department");
      return;
    }
    if (!approvalChains || !level1 || !level2) {
      toast.error("Please fill out Action, Level-1, and Level-2");
      return;
    }
    const formData = {
      organizationName,
      departmentName: selectedApprovalDepartment,
      action: approvalChains, // Flattened
      level1, // Flattened
      level2, // Flattened
    };
    try {
      const response = await addApprovalChain(formData);
      if (response.data.success) {
        // toast.message(response.data.message);
        setApprovalChainRows((prevRows) => [
          ...prevRows,
          { name: selectedApprovalDepartment, approvalChains, level1, level2 },
        ]);
        setApprovalChains("");
        setLevel1("");
        setLevel2("");
        toast.success(response.message || "Approval Chain added successfully");
      } else {
        toast.success(
          response.data.message || "Approval Chain added successfully"
        );
      }
    } catch (error) {
      console.error("Error adding approval chain:", error.message);
      toast.error("An error occurred while adding the approval chain");
    }
  };

  // Fetch departments from API To Show
  const fetchDepartments = async (organizationName) => {
    setDepartmentLoading(true);
    try {
      const formData = { organizationName };
      const response = await departmentDropdown(formData);
      if (response.data && response.data.length > 0) {
        const departmentList = response.data[0].departments.map(
          (department) => department.departmentName
        );
        // console.log("Fetched Departments:", departmentList);
        setDepartments(departmentList); // Store department names in state
      } else {
        console.warn("No department data found in response.");
        setDepartments([]); // Set to an empty array if no departments found
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setDepartmentLoading(false);
    }
    // Fetch all departments and their respective positions
    setPositionLoading(true);
    try {
      const formData = { organizationName };
      const departmentResponse = await departmentDropdown(formData); // Fetch departments
      if (departmentResponse.data && departmentResponse.data.length > 0) {
        const departmentList = departmentResponse.data[0].departments.map(
          (dept) => dept.departmentName
        );
        // Fetch positions for each department
        const allPositions = await Promise.all(
          departmentList.map(async (department) => {
            const positionResponse = await getPosition(
              organizationName,
              department
            );
            return {
              departmentName: department,
              positions: positionResponse.data || [], // Store positions if found
            };
          })
        );
        setPositionRows(allPositions);
      } else {
        console.warn("No departments found");
        setPositionRows([]); // Clear if no departments are available
      }
    } catch (error) {
      console.error("Error fetching departments and positions:", error);
    } finally {
      setPositionLoading(false);
    }
    // Fetch all Approval chain and their respective department
    // setApprovalChainLoading(true);
    // try {
    //   const formData = { organizationName };
    //   const departmentResponse = await departmentDropdown(formData);
    //   if (departmentResponse.data && departmentResponse.data.length > 0) {
    //     const departmentList = departmentResponse.data[0].departments.map(
    //       (dept) => dept.departmentName
    //     );
    //     const allApprovalChain = await Promise.all(
    //       departmentList.map(async (department) => {
    //         const approvalChainResponse = await getApprovalChain(
    //           organizationName,
    //           department
    //         );
    //         return {
    //           departmentName: department,
    //           approvalChains: approvalChainResponse.data || [],
    //         };
    //       })
    //     );
    //     console.log(
    //       "Approval Chain Data:",
    //       JSON.stringify(allApprovalChain, null, 2)
    //     );
    //     setApprovalChainRows(allApprovalChain);
    //   } else {
    //     console.warn("No Departments Found");
    //     setApprovalChainRows([]);
    //   }
    // } catch (error) {
    //   console.error("Error fetching departments and Approval Chain:", error);
    // } finally {
    //   setApprovalChainLoading(false);
    // }
    setApprovalChainLoading(true);
    try {
      const formData = { organizationName };
      const departmentResponse = await departmentDropdown(formData);
      if (departmentResponse.data && departmentResponse.data.length > 0) {
        const departmentList = departmentResponse.data[0].departments.map(
          (dept) => dept.departmentName
        );
        const allApprovalChain = await Promise.all(
          departmentList.map(async (department) => {
            const approvalChainResponse = await getApprovalChain(
              organizationName,
              department
            );
            return {
              departmentName: department,
              approvalChains: approvalChainResponse.data || [],
            };
          })
        );
        console.log(
          "Approval Chain Data:",
          JSON.stringify(allApprovalChain, null, 2)
        );
        setApprovalChainRows(allApprovalChain);
      } else {
        console.warn("No Departments Found");
        setApprovalChainRows([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching data.");
    } finally {
      setApprovalChainLoading(false);
    }
    setOrganiationLoading(true);
    try {
      const response = await getOrganizationData(organizationName);
      setFormData({
        address: response.address || "",
        city: response.city || "",
        state: response.state || "",
        country: response.country || "",
        pinCode: response.pinCode || "",
        phone: response.phone || "",
        fax: response.fax || "",
        email: response.email || "",
      });
      // console.log("organization", response);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    } finally {
      setOrganiationLoading(false);
    }
  };

  //Organization ADD Data
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Handle Save
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedFormData = {
        ...formData,
        organizationName: organizationName,
      };
      const response = await organizationAddData(updatedFormData);
      if (response.status === 200) {
        toast.success("Data saved successfully:", response.message);
      } else {
        toast.success("Data saved successfully", response.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };
  // Handle Cancel Clear form fields
  const handleCancel = () => {
    setFormData({
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phone: "",
      fax: "",
      email: "",
    });
  };

  // -------------------Table------------------------
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

  useEffect(() => {
    if (organizationName) {
      fetchDepartments(organizationName);
    }
  }, [organizationName]);

  return (
    <div>
      <Paper>
        <Grid container gap={1} p={3}>
          {/* Icon and Organization Name */}
          <IconButton>
            <AssetsIcon sx={{ fontSize: 30, color: "green" }} />
          </IconButton>
          <Typography variant="h4" mt={1}>
            Organization : [ {organizationName ? organizationName : "N/A"} ]
          </Typography>
          {/* Form Fields */}
          <Grid container spacing={3}>
            <Grid item md={10} sm={10} xs={12} lg={12}>
              <Grid container spacing={1}>
                {[
                  "address",
                  "city",
                  "state",
                  "country",
                  "pinCode",
                  "phone",
                  "fax",
                  "email",
                ].map((field) => (
                  <Grid item xs={12} sm={3} md={3} lg={3} key={field}>
                    <Typography variant="h6">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      disabled={organiatioLoading} // Disable field if loading
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/* Button Section */}
          <Grid
            container
            mt={2}
            display={"flex"}
            justifyContent={"end"}
            gap={1}
          >
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  "&:hover": {
                    backgroundColor: "darkgreen",
                  },
                  fontSize: "16px",
                  width: "150px",
                }}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "SAVING..." : "SAVE"}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  "&:hover": {
                    backgroundColor: "darkgreen",
                  },
                  fontSize: "16px",
                  width: "150px",
                }}
                onClick={handleCancel}
              >
                CANCEL
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* ------------Input textfield for table------------------- */}
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Grid container spacing={2} mt={0.1}>
            {/* ------------------------ADD DEPARTMENT------------------------------ */}
            <Grid
              item
              xs={12}
              sm={3.5}
              md={3.5}
              lg={2.5}
              gap={1}
              display="flex"
              flexDirection={"column"}
            >
              <Typography variant="h5">Add Department</Typography>
              <Box display="flex" gap={1}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Department"
                  value={newDepartmentName} // Bind value to newDepartmentName state
                  onChange={(e) => setNewDepartmentName(e.target.value)} // Update state on change
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateDepartment} // Use combined function for both adding and updating
                  size="small"
                  sx={{
                    backgroundColor: "green",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                >
                  {isEditing ? "UPDATE" : "ADD"}{" "}
                  {/* Change button label based on mode */}
                </Button>
              </Box>

              <Grid container>
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: 620, overflow: "auto" }}
                >
                  <Table aria-label="customized table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "15%" }}
                        >
                          Department
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {DepartmentLoading ? (
                        <TableRow>
                          <StyledTableCell colSpan={2}>
                            Loading...
                          </StyledTableCell>
                        </TableRow>
                      ) : departments && departments.length > 0 ? (
                        departments.map((departmentName, index) => (
                          <TableRow key={index}>
                            {/* Numbering and Department Name */}
                            <StyledTableCell>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                {/* Department Name with Numbering */}
                                <span>
                                  {index + 1}. {departmentName}
                                </span>

                                {/* Icon Buttons */}
                                <Box display="flex">
                                  <IconButton
                                    sx={{
                                      color: "red",
                                      "&:hover": { color: "darkred" },
                                      marginRight: "8px", // Add some spacing between buttons
                                    }}
                                  >
                                    <DeleteForeverIcon fontSize="medium" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleEditClick(index)}
                                  >
                                    {" "}
                                    {/* Update edit button */}
                                    <EditIcon fontSize="medium" />
                                  </IconButton>
                                  {/* <IconButton
                                    sx={{
                                      color: "darkblue",
                                      "&:hover": { color: "black" },
                                    }}
                                    onClick={() =>
                                      handleUpdateDepartment(index)
                                    } // Trigger PUT API on Edit click
                                  >
                                    <EditIcon fontSize="medium" />
                                  </IconButton> */}
                                </Box>
                              </Box>
                            </StyledTableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <StyledTableCell colSpan={2}>
                            No departments available
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {/* ------------------------ADD POSITION------------------------------ */}
            <Grid
              item
              xs={12}
              sm={3.5}
              md={3.5}
              lg={3.5}
              gap={1}
              display="flex"
              flexDirection={"column"}
            >
              <Typography variant="h5"> Add Position</Typography>
              <Box display="flex" gap={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {DepartmentLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-large-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-large"
                        label="Well Location"
                        value={selectedPositionDepartment}
                        onChange={(e) =>
                          setSelectedPositionDepartment(e.target.value)
                        }
                      >
                        <MenuItem value="" disabled>
                          Select a department
                        </MenuItem>
                        {departments && departments.length > 0 ? (
                          departments.map((departmentName, index) => (
                            <MenuItem
                              key={departmentName}
                              value={departmentName}
                            >
                              {index + 1}. {departmentName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            No departments available
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handlePositionSubmit}
                  size="small"
                  sx={{
                    backgroundColor: "green", // Change button color to green
                    "&:hover": {
                      backgroundColor: "darkgreen", // Optional: Change color on hover
                    },
                  }}
                >
                  ADD
                </Button>
              </Box>
              {/* -------------------Table 2-------------------------- */}
              <Grid container>
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: 620, overflow: "auto" }}
                >
                  <Table aria-label="customized table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Department
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Position
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {positionLoading ? (
                        <TableRow>
                          <StyledTableCell colSpan={2}>
                            Loading...
                          </StyledTableCell>
                        </TableRow>
                      ) : departments && departments.length > 0 ? (
                        positionRows.map((row, index) => (
                          <StyledTableRow key={index}>
                            {/* Department column */}
                            <StyledTableCell component="th" scope="row">
                              {index + 1}. {row.departmentName}
                              {/* Department with numbering */}
                            </StyledTableCell>
                            {/* Positions column */}
                            <StyledTableCell align="left">
                              {row.positions.length > 0
                                ? row.positions.map((position, posIndex) => (
                                    <div key={posIndex}>
                                      {posIndex + 1}. {position}
                                      {/* Position with numbering */}
                                    </div>
                                  ))
                                : "No positions available"}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      ) : (
                        <TableRow>
                          <StyledTableCell colSpan={2}>
                            No Positions available
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {/* ------------------------APPROVAL CHAIN------------------------------ */}
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              lg={6}
              gap={1}
              display="flex"
              flexDirection={"column"}
            >
              <Typography variant="h5"> Approval Chain</Typography>
              <Box display="flex" gap={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {DepartmentLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-large-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-large"
                        label="Department"
                        value={selectedApprovalDepartment}
                        onChange={(e) =>
                          setSelectedApprovalDepartment(e.target.value)
                        }
                      >
                        <MenuItem value="" disabled>
                          Select a department
                        </MenuItem>
                        {departments && departments.length > 0 ? (
                          departments.map((departmentName, index) => (
                            <MenuItem
                              key={departmentName}
                              value={departmentName}
                            >
                              {index + 1}. {departmentName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            No departments available
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <TextField
                  variant="outlined"
                  label="Action"
                  size="small"
                  value={approvalChains}
                  onChange={(e) => setApprovalChains(e.target.value)}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Level-1"
                  size="small"
                  value={level1}
                  onChange={(e) => setLevel1(e.target.value)}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Level-2"
                  size="small"
                  value={level2}
                  onChange={(e) => setLevel2(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleApprovalChainSubmit}
                  size="small"
                  sx={{
                    backgroundColor: "green", // Change button color to green
                    "&:hover": {
                      backgroundColor: "darkgreen", // Optional: Change color on hover
                    },
                  }}
                >
                  ADD
                </Button>
              </Box>
              {/* --------------------------Table----------------------------- */}
              <Grid container>
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: 620, overflow: "auto" }}
                >
                  <Table aria-label="customized table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Department
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: "25%" }}>
                          Action
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Level-1
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Level-2
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {approvalChainRows && approvalChainRows.length > 0 ? (
                        approvalChainRows.map((row, index) => (
                          <>
                            <StyledTableRow key={index}>
                              {/* Ensure row.approvalChains exists and has items */}
                              <StyledTableCell
                                component="th"
                                rowSpan={row.approvalChains?.length || 1}
                              >
                                {index + 1}. {row.departmentName}
                              </StyledTableCell>
                              {/* Check if first approvalChain exists */}
                              {row.approvalChains?.[0] ? (
                                <>
                                  <StyledTableCell>
                                    {1}. {row.approvalChains[0].action || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {1}. {row.approvalChains[0].level1 || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {1}. {row.approvalChains[0].level2 || "N/A"}
                                  </StyledTableCell>
                                </>
                              ) : (
                                <StyledTableCell colSpan={3}>
                                  No Approval Chain Available
                                </StyledTableCell>
                              )}
                            </StyledTableRow>
                            {/* Remaining approvalChains */}
                            {row.approvalChains
                              ?.slice(1)
                              .map((chain, chainIndex) => (
                                <StyledTableRow key={`${index}-${chainIndex}`}>
                                  <StyledTableCell>
                                    {chainIndex + 2}. {chain?.action || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {chainIndex + 2}. {chain?.level1 || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {chainIndex + 2}. {chain?.level2 || "N/A"}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                          </>
                        ))
                      ) : (
                        <TableRow>
                          <StyledTableCell colSpan={4}>
                            Loading...
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageAsset;
