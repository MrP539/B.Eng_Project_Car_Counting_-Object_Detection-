import React, { Component,useRef } from 'react';
import * as echarts from 'echarts'; // Import echarts
import DropdownPie from './DropdownPie';

class Pie5Chart extends Component {
  async componentDidMount() {
    await this.createPie5Chart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps. totalsumsDayOut1 !== this.props.totalsumsDayOut1 ||
        prevProps. totalsumsDayOut2 !== this.props.totalsumsDayOut2 ||
        prevProps. totalsumsDayOut3 !== this.props.totalsumsDayOut3 ||
        prevProps. totalsumsDayOut4 !== this.props.totalsumsDayOut4) {
      this.createPie5Chart();
    }
  }

  createPie5Chart() {
    const {  totalsumsDayOut1,  totalsumsDayOut2,  totalsumsDayOut3,  totalsumsDayOut4 } = this.props;
    const pie5Chart = echarts.init(document.getElementById('pie5Chart'));

    // Create data array for the pie chart
    const data = [
      { value:  totalsumsDayOut1, name: 'Gate 1 Suranaree', itemStyle: { color: "#353E4A" } },
      { value:  totalsumsDayOut2, name: 'Gate 2 Sithongchai', itemStyle: { color: "#9ACB34" } },
      { value:  totalsumsDayOut3, name: 'Gate 3 Wilaisila', itemStyle: { color: "#FAF3E2" } },
      { value:  totalsumsDayOut4, name: 'Gate 4 Kanlayanamit', itemStyle: { color: "#04D0D9" } },
    ];
    console.log( totalsumsDayOut1)
    const total1 =  totalsumsDayOut1 +  totalsumsDayOut2 +  totalsumsDayOut3 +  totalsumsDayOut4; // Total sum

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

    pie5Chart.setOption(option);
  }

  render() {
    return (
      <div>
        <div id="pie5Chart" style={{ width: '100vw', height: '50vh' }}></div>
      </div>
    );
  }
}

export default Pie5Chart;
