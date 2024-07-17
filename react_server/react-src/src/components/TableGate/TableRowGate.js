import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import ModalGate from '../ModalGate/ModalGate';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';
import ModalShowGate from '../ModalShowGate/ModalShowGate'; // Import the new component
import { StateContext } from '../ToolbarDetect/StateContext';

class TableRowGate extends Component {
  static contextType = StateContext;
  render() {
    const { gate, onGateUpdated, onGateDeleted, server } = this.props;
    const { userId } = this.context;

    return (
      <Table.Row key={gate._id}>
        <Table.Cell>{gate.name} Gate</Table.Cell>
        <Table.Cell>{gate.description}</Table.Cell>
        <Table.Cell>
        { userId == 'admin' && (
          <ModalGate
            headerTitle='Edit Gate'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            gateID={gate._id}
            onGateUpdated={onGateUpdated}
            server={server}
          />
        )}
          <ModalShowGate
            headerTitle='Show Gate'
            buttonTriggerTitle='Show'
            gate={gate}
          />
           { userId == 'admin' && (
          <ModalConfirmDelete
            headerTitle='Delete Gate'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            gate={gate}
            onGateDeleted={onGateDeleted}
            server={server}
          />
        )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default TableRowGate;
