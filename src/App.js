import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Grid } from 'react-flexbox-grid';

import './App.css';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Squire" />
          <Grid>
            <Routes history={ browserHistory } />
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
