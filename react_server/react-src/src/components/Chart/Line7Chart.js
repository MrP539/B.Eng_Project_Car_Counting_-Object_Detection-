import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line7Chart extends Component {
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
      totalsumtruckinLineWeek1, totalsumtruckinLineWeek2, 
      totalsumtruckinLineWeek3, totalsumtruckinLineWeek4, 
      totalsumtruckinLineWeek5, totalsumtruckinLineWeek6,totalsumtruckinLineWeek7,
      totalsumtruckoutLineWeek1, totalsumtruckoutLineWeek2, 
      totalsumtruckoutLineWeek3, totalsumtruckoutLineWeek4, 
      totalsumtruckoutLineWeek5, totalsumtruckoutLineWeek6,totalsumtruckoutLineWeek7
    } = this.props;

    const line7Chart = echarts.init(document.getElementById('line7Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถบรรทุกขาเข้า-ขาออกรายสัปดาห์', // กำหนดชื่อกราฟที่นี่
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
              data: [totalsumtruckinLineWeek1, totalsumtruckinLineWeek2, totalsumtruckinLineWeek3, totalsumtruckinLineWeek4, totalsumtruckinLineWeek5, totalsumtruckinLineWeek6,totalsumtruckinLineWeek7],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'bar', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [totalsumtruckoutLineWeek1, totalsumtruckoutLineWeek2, totalsumtruckoutLineWeek3, totalsumtruckoutLineWeek4, totalsumtruckoutLineWeek5, totalsumtruckoutLineWeek6,totalsumtruckoutLineWeek7],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line7Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisMonth,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedMonthago,selectedTwoMonthago,selectedThreeMonthago,selectedFourMonthago,selectedFiveMonthago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line7Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line7Chart;
