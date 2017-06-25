import React, { Component } from 'react';
import {
  List,
  ListItem,
  makeSelectable,
  IconButton,
  Divider,
  IconMenu
} from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import EntryDeletionButton from './EntryDeletionButton';
import NoEntries from './NoEntries';

let SelectableList = makeSelectable(List);

class WorkEntriesList extends Component {
  handleRequestChange(event, index) {
    this.props.handleItemSelection(index);
  }

  renderEntries(workEntries) {
    const { handleCancelOperation, handleDelete } = this.props;

    return workEntries.map((value, index) => {
      const { id, client, project, worked_hours: workedHours } = value;

      const iconButtonElement = (
        <IconButton touch={ true } tooltip="more">
          <MoreVertIcon color={ grey400 } />
        </IconButton>
      );

      const rightIconMenu = (
        <IconMenu iconButtonElement={ iconButtonElement }>
          <EntryDeletionButton
            handleCancelOperation={ handleCancelOperation }
            handleDelete={ handleDelete }
            entryId={ id }
          />
        </IconMenu>
      );

      return (
        React.Children.toArray([
          <ListItem
            value={ index }
            primaryText={ client.name }
            rightIconButton={ rightIconMenu }
            secondaryText={
              <p>
                Project {project} -- Worked hours: {workedHours}
              </p>
            }
          />,
          <Divider />
        ])
      );
    });
  }

  render() {
    const { entries, selectedIndex } = this.props;

    if (entries.length === 0) return <NoEntries />;

    return (
      <div className="daily-view-list">
        <SelectableList
          value={ selectedIndex }
          onChange={ this.handleRequestChange.bind(this) }
        >
          { this.renderEntries(entries) }
        </SelectableList>
      </div>
    );
  }
}

export default WorkEntriesList;
