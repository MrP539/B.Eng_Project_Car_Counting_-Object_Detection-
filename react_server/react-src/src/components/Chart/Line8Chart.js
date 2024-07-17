import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line8Chart extends Component {
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
        totalsumcarinLineMonth1, totalsumcarinLineMonth2, totalsumcarinLineMonth3,
        totalsumcarinLineMonth4, totalsumcarinLineMonth5, totalsumcarinLineMonth6,
        totalsumcarinLineMonth7, totalsumcarinLineMonth8, totalsumcarinLineMonth9,
        totalsumcarinLineMonth10, totalsumcarinLineMonth11, totalsumcarinLineMonth12,
        totalsumcarinLineMonth13, totalsumcarinLineMonth14, totalsumcarinLineMonth15,
        totalsumcarinLineMonth16, totalsumcarinLineMonth17, totalsumcarinLineMonth18,
        totalsumcarinLineMonth19, totalsumcarinLineMonth20, totalsumcarinLineMonth21,
        totalsumcarinLineMonth22, totalsumcarinLineMonth23, totalsumcarinLineMonth24,
        totalsumcarinLineMonth25, totalsumcarinLineMonth26, totalsumcarinLineMonth27,
        totalsumcarinLineMonth28, totalsumcarinLineMonth29, totalsumcarinLineMonth30,
        totalsumcarinLineMonth31,
        totalsumcaroutLineMonth1, totalsumcaroutLineMonth2, totalsumcaroutLineMonth3,
        totalsumcaroutLineMonth4, totalsumcaroutLineMonth5, totalsumcaroutLineMonth6,
        totalsumcaroutLineMonth7, totalsumcaroutLineMonth8, totalsumcaroutLineMonth9,
        totalsumcaroutLineMonth10, totalsumcaroutLineMonth11, totalsumcaroutLineMonth12,
        totalsumcaroutLineMonth13, totalsumcaroutLineMonth14, totalsumcaroutLineMonth15,
        totalsumcaroutLineMonth16, totalsumcaroutLineMonth17, totalsumcaroutLineMonth18,
        totalsumcaroutLineMonth19, totalsumcaroutLineMonth20, totalsumcaroutLineMonth21,
        totalsumcaroutLineMonth22, totalsumcaroutLineMonth23, totalsumcaroutLineMonth24,
        totalsumcaroutLineMonth25, totalsumcaroutLineMonth26, totalsumcaroutLineMonth27,
        totalsumcaroutLineMonth28, totalsumcaroutLineMonth29, totalsumcaroutLineMonth30,
        totalsumcaroutLineMonth31
    } = this.props;

    const line8Chart = echarts.init(document.getElementById('line8Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถยนต์ขาเข้า-ขาออกรายเดือน', // กำหนดชื่อกราฟที่นี่
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
            data:[`${this.context.selectedThisMonth}-01`, `${this.context.selectedThisMonth}-02`, `${this.context.selectedThisMonth}-03`,  `${this.context.selectedThisMonth}-04`,  `${this.context.selectedThisMonth}-05`, `${this.context.selectedThisMonth}-06`, `${this.context.selectedThisMonth}-07`,
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
              data: [ totalsumcarinLineMonth1, totalsumcarinLineMonth2, totalsumcarinLineMonth3,
                totalsumcarinLineMonth4, totalsumcarinLineMonth5, totalsumcarinLineMonth6,
                totalsumcarinLineMonth7, totalsumcarinLineMonth8, totalsumcarinLineMonth9,
                totalsumcarinLineMonth10, totalsumcarinLineMonth11, totalsumcarinLineMonth12,
                totalsumcarinLineMonth13, totalsumcarinLineMonth14, totalsumcarinLineMonth15,
                totalsumcarinLineMonth16, totalsumcarinLineMonth17, totalsumcarinLineMonth18,
                totalsumcarinLineMonth19, totalsumcarinLineMonth20, totalsumcarinLineMonth21,
                totalsumcarinLineMonth22, totalsumcarinLineMonth23, totalsumcarinLineMonth24,
                totalsumcarinLineMonth25, totalsumcarinLineMonth26, totalsumcarinLineMonth27,
                totalsumcarinLineMonth28, totalsumcarinLineMonth29, totalsumcarinLineMonth30,
                totalsumcarinLineMonth31],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'line', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [     totalsumcaroutLineMonth1, totalsumcaroutLineMonth2, totalsumcaroutLineMonth3,
                totalsumcaroutLineMonth4, totalsumcaroutLineMonth5, totalsumcaroutLineMonth6,
                totalsumcaroutLineMonth7, totalsumcaroutLineMonth8, totalsumcaroutLineMonth9,
                totalsumcaroutLineMonth10, totalsumcaroutLineMonth11, totalsumcaroutLineMonth12,
                totalsumcaroutLineMonth13, totalsumcaroutLineMonth14, totalsumcaroutLineMonth15,
                totalsumcaroutLineMonth16, totalsumcaroutLineMonth17, totalsumcaroutLineMonth18,
                totalsumcaroutLineMonth19, totalsumcaroutLineMonth20, totalsumcaroutLineMonth21,
                totalsumcaroutLineMonth22, totalsumcaroutLineMonth23, totalsumcaroutLineMonth24,
                totalsumcaroutLineMonth25, totalsumcaroutLineMonth26, totalsumcaroutLineMonth27,
                totalsumcaroutLineMonth28, totalsumcaroutLineMonth29, totalsumcaroutLineMonth30,
                totalsumcaroutLineMonth31],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line8Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisMonth,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedMonthago,selectedTwoMonthago,selectedThreeMonthago,selectedFourMonthago,selectedFiveMonthago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line8Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line8Chart;
