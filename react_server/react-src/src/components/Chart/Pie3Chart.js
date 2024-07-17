import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Pie3Chart extends Component {
  componentDidMount() {
    this.createPie2Chart();
  }
  createPie3Chart() {
    const pie3Chart = echarts.init(document.getElementById('pie3Chart'));
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      series: [
        {
          name: 'Value',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: 'Category 1' },
            { value: 310, name: 'Category 2' },
            { value: 234, name: 'Category 3' },
            { value: 135, name: 'Category 4' },
            { value: 1548, name: 'Category 5' },
          ],
        },
      ],
    };

    pie3Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie3Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Pie3Chart;