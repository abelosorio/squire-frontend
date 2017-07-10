import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-spinner-material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Mutations and query
// import getWorkEntries from '../../../queries/getWorkEntries';
// import getClients from '../../../queries/getClients';
// import createWorkEntry from '../../../mutations/createWorkEntry';
// import updateWorkEntry from '../../../mutations/updateWorkEntry';
// import deleteWorkEntry from '../../../mutations/deleteWorkEntry';

// Reducer and Actions
import { getWorkEntries, isFetchingWorkEntries } from '../TimetrackerReducer';
import { fetchWorkEntries } from '../TimetrackerActions';

import WorkEntriesDailyView from '../components/WorkEntriesDailyView';

class DailyViewPage extends Component {
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

  componentDidMount() {
    this.props.dispatch(fetchWorkEntries());
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
    console.log('PROPS -->', this.props);
    const { isFetchingWorkEntries: loading, workEntries } = this.props;
    // const { loading: loadingClients, clients } = this.props.getClients;
    const { loading: loadingClients, clients } = {};

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

const mapStateToProps = state => {
  return {
    workEntries: getWorkEntries(state),
    isFetchingWorkEntries: isFetchingWorkEntries(state)
  };
};

// DailyViewPage.propTypes = {
//   getWorkEntries: PropTypes.object.isRequired,
//   getClients: PropTypes.object.isRequired,
//   createWorkEntry: PropTypes.func.isRequired,
//   updateWorkEntry: PropTypes.func.isRequired,
//   deleteWorkEntry: PropTypes.func.isRequired
// };
DailyViewPage.propTypes = {
  workEntries: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

DailyViewPage.need = [() => fetchWorkEntries()];

export default connect(mapStateToProps)(DailyViewPage);

// export default compose(
//   graphql(createWorkEntry, { name: 'createWorkEntry' }),
//   graphql(updateWorkEntry, { name: 'updateWorkEntry' }),
//   graphql(deleteWorkEntry, { name: 'deleteWorkEntry' }),
//   graphql(getWorkEntries, { name: 'getWorkEntries' }),
//   graphql(getClients, { name: 'getClients' })
// )(DailyViewPage);
