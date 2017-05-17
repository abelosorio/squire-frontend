import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import workEntries from './workEntries';

class List extends Component {
  renderWorkEntries() {
    return workEntries.map(({ id, client, project, workedHours }) => {
      return (
        <TableRow key={ id }>
          <TableRowColumn>{ client }</TableRowColumn>
          <TableRowColumn>{ project }</TableRowColumn>
          <TableRowColumn>{ workedHours }</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div>
        <DatePicker hintText="Select date" autoOk={ true } />

        <br />

        <Table>
          <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
            <TableRow>
              <TableHeaderColumn>Client</TableHeaderColumn>
              <TableHeaderColumn>Project</TableHeaderColumn>
              <TableHeaderColumn>Worked hours</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            { this.renderWorkEntries() }
          </TableBody>
        </Table>

        <br />

        <FloatingActionButton style={ { float: 'right' } }>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default List;
