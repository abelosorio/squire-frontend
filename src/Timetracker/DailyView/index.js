import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinner-material';

import EntryCreationForm from './EntryCreationForm';
import List from './List';
import query from '../../queries/getWorkEntries';

class DailyView extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: undefined };
  }

  onRowSelection(selected) {
    this.setState({ selected: this.props.data.work_entries[selected] });
  }

  render() {
    const { loading, error, work_entries: workEntries } = this.props.data;
    const { selected } = this.state;

    if (loading || !workEntries) {
      return <Spinner spinnerColor={ '#333' } show={ true } />;
    }

    if (error) {
      return <div>{ error }</div>;
    }

    return (
      <div className="daily-view">
        <h2>Entries of May, 20</h2>

        <div>
          { /* @todo Get real date */ }
          <EntryCreationForm entryDate="2017-06-01" selected={ selected } />
        </div>

        <br />

        <List
          entries={ workEntries }
          onRowSelection={ this.onRowSelection.bind(this) }
        />
      </div>
    );
  }
}

export default graphql(query)(DailyView);
