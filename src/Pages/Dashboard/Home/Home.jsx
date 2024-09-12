import React, { useState } from 'react'
import { Box, Button, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { Card } from '@mui/joy'

import well from '/assets/WELL.png'
import pressure from '/assets/PRESSURE.png'
import battery from '/assets/battery.png'
import solar from '/assets/SOLAR1.png'
import network from '/assets/Network.png'
// -------------import for table--------------------------------//
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { width } from '@mui/system'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
// ---------FUNCTIONS OF TABLE--------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '10px', // Increase padding
    height: '20px',  // Set a specific height
    fontSize: '16px', // Optionally adjust font size for header
    lineHeight: '1.5', // Adjust line height if needed
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
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  '.card-Content-text': {
    padding: '0 !important',
  }
}))


// -----------------------------Table for Moblie-------------------------------------


const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[100],
}));

const StyledContent = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'white',
}));

let data = {
  "Well No": "1",
  "Location": "New York",
  "Installation": "01/01/2021",
  "Latitude": "40.7128 N",
  "Longitude": "74.0060 W"
};

let Tata = {
  "Well No": "2",
  "Location": "Delhi",
  "Installation": "01/01/2021",
  "Latitude": "40.7128 N",
  "Longitude": "74.0060 W"
};

let Mata = {
  "Well No": "3",
  "Location": "UP",
  "Installation": "01/01/2021",
  "Latitude": "40.7128 N",
  "Longitude": "74.0060 W"
};

let Sata = {
  "Well No": "4",
  "Location": "MP",
  "Installation": "01/01/2021",
  "Latitude": "40.7128 N",
  "Longitude": "74.0060 W"
};


export default function BasicCard() {
  return (
    <Grid container gap={3}>
      <Grid container spacing={2}>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={well} alt="" />
              <Box fontSize='x-large'>2122</Box>
            </Box>
            <CardContent className='card-Content-text'>
              <Typography fontSize='large'>Total Wells</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={well} alt="" />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>Flowing Wells</Typography>
            </CardContent>
          </CardWrapper>

        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={well} alt="" />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>Non Flowing Wells</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={pressure} alt="" style={{ objectFit: 'cover', width: '7rem' }} />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>CHP-THP&lt;10KSc</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={pressure} alt="" style={{ objectFit: 'cover', width: '7rem' }} />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>Well THP=ABP</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12} >
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={battery} alt="" />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>Low Battery</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>


        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={solar} alt="" />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>Low Solar Power</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <CardWrapper>
            <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={network} alt="noImg" />
              <Box fontSize='x-large'>2122</Box>
            </Grid>
            <CardContent className='card-Content-text' >
              <Typography fontSize='large'>Network Error</Typography>
            </CardContent>
          </CardWrapper>
        </Grid>
      </Grid>
      {/* -------------------------Table for Moblie----------------------------- */}
      <Grid container sx={{ display: { sm: "block", xs: "block", md: "none", lg: "none" } }}>

        <Tabs>
          <TabList >
            <Tab style={{ whiteSpace: 'break-spaces' }}>
              <Typography fontSize={'large'}>Notification</Typography>
            </Tab>
            <Tab>
              <Typography fontSize={'large'}> Open Complaints</Typography>
            </Tab>
          </TabList>
          <TabPanel>
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 600 }}>
              <Grid container mt={2} direction="column">
                {Object.keys(data).map((header, index) => (
                  <Grid container key={index}>
                    {/* Header Section */}
                    <StyledGridItem item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
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
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
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
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
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
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
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
        <Grid item md={12}
          lg={12}
          sm={5}
          xs={4}
          sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}>
          <Tabs>
            <TabList >
              <Tab style={{ whiteSpace: 'break-spaces' }}>
                <Typography fontSize={'large'}>Current Notification</Typography>
              </Tab>
              <Tab>
                <Typography fontSize={'large'}> Open Complaints</Typography>
              </Tab>
            </TabList>
            <TabPanel >
              <TableContainer sx={{ border: "1px solid black" }} >
                <Table aria-label="customized table">
                  <TableHead >
                    <TableRow  >
                      <StyledTableCell>Notification No.</StyledTableCell>
                      <StyledTableCell align="left">Date/Time</StyledTableCell>
                      <StyledTableCell align="left">Well Location</StyledTableCell>
                      <StyledTableCell align="left">Well Installation</StyledTableCell>
                      <StyledTableCell align="left">Well number</StyledTableCell>
                      <StyledTableCell align="left">Alarm Type</StyledTableCell>
                      <StyledTableCell align="center">Description</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" sx={{ width: '10%' }} > Notification No.</StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '25%' }}>  </StyledTableCell>

                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>


            <TabPanel>
              <TableContainer sx={{ border: "1px solid black" }}>
                <Table aria-label="customized table">
                  <TableHead >
                    <TableRow>
                      <StyledTableCell>Complaint No.</StyledTableCell>
                      <StyledTableCell align="left">Data/Time</StyledTableCell>
                      <StyledTableCell align="left">Raiser Name</StyledTableCell>
                      <StyledTableCell align="left">Taker Name</StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="center">Description</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" sx={{ width: '10%' }}> Notification No.</StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '10%' }}></StyledTableCell>
                      <StyledTableCell sx={{ width: '25%' }}></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Tabs>
        </Grid>
      </Grid>
    </Grid >
  );
}
