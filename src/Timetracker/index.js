import React, { Component } from 'react';

class Timetracker extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default Timetracker;
