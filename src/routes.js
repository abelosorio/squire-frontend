import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';

import App from './App';

const Routes = () => (
  <Router history={ browserHistory }>
    <Switch>
      <Route exact path="/" component={ App } />
    </Switch>
  </Router>
);

export default Routes;
