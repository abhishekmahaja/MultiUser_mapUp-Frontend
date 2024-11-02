import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";

export default function AppSk() {
  return (
    // <Box display='flex' flex={1} width="100%">
    <Grid container spacing={2} p={2}>
      <Grid item md={12}>
        <Stack>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Stack spacing={1}>
          {/* For variant="text", adjust th height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width="100%" height="50vh" />
        </Stack>
      </Grid>
      <Grid item md={12}>
        <Stack>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Stack>
      </Grid>
    </Grid>
    // </Box>
  );
}
