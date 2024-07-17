import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class Pie6Chart extends Component {
  async componentDidMount() {
    await this.createPie6Chart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps. TotalsumsWeekInGate1 !== this.props.TotalsumsWeekInGate1 ||
        prevProps. TotalsumsWeekInGate2 !== this.props.TotalsumsWeekInGate2 ||
        prevProps. TotalsumsWeekInGate3 !== this.props.TotalsumsWeekInGate3 ||
        prevProps. TotalsumsWeekInGate4 !== this.props.TotalsumsWeekInGate4
       ) {
      this.createPie6Chart();
    }
  }

  createPie6Chart() {
    const {  TotalsumsWeekInGate1,  TotalsumsWeekInGate2,  TotalsumsWeekInGate3,  TotalsumsWeekInGate4 } = this.props;
    const pie6Chart = echarts.init(document.getElementById('pie6Chart'));

    // Create data array for the pie chart
    const data = [
      { value:  TotalsumsWeekInGate1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value:  TotalsumsWeekInGate2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value:  TotalsumsWeekInGate3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value:  TotalsumsWeekInGate4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log( TotalsumsWeekInGate1)
    const total1 =  TotalsumsWeekInGate1 +  TotalsumsWeekInGate2 +  TotalsumsWeekInGate3 +  TotalsumsWeekInGate4; // Total sum

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

    pie6Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie6Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie6Chart;
