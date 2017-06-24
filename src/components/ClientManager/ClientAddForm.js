import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class ClientAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }

  render() {
    const { name } = this.state;
    const { handleClientCreation, handleCancelOperation } = this.props;

    return (
      <div className="client-add-form">
        <h2>Add new client</h2>

        <br />

        <TextField
          floatingLabelText="Name"
          fullWidth={ true }
          value={ name }
          onChange={ (event, name) => this.setState({ name }) }
        />

        <RaisedButton
          label="Add"
          primary={ true }
          style={ { marginRight: 10 } }
          onTouchTap={ () => handleClientCreation({ name }) }
        />
        <RaisedButton
          label="Cancel"
          secondary={ true }
          onTouchTap={ handleCancelOperation }
        />
      </div>
    );
  }
}

export default ClientAddForm;
