import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  TextField,
  FlatButton
} from 'material-ui';

import mutation from '../../mutations/createWorkEntry';
import query from '../../queries/getWorkEntries';

class EntryCreationForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      entryDate: props.entryDate,
      client: '',
      project: '',
      workedHours: '',
      expanded: false
    };

    this.state = this.initialState;
  }

  handleCardExpandChange(expanded) {
    this.setState({ expanded });
  }

  handleClientChange(event, client) {
    this.setState({ client });
  }

  handleProjectChange(event, project) {
    this.setState({ project });
  }

  handleWorkedHoursChange(event, workedHours) {
    this.setState({ workedHours: workedHours * 1 });
  }

  handleSaveTouchTap(event) {
    const {
      entryDate: entry_date,
      client,
      project,
      workedHours: worked_hours
    } = this.state;

    this.props.mutate({
      variables: {
        input: { entry_date, client, project, worked_hours }
      },
      refetchQueries: [{ query }]
    })
      .then(() => this.setState(this.initialState))
      .catch(error => console.error(error));
  }

  render() {
    const { client, project, workedHours, expanded } = this.state;

    return (
      <div className="entry-creation-form">
        <Card
          expanded={ expanded }
          onExpandChange={ this.handleCardExpandChange.bind(this) }
        >
          <CardHeader
            title="Create new entry"
            actAsExpander={ true }
            showExpandableButton={ true }
          />
          <CardText expandable={ true }>
            <TextField
              type="text"
              fullWidth={ true }
              hintText="Client"
              value={ client }
              onChange={ this.handleClientChange.bind(this) }
            />
            <TextField
              type="text"
              fullWidth={ true }
              hintText="Project"
              value={ project }
              onChange={ this.handleProjectChange.bind(this) }
            />
            <TextField
              type="number"
              fullWidth={ true }
              hintText="Worked hours"
              value={ workedHours }
              onChange={ this.handleWorkedHoursChange.bind(this) }
            />
          </CardText>
          <CardActions expandable={ true }>
            <FlatButton
              label="Save"
              primary={ true }
              onTouchTap={ this.handleSaveTouchTap.bind(this) }
            />
            <FlatButton
              label="Cancel"
              secondary={ true }
              onTouchTap={ (event) => this.setState({ expanded: false }) }
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default graphql(mutation)(EntryCreationForm);
