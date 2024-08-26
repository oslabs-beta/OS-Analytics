import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import BrowserPieChart from './BrowserPieChart.tsx';
import OSBarChart from './OSBarchart.tsx';
import ClicksLineChart from './ClicksLineChart.tsx';

const AnalyticsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        User Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Browser Distribution
            </Typography>
            <BrowserPieChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              OS Distribution
            </Typography>
            <OSBarChart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Click Activity Over Time
            </Typography>
            <ClicksLineChart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsPage;
