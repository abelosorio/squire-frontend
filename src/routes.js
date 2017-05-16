import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Timetracker from './Timetracker';
import EntryCreation from './Timetracker/EntryCreation';

const Routes = () => (
  <Router>
    <div>
      <Route path="/timetracker" component={ Timetracker } />
      <Route path="/timetracker/new" component={ EntryCreation } />
    </div>
  </Router>
);

export default Routes;
