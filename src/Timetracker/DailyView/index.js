import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinner-material';

import EntryCreationForm from './EntryCreationForm';
import WorkEntriesList from './WorkEntriesList';
import query from '../../queries/getWorkEntries';

class DailyView extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: undefined, selectedIndex: -1 };
  }

  onItemSelection(selected) {
    this.setState({
      selectedIndex: selected,
      selected: this.props.data.work_entries[selected]
    });
  }

  clearSelection() {
    this.setState({ selected: undefined, selectedIndex: undefined });
  }

  render() {
    const { loading, error, work_entries: workEntries } = this.props.data;
    const { selected, selectedIndex } = this.state;

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
          {/* @todo Get real date */}
          <EntryCreationForm
            entryDate="2017-06-01"
            selected={ selected }
            clearSelection={ this.clearSelection.bind(this) }
          />
        </div>

        <br />

        <WorkEntriesList
          entries={ workEntries }
          selectedIndex={ selectedIndex }
          onItemSelection={ this.onItemSelection.bind(this) }
          clearSelection={ this.clearSelection.bind(this) }
        />
      </div>
    );
  }
}

export default graphql(query)(DailyView);
