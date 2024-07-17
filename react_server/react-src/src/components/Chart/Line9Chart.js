import React, {  Component, useContext, useEffect, useState } from 'react';
import * as echarts from 'echarts'; // Import echarts
import { StateContext } from '../ToolbarDetect/StateContext';

class Line9Chart extends Component {
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
        totalsumtruckinLineMonth1, totalsumtruckinLineMonth2, totalsumtruckinLineMonth3,
        totalsumtruckinLineMonth4, totalsumtruckinLineMonth5, totalsumtruckinLineMonth6,
        totalsumtruckinLineMonth7, totalsumtruckinLineMonth8, totalsumtruckinLineMonth9,
        totalsumtruckinLineMonth10, totalsumtruckinLineMonth11, totalsumtruckinLineMonth12,
        totalsumtruckinLineMonth13, totalsumtruckinLineMonth14, totalsumtruckinLineMonth15,
        totalsumtruckinLineMonth16, totalsumtruckinLineMonth17, totalsumtruckinLineMonth18,
        totalsumtruckinLineMonth19, totalsumtruckinLineMonth20, totalsumtruckinLineMonth21,
        totalsumtruckinLineMonth22, totalsumtruckinLineMonth23, totalsumtruckinLineMonth24,
        totalsumtruckinLineMonth25, totalsumtruckinLineMonth26, totalsumtruckinLineMonth27,
        totalsumtruckinLineMonth28, totalsumtruckinLineMonth29, totalsumtruckinLineMonth30,
        totalsumtruckinLineMonth31,
        totalsumtruckoutLineMonth1, totalsumtruckoutLineMonth2, totalsumtruckoutLineMonth3,
        totalsumtruckoutLineMonth4, totalsumtruckoutLineMonth5, totalsumtruckoutLineMonth6,
        totalsumtruckoutLineMonth7, totalsumtruckoutLineMonth8, totalsumtruckoutLineMonth9,
        totalsumtruckoutLineMonth10, totalsumtruckoutLineMonth11, totalsumtruckoutLineMonth12,
        totalsumtruckoutLineMonth13, totalsumtruckoutLineMonth14, totalsumtruckoutLineMonth15,
        totalsumtruckoutLineMonth16, totalsumtruckoutLineMonth17, totalsumtruckoutLineMonth18,
        totalsumtruckoutLineMonth19, totalsumtruckoutLineMonth20, totalsumtruckoutLineMonth21,
        totalsumtruckoutLineMonth22, totalsumtruckoutLineMonth23, totalsumtruckoutLineMonth24,
        totalsumtruckoutLineMonth25, totalsumtruckoutLineMonth26, totalsumtruckoutLineMonth27,
        totalsumtruckoutLineMonth28, totalsumtruckoutLineMonth29, totalsumtruckoutLineMonth30,
        totalsumtruckoutLineMonth31
    } = this.props;

    const line9Chart = echarts.init(document.getElementById('line9Chart'));
    const option = {
        title: {
            text: 'จำนวนของรถบรรทุกขาเข้า-ขาออกรายเดือน', // กำหนดชื่อกราฟที่นี่
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
              data: [ totalsumtruckinLineMonth1, totalsumtruckinLineMonth2, totalsumtruckinLineMonth3,
                totalsumtruckinLineMonth4, totalsumtruckinLineMonth5, totalsumtruckinLineMonth6,
                totalsumtruckinLineMonth7, totalsumtruckinLineMonth8, totalsumtruckinLineMonth9,
                totalsumtruckinLineMonth10, totalsumtruckinLineMonth11, totalsumtruckinLineMonth12,
                totalsumtruckinLineMonth13, totalsumtruckinLineMonth14, totalsumtruckinLineMonth15,
                totalsumtruckinLineMonth16, totalsumtruckinLineMonth17, totalsumtruckinLineMonth18,
                totalsumtruckinLineMonth19, totalsumtruckinLineMonth20, totalsumtruckinLineMonth21,
                totalsumtruckinLineMonth22, totalsumtruckinLineMonth23, totalsumtruckinLineMonth24,
                totalsumtruckinLineMonth25, totalsumtruckinLineMonth26, totalsumtruckinLineMonth27,
                totalsumtruckinLineMonth28, totalsumtruckinLineMonth29, totalsumtruckinLineMonth30,
                totalsumtruckinLineMonth31],
              itemStyle: {
                color: "#171D4B", // สีของแท่งกราฟ
              },
            },
            {
              name: 'รถขาออก',
              type: 'line', // เปลี่ยนเป็น 'bar' เพื่อให้เป็นกราฟแท่ง
              data: [     totalsumtruckoutLineMonth1, totalsumtruckoutLineMonth2, totalsumtruckoutLineMonth3,
                totalsumtruckoutLineMonth4, totalsumtruckoutLineMonth5, totalsumtruckoutLineMonth6,
                totalsumtruckoutLineMonth7, totalsumtruckoutLineMonth8, totalsumtruckoutLineMonth9,
                totalsumtruckoutLineMonth10, totalsumtruckoutLineMonth11, totalsumtruckoutLineMonth12,
                totalsumtruckoutLineMonth13, totalsumtruckoutLineMonth14, totalsumtruckoutLineMonth15,
                totalsumtruckoutLineMonth16, totalsumtruckoutLineMonth17, totalsumtruckoutLineMonth18,
                totalsumtruckoutLineMonth19, totalsumtruckoutLineMonth20, totalsumtruckoutLineMonth21,
                totalsumtruckoutLineMonth22, totalsumtruckoutLineMonth23, totalsumtruckoutLineMonth24,
                totalsumtruckoutLineMonth25, totalsumtruckoutLineMonth26, totalsumtruckoutLineMonth27,
                totalsumtruckoutLineMonth28, totalsumtruckoutLineMonth29, totalsumtruckoutLineMonth30,
                totalsumtruckoutLineMonth31],
              itemStyle: {
                color: "#04D0D9", // สีของแท่งกราฟ
              },
            },
            
          ],
    };
    line9Chart.setOption(option);
  };

  render() {
    const { selectedDay, selectedThisMonth,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedMonthago,selectedTwoMonthago,selectedThreeMonthago,selectedFourMonthago,selectedFiveMonthago } = this.context;
    
    return (
      <div>
        {/* Placeholder divs for your charts */}
        <div id="line9Chart" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }
}

export default Line9Chart;
