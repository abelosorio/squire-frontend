import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-spinner-material';

// Mutations and query
import getWorkEntries from '../../queries/getWorkEntries';
import getClients from '../../queries/getClients';
import createWorkEntry from '../../mutations/createWorkEntry';
import updateWorkEntry from '../../mutations/updateWorkEntry';
import deleteWorkEntry from '../../mutations/deleteWorkEntry';

import WorkEntriesDailyView from '../../components/WorkEntriesDailyView';

class TimetrackerDaily extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_ENTRY_FORM_TITLE = 'Create work entry';

    this.state = {
      selected: undefined,
      selectedIndex: -1,
      showSnackbar: false,
      snackbarMessage: '',
      // @todo
      date: '2017-06-24',
      entryFormTitle: this.DEFAULT_ENTRY_FORM_TITLE
    };
  }

  handleItemSelection(index) {
    this.setState({
      selectedIndex: index,
      selected: this.props.getWorkEntries.work_entries[index],
      entryFormTitle: 'Update work entry'
    });
  }

  /**
   * This function is reponsible for create or update a Work Entry.
   *
   * @param {WorkEntry} workEntry
   */
  handleCreateOrUpdate(workEntry) {
    const {
      clientId: client_id,
      project,
      workedHours: worked_hours
    } = workEntry;
    const { date: entry_date, selected} = this.state;

    let functionToCall;
    let variables = { input: {
      entry_date,
      client_id: client_id * 1,
      project,
      worked_hours
    } };
    let snackbarMessage;

    if (selected) {
      // Update work entry
      functionToCall = this.props.updateWorkEntry;
      variables.id = selected.id * 1;

      snackbarMessage = 'Entry updated successfuly';
    } else {
      // Create work entry
      functionToCall = this.props.createWorkEntry;

      snackbarMessage = 'Entry created successfuly';
    }

    functionToCall({ variables, refetchQueries: ['getWorkEntries'] })
      .then(() => {
        this.resetForm();
        this.setState({ showSnackbar: true, snackbarMessage });
      })
      .catch(this.handleOperationFailed.bind(this));
  }

  /**
   * This function will delete an existent Work Entry.
   *
   * @param {int} entryId
   */
  handleDelete(entryId) {
    this.props.deleteWorkEntry({
      variables: { id: entryId },
      refetchQueries: ['getWorkEntries']
    }).then(() => {
      this.resetForm();
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Entry delete successfuly'
      });
    }).catch(this.handleOperationFailed.bind(this));
  }

  handleCancelOperation() {
    this.resetForm();
  }

  resetForm() {
    this.setState({
      selected: undefined,
      selectedIndex: -1,
      entryFormTitle: this.DEFAULT_ENTRY_FORM_TITLE
    });
  }

  handleOperationFailed(error) {
    this.setState({
      showSnackbar: true,
      snackbarMessage: error.message
    });
  }

  render() {
    const { loading, error, work_entries: workEntries } = this.props.getWorkEntries;
    const { loading: loadingClients, clients } = this.props.getClients;

    const {
      selected,
      showSnackbar,
      snackbarMessage,
      entryFormTitle,
      date
    } = this.state;

    if (loading || !workEntries) {
      return <Spinner spinnerColor={ '#333' } show={ true } />;
    }

    if (error) {
      return <div>{ error }</div>;
    }

    return (
      <WorkEntriesDailyView
        workEntries={ workEntries }
        showSnackbar={ showSnackbar }
        snackbarMessage={ snackbarMessage }
        handleItemSelection={ this.handleItemSelection.bind(this) }
        handleCreateOrUpdate={ this.handleCreateOrUpdate.bind(this) }
        handleDelete={ this.handleDelete.bind(this) }
        handleCancelOperation={ this.handleCancelOperation.bind(this) }
        entryFormTitle={ entryFormTitle }
        selected={ selected }
        date={ date }
        clients={ clients }
        loadingClients={ loadingClients }
      />
    );
  }
}

export default compose(
  graphql(createWorkEntry, { name: 'createWorkEntry' }),
  graphql(updateWorkEntry, { name: 'updateWorkEntry' }),
  graphql(deleteWorkEntry, { name: 'deleteWorkEntry' }),
  graphql(getWorkEntries, { name: 'getWorkEntries' }),
  graphql(getClients, { name: 'getClients' })
)(TimetrackerDaily);
