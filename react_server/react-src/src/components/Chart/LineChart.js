import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class LineCharts extends Component {
  componentDidMount() {
    this.createLineChart();
  }

  componentDidUpdate(prevProps) {
    // Check if any of the props have changed
    if (prevProps !== this.props) {
      this.createLineChart();
    }
  }

  createLineChart = () => {
    const { 
      totalsumcarinline1, totalsumcarinline2, totalsumcarinline3, totalsumcarinline4, totalsumcarinline5, totalsumcarinline6,
      totalsumcaroutline1, totalsumcaroutline2, totalsumcaroutline3, totalsumcaroutline4, totalsumcaroutline5, totalsumcaroutline6
    } = this.props;

    const lineChart = echarts.init(document.getElementById('lineChart'));
    const option = {
        title: {
            text: 'จำนวนของรถยนตร์ขาเข้า-ขาออก\nย้อนหลัง 6 เดือน', // กำหนดชื่อกราฟที่นี่
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
            data: ['2024-06', '2024-05', '2024-04', '2024-03', '2024-02','2024-01'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'รถขาเข้า',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [totalsumcarinline1, totalsumcarinline2, totalsumcarinline3, totalsumcarinline4, totalsumcarinline5, totalsumcarinline6],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [totalsumcaroutline1, totalsumcaroutline2, totalsumcaroutline3, totalsumcaroutline4, totalsumcaroutline5, totalsumcaroutline6],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    lineChart.setOption(option);
  };

  render() {
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="lineChart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default LineCharts;
