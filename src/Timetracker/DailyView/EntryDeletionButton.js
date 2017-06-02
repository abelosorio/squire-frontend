import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { IconButton, FlatButton, Dialog } from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import PropTypes from 'prop-types';

import mutation from '../../mutations/deleteWorkEntry';
import query from '../../queries/getWorkEntries';

class EntryDeletionButton extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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
    const { isLastRow } = this.props;

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
        <IconButton
          tooltip="Delete"
          tooltipPosition={ isLastRow ? 'top-center' : 'bottom-center' }
          onTouchTap={ this.handleOpen.bind(this) }
        >
          <ActionDelete />
        </IconButton>
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
  entryId: PropTypes.string.isRequired
};

export default graphql(mutation)(EntryDeletionButton);
