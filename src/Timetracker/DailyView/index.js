import React, { Component } from 'react';
import { List, ListItem, Divider } from 'material-ui';
import { grey800 } from 'material-ui/styles/colors';

class DailyView extends Component {
  renderEntries() {
    const fakeEntries = [
      { id: 1, client: 'Client 1', project: 'Project 1', workedHours: '2hs' },
      { id: 2, client: 'Client 1', project: 'Project 2', workedHours: '2hs' },
      { id: 3, client: 'Client 2', project: 'Project A', workedHours: '2hs' },
      { id: 4, client: 'Client 2', project: 'Project B', workedHours: '2hs' }
    ];

    return fakeEntries.map(({ id, client, project, workedHours }) => ((
      <div key={ id }>
        <ListItem
          primaryText={
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <span>{ client }</span>
              <span>{ workedHours }</span>
            </div>
          }
          secondaryText={ project }
        />
        <Divider />
      </div>
    )));
  }

  render() {
    return (
      <div>
        <h2>Entries of May, 20</h2>
        <div>
          <List>
            { this.renderEntries() }
          </List>
        </div>
      </div>
    );
  }
}

export default DailyView;
