import React from 'react'
import PageContainer from '../../../components/HOC/PageContainer'
import { Button, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import GeoIcon from '@mui/icons-material/Place';
import { Textarea } from '@mui/joy';


function Virtual() {
  return (
    <div>
      <Grid container gap={1}>
        <Box display='flex'>
          <IconButton>
            <GeoIcon sx={{ fontSize: 35, color:"red" }} />
          </IconButton>
          <Typography mt={1} variant='h4'>Geo-Location </Typography>
        </Box>
        <Grid container spacing={3} pt={1} justifyContent={'space-between'} >
          <Grid item xs={12} sm={8} md={6} lg={3} mt={1}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mr: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <Button variant="text" size='medium' ><SearchIcon /></Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={3} mr={2}>
            <Box >
              <Textarea
                placeholder='Location Address'
                rows={2}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container textAlign={'center'} mt={2} display={'block'}>
          <Grid item md={12} border={"1px solid black"}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14320.173463053277!2d77.44117713469225!3d28.679632098106314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bc3b6220c5%3A0x80c87fb76576da30!2sRDC%2C%20Sector%2015%2C%20Sector%2010%2C%20Raj%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1723781951900!5m2!1sen!2sin"
              style={{ border: 0 ,width:"100%",height:"70vh" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </Grid>

        </Grid>
      </Grid>


    </div>
  )
}

export default Virtual