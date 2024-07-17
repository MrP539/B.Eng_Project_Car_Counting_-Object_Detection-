import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Line1Charts extends Component {
  componentDidMount() {
    this.createLine1Chart();
  }
  
  componentDidUpdate(prevProps) {
    // Check if any of the props have changed
    if (prevProps !== this.props) {
      this.createLine1Chart();
    }
  }

  createLine1Chart = () => {
    const { 
      totalsummotorbikeinline1,
      totalsummotorbikeinline2,
      totalsummotorbikeinline3,
      totalsummotorbikeinline4,
      totalsummotorbikeinline5,
      totalsummotorbikeinline6,
      totalsummotorbikeoutline1,
      totalsummotorbikeoutline2,
      totalsummotorbikeoutline3,
      totalsummotorbikeoutline4,
      totalsummotorbikeoutline5,
      totalsummotorbikeoutline6
    } = this.props;
    
    console.log(totalsummotorbikeinline1);
    const line1Chart = echarts.init(document.getElementById('line1Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถจักรยานยนต์ขาเข้า-ขาออก\nย้อนหลัง 6 เดือน',
            textStyle: {
              fontSize: '1.5vw',
              fontWeight: 'bold',
              color: 'black',
            },
            left: 'center',
            padding: [10, 0, 0,0],
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['รถขาเข้า', 'รถขาออก'],
            padding: [40, 0, 0,0],
          },
          xAxis: {
            type: 'category',
            data: ['2024-06', '2024-05', '2024-04', '2024-03', '2024-02','2024-01']
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'รถขาเข้า',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [
                totalsummotorbikeinline1,
                totalsummotorbikeinline2,
                totalsummotorbikeinline3,
                totalsummotorbikeinline4,
                totalsummotorbikeinline5,
                totalsummotorbikeinline6
              ],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [
                totalsummotorbikeoutline1,
                totalsummotorbikeoutline2,
                totalsummotorbikeoutline3,
                totalsummotorbikeoutline4,
                totalsummotorbikeoutline5,
                totalsummotorbikeoutline6
              ],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line1Chart.setOption(option);
  };

  render() {
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line1Chart" style={{ width: '90vw', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line1Charts;
