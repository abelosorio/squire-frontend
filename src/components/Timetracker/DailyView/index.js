import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-spinner-material';
import { Snackbar } from 'material-ui';

import EntryCreationForm from './EntryCreationForm';
import WorkEntriesList from './WorkEntriesList';

// Mutations and query
import query from '../../../queries/getWorkEntries';
import createWorkEntry from '../../../mutations/createWorkEntry';
import updateWorkEntry from '../../../mutations/updateWorkEntry';
import deleteWorkEntry from '../../../mutations/deleteWorkEntry';

class DailyView extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_ENTRY_FORM_TITLE = 'Create work entry';

    this.state = {
      selected: undefined,
      selectedIndex: -1,
      showSnackbar: false,
      snackbarMessage: '',
      // @todo
      entryDate: '2017-06-24',
      entryFormTitle: this.DEFAULT_ENTRY_FORM_TITLE
    };
  }

  handleItemSelection(index) {
    this.setState({
      selectedIndex: index,
      selected: this.props.data.work_entries[index],
      entryFormTitle: 'Update work entry'
    });
  }

  /**
   * This function is reponsible for create or update a Work Entry.
   *
   * @param {WorkEntry} workEntry
   */
  handleCreateOrUpdate(workEntry) {
    const { client, project, workedHours: worked_hours } = workEntry;
    const { entryDate: entry_date, selected} = this.state;

    let functionToCall;
    let variables = { input: { entry_date, client, project, worked_hours } };
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

    functionToCall({ variables, refetchQueries: [{ query }] })
      .then(() => {
        this.resetForm();
        this.setState({ showSnackbar: true, snackbarMessage });
      })
      .catch(this.handleOperationFailed);
  }

  /**
   * This function will delete an existent Work Entry.
   *
   * @param {int} entryId
   */
  handleDelete(entryId) {
    this.props.deleteWorkEntry({
      variables: { id: entryId },
      refetchQueries: [{ query }]
    }).then(() => {
      this.resetForm();
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Entry delete successfuly'
      });
    }).catch(this.handleOperationFailed);
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
    alert(error);
  }

  render() {
    const { loading, error, work_entries: workEntries } = this.props.data;
    const {
      selected,
      selectedIndex,
      showSnackbar,
      snackbarMessage,
      entryDate,
      entryFormTitle
    } = this.state;

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
          <EntryCreationForm
            entryDate={ entryDate }
            selected={ selected }
            handleCancelOperation={ this.handleCancelOperation.bind(this) }
            handleCreateOrUpdate={ this.handleCreateOrUpdate.bind(this) }
            title={ entryFormTitle }
          />
        </div>

        <br />

        <WorkEntriesList
          entries={ workEntries }
          selectedIndex={ selectedIndex }
          handleItemSelection={ this.handleItemSelection.bind(this) }
          handleCancelOperation={ this.handleCancelOperation.bind(this) }
          handleDelete={ this.handleDelete.bind(this) }
        />

        <Snackbar
          className="snackbar"
          open={ showSnackbar }
          message={ snackbarMessage }
          autoHideDuration={ 4000 }
          onRequestClose={ () => this.setState({ showSnackbar: false }) }
        />
      </div>
    );
  }
}

export default compose(
  graphql(createWorkEntry, { name: 'createWorkEntry' }),
  graphql(updateWorkEntry, { name: 'updateWorkEntry' }),
  graphql(deleteWorkEntry, { name: 'deleteWorkEntry' }),
  graphql(query)
)(DailyView);
