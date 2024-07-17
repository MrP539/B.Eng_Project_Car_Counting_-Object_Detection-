import React, { Component } from 'react';
import { BsFillCarFrontFill } from 'react-icons/bs';

class CarInOut1 extends Component {
  render() {
    const { TotalsumscarInWeek, TotalsumscarOutWeek } = this.props; // เพิ่มการดึง props ที่ส่งมาจาก parent component
    return (
      <div style={{ width: '30vw', maxWidth: '100%', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', marginBottom: '10px' }}>
      <div style={{ backgroundColor: "#f0f4c3", color: 'white', padding: '10px', border: '2px solid #f0f4c3', fontSize: 'clamp(12px, 2vw, 18px)', textAlign: 'center', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <BsFillCarFrontFill size="1.5em" color="#1a237e" style={{ marginRight: '10px' }} />
          <div style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: '#1a237e', fontWeight: 'bold' }}>รถยนต์</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ width: '48%', border: '2px solid #f0f4c3', backgroundColor: 'white', color: '#1a237e', borderRadius: '20px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BsFillCarFrontFill size="1em" style={{ marginRight: '5px' }} />
            จำนวนรถขาเข้า
          </div>
          <div style={{ width: '48%', border: '2px solid #f0f4c3', backgroundColor: 'white', color: '#1a237e', borderRadius: '20px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BsFillCarFrontFill size="1em" style={{ marginRight: '5px' }} />
            จำนวนรถขาออก
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', padding: '5px', color: '#1a237e', textAlign: 'center' }}>{TotalsumscarInWeek}</div>
          <div style={{ width: '50%', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', padding: '5px', color: '#1a237e', textAlign: 'center' }}>{TotalsumscarOutWeek}</div>
        </div>
      </div>
    </div>
    );
  }
}

export default CarInOut1;
