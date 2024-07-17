import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import FormDetect from '../FormDetect/FormDetect';

const ModalDetect = ({ buttonColor, buttonTriggerTitle, headerTitle, carID, onSave }) => {
  return (
    <Modal
      trigger={<Button color={buttonColor}>{buttonTriggerTitle}</Button>}
      dimmer='inverted'
      size='tiny'
      closeIcon='close'
    >
      <Modal.Header>{headerTitle}</Modal.Header>
      <Modal.Content>
        <FormDetect
          buttonColor={buttonColor}
          carID={carID}
          onDataUpdated={onSave}
        />
      </Modal.Content>
    </Modal>
  );
};

export default ModalDetect;
