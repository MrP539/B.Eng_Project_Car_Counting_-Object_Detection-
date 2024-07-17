import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line13Chart extends Component {
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
        totalsummotorbikeinLineDay1, totalsummotorbikeinLineDay2, totalsummotorbikeinLineDay3,
        totalsummotorbikeinLineDay4, totalsummotorbikeinLineDay5, totalsummotorbikeinLineDay6,
        totalsummotorbikeinLineDay7, totalsummotorbikeinLineDay8, totalsummotorbikeinLineDay9,
        totalsummotorbikeinLineDay10, totalsummotorbikeinLineDay11, totalsummotorbikeinLineDay12,
        totalsummotorbikeinLineDay13, totalsummotorbikeinLineDay14, totalsummotorbikeinLineDay15,
        totalsummotorbikeinLineDay16, totalsummotorbikeinLineDay17, totalsummotorbikeinLineDay18,
        totalsummotorbikeinLineDay19, totalsummotorbikeinLineDay20, totalsummotorbikeinLineDay21,
        totalsummotorbikeinLineDay22, totalsummotorbikeinLineDay23, totalsummotorbikeinLineDay24,

        totalsummotorbikeoutLineDay1, totalsummotorbikeoutLineDay2, totalsummotorbikeoutLineDay3,
        totalsummotorbikeoutLineDay4, totalsummotorbikeoutLineDay5, totalsummotorbikeoutLineDay6,
        totalsummotorbikeoutLineDay7, totalsummotorbikeoutLineDay8, totalsummotorbikeoutLineDay9,
        totalsummotorbikeoutLineDay10, totalsummotorbikeoutLineDay11, totalsummotorbikeoutLineDay12,
        totalsummotorbikeoutLineDay13, totalsummotorbikeoutLineDay14, totalsummotorbikeoutLineDay15,
        totalsummotorbikeoutLineDay16, totalsummotorbikeoutLineDay17, totalsummotorbikeoutLineDay18,
        totalsummotorbikeoutLineDay19, totalsummotorbikeoutLineDay20, totalsummotorbikeoutLineDay21,
        totalsummotorbikeoutLineDay22, totalsummotorbikeoutLineDay23, totalsummotorbikeoutLineDay24
    } = this.props;

    const line13Chart = echarts.init(document.getElementById('line13Chart'));
    const option = {
        title: {
            text: `จำนวนของรถจักยานยนต์ขาเข้าขาออกวันที่ ${this.context.selectedDay}`, // กำหนดชื่อกราฟที่นี่
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
              data: [totalsummotorbikeinLineDay1, totalsummotorbikeinLineDay2, totalsummotorbikeinLineDay3,
                totalsummotorbikeinLineDay4, totalsummotorbikeinLineDay5, totalsummotorbikeinLineDay6,
                totalsummotorbikeinLineDay7, totalsummotorbikeinLineDay8, totalsummotorbikeinLineDay9,
                totalsummotorbikeinLineDay10, totalsummotorbikeinLineDay11, totalsummotorbikeinLineDay12,
                totalsummotorbikeinLineDay13, totalsummotorbikeinLineDay14, totalsummotorbikeinLineDay15,
                totalsummotorbikeinLineDay16, totalsummotorbikeinLineDay17, totalsummotorbikeinLineDay18,
                totalsummotorbikeinLineDay19, totalsummotorbikeinLineDay20, totalsummotorbikeinLineDay21,
                totalsummotorbikeinLineDay22, totalsummotorbikeinLineDay23, totalsummotorbikeinLineDay24,
                ],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [totalsummotorbikeoutLineDay1, totalsummotorbikeoutLineDay2, totalsummotorbikeoutLineDay3,
                totalsummotorbikeoutLineDay4, totalsummotorbikeoutLineDay5, totalsummotorbikeoutLineDay6,
                totalsummotorbikeoutLineDay7, totalsummotorbikeoutLineDay8, totalsummotorbikeoutLineDay9,
                totalsummotorbikeoutLineDay10, totalsummotorbikeoutLineDay11, totalsummotorbikeoutLineDay12,
                totalsummotorbikeoutLineDay13, totalsummotorbikeoutLineDay14, totalsummotorbikeoutLineDay15,
                totalsummotorbikeoutLineDay16, totalsummotorbikeoutLineDay17, totalsummotorbikeoutLineDay18,
                totalsummotorbikeoutLineDay19, totalsummotorbikeoutLineDay20, totalsummotorbikeoutLineDay21,
                totalsummotorbikeoutLineDay22, totalsummotorbikeoutLineDay23, totalsummotorbikeoutLineDay24,
             ],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line13Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisDay,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedDayago,selectedTwoDayago,selectedThreeDayago,selectedFourDayago,selectedFiveDayago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line13Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line13Chart;
