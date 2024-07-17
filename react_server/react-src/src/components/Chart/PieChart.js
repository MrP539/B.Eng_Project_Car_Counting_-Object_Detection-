import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class PieChart extends Component {
  async componentDidMount() {
    await this.createPieChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalsum1 !== this.props.totalsum1 ||
        prevProps.totalsum2 !== this.props.totalsum2 ||
        prevProps.totalsum3 !== this.props.totalsum3 ||
        prevProps.totalsum4 !== this.props.totalsum4) {
      this.createPieChart();
    }
  }

  createPieChart() {
    const { totalsum1, totalsum2, totalsum3, totalsum4,selectedMonthago } = this.props;
    const pieChart = echarts.init(document.getElementById('pieChart'));

    // Create data array for the pie chart
    const data = [
      { value: totalsum1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value: totalsum2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value: totalsum3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value: totalsum4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log(totalsum1)
    const total1 = totalsum1 + totalsum2 + totalsum3 + totalsum4; // Total sum

    const option = {
      title: {
        text: `จำนวนรถขาเข้า (Total: ${total1})`,
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

    pieChart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pieChart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default PieChart;
