import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line10Chart extends Component {
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
        totalsummotorbikeinLineMonth1, totalsummotorbikeinLineMonth2, totalsummotorbikeinLineMonth3,
        totalsummotorbikeinLineMonth4, totalsummotorbikeinLineMonth5, totalsummotorbikeinLineMonth6,
        totalsummotorbikeinLineMonth7, totalsummotorbikeinLineMonth8, totalsummotorbikeinLineMonth9,
        totalsummotorbikeinLineMonth10, totalsummotorbikeinLineMonth11, totalsummotorbikeinLineMonth12,
        totalsummotorbikeinLineMonth13, totalsummotorbikeinLineMonth14, totalsummotorbikeinLineMonth15,
        totalsummotorbikeinLineMonth16, totalsummotorbikeinLineMonth17, totalsummotorbikeinLineMonth18,
        totalsummotorbikeinLineMonth19, totalsummotorbikeinLineMonth20, totalsummotorbikeinLineMonth21,
        totalsummotorbikeinLineMonth22, totalsummotorbikeinLineMonth23, totalsummotorbikeinLineMonth24,
        totalsummotorbikeinLineMonth25, totalsummotorbikeinLineMonth26, totalsummotorbikeinLineMonth27,
        totalsummotorbikeinLineMonth28, totalsummotorbikeinLineMonth29, totalsummotorbikeinLineMonth30,
        totalsummotorbikeinLineMonth31,
        totalsummotorbikeoutLineMonth1, totalsummotorbikeoutLineMonth2, totalsummotorbikeoutLineMonth3,
        totalsummotorbikeoutLineMonth4, totalsummotorbikeoutLineMonth5, totalsummotorbikeoutLineMonth6,
        totalsummotorbikeoutLineMonth7, totalsummotorbikeoutLineMonth8, totalsummotorbikeoutLineMonth9,
        totalsummotorbikeoutLineMonth10, totalsummotorbikeoutLineMonth11, totalsummotorbikeoutLineMonth12,
        totalsummotorbikeoutLineMonth13, totalsummotorbikeoutLineMonth14, totalsummotorbikeoutLineMonth15,
        totalsummotorbikeoutLineMonth16, totalsummotorbikeoutLineMonth17, totalsummotorbikeoutLineMonth18,
        totalsummotorbikeoutLineMonth19, totalsummotorbikeoutLineMonth20, totalsummotorbikeoutLineMonth21,
        totalsummotorbikeoutLineMonth22, totalsummotorbikeoutLineMonth23, totalsummotorbikeoutLineMonth24,
        totalsummotorbikeoutLineMonth25, totalsummotorbikeoutLineMonth26, totalsummotorbikeoutLineMonth27,
        totalsummotorbikeoutLineMonth28, totalsummotorbikeoutLineMonth29, totalsummotorbikeoutLineMonth30,
        totalsummotorbikeoutLineMonth31
    } = this.props;

    const line10Chart = echarts.init(document.getElementById('line10Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถจักยานยนต์ขาเข้า-ขาออกรายเดือน', // กำหนดชื่อกราฟที่นี่
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
            data: [`${this.context.selectedThisMonth}-01`, `${this.context.selectedThisMonth}-02`, `${this.context.selectedThisMonth}-03`,  `${this.context.selectedThisMonth}-04`,  `${this.context.selectedThisMonth}-05`, `${this.context.selectedThisMonth}-06`, `${this.context.selectedThisMonth}-07`,
            `${this.context.selectedThisMonth}-08`, `${this.context.selectedThisMonth}-09`, `${this.context.selectedThisMonth}-10`,  `${this.context.selectedThisMonth}-11`,  `${this.context.selectedThisMonth}-12`, `${this.context.selectedThisMonth}-13`, `${this.context.selectedThisMonth}-14`,
            `${this.context.selectedThisMonth}-15`, `${this.context.selectedThisMonth}-16`, `${this.context.selectedThisMonth}-17`,  `${this.context.selectedThisMonth}-18`,  `${this.context.selectedThisMonth}-19`, `${this.context.selectedThisMonth}-20`, `${this.context.selectedThisMonth}-21`,
            `${this.context.selectedThisMonth}-22`, `${this.context.selectedThisMonth}-23`, `${this.context.selectedThisMonth}-24`,  `${this.context.selectedThisMonth}-25`,  `${this.context.selectedThisMonth}-26`, `${this.context.selectedThisMonth}-27`, `${this.context.selectedThisMonth}-28`,
            `${this.context.selectedThisMonth}-29`, `${this.context.selectedThisMonth}-30`, `${this.context.selectedThisMonth}-31`],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'รถขาเข้า',
              type: 'line', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [ totalsummotorbikeinLineMonth1, totalsummotorbikeinLineMonth2, totalsummotorbikeinLineMonth3,
                totalsummotorbikeinLineMonth4, totalsummotorbikeinLineMonth5, totalsummotorbikeinLineMonth6,
                totalsummotorbikeinLineMonth7, totalsummotorbikeinLineMonth8, totalsummotorbikeinLineMonth9,
                totalsummotorbikeinLineMonth10, totalsummotorbikeinLineMonth11, totalsummotorbikeinLineMonth12,
                totalsummotorbikeinLineMonth13, totalsummotorbikeinLineMonth14, totalsummotorbikeinLineMonth15,
                totalsummotorbikeinLineMonth16, totalsummotorbikeinLineMonth17, totalsummotorbikeinLineMonth18,
                totalsummotorbikeinLineMonth19, totalsummotorbikeinLineMonth20, totalsummotorbikeinLineMonth21,
                totalsummotorbikeinLineMonth22, totalsummotorbikeinLineMonth23, totalsummotorbikeinLineMonth24,
                totalsummotorbikeinLineMonth25, totalsummotorbikeinLineMonth26, totalsummotorbikeinLineMonth27,
                totalsummotorbikeinLineMonth28, totalsummotorbikeinLineMonth29, totalsummotorbikeinLineMonth30,
                totalsummotorbikeinLineMonth31],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'line', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [     totalsummotorbikeoutLineMonth1, totalsummotorbikeoutLineMonth2, totalsummotorbikeoutLineMonth3,
                totalsummotorbikeoutLineMonth4, totalsummotorbikeoutLineMonth5, totalsummotorbikeoutLineMonth6,
                totalsummotorbikeoutLineMonth7, totalsummotorbikeoutLineMonth8, totalsummotorbikeoutLineMonth9,
                totalsummotorbikeoutLineMonth10, totalsummotorbikeoutLineMonth11, totalsummotorbikeoutLineMonth12,
                totalsummotorbikeoutLineMonth13, totalsummotorbikeoutLineMonth14, totalsummotorbikeoutLineMonth15,
                totalsummotorbikeoutLineMonth16, totalsummotorbikeoutLineMonth17, totalsummotorbikeoutLineMonth18,
                totalsummotorbikeoutLineMonth19, totalsummotorbikeoutLineMonth20, totalsummotorbikeoutLineMonth21,
                totalsummotorbikeoutLineMonth22, totalsummotorbikeoutLineMonth23, totalsummotorbikeoutLineMonth24,
                totalsummotorbikeoutLineMonth25, totalsummotorbikeoutLineMonth26, totalsummotorbikeoutLineMonth27,
                totalsummotorbikeoutLineMonth28, totalsummotorbikeoutLineMonth29, totalsummotorbikeoutLineMonth30,
                totalsummotorbikeoutLineMonth31],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line10Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisMonth,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedMonthago,selectedTwoMonthago,selectedThreeMonthago,selectedFourMonthago,selectedFiveMonthago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line10Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line10Chart;
