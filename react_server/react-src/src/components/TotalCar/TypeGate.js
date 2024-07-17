import React, { Component } from 'react';

class GateInfo extends Component {
  render() {
    const { gateName, carsIn, carsOut } = this.props; // รับข้อมูล props มาจาก parent component
    return (
      <div style={{ width: '30%', height: '300px', marginBottom: '10px', marginLeft: '10px', fontSize: '30px', fontWeight: 'bold', backgroundColor: "white", borderRadius: '20px', display: 'flex', alignItems: 'center',  flexDirection: 'column' }}>{' '}
        <div style={{  marginBottom: '10px',fontSize: '20px', fontWeight: 'bold', color: 'Black' }}>{' '}{gateName}</div>
        <div style={{ marginBottom: '15px',fontSize: '20px', fontWeight: 'bold', color: '#773513' }}>รถขาเข้า</div>
        <div style={{  marginBottom: '15px',fontSize: '50px', fontWeight: 'bold' }}>{carsIn}</div>
        <div style={{  marginBottom: '15px',fontSize: '20px', fontWeight: 'bold', color: '#773513' }}>รถขาออก</div>
        <div style={{ fontSize: '50px', fontWeight: 'bold' }}>{carsOut}</div>
      </div>
    );
  }
}

export default GateInfo;
