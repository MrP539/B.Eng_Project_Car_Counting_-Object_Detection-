import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts'; // Import echarts
import ReactEcharts from 'echarts-for-react'; // นำเข้า ReactEcharts

const Bargraph = () => {
  const [data, setData] = useState([]);
  const [totalSumCar, setTotalSumCar] = useState(0);
  const [totalSumTruck, setTotalSumTruck] = useState(0);
  const [totalSumMotorbike, setTotalSumMotorbike] = useState(0);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (totalSumCar !== 0 || totalSumTruck !== 0 || totalSumMotorbike !== 0 || totalSum !== 0) {
      createBarChart();
    }
  }, [totalSumCar, totalSumTruck, totalSumMotorbike, totalSum]);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/sums/')
      .then(response => {
        setData(response.data);
        calculateTotals(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const calculateTotals = (data) => {
    let sumCarTotal = 0;
    let sumTruckTotal = 0;
    let sumMotorbikeTotal = 0;
    let sumTotal = 0;

    data.forEach(item => {
      sumCarTotal += item.sumcar;
      sumTruckTotal += item.sumtruck;
      sumMotorbikeTotal += item.summotorbike;
      sumTotal += item.sum;
    });

    setTotalSumCar(sumCarTotal);
    setTotalSumTruck(sumTruckTotal);
    setTotalSumMotorbike(sumMotorbikeTotal);
    setTotalSum(sumTotal);
  }

  console.log(totalSumCar);

  const createBarChart = () => {
    const barChart = echarts.init(document.getElementById('barChart'));
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.','ศ.','ส.'],
      },
      yAxis: {},
      series: [
        {
          name: 'Value 1',
          type: 'bar',
          itemStyle: {
            color: 'blue', // Set color for the first set of bars
          },
          data: [totalSumCar, totalSumTruck, totalSumMotorbike, totalSum],
        },
      ],
    };
    barChart.setOption(option);
  }

  return (
    <div>
      <h1>Test Component</h1>
      <div id="barChart" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Bargraph;
