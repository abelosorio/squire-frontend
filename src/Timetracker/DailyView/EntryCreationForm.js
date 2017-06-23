import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  TextField,
  FlatButton,
  Snackbar
} from 'material-ui';

import createWorkEntry from '../../mutations/createWorkEntry';
import updateWorkEntry from '../../mutations/updateWorkEntry';
import query from '../../queries/getWorkEntries';

class EntryCreationForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      entryDate: props.entryDate,
      client: '',
      project: '',
      workedHours: '',
      expanded: props.selectedIndex !== undefined,
      id: undefined,
      title: 'Add new entry'
    };

    this.state = {
      showSnackbar: false,
      snackbarMessage: undefined,
      ...this.initialState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
      return;
    }

    // Load the selected work entry
    const {
      entry_date: entryDate,
      client,
      project,
      worked_hours: workedHours,
      id
    } = nextProps.selected;

    this.setState({
      entryDate,
      client,
      project,
      workedHours,
      id,
      expanded: true,
      title: 'Update entry'
    });
  }

  handleCardExpandChange(expanded) {
    this.setState({ expanded });
    if (!expanded) {
      // Clear selected entry
      this.handleCancel();
    }
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
      workedHours: worked_hours,
      id
    } = this.state;

    let functionToCall;
    let variables = {
      input: { entry_date, client, project, worked_hours }
    };
    let snackbarMessage;

    if (id) {
      // Update work entry
      functionToCall = this.props.updateWorkEntry;
      variables.id = id * 1;

      snackbarMessage = 'Entry updated successfuly';
    } else {
      // Create work entry
      functionToCall = this.props.createWorkEntry;

      snackbarMessage = 'Entry created successfuly';
    }

    functionToCall({ variables, refetchQueries: [{ query }] })
      .then(() => {
        this.setState({ showSnackbar: true, snackbarMessage });
        this.resetForm();
      })
      .catch(error => console.error(error));
  }

  handleCancel() {
    this.resetForm();
  }

  handleRequestClose() {
    this.setState({ showSnackbar: false });
  }

  resetForm() {
    this.props.clearSelection();
    this.setState(this.initialState);
  }

  render() {
    const {
      client,
      project,
      workedHours,
      expanded,
      title,
      showSnackbar,
      snackbarMessage
    } = this.state;

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
              onTouchTap={ this.handleCancel.bind(this) }
            />
          </CardActions>
        </Card>
        <Snackbar
          className="snackbar"
          open={ showSnackbar }
          message={ snackbarMessage }
          autoHideDuration={ 4000 }
          onRequestClose={ this.handleRequestClose.bind(this) }
        />
      </div>
    );
  }
}

export default compose(
  graphql(createWorkEntry, { name: 'createWorkEntry' }),
  graphql(updateWorkEntry, { name: 'updateWorkEntry' })
)(EntryCreationForm);
