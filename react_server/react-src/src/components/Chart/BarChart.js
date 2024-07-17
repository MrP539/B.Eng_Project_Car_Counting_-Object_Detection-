import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class BarCharts extends Component {
  componentDidMount() {
    this.createBarChart();
  }

  createBarChart() {
    const barChart = echarts.init(document.getElementById('barChart'));
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.','ศ.','ส.'],
      },
      yAxis: {},
      series: [
        {
          name: 'Value 1',
          type: 'bar',
          itemStyle: {
            color: 'blue', // Set color for the first set of bars
          },
          data: [30, 40, 25, 50, 45, 45, 62],
        },
        {
          name: 'Value 2',
          type: 'bar',
          itemStyle: {
            color: 'red', // Set color for the second set of bars
          },
          data: [20, 35, 40, 15, 30, 25, 32],
        },
      ],
    };
    barChart.setOption(option);
  }


  render() {
    return (
      <div>
        <div id="barChart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default BarCharts;
