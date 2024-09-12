import React from "react";
import { Button,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
function AddDevice() {
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={5} direction="column">
        {/* ---------------MAC Address----------------- */}
        <Grid item lg={12} md={12} sm={12} xs={12} gap={1}>
          <Typography sx={{textWrap: 'nowrap'}}>MAC Address :</Typography>
          <Box display="flex" flexDirection="column" gap={3} alignItems="end">
              <TextField size="small" fullWidth/>
              <Button variant="contained">Read MAC</Button>
          </Box>
        </Grid>
        {/* -----------------------Select Well----------------- */}

        <Grid item gap={2} lg={12}>
          <Typography variant="h6">Select Well</Typography>
          <Box display="flex" justifyContent="space-between" gap={5}>
            <TextField size="small" placeholder="Well No." fullWidth />
            <TextField size="small" placeholder="Installation" fullWidth />
            <TextField size="small" placeholder="Location" fullWidth />
          </Box>
        </Grid>

        {/* -----------------------Publish Security Code----------------- */}

        <Grid item lg={12}>
          <Typography variant="h6">Publish Security Code</Typography>
          <Box display="flex" flexDirection="column" gap={3} alignItems="end">
            <TextField fullWidth size="small" />
            <Button variant="contained">Generate</Button>
          </Box>
        </Grid>
        {/* -----------------------Subscribe Security Code----------------- */}

        <Grid item lg={12}>
          <Typography variant="h6">Subscribe Security Code</Typography>
          <Box display="flex" flexDirection="column" gap={3} alignItems="end">
            <TextField fullWidth size="small" />
            <Button variant="contained">Generate</Button>
          </Box>
        </Grid>

        {/* -----------------------Parameters----------------- */}

        <Grid item gap={5} >
          <Typography variant="h6">Parameter</Typography>

          <Box display='flex' justifyContent='space-between' flexWrap="wrap">
            <FormControlLabel
              control={<Checkbox defaultChecked size="large" />}
              label="GIP"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked size="large" />}
              label="THP"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked size="large" />}
              label="Battery"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked size="large" />}
              label="Solar Power"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked size="large" />}
              label="Comunication"
            />{" "}
            <FormControlLabel
              control={<Checkbox defaultChecked size="large" />}
              label="Cpu temperature"
            />
          </Box>

          <Box display={"flex"} justifyContent={'end'}>
            <Button color="success" variant="contained">Submit</Button>
          </Box>

        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddDevice;
