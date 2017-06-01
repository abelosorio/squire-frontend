import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  IconButton
} from 'material-ui';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinner-material';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import EntryCreationForm from './EntryCreationForm';
import query from '../../queries/getWorkEntries';

class DailyView extends Component {
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
            <IconButton
              tooltip="Delete"
              tooltipPosition={ isLastRow ? 'top-center' : 'bottom-center' }
            >
              <ActionDelete />
            </IconButton>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

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
          <EntryCreationForm />
        </div>

        <br />

        <div className="daily-view-list">
          <Table selectable={ false }>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
              <TableRow>
                <TableHeaderColumn>Client</TableHeaderColumn>
                <TableHeaderColumn>Project</TableHeaderColumn>
                <TableHeaderColumn>Worked hours</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
              { this.renderEntries(workEntries) }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default graphql(query)(DailyView);
