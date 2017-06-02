import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinner-material';

import EntryCreationForm from './EntryCreationForm';
import List from './List';
import query from '../../queries/getWorkEntries';

class DailyView extends Component {
  render() {
    const { loading, error, work_entries: workEntries } = this.props.data;

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
          <EntryCreationForm entryDate="2017-06-01" />
        </div>

        <br />

        <List entries={ workEntries } />
      </div>
    );
  }
}

export default graphql(query)(DailyView);
