import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import AppComponent from '../../components/App';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <AppComponent />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
