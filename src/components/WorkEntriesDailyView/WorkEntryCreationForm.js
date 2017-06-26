import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  TextField,
  FlatButton
} from 'material-ui';
import PropTypes from 'prop-types';

import ClientSelect from './ClientSelect';

class WorkEntryCreationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: undefined,
      project: undefined,
      workedHours: undefined,
      expanded: props.selected !== undefined
    };
  }

  componentWillReceiveProps({ selected }) {
    const { client = {}, project, worked_hours: workedHours } = selected || {};

    this.setState({
      expanded: selected !== undefined,
      clientId: client.id,
      project,
      workedHours
    });
  }

  handleCardExpandChange(expanded) {
    this.setState({ expanded });

    // Cancel operation when the Card is collapsed
    if (!expanded) this.props.handleCancelOperation();
  }

  handleSaveTouchTap() {
    const { clientId, project, workedHours, id } = this.state;

    this.props.handleCreateOrUpdate({ clientId, project, workedHours, id });
  }

  handleClientChange(event, index, clientId) {
    this.setState({ clientId });
  }

  handleProjectChange(event, project) {
    this.setState({ project });
  }

  handleWorkedHoursChange(event, workedHours) {
    this.setState({ workedHours: workedHours * 1 });
  }

  render() {
    const { title, clients, loadingClients } = this.props;
    const { clientId, project, workedHours, expanded } = this.state;

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
            <ClientSelect
              fullWidth={ true }
              hintText="Client"
              value={ clientId }
              onChange={ this.handleClientChange.bind(this) }
              clients={ clients }
              loading={ loadingClients }
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

WorkEntryCreationForm.propTypes = {
  selected: PropTypes.object,
  handleCancelOperation: PropTypes.func.isRequired,
  handleCreateOrUpdate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  clients: PropTypes.array.isRequired,
  loadingClients: PropTypes.bool.isRequired
};

export default WorkEntryCreationForm;
