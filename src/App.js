import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import DailyView from './components/Timetracker/DailyView';
import ClientManager from './components/ClientManager';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <Drawer>
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/daily-view">Daily view</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/client-manager">Clients</Link>
              </MenuItem>
            </Drawer>
            <Grid>
              <Route path="/daily-view" component={ DailyView } />
              <Route path="/client-manager" component={ ClientManager } />
            </Grid>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
