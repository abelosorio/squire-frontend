import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  TextField,
  FlatButton
} from 'material-ui';

class EntryCreationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: undefined,
      project: undefined,
      workedHours: undefined,
      expanded: props.selected !== undefined
    };
  }

  componentWillReceiveProps({ selected }) {
    const { client, project, worked_hours: workedHours } = selected || {};

    this.setState({
      expanded: selected !== undefined,
      client,
      project,
      workedHours
    });
  }

  handleCardExpandChange(expanded) {
    this.setState({ expanded });

    // Cancel operation when the Card is collapsed
    if (!expanded) this.props.handleCancelOperation();
  }

  handleSaveTouchTap(event) {
    const { client, project, workedHours, id } = this.state;

    this.props.handleCreateOrUpdate({ client, project, workedHours, id });
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

  render() {
    const { title } = this.props;
    const { client, project, workedHours, expanded } = this.state;

    return (
      <div className="entry-creation-form">
        <Card
          expanded={ expanded }
          onExpandChange={ this.handleCardExpandChange.bind(this) }
        >
          <CardHeader
            title={ title }
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
              onTouchTap={ this.props.handleCancelOperation }
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default EntryCreationForm;
