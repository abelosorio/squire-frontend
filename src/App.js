import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './App.css';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes history={ browserHistory } />
      </div>
    );
  }
}

export default App;
