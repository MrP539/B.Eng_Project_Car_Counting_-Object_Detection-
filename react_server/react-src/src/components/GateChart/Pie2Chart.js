import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Pie2Chart extends Component {
  componentDidMount() {
    this.createPie2Chart();
  }

  componentDidUpdate(prevProps) {
    // Check if any of the props have changed
    if (prevProps !== this.props) {
      this.createPie2Chart();
    }
  }

  createPie2Chart() {
    const { totalsum1, totalsum2 } = this.props; // รับค่า totalsum1 และ totalsum2 จาก props
     console.log(totalsum1)
     console.log(totalsum2)

    const pie2Chart = echarts.init(document.getElementById('pie2Chart'));
    const data = [
      { value: totalsum1, name: 'รถขาเข้า', itemStyle: { color: "#171D4B"  } }, 
      { value: totalsum2, name: 'รถขาออก', itemStyle: { color: "#04D0D9" } }, 
    ];
  
    // คำนวณผลรวมของ value ทั้งหมด
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
  
    const option = {
      title: {
        text: `จำนวนรถขาเข้าเทียบกับขาออก (Total: ${total})`, // เพิ่มข้อความรวมลงใน title ของ Legend
        x: 'center',
        textStyle: {
          fontSize: 0.013 * window.innerWidth, // ปรับขนาดของข้อความให้เป็นค่าเท่ากับ 5% ของความกว้างของหน้าจอ
        }
      },
     
      series: [
        {
          name: 'Gate',
          type: 'pie',
          radius: ['30%','80%'], // ปรับ radius ให้เป็นค่าเท่ากับ 5% และ 10% ของความกว้างของหน้าจอ
          center: ['50%', '50%'],
          top: '20%',
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)',
            textStyle: {
                fontSize: 0.009 * window.innerWidth, // ปรับขนาดของตัวอักษรให้เป็นค่าเท่ากับ 5% ของความกว้างของหน้าจอ
            }
        },
          data: data,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          }
        }
      ]
    };
    
    pie2Chart.setOption(option);
  }
  
  
  render() {
    return (
      <div>
        <div id="pie2Chart" style={{ width: '100vw', height: '40vh' }}></div>
      </div>
    );
  }
}

export default Pie2Chart;
