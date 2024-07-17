import React, { Component } from 'react';
import * as echarts from 'echarts';

class Pie1Chart extends Component {
  componentDidMount() {
    this.createPie1Chart();
  }

  createPie1Chart() {
    const { totalsum5, totalsum6, totalsum7, totalsum8 } = this.props;
    const pie1Chart = echarts.init(document.getElementById('pie1Chart'));

    // Create data array for the pie chart
    const data = [
      { value: totalsum5, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A"} },
      { value: totalsum6, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value: totalsum7, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2"} },
      { value: totalsum8, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9"} },
    ];

    const total2 = totalsum5 + totalsum6 + totalsum7 + totalsum8; // Total sum

    const option = {
      title: {
        text: `จำนวนรถขาออก (Total: ${total2})`,
        x: 'center'
      },
      series: [
        {
          name: 'Gate',
          type: 'pie',
          radius: ['30%', '70%'],
          center: ['50%', '50%'],
          top: '10%',
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)',
            fontSize: '15px'
          },
          data,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          }
        }
      ]
    };

    pie1Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie1Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie1Chart;
