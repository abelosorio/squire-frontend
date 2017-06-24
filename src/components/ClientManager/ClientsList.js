import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { List, FloatingActionButton, Snackbar } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import query from '../../queries/getClients';
import createClient from '../../mutations/createClient';
import deleteClient from '../../mutations/deleteClient';

import ClientsListItem from './ClientsListItem';
import ClientAddForm from './ClientAddForm';

class ClientsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      showSnackbar: false,
      snackbarMessage: ''
    };
  }

  renderClients(clients) {
    return clients.map(
      client => ((
        <ClientsListItem
          key={ client.id }
          client={ client }
          handleCancelOperation={ this.handleCancelOperation.bind(this) }
          handleDelete={ this.handleClientDelete.bind(this) }
        />
      ))
    );
  }

  handleOnAddTouchTap() {
    this.setState({ showAddForm: true });
  }

  handleClientCreation(client) {
    this.props.createClient({
      variables: { client },
      refetchQueries: [{ query }]
    }).then(() => this.setState({
      showAddForm: false,
      showSnackbar: true,
      snackbarMessage: 'Client added successfuly!'
    })).catch(this.handleOperationError);
  }

  handleClientDelete(clientId) {
    this.props.deleteClient({
      variables: { id: clientId },
      refetchQueries: [{ query }]
    }).then(() => this.setState({
      showSnackbar: true,
      snackbarMessage: 'Client deleted successfuly!'
    })).catch(this.handleOperationError);
  }

  handleOperationError(error) {
    alert(error);
  }

  handleCancelOperation() {
    this.setState({ showAddForm: false });
  }

  render() {
    const { loading, error, clients } = this.props.data;
    const { showAddForm, showSnackbar, snackbarMessage } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{ error }</div>;
    }

    if (showAddForm) {
      return (
        <ClientAddForm
          handleClientCreation={ this.handleClientCreation.bind(this) }
          handleCancelOperation={ this.handleCancelOperation.bind(this) }
        />
      );
    }

    return (
      <div className="clients-list">
        <h2>Clients List</h2>
        <List>
          { this.renderClients(clients) }
        </List>
        <FloatingActionButton
          className="floating-bottom-right-button"
          onTouchTap={ this.handleOnAddTouchTap.bind(this) }
        >
          <ContentAdd />
        </FloatingActionButton>
        <Snackbar
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
  graphql(query),
  graphql(createClient, { name: 'createClient' }),
  graphql(deleteClient, { name: 'deleteClient' })
)(ClientsList);
