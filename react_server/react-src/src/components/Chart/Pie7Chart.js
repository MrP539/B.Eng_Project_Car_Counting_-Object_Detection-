import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class Pie7Chart extends Component {
  async componentDidMount() {
    await this.createPie7Chart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps. TotalsumsWeekOutGate1 !== this.props.TotalsumsWeekOutGate1 ||
        prevProps. TotalsumsWeekOutGate2 !== this.props.TotalsumsWeekOutGate2 ||
        prevProps. TotalsumsWeekOutGate3 !== this.props.TotalsumsWeekOutGate3 ||
        prevProps. TotalsumsWeekOutGate4 !== this.props.TotalsumsWeekOutGate4
       ) {
      this.createPie7Chart();
    }
  }

  createPie7Chart() {
    const {  TotalsumsWeekOutGate1,  TotalsumsWeekOutGate2,  TotalsumsWeekOutGate3,  TotalsumsWeekOutGate4 } = this.props;
    const pie7Chart = echarts.init(document.getElementById('pie7Chart'));

    // Create data array for the pie chart
    const data = [
      { value:  TotalsumsWeekOutGate1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value:  TotalsumsWeekOutGate2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value:  TotalsumsWeekOutGate3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value:  TotalsumsWeekOutGate4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log( TotalsumsWeekOutGate1)
    const total1 =  TotalsumsWeekOutGate1 +  TotalsumsWeekOutGate2 +  TotalsumsWeekOutGate3 +  TotalsumsWeekOutGate4; // Total sum

    const option = {
      title: {
        text: `จำนวนรถขาออก (Total: ${total1})`,
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

    pie7Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie7Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie7Chart;
