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
import PropTypes from 'prop-types';

import EntryDeletionButton from './EntryDeletionButton';
import NoEntries from './NoEntries';

let SelectableList = makeSelectable(List);

class WorkEntriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: undefined,
      onItemSelection: props.onItemSelection
    };
  }

  handleRequestChange(event, index) {
    this.state.onItemSelection(index);
  }

  renderEntries(workEntries, onItemSelection, clearSelection) {
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
            clearSelection={ clearSelection }
            entryId={ id }
          />
        </IconMenu>
      );

      return (
        React.Children.toArray([
          <ListItem
            value={ index }
            primaryText={ client }
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
    const {
      entries,
      selectedIndex,
      onItemSelection,
      clearSelection
    } = this.props;

    if (entries.length === 0) {
      return <NoEntries />;
    }

    return (
      <div className="daily-view-list">
        <SelectableList
          value={ selectedIndex }
          onChange={ this.handleRequestChange.bind(this) }
        >
          { this.renderEntries(entries, onItemSelection, clearSelection) }
        </SelectableList>
      </div>
    );
  }
}

export default WorkEntriesList;
