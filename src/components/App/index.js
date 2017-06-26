import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Grid } from 'react-flexbox-grid';
import { Route, Link } from 'react-router-dom';

import './App.css';

import TimetrackerDailyView from '../../containers/TimetrackerDailyView';
import ClientsManager from '../../containers/ClientsManager';

function App() {
  return (
    <div>
      <Drawer>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/daily-view">Daily view</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/clients-manager">Clients</Link>
        </MenuItem>
      </Drawer>
      <Grid>
        <Route path="/daily-view" component={ TimetrackerDailyView } />
        <Route path="/clients-manager" component={ ClientsManager } />
      </Grid>
    </div>
  );
}

export default App;
