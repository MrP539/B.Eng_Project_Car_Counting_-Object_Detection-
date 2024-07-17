import React, { Component } from 'react';

class WeeklyInOut extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%', alignItems: 'center', marginLeft: '2px', marginBottom: '10px', marginTop: '30px' }}>
        <div className="table-container" style={{ maxWidth: '100%', maxHeight: '25vh' }}>
          <table style={{ borderCollapse: 'collapse', width: '90%', height: '25vh', float: 'left', marginRight: '10px' }}>
            <thead>
                    <tr>
                    <th style={{backgroundColor: "#171D4B",color: 'white',padding: '2px',textAlign: 'center',fontSize: '1.2vw',border: '1px solid #171D4B'}}>Day</th>
                    <th style={{backgroundColor: "#171D4B",color: 'white',padding: '2px',textAlign: 'center',fontSize: '1.2vw',border: '1px solid #171D4B'}}>จำนวนรถขาเข้า</th>
                    <th style={{backgroundColor: "#171D4B",color: 'white',padding: '2px',textAlign: 'center',fontSize: '1.2vw',border: '1px solid #171D4B'}}>จำนวนรถขาออก</th>
                    </tr>
                        </thead>
                        <tbody>
                        <tr>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>Sunday</td>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw' ,border: '1px solid #171D4B'}}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B'}}>Monday</td>
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B'}}>Tuesday</td>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B'}}>Wednesday</td>
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B'}}>Thursday</td>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw' ,border: '1px solid #171D4B'}}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B'}}>Friday</td>
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
                          <tr>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B'}}>Saturday</td>
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                              <td style={{ backgroundColor: '#D6EAF8', color: 'navy', textAlign: 'center', fontSize: '1vw',border: '1px solid #171D4B' }}>...</td> {/* ค่าของ Category 1 */}
                          </tr>
              {/* แถวข้อมูลอื่น ๆ ตามที่ต้องการ */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WeeklyInOut;
