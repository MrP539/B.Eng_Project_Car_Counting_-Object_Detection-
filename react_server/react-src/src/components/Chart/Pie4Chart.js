import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class Pie4Chart extends Component {
  async componentDidMount() {
    await this.createPie4Chart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps. totalsumsDayIn1 !== this.props. totalsumsDayIn1 ||
        prevProps. totalsumsDayIn2 !== this.props. totalsumsDayIn2 ||
        prevProps. totalsumsDayIn3 !== this.props. totalsumsDayIn3 ||
        prevProps. totalsumsDayIn4 !== this.props. totalsumsDayIn4) {
      this.createPie4Chart();
    }
  }

  createPie4Chart() {
    const {  totalsumsDayIn1,  totalsumsDayIn2,  totalsumsDayIn3,  totalsumsDayIn4 } = this.props;
    const pie4Chart = echarts.init(document.getElementById('pie4Chart'));

    // Create data array for the pie chart
    const data = [
      { value:  totalsumsDayIn1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value:  totalsumsDayIn2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value:  totalsumsDayIn3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value:  totalsumsDayIn4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log( totalsumsDayIn1)
    const total1 =  totalsumsDayIn1 +  totalsumsDayIn2 +  totalsumsDayIn3 +  totalsumsDayIn4; // Total sum

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

    pie4Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie4Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie4Chart;
