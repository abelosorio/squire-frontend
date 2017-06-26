import React from 'react';
import { SelectField, MenuItem } from 'material-ui';

function ClientSelect(props) {
  const renderSelectItems = (clients) => {
    return clients.map(({ id, name }) => ((
      <MenuItem key={ id } value={ id } primaryText={ name } />
    )));
  };

  const { clients, loading, ...otherProps } = props;

  if (loading) {
    return (
      <SelectField disabled={ true }>
        <MenuItem primaryText="Loading..." />
      </SelectField>
    );
  }

  return (
    <SelectField { ...otherProps }>{ renderSelectItems(clients) }</SelectField>
  );
}

export default ClientSelect;
