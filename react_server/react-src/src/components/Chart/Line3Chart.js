import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Line3Charts extends Component {
  componentDidMount() {
    this.createLine3Chart();
  }

  createLine3Chart = () => {
    const line3Chart = echarts.init(document.getElementById('line3Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถทขาออก', // กำหนดชื่อกราฟที่นี่
            textStyle: {
              fontSize: 13, // ขนาดตัวอักษร
              fontWeight: 'bold', // ความหนา
              color: 'black', // สีของตัวอักษร
            },
            left: 'center', // ตำแหน่งของ title
            padding: [10, 0, 0, 0], // ระยะห่างของ title จากกราฟ
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['ขาเข้า', 'ขาออก'],
            padding: [40, 0, 0, 0], // ระยะห่างของ title จากกราฟ
          },
          xAxis: {
            type: 'category',
            data: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.','ศ.','ส.'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'ขาเข้า',
              type: 'line',
              data: [30, 40, 25, 50, 45,74, 62],
              lineStyle: {
                color: 'blue', // Set color for the first line
              },
            },
            {
              name: 'ขาออก',
              type: 'line',
              data: [20, 35, 40, 15, 30,40 ,55],
              lineStyle: {
                color: 'red', // Set color for the second line
              },
            },      
          ],
    };
    line3Chart.setOption(option);
  };

  render() {
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line3Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line3Charts;