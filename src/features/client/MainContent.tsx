import { Grid, Typography } from '@mui/material';

export const MainContent = () => {
  return (
    <Grid container spacing={2} p={3}>
      <Grid>
        <Typography variant="h4">Landing Page</Typography>
        <Typography>Welcome to the education loan portal dashboard.</Typography>
      </Grid>
    </Grid>
  );
};