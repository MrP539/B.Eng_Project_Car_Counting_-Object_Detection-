import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './ModalGate.css'; // Import CSS file for styling
import FormGate from '../FormGate/FormGate';

class ModalGate extends Component {
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
          <FormGate
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            gateID={this.props.gateID}
            onGateAdded={this.props.onGateAdded}
            onGateUpdated={this.props.onGateUpdated}
            server={this.props.server}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalGate;
