import React, { Component } from 'react';
import { MenuItem, FlatButton, Dialog } from 'material-ui';
import PropTypes from 'prop-types';

class ClientDeletionButton extends Component {
  constructor(props) {
    super(props);

    this.state = { showDialog: false };
  }

  handleOpen() {
    this.setState({ showDialog: true });
  }

  handleClose() {
    this.setState({ showDialog: false });
    this.props.handleCancelOperation();
  }

  handleDelete() {
    this.setState({ showDialog: false });
    this.props.handleDelete(this.props.clientId * 1);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={ true }
        onTouchTap={ this.handleClose.bind(this) }
      />,
      <FlatButton
        label="Confirm"
        primary={ true }
        onTouchTap={ this.handleDelete.bind(this) }
      />
    ];

    return (
      <div className="client-deletion-button">
        <MenuItem
          primaryText="Delete"
          onTouchTap={ this.handleOpen.bind(this) }
        />
        <Dialog
          title="Confirm deletion"
          actions={ actions }
          open={ this.state.showDialog }
          onRequestClose={ this.handleClose.bind(this) }
        >
          Are you sure you want to delete this client?
        </Dialog>
      </div>
    );
  }
}

ClientDeletionButton.propTypes = {
  clientId: PropTypes.string.isRequired,
  handleCancelOperation: PropTypes.func.isRequired
};

export default ClientDeletionButton;
