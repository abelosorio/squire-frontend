import React, { Component } from 'react';
import { Paper } from 'material-ui';

class NoEntries extends Component {
  render() {
    return (
      <div className="no-entries">
        <Paper style={ { padding: '20px' } } children="No entries for today" />
      </div>
    );
  }
}

export default NoEntries;
