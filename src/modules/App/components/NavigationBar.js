import React from 'react';
import { Drawer, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <Drawer>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/daily-view">Daily view</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/clients-manager">Clients</Link>
        </MenuItem>
      </Drawer>
    </div>
  );
}

export default NavigationBar;
