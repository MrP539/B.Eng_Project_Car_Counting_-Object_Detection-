import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react'; // Import ReactEcharts

const Piegraph = () => {
  const [data, setData] = useState([]);
  const [totalSumCar, setTotalSumCar] = useState(0);
  const [totalSumTruck, setTotalSumTruck] = useState(0);
  const [totalSumMotorbike, setTotalSumMotorbike] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotals(data);
  }, [data]);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/sums/?gatein=1', {
      params: {
        gatein: 1
      }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const calculateTotals = (data) => {
    let sumCarTotal = 0;
    let sumTruckTotal = 0;
    let sumMotorbikeTotal = 0;

    data.forEach(item => {
      sumCarTotal += item.sumcar;
      sumTruckTotal += item.sumtruck;
      sumMotorbikeTotal += item.summotorbike;
    });

    setTotalSumCar(sumCarTotal);
    setTotalSumTruck(sumTruckTotal);
    setTotalSumMotorbike(sumMotorbikeTotal);
  }

  const createPieChart = () => {
    // Prepare data for pie chart
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Vehicle Type',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: totalSumCar, name: 'Car' },
            { value: totalSumTruck, name: 'Truck' },
            { value: totalSumMotorbike, name: 'Motorbike' }
          ]
        }
      ]
    };
    return option;
  }

  return (
    <div>
      <h1>Pie Graph Component</h1>
      <div style={{ width: '100%', height: '400px' }}>
        <ReactEcharts option={createPieChart()} />
      </div>
    </div>
  );
};

export default Piegraph;
