import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import query from '../../queries/getClients';
import createClient from '../../mutations/createClient';
import deleteClient from '../../mutations/deleteClient';

import { ClientsList, ClientAddForm } from '../../components/ClientsManager';

class ClientsManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      showSnackbar: false,
      snackbarMessage: ''
    };
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

  handleRequestCloseSnackbar() {
    this.setState({ showSnackbar: false });
  }

  render() {
    const { loading, error, clients } = this.props.data;
    const { showAddForm, showSnackbar, snackbarMessage } = this.state;

    if (loading) {
      // @todo: Use a custom <Loading /> element
      return <div>Loading...</div>;
    }

    if (error) {
      // @todo: Use a custom error page or Component
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
      <ClientsList
        clients={ clients }
        handleOnAddTouchTap={ this.handleOnAddTouchTap.bind(this) }
        handleRequestCloseSnackbar={ this.handleRequestCloseSnackbar.bind(this) }
        showSnackbar={ showSnackbar }
        snackbarMessage={ snackbarMessage }
        handleCancelOperation={ this.handleCancelOperation.bind(this) }
        handleClientDelete={ this.handleClientDelete.bind(this) }
      />
    );
  }
}

ClientsManager.propTypes = {
  data: PropTypes.object.isRequired,
  createClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired
};

export default compose(
  graphql(query),
  graphql(createClient, { name: 'createClient' }),
  graphql(deleteClient, { name: 'deleteClient' })
)(ClientsManager);
