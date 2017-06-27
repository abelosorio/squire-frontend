import React from 'react';
import { Paper } from 'material-ui';

function NoEntries(props) {
  return (
    <div className="no-entries">
      <Paper style={ { padding: '20px' } } children="No entries for today" />
    </div>
  );
}

export default NoEntries;
