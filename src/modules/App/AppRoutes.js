import React from 'react';
import { Route } from 'react-router-dom';

import DailyViewPage from '../Timetracker/pages/DailyViewPage';
import ClientsManagerPage from '../ClientManager/pages/ClientsManagerPage';

function AppRoutes() {
  return (
    <div>
      <Route path="/daily-view" component={ DailyViewPage } />
      <Route path="/clients-manager" component={ ClientsManagerPage } />
    </div>
  );
}

export default AppRoutes;
