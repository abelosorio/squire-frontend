import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  TextField,
  FlatButton
} from 'material-ui';

class EntryCreationForm extends Component {
  render() {
    return (
      <div className="entry-creation-form">
        <Card>
          <CardHeader
            title="Create new entry"
            actAsExpander={ true }
            showExpandableButton={ true }
          />
          <CardText expandable={ true }>
            <TextField type="text" fullWidth={ true } hintText="Client" />
            <TextField type="text" fullWidth={ true } hintText="Project" />
            <TextField type="number" fullWidth={ true } hintText="Worked hours" />
          </CardText>
          <CardActions expandable={ true }>
            <FlatButton label="Save" primary={ true } />
            <FlatButton label="Cancel" secondary={ true } />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default EntryCreationForm;
