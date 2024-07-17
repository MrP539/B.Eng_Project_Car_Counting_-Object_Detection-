import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormInput from '../FormInput/FormInput';

class ModalInput extends Component {

  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormInput
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            inputID={this.props.inputID}
            onInputAdded={this.props.onInputAdded}
            onInputUpdated={this.props.onInputUpdated}
            server={this.props.server}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalInput;
