import React, { Component } from 'react';

class GateCarInOut extends Component {
  render() {
    return (
      <div style={{ width: '30vw', maxWidth: '100%', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', marginBottom: '10px' }}>
        <div className="table-container" style={{ maxWidth: '100%', maxHeight: '100px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', height: '50px', float: 'right' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#005B9D', color: 'white', padding: '2px', textAlign: 'center', border: '2px solid #005B9D', fontSize: 'clamp(12px, 2vw, 18px)' }}>ประเภทรถ</th>
                <th style={{ backgroundColor: '#005B9D', color: 'white', padding: '2px', textAlign: 'center', border: '2px solid #005B9D', fontSize: 'clamp(12px, 2vw, 18px)' }}>จำนวนรถขาเข้า</th>
                <th style={{ backgroundColor: '#005B9D', color: 'white', padding: '2px', textAlign: 'center', border: '2px solid #005B9D', fontSize: 'clamp(12px, 2vw, 18px)' }}>จำนวนรถขาออก</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: 'clamp(10px, 1.5vw, 16px)', border: '2px solid #005B9D' }}>รถยนต์</td>
                <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: 'clamp(10px, 1.5vw, 16px)', border: '2px solid #005B9D' }}>...</td> {/* ใช้ props totalsumscarin ที่ส่งมาจาก parent component */}
                <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: 'clamp(10px, 1.5vw, 16px)', border: '2px solid #005B9D' }}>...</td> {/* ใช้ props totalsumscarout ที่ส่งมาจาก parent component */}
              </tr>
              {/* เพิ่มแถวของ Category 4, Category 5 ตามต้องการ */}
            </tbody>
          </table>
        </div>
      </div>
    );
    }
  } 
  export default GateCarInOut ;          