import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

import EntryDeletionButton from './EntryDeletionButton';
import NoEntries from './NoEntries';

class List extends Component {
  renderEntries(workEntries) {
    const entriesCount = workEntries.length - 1;

    return workEntries.map((value, index) => {
      const { id, client, project, worked_hours: workedHours } = value;
      const isLastRow = index === entriesCount;

      return (
        <TableRow key={ id }>
          <TableRowColumn>{ client }</TableRowColumn>
          <TableRowColumn>{ project }</TableRowColumn>
          <TableRowColumn>{ workedHours }</TableRowColumn>
          <TableRowColumn style={ { overflow: 'visible' } }>
            <EntryDeletionButton isLastRow={ isLastRow } entryId={ id } />
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { entries, onRowSelection } = this.props;

    if (entries.length === 0) {
      return <NoEntries />;
    }

    return (
      <div className="daily-view-list">
        <Table onRowSelection={ onRowSelection }>
          <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
            <TableRow>
              <TableHeaderColumn>Client</TableHeaderColumn>
              <TableHeaderColumn>Project</TableHeaderColumn>
              <TableHeaderColumn>Worked hours</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false } showRowHover={ true }>
            { this.renderEntries(entries) }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default List;
