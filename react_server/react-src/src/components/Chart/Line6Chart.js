import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line6Chart extends Component {
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
      totalsummotorbikeinLineWeek1, totalsummotorbikeinLineWeek2, 
      totalsummotorbikeinLineWeek3, totalsummotorbikeinLineWeek4, 
      totalsummotorbikeinLineWeek5, totalsummotorbikeinLineWeek6,totalsummotorbikeinLineWeek7,
      totalsummotorbikeoutLineWeek1, totalsummotorbikeoutLineWeek2, 
      totalsummotorbikeoutLineWeek3, totalsummotorbikeoutLineWeek4, 
      totalsummotorbikeoutLineWeek5, totalsummotorbikeoutLineWeek6,totalsummotorbikeoutLineWeek7
    } = this.props;

    const line6Chart = echarts.init(document.getElementById('line6Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถจักยานยนต์ขาเข้า-ขาออกรายสัปดาห์', // กำหนดชื่อกราฟที่นี่
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
            data: [this.context.selectedDay, this.context.selectedDay1ago, this.context.selectedDay2ago,  this.context.selectedDay3ago,  this.context.selectedDay4ago, this.context.selectedDay5ago, this.context.selectedDay6ago],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'รถขาเข้า',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [totalsummotorbikeinLineWeek1, totalsummotorbikeinLineWeek2, totalsummotorbikeinLineWeek3, totalsummotorbikeinLineWeek4, totalsummotorbikeinLineWeek5, totalsummotorbikeinLineWeek6,totalsummotorbikeinLineWeek7],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [totalsummotorbikeoutLineWeek1, totalsummotorbikeoutLineWeek2, totalsummotorbikeoutLineWeek3, totalsummotorbikeoutLineWeek4, totalsummotorbikeoutLineWeek5, totalsummotorbikeoutLineWeek6,totalsummotorbikeoutLineWeek7],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line6Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisMonth,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedMonthago,selectedTwoMonthago,selectedThreeMonthago,selectedFourMonthago,selectedFiveMonthago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line6Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line6Chart;
