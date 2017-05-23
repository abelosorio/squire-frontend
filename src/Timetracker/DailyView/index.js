import React, { Component } from 'react';
import { List, ListItem, Divider } from 'material-ui';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinner-material';

import query from '../../queries/getWorkEntries';

class DailyView extends Component {
  renderEntries(workEntries) {
    return workEntries.map(({ id, client, project, worked_hours: workedHours }) => ((
      <div key={ id }>
        <ListItem
          primaryText={
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <span>{ client }</span>
              <span>{ workedHours } hs</span>
            </div>
          }
          secondaryText={ project }
        />
        <Divider />
      </div>
    )));
  }

  render() {
    const { loading, error, work_entries: workEntries } = this.props.data;

    if (loading || !workEntries) {
      return <Spinner spinnerColor={ '#333' } show={ true }/>;
    }

    if (error) {
      return <div>{ error }</div>;
    }

    return (
      <div>
        <h2>Entries of May, 20</h2>
        <div>
          <List>
            { this.renderEntries(workEntries) }
          </List>
        </div>
      </div>
    );
  }
}

export default graphql(query)(DailyView);
