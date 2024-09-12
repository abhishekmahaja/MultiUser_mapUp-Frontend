import React from 'react'
import PageContainer from '../../../components/HOC/PageContainer'
import Index from '../index.jsx'
import { Button, Grid, TextField } from '@mui/material'
import Input from '@mui/joy/Input';
import { LocationOn } from '@mui/icons-material';



export default function Table() {

  return (
    <PageContainer>
     
      <Grid Container sx={{ display: 'flex', justifyContent: 'space-evenly' }} p={3}>
        <Grid item >
          <Input
            placeholder="Your location"
            startDecorator={
              <Button variant="soft" color="neutral" startDecorator={<LocationOn />}>
                Locate
              </Button>
            }
            sx={{ width: 300 }}
          />
        </Grid>
        <Grid item>
          <TextField label='Well Installtion' size='small'> </TextField>

        </Grid>
        <Grid item>
          <TextField label='Well Number' size='small'> </TextField>

        </Grid>
        <Grid item>
          <TextField label='Parameters' size='small'> </TextField>

        </Grid>

      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }} p={3}>
        <Grid item>
          <TextField label='Parameters' size='small'> </TextField>
        </Grid>
        <Grid item>
          <Input
            type="date" 
            slotProps={{
              input: {
                min: '2001-02-16',
                max: '2024-08-07',
              },
            }}
          />
        </Grid>
        <Grid item>
          <Input
            type="date"
           
            slotProps={{
              input: {
                min: '2001-02-16',
                max: '2024-08-10',
              },
            }}
          />
        </Grid>
        <Grid item>
          <TextField label='Resolution' size='small'> </TextField>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

