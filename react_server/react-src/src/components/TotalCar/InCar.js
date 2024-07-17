import React, { Component } from 'react';


class InCar extends Component {
  render() {
    return (
        <div style={{ width: '50%', height: '120px',marginLeft: '10px', backgroundColor: '#005B9D', borderRadius: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>จำนวนรถขาเข้าทั้งหมด
          <div style={{ display: 'block', fontSize: '50px',fontWeight: 'bold' }}>335</div>
        </div>
      
    );
  }
}

export default InCar;
