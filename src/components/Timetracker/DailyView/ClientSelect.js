import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { graphql } from 'react-apollo';

import query from '../../../queries/getClients';

class ClientSelect extends Component {
  renderSelectItems(clients) {
    return clients.map(({ id, name }) => ((
      <MenuItem key={ id } value={ id } primaryText={ name } />
    )));
  }

  render() {
    const { clients, loading } = this.props.data;

    if (loading) {
      return (
        <SelectField disabled={ true } { ...this.props }>
          <MenuItem primaryText="Loading..." />
        </SelectField>
      );
    }

    return (
      <SelectField { ...this.props }>
        { this.renderSelectItems(clients) }
      </SelectField>
    );
  }
}

export default graphql(query)(ClientSelect);
