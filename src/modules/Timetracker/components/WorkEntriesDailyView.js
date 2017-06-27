import React from 'react';
import { Snackbar } from 'material-ui';

import WorkEntryCreationForm from './WorkEntryCreationForm';
import WorkEntriesDailyList from './WorkEntriesDailyList';

function WorkEntriesDailyView(props) {
  const {
    selected,
    handleCancelOperation,
    handleCreateOrUpdate,
    handleItemSelection,
    handleDelete,
    handleRequestCloseSnackbar,
    entryFormTitle,
    showSnackbar,
    snackbarMessage,
    workEntries,
    showWorkEntryForm,
    date,
    clients,
    loadingClients
  } = props;

  return (
    <div className="daily-view">
      <h2>Entries of { date }</h2>

      <WorkEntryCreationForm
        title={ entryFormTitle }
        expanded={ showWorkEntryForm }
        selected={ selected }
        handleCancelOperation={ handleCancelOperation }
        handleCreateOrUpdate={ handleCreateOrUpdate }
        entryFormTitle={ entryFormTitle }
        showWorkEntryForm={ showWorkEntryForm }
        clients={ clients }
        loadingClients={ loadingClients }
      />

      <br />

      <WorkEntriesDailyList
        entries={ workEntries }
        handleItemSelection={ handleItemSelection }
        handleCancelOperation={ handleCancelOperation }
        handleDelete={ handleDelete }
        workEntries={ workEntries }
      />

      <Snackbar
        open={ showSnackbar }
        message={ snackbarMessage }
        autoHideDuration={ 4000 }
        onRequestClose={ handleRequestCloseSnackbar }
      />
    </div>
  );
}

export default WorkEntriesDailyView;
