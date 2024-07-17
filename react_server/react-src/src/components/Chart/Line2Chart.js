import React, { Component } from 'react';
import * as echarts from 'echarts'; // Import echarts

class Line2Charts extends Component {
  componentDidMount() {
    this.createLine2Chart();
  }

  componentDidUpdate(prevProps) {
    // Check if any of the props have changed
    if (prevProps !== this.props) {
      this.createLine2Chart();
    }
  }

  createLine2Chart = () => {
    const { 
      totalsumtruckinline1,
      totalsumtruckinline2,
      totalsumtruckinline3,
      totalsumtruckinline4,
      totalsumtruckinline5,
      totalsumtruckinline6,
      totalsumtruckoutline1,
      totalsumtruckoutline2,
      totalsumtruckoutline3,
      totalsumtruckoutline4,
      totalsumtruckoutline5,
      totalsumtruckoutline6
    } = this.props;
    
    console.log({
      totalsumtruckinline1,
      totalsumtruckinline2,
      totalsumtruckinline3,
      totalsumtruckinline4,
      totalsumtruckinline5,
      totalsumtruckinline6,
      totalsumtruckoutline1,
      totalsumtruckoutline2,
      totalsumtruckoutline3,
      totalsumtruckoutline4,
      totalsumtruckoutline5,
      totalsumtruckoutline6,
    });

    const line2Chart = echarts.init(document.getElementById('line2Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถบรรทุกขาเข้า-ขาออก\nย้อนหลัง 6 เดือน', // กำหนดชื่อกราฟที่นี่
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
                totalsumtruckinline1,
                totalsumtruckinline2,
                totalsumtruckinline3,
                totalsumtruckinline4,
                totalsumtruckinline5,
                totalsumtruckinline6
              ],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [
                totalsumtruckoutline1,
                totalsumtruckoutline2,
                totalsumtruckoutline3,
                totalsumtruckoutline4,
                totalsumtruckoutline5,
                totalsumtruckoutline6
              ],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };

    line2Chart.setOption(option);
  };

  render() {
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line2Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line2Charts;
