import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Line4Chart extends Component {
  componentDidMount() {
    this.createLine4Chart();
  }

  createLine4Chart = () => {
    const line4Chart = echarts.init(document.getElementById('line4Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถขาเข้าเทียบกับขาออก',
            textStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            },
            left: 'center',
            padding: [10, 0, 0, 0],
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['รถขาเข้า', 'รถขาออก'],
            padding: [40, 0, 0, 0],
          },
          xAxis: {
            type: 'category', // ใช้แกน X เป็น category
            data: ['Gate 1', 'Gate 2', 'Gate 3', 'Gate 4'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'รถขาเข้า',
              type: 'line', // ใช้กราฟเส้น
              stack: 'total', // เปลี่ยนให้กราฟมีการสร้างพื้นที่ข้างล่างเพื่อแสดงส่วนสูงสุด
              data: [50, 25, 40, 30],
              areaStyle: {}, // เพิ่ม areaStyle เพื่อกำหนดสีพื้นหลังของกราฟ
              lineStyle: {
                width: 0, // ลบเส้นขอบของ area chart
              },
              itemStyle: {
                color: 'red', // สีของพื้นที่กราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'line', // ใช้กราฟเส้น
              stack: 'total', // เปลี่ยนให้กราฟมีการสร้างพื้นที่ข้างล่างเพื่อแสดงส่วนสูงสุด
              data: [42, 40, 35, 20],
              areaStyle: {}, // เพิ่ม areaStyle เพื่อกำหนดสีพื้นหลังของกราฟ
              lineStyle: {
                width: 0, // ลบเส้นขอบของ area chart
              },
              itemStyle: {
                color: 'blue', // สีของพื้นที่กราฟ
              },
            },
          ],
    };
    line4Chart.setOption(option);
  };

  render() {
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line4Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line4Chart;