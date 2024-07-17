import React, { Component } from 'react';
import { BsFillTruckFrontFill } from 'react-icons/bs'; // Import icon from Bootstrap Icons

class TruckInOut3 extends Component {
  render() {
    const { TotalsumstruckInDay, TotalsumstruckOutDay } = this.props;
    return (
      <div style={{ width: '30vw', maxWidth: '100%', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', marginBottom: '10px' }}>
        <div style={{ backgroundColor: "#ffccbc", color: 'white', padding: '10px', border: '2px solid #ffccbc', fontSize: 'clamp(12px, 2vw, 18px)', textAlign: 'center', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <BsFillTruckFrontFill size="1.5em" color="#bf360c" style={{ marginRight: '10px' }} />
            <div style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: '#bf360c', fontWeight: 'bold'}}>รถบรรทุก</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ width: '48%', border: '2px solid #ffccbc', backgroundColor: 'white', color: '#bf360c', borderRadius: '20px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BsFillTruckFrontFill size="1em" style={{ marginRight: '5px' }} />
              จำนวนรถขาเข้ารายวัน
            </div>
            <div style={{ width: '48%', border: '2px solid #ffccbc', backgroundColor: 'white', color: '#bf360c', borderRadius: '20px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BsFillTruckFrontFill size="1em" style={{ marginRight: '5px' }} />
              จำนวนรถขาออกรายวัน
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', padding: '5px', color: '#bf360c', textAlign: 'center' }}>{TotalsumstruckInDay}</div>
            <div style={{ width: '50%', fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', padding: '5px', color: '#bf360c', textAlign: 'center' }}>{TotalsumstruckOutDay}</div>
          </div>
        </div>
      </div>
    );
  } 
}

export default TruckInOut3;
