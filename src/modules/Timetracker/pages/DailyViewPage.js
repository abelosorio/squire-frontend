import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-spinner-material';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WorkEntriesDailyView from '../components/WorkEntriesDailyView';

// Mutations and query
import getWorkEntries from '../../../queries/getWorkEntries';
import getClients from '../../../queries/getClients';
import createWorkEntry from '../../../mutations/createWorkEntry';
import updateWorkEntry from '../../../mutations/updateWorkEntry';
import deleteWorkEntry from '../../../mutations/deleteWorkEntry';

// Reducer and Actions
import * as timetrackerSelectors from '../reducer';
import * as timetrackerActions from '../actions';
import * as clientsSelectors from '../../ClientManager/reducer';
import * as clientsActions from '../../ClientManager/actions';

const actions = { ...timetrackerActions, ...clientsActions };
const selectors = { ...timetrackerSelectors, ...clientsSelectors };

class DailyViewPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps === this.props) return;

    const { work_entries: workEntries } = nextProps.getWorkEntries;
    const { clients } = nextProps.getClients;

    // Update store when work entries are received
    if (workEntries !== this.props.workEntries) {
      this.props.receiveWorkEntries(workEntries);
    }

    // Update store when clients are received
    if (clients !== this.props.clients) {
      this.props.receiveClients(clients);
    }
  }

  handleItemSelection(index) {
    this.props.selectWorkEntry(this.props.workEntries[index]);
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

    if (selected) {
      // Update work entry
      functionToCall = this.props.updateWorkEntry;
      variables.id = selected.id * 1;
    } else {
      // Create work entry
      functionToCall = this.props.createWorkEntry;
    }

    functionToCall({ variables, refetchQueries: ['getWorkEntries'] })
      .then(() => this.resetForm())
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
    }).then(() => this.resetForm())
      .catch(this.handleOperationFailed.bind(this));
  }

  handleCancelOperation() {
    this.props.cancelWorkEntryCreationEdition();
  }

  handleOperationFailed(error) {
    // this.setState({
    //   showSnackbar: true,
    //   snackbarMessage: error.message
    // });
  }

  render() {
    const {
      isFetchingWorkEntries: loading,
      workEntries,
      isFetchingClients,
      clients,
      workEntrySelected,
      entryFormTitle,
      displayDate
    } = this.props;

    if (loading && !workEntries) {
      return <Spinner spinnerColor={ '#333' } show={ true } />;
    }

    return (
      <WorkEntriesDailyView
        workEntries={ workEntries }
        handleItemSelection={ this.handleItemSelection.bind(this) }
        handleCreateOrUpdate={ this.handleCreateOrUpdate.bind(this) }
        handleDelete={ this.handleDelete.bind(this) }
        handleCancelOperation={ this.handleCancelOperation.bind(this) }
        entryFormTitle={ entryFormTitle }
        selected={ workEntrySelected }
        date={ displayDate }
        clients={ clients }
        isFetchingClients={ isFetchingClients }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    // Timetracker selectors
    displayDate: selectors.displayDate(state),
    entryFormTitle: selectors.entryFormTitle(state),
    isFetchingWorkEntries: selectors.isFetchingWorkEntries(state),
    workEntries: selectors.workEntries(state),
    workEntrySelected: selectors.workEntrySelected(state),
    // Clients selectors
    clients: selectors.clients(state),
    isFetchingClients: selectors.isFetchingClients(state)
  };
};

const DailyViewPageWithGraphQL = compose(
  graphql(createWorkEntry, { name: 'createWorkEntry' }),
  graphql(updateWorkEntry, { name: 'updateWorkEntry' }),
  graphql(deleteWorkEntry, { name: 'deleteWorkEntry' }),
  graphql(getWorkEntries, { name: 'getWorkEntries' }),
  graphql(getClients, { name: 'getClients' })
)(DailyViewPage);

export default connect(mapStateToProps, actions)(DailyViewPageWithGraphQL);
