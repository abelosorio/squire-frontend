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
import { graphql } from 'react-apollo';

import query from '../../queries/getWorkEntries';

class List extends Component {
  renderWorkEntries(workEntries) {
    return workEntries.map(({ id, client, project, worked_hours }) => {
      return (
        <TableRow key={ id }>
          <TableRowColumn>{ client }</TableRowColumn>
          <TableRowColumn>{ project }</TableRowColumn>
          <TableRowColumn>{ worked_hours }</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { loading, error, data } = this.props;

    if (error) {
      return <div>Error: { error }</div>;
    }

    if (loading || !data.work_entries) {
      return <div>Loading...</div>;
    }

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
            { this.renderWorkEntries(data.work_entries) }
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

export default graphql(query)(List);
