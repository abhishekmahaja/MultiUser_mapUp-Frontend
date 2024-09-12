import React from 'react'
import PageContainer from '../../../components/HOC/PageContainer'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Input from '@mui/joy/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import well from '/assets/WELL.png'
import Chart from 'react-apexcharts';
import { Box } from '@mui/system';
// import { BarChart } from '@mui/x-charts/BarChart';

// --------------------------Table for Moblie-----------------------
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
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
  "Last Update": "74.0060 W",
  "Alarm": "74.0060 W",
};

let Tata = {
  "Well No": "1",
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
  "Last Update": "74.0060 W",
  "Alarm": "74.0060 W",
};

let Mata = {
  "Well No": "1",
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
  "Last Update": "74.0060 W",
  "Alarm": "74.0060 W",
};

let Sata = {
  "Well No": "1",
  "GIP(kg)": "New York",
  "CHP(kg)": "01/01/2021",
  "THP(kg)": "40.7128 N",
  "Battery%": "74.0060 W",
  "Solar power(V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
  "Last Update": "74.0060 W",
  "Alarm": "74.0060 W",
};


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
  createData('6'),
  createData('7'),
  createData('8'),
  createData('9'),
  createData('10'),
];


function Monitor() {
  const [age, setAge] = React.useState('');
  const [parameter, setParameter] = React.useState('');
  const [installation, setInstallation] = React.useState('');
  const [number, setNumber] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeParameter = (event) => {
    setParameter(event.target.value);
  };

  const handleChangeInstallation = (event) => {
    setInstallation(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };


  return (
    <div>
      {/* ------------------------Img and Content-------------------------------------- */}
      <Grid container>
        <Grid item display={'flex'} lg={4} md={8} sm={12} xs={12}>
          <Box sx={{ height: '50px', width: '50px' }}>
            <img src={well} alt='img' height={'50px'} width={'50px'} />
          </Box>
          <Box pt={1}>
            <Typography variant='h4'>Well Monitor</Typography>
          </Box>
        </Grid>
      </Grid>
      {/* ------------------------Inputs------------------------------------------------ */}
      <Grid container spacing={3} pt={3} >
        <Grid item xs={12} sm={8} md={6} lg={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-large-label">Well Location</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-large"
              value={age}
              label="Well Location"
              onChange={handleChange}
            >
              <MenuItem value={10}>UP</MenuItem>
              <MenuItem value={20}>MP</MenuItem>
              <MenuItem value={30}>WB</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-large-label">Well Installation</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-large"
              value={installation}
              label="Well  Installation"
              onChange={handleChangeInstallation}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>UP</MenuItem>
              <MenuItem value={20}>MP</MenuItem>
              <MenuItem value={30}>WB</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={3}>
          <FormControl fullWidth size="small" >
            <InputLabel id="demo-select-large-label">Well Number</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-large"
              value={number}
              label="Well Number"
              onChange={handleChangeNumber}
            >

              <MenuItem value={10}>UP</MenuItem>
              <MenuItem value={20}>MP</MenuItem>
              <MenuItem value={30}>WB</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-large-label">Parameter</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-large"
              value={parameter}
              label="Well Location"
              onChange={handleChangeParameter}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={1}>Low Battery</MenuItem>
              <MenuItem value={2}>Low Solar Power</MenuItem>
              <MenuItem value={3}>Network Error</MenuItem>
              <MenuItem value={4}>Flowing Wells</MenuItem>
              <MenuItem value={5}>Non Flowing Wells</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* ------------------------Button------------------------------------------------ */}
      <Grid container display={'flex'} justifyContent={'end'} >
        <Grid item lg={1.3} md={4} sm={8} xs={12} paddingTop={3} paddingBottom={1.4}>
          <Button variant='contained'
            sx={{
              backgroundColor: 'green',   // Change button color to green
              '&:hover': {
                backgroundColor: 'darkgreen', // Optional: Change color on hover
              },
              fontSize: '16px',

            }} fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* -----------------Table for Desktop----------------------------------- */}
      <Grid container mt={2} md={12}
        lg={12}
        sm={5}
        xs={4}
        sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead >
              <TableRow  >
                <StyledTableCell sx={{ fontSize: '18px' }}>Well No.</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">GIP (kg)</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">CHP (kg)</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">THP (kg)</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">Battery %</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">Solar Power (V)</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">Communication </StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">Flow Status</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">Last Update</StyledTableCell>
                <StyledTableCell sx={{ fontSize: '18px' }} align="left">Alarm</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* --------------------Table for Moblie--------------------------------- */}

      <Grid container md={12}
        lg={12}
        sm={12}
        xs={12}
        sx={{ display: { sm: "block", xs: "block", md: "none", lg: "none" } }}>
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600 }}>
          <Grid container mt={2} direction="column">
            {Object.keys(data).map((header, index) => (
              <Grid container key={index}>
                {/* Header Section */}
                <StyledGridItem item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={6}>
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
                <StyledGridItem item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={6}>
                  <Typography variant="body1">{Tata[header]}</Typography>
                </StyledContent>
              </Grid>
            ))}
          </Grid>
          {/* ----------------------Dreak---------------------------------- */}
          <Grid container mt={2} direction="column">
            {Object.keys(Mata).map((header, index) => (
              <Grid container key={index}>
                {/* Header Section */}
                <StyledGridItem item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={6}>
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
                <StyledGridItem item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={6}>
                  <Typography variant="body1">{Sata[header]}</Typography>
                </StyledContent>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </div >
  )
}

export default Monitor
