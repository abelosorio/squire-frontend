import React from 'react';
import { ListItem, Divider, IconButton, IconMenu } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';

import ClientDeletionButton from './ClientDeletionButton';

function ClientsListItem(props) {
  const { id, name } = props.client;
  const iconButtonElement = (
    <IconButton touch={ true } tooltip="more">
      <MoreVertIcon color={ grey400 } />
    </IconButton>
  );
  const rightIconMenu = (
    <IconMenu iconButtonElement={ iconButtonElement }>
      <ClientDeletionButton
        handleCancelOperation={ props.handleCancelOperation }
        handleClientDelete={ props.handleClientDelete }
        clientId={ id }
      />
    </IconMenu>
  );

  return (
    <div className="clients-list-item">
      <ListItem primaryText={ name } rightIconButton={ rightIconMenu } />
      <Divider />
    </div>
  );
}

export default ClientsListItem;
