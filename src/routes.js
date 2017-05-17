import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TimetrackerList from './Timetracker/List';

const Routes = () => (
  <Router>
    <div>
      <Route path="/timetracker" component={ TimetrackerList } />
    </div>
  </Router>
);

export default Routes;
