import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class Pie8Chart extends Component {
  async componentDidMount() {
    await this.createPie8Chart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps. totalsumsMonthIn1 !== this.props.totalsumsMonthIn1 ||
        prevProps. totalsumsMonthIn2 !== this.props.totalsumsMonthIn2 ||
        prevProps. totalsumsMonthIn3 !== this.props.totalsumsMonthIn3 ||
        prevProps. totalsumsMonthIn4 !== this.props.totalsumsMonthIn4
       ) {
      this.createPie8Chart();
    }
  }

  createPie8Chart() {
    const {  totalsumsMonthIn1,  totalsumsMonthIn2,  totalsumsMonthIn3,  totalsumsMonthIn4 } = this.props;
    const pie8Chart = echarts.init(document.getElementById('pie8Chart'));

    // Create data array for the pie chart
    const data = [
      { value:  totalsumsMonthIn1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value:  totalsumsMonthIn2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value:  totalsumsMonthIn3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value:  totalsumsMonthIn4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log( totalsumsMonthIn1)
    const total1 =  totalsumsMonthIn1 +  totalsumsMonthIn2 +  totalsumsMonthIn3 +  totalsumsMonthIn4; // total sum

    const option = {
      title: {
        text: `จำนวนรถขาเข้ารายเดือน (total: ${total1})`,
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

    pie8Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie8Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie8Chart;
