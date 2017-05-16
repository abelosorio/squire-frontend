import React, { Component } from 'react';

class Timetracker extends Component {
  render() {
    return (
      <div>
        <h1>Timetracker</h1>
        { this.props.children }
      </div>
    );
  }
}

export default Timetracker;
