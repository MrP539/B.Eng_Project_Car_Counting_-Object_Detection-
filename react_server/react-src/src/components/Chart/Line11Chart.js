import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line11Chart extends Component {
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
        totalsumcarinLineDay1, totalsumcarinLineDay2, totalsumcarinLineDay3,
        totalsumcarinLineDay4, totalsumcarinLineDay5, totalsumcarinLineDay6,
        totalsumcarinLineDay7, totalsumcarinLineDay8, totalsumcarinLineDay9,
        totalsumcarinLineDay10, totalsumcarinLineDay11, totalsumcarinLineDay12,
        totalsumcarinLineDay13, totalsumcarinLineDay14, totalsumcarinLineDay15,
        totalsumcarinLineDay16, totalsumcarinLineDay17, totalsumcarinLineDay18,
        totalsumcarinLineDay19, totalsumcarinLineDay20, totalsumcarinLineDay21,
        totalsumcarinLineDay22, totalsumcarinLineDay23, totalsumcarinLineDay24,

        totalsumcaroutLineDay1, totalsumcaroutLineDay2, totalsumcaroutLineDay3,
        totalsumcaroutLineDay4, totalsumcaroutLineDay5, totalsumcaroutLineDay6,
        totalsumcaroutLineDay7, totalsumcaroutLineDay8, totalsumcaroutLineDay9,
        totalsumcaroutLineDay10, totalsumcaroutLineDay11, totalsumcaroutLineDay12,
        totalsumcaroutLineDay13, totalsumcaroutLineDay14, totalsumcaroutLineDay15,
        totalsumcaroutLineDay16, totalsumcaroutLineDay17, totalsumcaroutLineDay18,
        totalsumcaroutLineDay19, totalsumcaroutLineDay20, totalsumcaroutLineDay21,
        totalsumcaroutLineDay22, totalsumcaroutLineDay23, totalsumcaroutLineDay24
    } = this.props;

    const line11Chart = echarts.init(document.getElementById('line11Chart'));
    const option = {
        title: {
            text: `จำนวนของรถยนต์ขาเข้าขาออกวันที่ ${this.context.selectedDay}`, // กำหนดชื่อกราฟที่นี่
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
              data: [ totalsumcarinLineDay1, totalsumcarinLineDay2, totalsumcarinLineDay3,
                totalsumcarinLineDay4, totalsumcarinLineDay5, totalsumcarinLineDay6,
                totalsumcarinLineDay7, totalsumcarinLineDay8, totalsumcarinLineDay9,
                totalsumcarinLineDay10, totalsumcarinLineDay11, totalsumcarinLineDay12,
                totalsumcarinLineDay13, totalsumcarinLineDay14, totalsumcarinLineDay15,
                totalsumcarinLineDay16, totalsumcarinLineDay17, totalsumcarinLineDay18,
                totalsumcarinLineDay19, totalsumcarinLineDay20, totalsumcarinLineDay21,
                totalsumcarinLineDay22, totalsumcarinLineDay23, totalsumcarinLineDay24,
                ],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [     totalsumcaroutLineDay1, totalsumcaroutLineDay2, totalsumcaroutLineDay3,
                totalsumcaroutLineDay4, totalsumcaroutLineDay5, totalsumcaroutLineDay6,
                totalsumcaroutLineDay7, totalsumcaroutLineDay8, totalsumcaroutLineDay9,
                totalsumcaroutLineDay10, totalsumcaroutLineDay11, totalsumcaroutLineDay12,
                totalsumcaroutLineDay13, totalsumcaroutLineDay14, totalsumcaroutLineDay15,
                totalsumcaroutLineDay16, totalsumcaroutLineDay17, totalsumcaroutLineDay18,
                totalsumcaroutLineDay19, totalsumcaroutLineDay20, totalsumcaroutLineDay21,
                totalsumcaroutLineDay22, totalsumcaroutLineDay23, totalsumcaroutLineDay24,
             ],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line11Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedDayago,selectedTwoDayago,selectedThreeDayago,selectedFourDayago,selectedFiveDayago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line11Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line11Chart;
