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
  DeleteDepartment,
  updatePosition,
  deletePosition,
  updateApprovalChain,
  deleteApprovalChain,
  updateOrganizationData,
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
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [oldPosition, setOldPosition] = useState(null);
  const [approvalChainLoading, setApprovalChainLoading] = useState(true);
  const [approvalChains, setApprovalChains] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [approvalChainRows, setApprovalChainRows] = useState([]);
  const [selectedApprovalDepartment, setSelectedApprovalDepartment] =
    useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  //organization Data Add
  const [formData, setFormData] = useState({
    OrganizationName: "",
    organizationlogo: "",
    subtitlename: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone: "",
    fax: "",
    email: "",
  });
  //storeg in local storage to use
  localStorage.setItem("organizationLogo", formData.organizationlogo); // Save the logo
  localStorage.setItem("subtitlename", formData.subtitlename); // Save the subtitle
  const [loading, setLoading] = useState(false);
  const [isEditOrganization, setIsEditOrganization] = useState(false);
  const [organiatioLoading, setOrganiationLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // Function to initiate Updating department
  const handleEditClick = (index) => {
    setNewDepartmentName(departments[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  //integration for add department and Update department
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
          const oldDepartmentName = departments[editingIndex];
          formData.oldDepartmentName = oldDepartmentName;
          formData.newDepartmentName = value;
          const result = await UpdateDepartment(formData);
          if (result && result.success) {
            const updatedDepartments = [...departments];
            updatedDepartments[editingIndex] = value;
            setDepartments(updatedDepartments);
            toast.success(result.message || "Department updated successfully");
          } else {
            toast.error(result.message || "Failed to update department");
          }
        } else {
          // Handle adding the department
          formData.departmentName = value;
          const result = await addDepartment(formData);
          if (result && result.success) {
            setDepartments((prevDepartments) => [...prevDepartments, value]);
            toast.success(result.message || "Department added successfully");
          } else {
            toast.error(result.message || "Failed to add department");
          }
        }
        // Reset state after operation
        setNewDepartmentName("");
        setIsEditing(false);
        setEditingIndex(null);
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

  //delete department
  const handleDeleteDepartment = async (departmentName) => {
    if (!organizationName || !departmentName) {
      toast.error("Organization name and department name are required");
      return;
    }
    try {
      const response = await DeleteDepartment({
        organizationName,
        departmentName,
      });
      if (response && response.data.success) {
        setDepartments((prevDepartments) =>
          prevDepartments.filter((dep) => dep !== departmentName)
        );
        toast.error(response.data.message || "Failed to delete department");
      } else {
        toast.success(`Department "${departmentName}" deleted successfully`);
      }
    } catch (error) {
      console.error(
        "Error deleting department: ",
        error.response || error.message
      );
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  //ADD And Update position on the base of department
  const handlePositionSubmit = async () => {
    if (!selectedPositionDepartment || !position) {
      toast.error("Department and position are required");
      return;
    }
    try {
      let result;
      if (isEditingPosition) {
        const formData = {
          organizationName: organizationName,
          departmentName: selectedPositionDepartment,
          oldPositionName: oldPosition,
          newPositionName: position,
        };
        result = await updatePosition(formData);
      } else {
        const formData = {
          organizationName: organizationName,
          departmentName: selectedPositionDepartment,
          positions: [position],
        };
        result = await addPosition(formData);
      }
      if (result && result.success) {
        toast.success(
          result.message ||
            (isEditingPosition
              ? "Position updated successfully"
              : "Position added successfully")
        );
        setPosition("");
        setSelectedPositionDepartment("");
        setIsEditingPosition(false);
        setOldPosition(null);
      } else {
        toast.error(result.message || "Failed to submit position");
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };
  //Edit State for edit position
  const handleEditPosition = (departmentName, positionName) => {
    setSelectedPositionDepartment(departmentName);
    setPosition(positionName);
    setOldPosition(positionName);
    setIsEditingPosition(true);
  };

  //Delete Position
  const handleDeletePosition = async (departmentName, positionName) => {
    if (!organizationName || !departmentName || !positionName) {
      toast.error(
        "organization Name, Department Name and Position Name are required"
      );
      return;
    }
    try {
      const deletePositionResponse = await deletePosition({
        organizationName,
        departmentName,
        positionName,
      });
      if (deletePositionResponse && deletePositionResponse.data.success) {
        setPosition((prevPosition) =>
          prevPosition.filter((pos) => pos !== positionName)
        );
        toast.error(
          deletePositionResponse.data.message || "Failed to delete position"
        );
      } else {
        toast.success(`Position "${positionName}" Delete Successfully`);
      }
    } catch (error) {
      console.error(
        "Error Deleting Position: ",
        error.deletePositionResponse || error.message
      );
      toast.error(
        "Error: " +
          (error.deletePositionResponse?.data?.message || error.message)
      );
    }
  };

  //ADD and Update approval chain on the base of department
  const handleApprovalChainSubmit = async () => {
    const formData = {
      organizationName,
      departmentName: selectedApprovalDepartment,
      action: approvalChains,
      level1,
      level2,
    };
    try {
      let result;
      if (isEditMode) {
        result = await updateApprovalChain(formData);
        console.log("Update Approval Chain Result:", result);
        toast.success("Approval chain updated successfully!");
      } else {
        result = await addApprovalChain(formData);
        console.log("Add Approval Chain Result:", result);
        toast.success("Approval chain added successfully!");
      }
      // Reset the form after submission
      setSelectedApprovalDepartment("");
      setApprovalChains("");
      setLevel1("");
      setLevel2("");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while processing the request. Please try again."
      );
    }
  };
  //update approvalchain
  const handleApprovalChainEdit = (index) => {
    try {
      const approvalChainToEdit = approvalChainRows[index];
      setSelectedApprovalDepartment(approvalChainToEdit.departmentName);
      setApprovalChains(approvalChainToEdit.approvalChains.action);
      setLevel1(approvalChainToEdit.approvalChains.level1);
      setLevel2(approvalChainToEdit.approvalChains.level2);
      setIsEditMode(true);
      setEditIndex(index);
      toast.info("Editing approval chain entry.");
    } catch (error) {
      console.error("Error during edit:", error);
      toast.error(
        "An error occurred while trying to edit the approval chain. Please try again."
      );
    }
  };

  //Delete Approval chain
  const handleDeleteApprovalChain = async (index) => {
    const approvalChainToDelete = approvalChainRows[index];
    // Check if approval chain exists
    if (
      !approvalChainToDelete ||
      !approvalChainToDelete.approvalChains.length
    ) {
      console.error("No approval chain found at the specified index.");
      toast.error("No approval chain found at the specified index.");
      return;
    }
    // Create the form data for deletion
    const formData = {
      organizationName,
      departmentName: approvalChainToDelete.departmentName,
      action: approvalChainToDelete.approvalChains[0]?.action || "",
      level1: approvalChainToDelete.approvalChains[0]?.level1 || "",
      level2: approvalChainToDelete.approvalChains[0]?.level2 || "",
    };
    // Validate required fields
    if (!formData.organizationName || !formData.departmentName) {
      console.error("Organization name and department name are required.");
      toast.error("Organization name and department name are required.");
      return;
    }
    try {
      const response = await deleteApprovalChain(formData);
      if (response.success) {
        setApprovalChainRows((prev) =>
          prev.map((row, rowIndex) => {
            if (rowIndex === index) {
              return {
                ...row,
                approvalChains: row.approvalChains.filter(
                  (_, chainIndex) => chainIndex !== 0
                ),
              };
            }
            return row;
          })
        );
        toast.success(
          response.message || "Approval chain deleted successfully!"
        );
      } else {
        console.error("Error deleting approval chain:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Error occurred while deleting approval chain:", error);
      toast.error("An error occurred while deleting the approval chain.");
    }
  };

  // Fetch GET departments, position, approvalchain from API To Show
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
        setDepartments(departmentList);
      } else {
        console.warn("No department data found in response.");
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setDepartmentLoading(false);
    }
    // Fetch all Positions and their respective department
    setPositionLoading(true);
    try {
      const formData = { organizationName };
      const departmentResponse = await departmentDropdown(formData);
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
              positions: positionResponse.data || [],
            };
          })
        );
        setPositionRows(allPositions);
      } else {
        console.warn("No departments found");
        setPositionRows([]);
      }
    } catch (error) {
      console.error("Error fetching departments and positions:", error);
    } finally {
      setPositionLoading(false);
    }
    // Fetch all Approval chain and their respective department
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
        // console.log(
        //   "Approval Chain Data:",
        //   JSON.stringify(allApprovalChain, null, 2)
        // );
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
  };

  // Automatically add "+91" to phone number
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData({
        ...formData,
        [name]: value.startsWith("+91") ? value : `+91 ${value}`,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleLogoUpload = (e) => {
  //   const { name, value, files, type } = e.target;
  //   if (type === "file") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: files[0], // Store the actual file object
  //     }));
  //     // Update file name for preview
  //     if (name === "organizationlogo") {
  //       setFile(files[0].name);
  //     }
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      organizationlogo: file,
    });
  };

  // console.log("..ssssssssssssssss", formData);

  // Save organization data
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedFormData = { ...formData };

      // console.log(updatedFormData, "Ssssssssssssssssssssss");
      const response = await organizationAddData(updatedFormData);
      console.log("jhdvchjdfjc", response);
      if (response.success) {
        toast.success(response.message || "Data saved successfully");
        setIsEditOrganization(true); // Switch to Update mode after saving
        localStorage.setItem("organizationSaved", true); // Persist state in localStorage
      } else {
        console.log("sssss", "Essslse ");
        toast.error(response.message || "Data not saved");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel update
  const handleCancel = () => {
    setIsEditOrganization(true);
  };

  // Pass data to another page (like subtitle and logo)
  const passDataToOtherPage = () => {
    const subtitle = formData.subtitlename;
    const organizationlogo = formData.organizationlogo;
    navigate("/otherPage", {
      state: { subtitle, organizationlogo },
    });
  };

  // Check if data is saved in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("organizationSaved");
    if (saved) {
      setIsEditOrganization(true);
      const savedLogo = localStorage.getItem("organizationLogo");
      if (savedLogo) {
        setFormData((prev) => ({ ...prev, organizationlogo: savedLogo }));
      }
    }
  }, []);

  // Update organization data
  const handleUpdate = async () => {
    setLoading(true);
    const updatedFormData = { ...formData };
    try {
      await updateOrganizationData(updatedFormData);
      toast.success("Organization updated successfully");
      setIsEditOrganization(true);
      localStorage.setItem("organizationSaved", true);
    } catch (error) {
      toast.error("Error updating organization:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetch organization data based on Organization Name\
  const fetchOrganization = async () => {
    setOrganiationLoading(true);
    try {
      const response = await getOrganizationData(organizationName);
      setFormData({
        organizationName: response.data.organizationName || "",
        organizationlogo: response.data.organizationlogo || "",
        subtitlename: response.data.subtitlename || "",
        address: response.data.address || "",
        city: response.data.city || "",
        state: response.data.state || "",
        country: response.data.country || "",
        pinCode: response.data.pinCode || "",
        phone: response.data.phone || "",
        fax: response.data.fax || "",
        email: response.data.email || "",
      });
      if (organizationlogo instanceof File) {
        formDataToUpdate.organizationlogo = organizationlogo;
      }
      setFormData(formDataToUpdate);
      // console.log("hgdvdhc", data.organizationlogo);
      // console.log("organization", response.data);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    } finally {
      setOrganiationLoading(false);
    }
  };

  // -------------------Table------------------------
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      padding: "10px",
      height: "20px",
      fontSize: "16px",
      lineHeight: "1.5",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    if (organizationName) {
      fetchDepartments(organizationName);
    }
  }, [organizationName]);

  useEffect(() => {
    fetchOrganization();
  }, [organizationName]);

  return (
    <div>
      <Paper>
        <Grid container gap={1} p={3}>
          <IconButton>
            <AssetsIcon sx={{ fontSize: 30, color: "green" }} />
          </IconButton>
          <Typography variant="h4" mt={1}>
            Organization: [ {organizationName ? organizationName : "N/A"} ]
          </Typography>
          {/* Organization Logo (Top of Organization Name) */}
          {isEditOrganization && formData.organizationlogo && (
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              marginTop={4}
            >
              <span
                style={{
                  marginRight: "50px",
                  fontSize: "1.5rem",
                }}
              >
                Organization Logo:
              </span>
              <img
                src={formData.organizationlogo}
                alt="Organization Logo"
                style={{
                  width: "250px",
                  height: "100px",
                  objectFit: "contain", // Use 'contain' to preserve the aspect ratio
                  borderRadius: "5px", // Optional: added to make the image look better
                }}
              />
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item md={10} sm={10} xs={12} lg={12} marginTop={4}>
              <Grid container spacing={1}>
                {/* Organization Logo Upload (Show only in Save mode) */}
                {!isEditOrganization && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>
                      <Typography variant="h6">Organization Logo</Typography>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ cursor: "pointer", marginLeft: "1rem" }}
                        onChange={handleLogoUpload}
                      />
                    </span>
                    {file && (
                      <img
                        src={file}
                        alt="Organization Logo Preview"
                        style={{
                          width: "250px",
                          height: "100px",
                          objectFit: "contain",
                          marginLeft: "1.5rem",
                        }}
                      />
                    )}
                  </Grid>
                )}
                {[
                  { name: "organizationName", label: "Organization Name" },
                  { name: "subtitlename", label: "Sub Organization Name" },
                  { name: "address", label: "Address" },
                  { name: "city", label: "City" },
                  { name: "state", label: "State" },
                  { name: "country", label: "Country" },
                  { name: "pinCode", label: "Pin Code" },
                  { name: "phone", label: "Phone" },
                  { name: "fax", label: "Fax" },
                  { name: "email", label: "Email" },
                ].map((field) => (
                  <Grid item xs={12} sm={3} md={3} lg={3} key={field.name}>
                    <Typography variant="h6">{field.label}</Typography>
                    {field.name === "organizationName" ? (
                      // Display organizationName as text instead of an input
                      <Typography variant="body1">
                        {formData[field.name]}
                      </Typography>
                    ) : (
                      <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        disabled={isEditOrganization} // Disable fields when editing
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            mt={2}
            display={"flex"}
            justifyContent={"end"}
            gap={1}
          >
            <Box>
              {isEditOrganization ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "blue",
                    "&:hover": { backgroundColor: "darkblue" },
                    fontSize: "16px",
                    width: "150px",
                  }}
                  onClick={() => setIsEditOrganization(false)}
                  disabled={loading}
                >
                  {loading ? "UPDATING..." : "UPDATE"}
                </Button>
              ) : (
                <div style={{ display: "flex", gap: "2rem" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      "&:hover": { backgroundColor: "darkgreen" },
                      fontSize: "16px",
                      width: "150px",
                    }}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "SAVING..." : "SAVE"}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      "&:hover": { backgroundColor: "darkred" },
                      fontSize: "16px",
                      width: "150px",
                    }}
                    onClick={handleCancel}
                  >
                    CANCEL
                  </Button>
                </div>
              )}
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
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateDepartment}
                  size="small"
                  sx={{
                    backgroundColor: "green",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                >
                  {isEditing ? "UPDATE" : "ADD"}{" "}
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
                            <StyledTableCell>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <span>
                                  {index + 1}. {departmentName}
                                </span>
                                <Box display="flex">
                                  <IconButton
                                    sx={{
                                      color: "red",
                                      "&:hover": { color: "darkred" },
                                      marginRight: "8px",
                                    }}
                                    onClick={() =>
                                      handleDeleteDepartment(departmentName)
                                    }
                                  >
                                    <DeleteForeverIcon fontSize="medium" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleEditClick(index)}
                                  >
                                    {" "}
                                    <EditIcon fontSize="medium" />
                                  </IconButton>{" "}
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
              <Typography variant="h5">Add Position</Typography>
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
                    backgroundColor: isEditingPosition ? "blue" : "green",
                    "&:hover": {
                      backgroundColor: isEditingPosition
                        ? "darkblue"
                        : "darkgreen",
                    },
                  }}
                >
                  {isEditingPosition ? "Update" : "Add"}
                </Button>
              </Box>

              {/* Position Table */}
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
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "15%" }}
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
                            <StyledTableCell component="th" scope="row">
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <span>
                                  {index + 1}. {row.departmentName}
                                </span>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.positions.length > 0
                                ? row.positions.map((position, posIndex) => (
                                    <div
                                      key={posIndex}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      {posIndex + 1}. {position}
                                      <Box display="flex">
                                        <IconButton
                                          aria-label="edit"
                                          size="small"
                                          sx={{
                                            color: "darkblue",
                                            "&:hover": { color: "black" },
                                          }}
                                          onClick={() =>
                                            handleEditPosition(
                                              row.departmentName,
                                              position
                                            )
                                          }
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                          aria-label="delete"
                                          size="small"
                                          sx={{
                                            color: "red",
                                            "&:hover": { color: "darkred" },
                                            marginRight: "8px",
                                          }}
                                          onClick={() =>
                                            handleDeletePosition(
                                              row.departmentName,
                                              position
                                            )
                                          }
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Box>
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
                    backgroundColor: isEditMode ? "orange" : "green",
                    "&:hover": {
                      backgroundColor: isEditMode ? "darkorange" : "darkgreen",
                    },
                  }}
                >
                  {isEditMode ? "Update" : "Add"}
                         
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
                      {approvalChainLoading ? (
                        <TableRow>
                          <StyledTableCell colSpan={4}>
                            Loading...
                          </StyledTableCell>
                        </TableRow>
                      ) : approvalChainRows && approvalChainRows.length > 0 ? (
                        approvalChainRows.map((row, index) => (
                          <React.Fragment key={index}>
                            {row.approvalChains?.map((chain, chainIndex) => (
                              <StyledTableRow key={`${index}-${chainIndex}`}>
                                {/* Render departmentName only for the first row of each department */}
                                {chainIndex === 0 && (
                                  <StyledTableCell
                                    component="th"
                                    rowSpan={row.approvalChains.length}
                                  >
                                    {index + 1}. {row.departmentName}
                                  </StyledTableCell>
                                )}
                                <StyledTableCell>
                                  {chainIndex + 1}. {chain.action || "N/A"}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {chainIndex + 1}. {chain.level1 || "N/A"}
                                </StyledTableCell>
                                <StyledTableCell
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {chainIndex + 1}. {chain.level2 || "N/A"}
                                  <Box display="flex" ml={2}>
                                    {/* Use a single space for the edit and delete buttons */}
                                    <IconButton
                                      onClick={() =>
                                        handleApprovalChainEdit(
                                          index,
                                          chainIndex
                                        )
                                      }
                                    >
                                      <EditIcon fontSize="medium" />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteApprovalChain(
                                          index,
                                          chainIndex
                                        )
                                      }
                                      sx={{
                                        color: "red",
                                        "&:hover": { color: "darkred" },
                                        marginRight: "8px",
                                      }}
                                    >
                                      <DeleteForeverIcon fontSize="medium" />
                                    </IconButton>
                                  </Box>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </React.Fragment>
                        ))
                      ) : (
                        <TableRow>
                          <StyledTableCell colSpan={4}>
                            No Approval Chain Available
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
