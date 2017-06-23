import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { MenuItem, FlatButton, Dialog } from 'material-ui';
import PropTypes from 'prop-types';

import mutation from '../../mutations/deleteWorkEntry';
import query from '../../queries/getWorkEntries';

class EntryDeletionButton extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.selectedIndex !== undefined };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.props.clearSelection();
  }

  handleDelete() {
    this.handleClose();

    this.props.mutate({
      variables: {
        id: this.props.entryId * 1 // Cast to Int
      },
      refetchQueries: [{ query }]
    }).catch(error => alert(error));
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
      <div className="entry-deletion-button">
        <MenuItem
          primaryText="Delete"
          onTouchTap={ this.handleOpen.bind(this) }
        />
        <Dialog
          title="Confirm deletion"
          actions={ actions }
          open={ this.state.open }
          onRequestClose={ this.handleClose.bind(this) }
        >
          Are you sure you want to delete this entry?
        </Dialog>
      </div>
    );
  }
}

EntryDeletionButton.propTypes = {
  mutate: PropTypes.func.isRequired,
  entryId: PropTypes.string.isRequired,
  clearSelection: PropTypes.func.isRequired
};

export default graphql(mutation)(EntryDeletionButton);
