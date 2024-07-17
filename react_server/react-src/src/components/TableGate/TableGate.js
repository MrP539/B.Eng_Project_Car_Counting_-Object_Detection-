import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import TableRowGate from './TableRowGate'; // Import TableRowGate component

class TableGate extends Component {
  render() {
    const { gates, onGateUpdated, onGateDeleted, server } = this.props;

    // เรียงลำดับข้อมูลตาม description ตามลำดับตัวอักษร
    gates.sort((a, b) => a.description.localeCompare(b.description));

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ชื่อประตู</Table.HeaderCell>
            <Table.HeaderCell>ประตูที่</Table.HeaderCell>
            <Table.HeaderCell> </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {gates.map(gate => (
            <TableRowGate
              key={gate._id}
              gate={gate}
              onGateUpdated={onGateUpdated}
              onGateDeleted={onGateDeleted}
              server={server}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default TableGate;
