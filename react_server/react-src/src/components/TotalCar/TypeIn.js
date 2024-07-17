import React, { Component } from 'react';

class TypeIn extends Component {
  render() {
    return (
        <div style={{ width: '25vw', maxWidth: '800px',  flexDirection: 'column', alignItems: 'center',marginLeft: '10px', marginBottom: '10px' }}>    
                    <div className="table-container" style={{ maxWidth: '100%', maxHeight: '400px'}}>
                    <table style={{ borderCollapse: 'collapse',  width: '100%', height: '150px', float: 'right' }}> {/* ให้ความสูงของตารางเท่ากับความสูงของกราฟเส้น */}
                    <thead>
                    <tr>
                    <th style={{backgroundColor: '#005B9D',color: 'white',padding: '2px',textAlign: 'center',border: '2px solid #005B9D'}}>ประเภทรถ</th>
                    <th style={{backgroundColor: '#005B9D',color: 'white',padding: '2px',textAlign: 'center',border: '2px solid #005B9D'}}>จำนวนรถขาเข้า</th>
                    </tr>
                        </thead>
                        <tbody>
                        <tr>
                              <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: '15px',border: '2px solid #005B9D' }}>รถจักรยานยนต์</td>
                              <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: '15px',border: '2px solid #005B9D' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: '15px',border: '2px solid #005B9D' }}>รถยนต์</td>
                              <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: '15px',border: '2px solid #005B9D' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: '15px',border: '2px solid #005B9D' }}>รถบรรทุก</td>
                              <td style={{ backgroundColor: "white", color: 'navy', textAlign: 'center', fontSize: '15px',border: '2px solid #005B9D' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                            {/* เพิ่มแถวของ Category 4, Category 5 ตามต้องการ */}
                        </tbody>
                        </table>
                      </div> 
                      </div> 
        );
    }
  } 
  export default TypeIn ;                  