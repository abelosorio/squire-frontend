import React from 'react';
import { List, FloatingActionButton, Snackbar } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ClientsListItem from './ClientsListItem';

function ClientsList(props) {
  const {
    clients,
    handleOnAddTouchTap,
    showSnackbar,
    snackbarMessage,
    handleRequestCloseSnackbar,
    handleCancelOperation,
    handleClientDelete
  } = props;

  const renderClients = (clients, handleCancelOperation, handleClientDelete) => {
    return clients.map(client => ((
      <ClientsListItem
        key={ client.id }
        client={ client }
        handleCancelOperation={ handleCancelOperation }
        handleClientDelete={ handleClientDelete }
      />
    )));
  }

  return (
    <div className="clients-list">
      <h2>Clients List</h2>
      <List>
        { renderClients(clients, handleCancelOperation, handleClientDelete) }
      </List>
      <FloatingActionButton
        className="floating-bottom-right-button"
        onTouchTap={ handleOnAddTouchTap }
      >
        <ContentAdd />
      </FloatingActionButton>
      <Snackbar
        open={ showSnackbar }
        message={ snackbarMessage }
        autoHideDuration={ 4000 }
        onRequestClose={ handleRequestCloseSnackbar }
      />
    </div>
  );
}

export default ClientsList;
