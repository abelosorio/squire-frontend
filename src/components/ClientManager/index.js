import React from 'react';

import ClientsList from './ClientsList';

function ClientManager(props) {
  return (
    <div className="client-manager">
      <ClientsList { ...props } />
    </div>
  );
}

export default ClientManager;
