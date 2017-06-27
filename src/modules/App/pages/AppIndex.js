import React from 'react';
import { Grid } from 'react-flexbox-grid';

import './AppIndex.css';

import AppRoutes from '../AppRoutes';
import NavigationBar from '../components/NavigationBar';

function AppIndex() {
  return (
    <div className="app-index">
      <NavigationBar />
      <Grid>
        <AppRoutes />
      </Grid>
    </div>
  );
}

export default AppIndex;
