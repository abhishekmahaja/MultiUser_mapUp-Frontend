import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/NotificationsActive";
import Brightness5Icon from "@mui/icons-material/Brightness5";

const data = [
  {
    employeeId: "01",
    NormalAlert: "",
    CriticalAlert: "",
    Condition: "",
    Description: "",
    Parameter: "GIP (kg/Cm²)",
    Condition1: "",
  },
  {
    employeeId: "02",
    NormalAlert: "",
    CriticalAlert: "",
    Condition: "",
    Description: "",
    Parameter: "CHP(kg/Cm²)",
    Condition1: "",
  },
  {
    employeeId: "03",
    NormalAlert: "",
    CriticalAlert: "",
    Condition: "",
    Description: "",
    Parameter: "THP(kg/Cm²)",
    Condition1: "",
  },
  {
    employeeId: "05",
    NormalAlert: "",
    CriticalAlert: "",
    Condition: "",
    Description: "",
    Parameter: "Battery Percentage",
    Condition1: "",
  },
  {
    employeeId: "05",
    NormalAlert: "",
    CriticalAlert: "",
    Condition: "",
    Description: "",
    Parameter: "Solar Voltage",
    Condition1: "",
  },
];

function AddWell() {
  const [employeeData, setEmployeeData] = useState(data);

  const onChangeInput = (e, employeeId) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    console.log("employeeId", employeeId);

    const editData = employeeData.map((item) =>
      item.employeeId === employeeId && name ? { ...item, [name]: value } : item
    );

    console.log("editData", editData);

    setEmployeeData(editData);
  };

  const [formValues, setFormValues] = useState({
    parameter1: "",
    parameter2: "",
    parameter3: "",
    parameter4: "",
    parameter5: "",
    parameter6: "",
    parameter7: "",
  });

  const handleChangeParameter = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
      <Paper>
        <Grid container>
          <IconButton>
            <Brightness5Icon sx={{ fontSize: "40px", color: "red" }} />
          </IconButton>
          <Typography variant="h4" mt={1}>
            Add New Well
          </Typography>
        </Grid>
        <Grid
          container
          p={1.7}
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <TextField
              fullWidth
              size="small"
              label="Location"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <TextField
              fullWidth
              size="small"
              label="Installation"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <TextField
              fullWidth
              size="small"
              label="Well Type"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <TextField
              fullWidth
              size="small"
              label="Well Number"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3} mt={1}>
            <TextField
              fullWidth
              size="small"
              label="Landmark"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3} mt={1}>
            <TextField
              fullWidth
              size="small"
              label="Latitude"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3} mt={1}>
            <TextField
              fullWidth
              size="small"
              label="Longitude"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3} mt={1}>
            <TextField
              fullWidth
              size="small"
              label="Node ID"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
        mt={1}
        p={1}
      >
        <Grid container>
          <IconButton>
            <NotificationsIcon sx={{ fontSize: "40px", color: "red" }} />
          </IconButton>
          <Typography variant="h4" mt={1}>
            Notification History
          </Typography>
        </Grid>
        <Grid item>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.5rem" }}>Parameter</TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }} align="center">
                  Normal Alert
                </TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }}>Condition</TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }} align="center">
                  Description
                </TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }} align="center">
                  Critical Alert
                </TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }}>Condition</TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }} align="center">
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData?.map(
                ({
                  employeeId,
                  Parameter,
                  NormalAlert,
                  CriticalAlert,
                  Condition,
                  Condition1,
                  Description,
                  Description1,
                }) => (
                  <TableRow key={employeeId}>
                    <TableCell>
                      <Typography>{Parameter}</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="NormalAlert"
                        value={NormalAlert}
                        onChange={(e) => onChangeInput(e, employeeId)}
                        variant="outlined"
                        size="small"
                        // style={{ width: '90px' }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <Select
                          labelId={`condition-label-${employeeId}`}
                          name="Condition1"
                          value={Condition1}
                          onChange={(e) => onChangeInput(e, employeeId)}
                          size="small"
                          // style={{ width: '90px' }}
                          fullWidth
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <TextField
                        name="Description"
                        value={Description}
                        onChange={(e) => onChangeInput(e, employeeId)}
                        variant="outlined"
                        size="small"
                        // style={{ width: '450px' }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="CriticalAlert"
                        value={CriticalAlert}
                        onChange={(e) => onChangeInput(e, employeeId)}
                        variant="outlined"
                        size="small"
                        // style={{ width: '90px' }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <Select
                          labelId={`condition-label-${employeeId}`}
                          name="Condition"
                          value={Condition}
                          onChange={(e) => onChangeInput(e, employeeId)}
                          size="small"
                          // style={{ width: '90px' }}
                          fullWidth
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="Description"
                        value={Description1}
                        onChange={(e) => onChangeInput(e, employeeId)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        // style={{ width: '350px' }}
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Grid>
        <Paper sx={{ mt: "1" }}>
          <Grid container spacing={0.8} p={2}>
            <Grid container display={"flex"} gap={2.5} p={2}>
              {/* Row 1: Flowing */}
              <Grid item lg={1}>
                <Typography mt={2}>Flowing</Typography>
              </Grid>
              <Grid item lg={9} display={"flex"} gap={3}>
                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <FormControl fullWidth size="small" variant="outlined">
                    <InputLabel id="pressure-label">Pressure</InputLabel>
                    <Select
                      labelId="pressure-label"
                      id="pressure-select"
                      name="parameter1"
                      value={formValues.parameter1}
                      onChange={handleChangeParameter}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={3}>GIP</MenuItem>
                      <MenuItem value={1}>THP</MenuItem>
                      <MenuItem value={2}>CHP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="pressure-label">comparison</InputLabel>
                    <Select
                      labelId="pressure-label"
                      id="pressure-select"
                      name="parameter3"
                      value={formValues.parameter3}
                      onChange={handleChangeParameter}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "20px" }}>
                        &gt;
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "20px" }}>
                        &lt;
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "20px" }}>
                        =
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="pressure-label">Pressure</InputLabel>
                    <Select
                      labelId="pressure-label"
                      id="pressure-select"
                      name="parameter2"
                      value={formValues.parameter2}
                      onChange={handleChangeParameter}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={1}>GIP</MenuItem>
                      <MenuItem value={2}>THP</MenuItem>
                      <MenuItem value={3}>CHP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <Typography>Tolerance(%)</Typography>
                  <TextField variant="outlined" size="small" fullWidth />
                </Grid>
              </Grid>
            </Grid>
            {/* Row 2: Not Flowing */}

            <Grid container display={"flex"} gap={2.5} p={2}>
              <Grid item lg={1}>
                <Typography mt={2}>Not Flowing</Typography>
              </Grid>
              <Grid item lg={9} display={"flex"} gap={3}>
                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="pressure-label">Pressure</InputLabel>
                    <Select
                      labelId="pressure-label"
                      id="pressure-select"
                      name="parameter4"
                      value={formValues.parameter4}
                      onChange={handleChangeParameter}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={1}>GIP</MenuItem>
                      <MenuItem value={2}>THP</MenuItem>
                      <MenuItem value={3}>CHP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="pressure-label">comparison</InputLabel>
                    <Select
                      labelId="pressure-label"
                      id="pressure-select"
                      name="parameter5"
                      value={formValues.parameter5}
                      onChange={handleChangeParameter}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={1} sx={{ fontSize: "20px" }}>
                        &gt;
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "20px" }}>
                        &lt;
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontSize: "20px" }}>
                        =
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="pressure-label">Pressure</InputLabel>
                    <Select
                      labelId="pressure-label"
                      id="pressure-select"
                      name="parameter6"
                      value={formValues.parameter6}
                      onChange={handleChangeParameter}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={1}>GIP</MenuItem>
                      <MenuItem value={2}>THP</MenuItem>
                      <MenuItem value={3}>CHP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <Typography>Tolerance(%)</Typography>
                  <TextField variant="outlined" size="small" fullWidth />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Grid
          item
          p={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          gap={2}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green", // Change button color to green
              "&:hover": {
                backgroundColor: "darkgreen", // Optional: Change color on hover
              },
              fontSize: "16px",
            }}
          >
            {" "}
            Add Well
          </Button>
          <Link to="/dashboard/wellmaster">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green", // Change button color to green
                "&:hover": {
                  backgroundColor: "darkgreen", // Optional: Change color on hover
                },
                fontSize: "16px",
              }}
            >
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddWell;
