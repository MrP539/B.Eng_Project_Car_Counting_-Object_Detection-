import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line12Chart extends Component {
 static contextType = StateContext;
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
        totalsumtruckinLineDay1, totalsumtruckinLineDay2, totalsumtruckinLineDay3,
        totalsumtruckinLineDay4, totalsumtruckinLineDay5, totalsumtruckinLineDay6,
        totalsumtruckinLineDay7, totalsumtruckinLineDay8, totalsumtruckinLineDay9,
        totalsumtruckinLineDay10, totalsumtruckinLineDay11, totalsumtruckinLineDay12,
        totalsumtruckinLineDay13, totalsumtruckinLineDay14, totalsumtruckinLineDay15,
        totalsumtruckinLineDay16, totalsumtruckinLineDay17, totalsumtruckinLineDay18,
        totalsumtruckinLineDay19, totalsumtruckinLineDay20, totalsumtruckinLineDay21,
        totalsumtruckinLineDay22, totalsumtruckinLineDay23, totalsumtruckinLineDay24,

        totalsumtruckoutLineDay1, totalsumtruckoutLineDay2, totalsumtruckoutLineDay3,
        totalsumtruckoutLineDay4, totalsumtruckoutLineDay5, totalsumtruckoutLineDay6,
        totalsumtruckoutLineDay7, totalsumtruckoutLineDay8, totalsumtruckoutLineDay9,
        totalsumtruckoutLineDay10, totalsumtruckoutLineDay11, totalsumtruckoutLineDay12,
        totalsumtruckoutLineDay13, totalsumtruckoutLineDay14, totalsumtruckoutLineDay15,
        totalsumtruckoutLineDay16, totalsumtruckoutLineDay17, totalsumtruckoutLineDay18,
        totalsumtruckoutLineDay19, totalsumtruckoutLineDay20, totalsumtruckoutLineDay21,
        totalsumtruckoutLineDay22, totalsumtruckoutLineDay23, totalsumtruckoutLineDay24
    } = this.props;

    const line12Chart = echarts.init(document.getElementById('line12Chart'));
    const option = {
        title: {
            text: `จำนวนของบรรทุกขาเข้าขาออกวันที่ ${this.context.selectedDay}`, // กำหนดชื่อกราฟที่นี่
            textStyle: {
              fontSize: 13,
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
            data:[`00:00:00`,`01:00:00`, `02:00:00`, `03:00:00`,  `04:00:00`,  `05:00:00`, `06:00:00`, `07:00:00`,
            `08:00:00`, `09:00:00`, `10:00:00`,  `11:00:00`,  `12:00:00`, `13:00:00`, `14:00:00`,
            `15:00:00`, `16:00:00`, `17:00:00`,  `18:00:00`,  `19:00:00`, `20:00:00`, `21:00:00`,
            `22:00:00`, `23:00:00` ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'รถขาเข้า',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [ totalsumtruckinLineDay1, totalsumtruckinLineDay2, totalsumtruckinLineDay3,
                totalsumtruckinLineDay4, totalsumtruckinLineDay5, totalsumtruckinLineDay6,
                totalsumtruckinLineDay7, totalsumtruckinLineDay8, totalsumtruckinLineDay9,
                totalsumtruckinLineDay10, totalsumtruckinLineDay11, totalsumtruckinLineDay12,
                totalsumtruckinLineDay13, totalsumtruckinLineDay14, totalsumtruckinLineDay15,
                totalsumtruckinLineDay16, totalsumtruckinLineDay17, totalsumtruckinLineDay18,
                totalsumtruckinLineDay19, totalsumtruckinLineDay20, totalsumtruckinLineDay21,
                totalsumtruckinLineDay22, totalsumtruckinLineDay23, totalsumtruckinLineDay24,
                ],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [     totalsumtruckoutLineDay1, totalsumtruckoutLineDay2, totalsumtruckoutLineDay3,
                totalsumtruckoutLineDay4, totalsumtruckoutLineDay5, totalsumtruckoutLineDay6,
                totalsumtruckoutLineDay7, totalsumtruckoutLineDay8, totalsumtruckoutLineDay9,
                totalsumtruckoutLineDay10, totalsumtruckoutLineDay11, totalsumtruckoutLineDay12,
                totalsumtruckoutLineDay13, totalsumtruckoutLineDay14, totalsumtruckoutLineDay15,
                totalsumtruckoutLineDay16, totalsumtruckoutLineDay17, totalsumtruckoutLineDay18,
                totalsumtruckoutLineDay19, totalsumtruckoutLineDay20, totalsumtruckoutLineDay21,
                totalsumtruckoutLineDay22, totalsumtruckoutLineDay23, totalsumtruckoutLineDay24,
             ],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line12Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisDay,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedDayago,selectedTwoDayago,selectedThreeDayago,selectedFourDayago,selectedFiveDayago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line12Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line12Chart;
