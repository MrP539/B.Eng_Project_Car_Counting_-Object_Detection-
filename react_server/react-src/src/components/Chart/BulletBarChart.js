import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class BulletBarChart extends Component {

  componentDidMount() {
    this.createBulletBarChart();
  }

  createBulletBarChart() {
    const bulletBarChart = echarts.init(document.getElementById('bulletBarChart'));

    const option = {
      tooltip: {   
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['วันที่ 1', 'วันที่ 2', 'วันที่ 3', 'วันที่ 4', 'วันที่ 5', 'วันที่ 6', 'วันที่ 7'],
      },
      yAxis: {},
      series: [
        {
          name: 'รถเข้า',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: 'blue',
          },
          data: [120, 150, 180, 200, 170, 190, 160], // จำนวนรถเข้าในแต่ละวัน
        },
        {
          name: 'รถออก',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: 'red',
          },
          data: [110, 140, 170, 190, 160, 180, 150], // จำนวนรถออกในแต่ละวัน
        },
      ],
    };

    bulletBarChart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="bulletBarChart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default BulletBarChart;



