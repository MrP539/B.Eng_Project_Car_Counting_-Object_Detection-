import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class Pie9Chart extends Component {
  async componentDidMount() {
    await this.createPie9Chart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps. totalsumsMonthOut1 !== this.props.totalsumsMonthOut1 ||
        prevProps. totalsumsMonthOut2 !== this.props.totalsumsMonthOut2 ||
        prevProps. totalsumsMonthOut3 !== this.props.totalsumsMonthOut3 ||
        prevProps. totalsumsMonthOut4 !== this.props.totalsumsMonthOut4
       ) {
      this.createPie9Chart();
    }
  }

  createPie9Chart() {
    const {  totalsumsMonthOut1,  totalsumsMonthOut2,  totalsumsMonthOut3,  totalsumsMonthOut4 } = this.props;
    const pie9Chart = echarts.init(document.getElementById('pie9Chart'));

    // Create data array for the pie chart
    const data = [
      { value:  totalsumsMonthOut1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value:  totalsumsMonthOut2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value:  totalsumsMonthOut3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value:  totalsumsMonthOut4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log( totalsumsMonthOut1)
    const total1 =  totalsumsMonthOut1 +  totalsumsMonthOut2 +  totalsumsMonthOut3 +  totalsumsMonthOut4; // total sum

    const option = {
      title: {
        text: `จำนวนรถขาออกรายเดือน (total: ${total1})`,
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

    pie9Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie9Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie9Chart;
