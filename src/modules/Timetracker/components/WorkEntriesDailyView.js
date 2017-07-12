import React from 'react';

import WorkEntryCreationForm from './WorkEntryCreationForm';
import WorkEntriesDailyList from './WorkEntriesDailyList';

function WorkEntriesDailyView(props) {
  const {
    selected,
    handleCancelOperation,
    handleCreateOrUpdate,
    handleItemSelection,
    handleDelete,
    entryFormTitle,
    workEntries,
    showWorkEntryForm,
    date,
    clients,
    isFetchingClients
  } = props;

  return (
    <div className="daily-view">
      <h2>Entries of { date.toLocaleDateString() }</h2>

      <WorkEntryCreationForm
        title={ entryFormTitle }
        expanded={ showWorkEntryForm }
        selected={ selected }
        handleCancelOperation={ handleCancelOperation }
        handleCreateOrUpdate={ handleCreateOrUpdate }
        entryFormTitle={ entryFormTitle }
        showWorkEntryForm={ showWorkEntryForm }
        clients={ clients }
        isFetchingClients={ isFetchingClients }
      />

      <br />

      <WorkEntriesDailyList
        entries={ workEntries }
        handleItemSelection={ handleItemSelection }
        handleCancelOperation={ handleCancelOperation }
        handleDelete={ handleDelete }
        workEntries={ workEntries }
      />
    </div>
  );
}

export default WorkEntriesDailyView;
