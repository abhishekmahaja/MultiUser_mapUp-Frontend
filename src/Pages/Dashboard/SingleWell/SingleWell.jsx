import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Paper,
  Divider,
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1'),
  createData('2'),
  createData('3'),
  createData('4'),
  createData('5'),
  createData('3'),
  createData('4'),
  createData('5'),
  createData('3'),
  createData('4'),
  createData('5'),
];

function SingleWell() {
  const images = [
    { src: "assets/custom-textfieldWELL.png", name: "Well" },
    { src: "assets/custom-textfieldWELL.png", name: "Well" },
    { src: "assets/custom-textfieldWELL.png", name: "Well" },
    { src: "assets/custom-textfieldPRESSURE.png", name: "pressure" },
    { src: "assets/custom-textfieldSOLAR1.png", name: "solar" },
    { src: "assets/custom-textfieldbattery.png", name: "battery" },
    { src: "assets/custom-textfieldNetwork.png", name: "network" },
    { src: "assets/custom-textfieldNetwork.png", name: "network" },
  ];

  const lineChartOptions = {
    chart: {
      type: "line",
    },
    stroke: {
      width: 2, // Adjust the width here
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const lineChartSeries = [
    {
      name: "Sales",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <>
    {/* -------------Icon-------------------------- */}
      <Grid container>
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {images.map((text, index) => (
            <Grid item key={index} lg={1} md={2} sm={3} xs={6}>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <img
                    height={"60px"}
                    width={"60px"}
                    border="2px solid black"
                    src={text.src}
                    alt={text.name}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ textDecoration: "none" }}
                />
              </ListItem>
            </Grid>
          ))}
        </List>
      </Grid>
{/* /--------------------------Map and Input---------------------------- */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6} lg={6} >
          <Typography variant="h4">Physical Details</Typography>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Well Number</Typography>
              <TextField variant="outlined" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Well Location</Typography>
              <TextField variant="outlined" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Well Installation</Typography>
              <TextField variant="outlined" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Geolocation Latitude</Typography>
              <TextField variant="outlined" fullWidth value={""} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6">Geolocation Longitude</Typography>
              <TextField variant="outlined" fullWidth value={""} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14320.173463053277!2d77.44117713469225!3d28.679632098106314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bc3b6220c5%3A0x80c87fb76576da30!2sRDC%2C%20Sector%2015%2C%20Sector%2010%2C%20Raj%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1723781951900!5m2!1sen!2sin"
              width="100%"
              height="500"
              
              style={{ border: 0, }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </Grid>
      </Grid>
{/* ------------------------Table--------------------------------- */}
      <Grid
        container
        sx={{
          border: "1px solid black",
          height: "440px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow  >
                                <StyledTableCell>Well Number</StyledTableCell>
                                <StyledTableCell align="left">Well Location</StyledTableCell>
                                <StyledTableCell align="left">Well Installation</StyledTableCell>
                                <StyledTableCell align="left">Latitude</StyledTableCell>
                                <StyledTableCell align="left">Longitude</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">1</StyledTableCell>
                  <StyledTableCell align="left">5/6/2024</StyledTableCell>
                  <StyledTableCell align="left">gbz</StyledTableCell>
                  <StyledTableCell align="left">yes</StyledTableCell>
                  {/* <StyledTableCell align="left">1</StyledTableCell> */}

        {/* </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
      </Grid>
    </>
  );
}

export default SingleWell;
