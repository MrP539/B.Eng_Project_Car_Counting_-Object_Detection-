import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Bar3Charts extends Component {
  componentDidMount() {
    this.createBar3Chart();
  }
  createBar3Chart() {
    const bar3Chart = echarts.init(document.getElementById('bar3Chart'));

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
        data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.','Sat.','Sun.'],
      },
      yAxis: {},
      series: [
        {
          name: 'Value 1',
          type: 'bar',
          itemStyle: {
            color: "#3e4396", // Set color for the first set of bars
          },
          data: [30, 40, 25, 50, 45,50,32],
        },
        {
          name: 'Value 2',
          type: 'bar',
          itemStyle: {
            color: "#a4a9fc", // Set color for the second set of bars
          },
          data: [20, 35, 40, 15, 30, 40, 25],
        },
      ],
    };

    bar3Chart.setOption(option);
}



  render() {
    return (
      <div>
        <div id="bar3Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Bar3Charts;