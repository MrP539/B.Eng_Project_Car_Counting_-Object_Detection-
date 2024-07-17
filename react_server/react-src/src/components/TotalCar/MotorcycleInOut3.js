import React, { Component } from 'react';
import { FaMotorcycle } from 'react-icons/fa'; // Import icon from Font Awesome

class MotorcycleInOut3 extends Component {
  render() {
    const { TotalsumsmotorbikeInDay, TotalsumsmotorbikeOutDay } = this.props;
    
    return (
<div style={{ width: '30vw', maxWidth: '100%', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', marginBottom: '10px' }}>
      <div style={{ backgroundColor: "#e1bee7", color: 'white', padding: '10px', border: '2px solid #e1bee7', fontSize: 'clamp(12px, 2vw, 18px)', textAlign: 'center', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <FaMotorcycle size="1.5em" color="#4a148c" style={{ marginRight: '10px' }} />
          <div style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: '#4a148c', fontWeight: 'bold' }}>รถจักรยานยนต์</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ width: '48%', border: '2px solid #e1bee7', backgroundColor: 'white', color: '#4a148c', borderRadius: '20px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaMotorcycle size="1em" style={{ marginRight: '5px' }} />
            จำนวนรถขาเข้ารายวัน
          </div>
          <div style={{ width: '48%', border: '2px solid #e1bee7', backgroundColor: 'white', color: '#4a148c', borderRadius: '20px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaMotorcycle size="1em" style={{ marginRight: '5px' }} />
            จำนวนรถขาออกรายวัน
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', padding: '5px', color: '#4a148c', textAlign: 'center' }}>{TotalsumsmotorbikeInDay}</div>
          <div style={{ width: '50%', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', padding: '5px', color: '#4a148c', textAlign: 'center' }}>{TotalsumsmotorbikeOutDay}</div>
        </div>
      </div>
    </div>
    );
  } 
}

export default MotorcycleInOut3;
