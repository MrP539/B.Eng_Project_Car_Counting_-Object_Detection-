import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Bar2Charts extends Component {
  componentDidMount() {
    this.createBar2Chart();
  }
  createBar2Chart() {
    const bar2Chart = echarts.init(document.getElementById('bar2Chart'));

    const option = {
      title: {
        text: 'BraChart By Week',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        },
        left: 'center',
        padding: [10, 0, 0, 0],
      },
      legend: {
        data: ['รถขาเข้า', 'รถขาออก'],
        padding: [40, 0, 0, 0],
      },
      tooltip: {   
        trigger: 'axis',
      },
      xAxis: {
        data: ['Gate 1', 'Gate 2', 'Gate 3', 'Gate 4'],
      },
      yAxis: {},
      series: [
        {
          name: 'Value 1',
          type: 'bar',
          itemStyle: {
            color: "#3e4396", // Set color for the first set of bars
          },
          data: [30, 40, 25, 50],
        },
        {
          name: 'Value 2',
          type: 'bar',
          itemStyle: {
            color: "#a4a9fc", // Set color for the second set of bars
          },
          data: [20, 35, 40, 15],
        },
      ],
    };

    bar2Chart.setOption(option);
  }
  render() {
    return (
      <div>
        <div id="bar2Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Bar2Charts;
