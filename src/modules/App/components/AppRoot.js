import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import AppIndex from '../pages/AppIndex';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <AppIndex />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
