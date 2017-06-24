import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import DailyView from './components/Timetracker/DailyView';
import ClientManager from './components/ClientManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar title="Squire" onTouchTap={ this.handleToggle } />
            <Drawer
              open={ this.state.open }
              docked={ false }
              onRequestChange={ (open) => this.setState({open}) }
            >
              <MenuItem onTouchTap={ this.handleClose }>
                <Link to="/">Back to home</Link>
              </MenuItem>
              <MenuItem onTouchTap={ this.handleClose }>
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
