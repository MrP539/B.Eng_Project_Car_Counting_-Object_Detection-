import React, { useState, useEffect,useContext  } from 'react';
import * as echarts from 'echarts'; // Import all exports as 'echarts'
import { Menu, Container, Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Menubar from '../MenuBar/Menubar';
import './Door.css';
import LineChart from '../Chart/LineChart';
import Line1Chart from '../Chart/Line1Chart'; 
import Line2Chart from '../Chart/Line2Chart';
import Line5Chart from '../Chart/Line5Chart';
import Line6Chart from '../Chart/Line6Chart'; 
import Line7Chart from '../Chart/Line7Chart'; 
import Line8Chart from '../Chart/Line8Chart';
import Line9Chart from '../Chart/Line9Chart';
import Line10Chart from '../Chart/Line10Chart';
import Line11Chart from '../Chart/Line11Chart';
import Line12Chart from '../Chart/Line12Chart';
import Line13Chart from '../Chart/Line13Chart';
import GateMotorcycleInOut from '../TotalGate/GateMotorcycleInOut'; 
import GateTruckInOut from '../TotalGate/GateTruckInOut'; 
import GateCarInOut from '../TotalGate/GateCarInOut'; 
import Pie2Chart from '../GateChart/Pie2Chart'; 
import Pie1GateChart from '../GateChart/Pie1GateChart';
import Pie3GateChart from '../GateChart/PIe3GateChart';
import Pie4GateChart from '../GateChart/PIe4GateChart';
import axios from 'axios';
import ImageSlot from '../ImageSlot/ImageSlot';
import WeeklyInOut from '../TotalCar/WeeklyInOut';
import CarInOut from '../TotalCar/CarInOut'; 
import CarInOut1 from '../TotalCar/CarInOut1';
import CarInOut2 from '../TotalCar/CarInOut2';
import CarInOut3 from '../TotalCar/CarInOut3';
import MotorcycleInOut from '../TotalCar/MotorcycleInOut'; 
import MotorcycleInOut1 from '../TotalCar/MotorcycleInOut1'
import MotorcycleInOut2 from '../TotalCar/MotorcycleInOut2'
import MotorcycleInOut3 from '../TotalCar/MotorcycleInOut3';
import TruckInOut from '../TotalCar/TruckInOut'; 
import TruckInOut1 from '../TotalCar/TruckInOut1';
import TruckInOut2 from '../TotalCar/TruckInOut2';
import TruckInOut3 from '../TotalCar/TruckInOut3';
import { Hourglass } from 'react-loader-spinner'
import { Backdrop } from '@mui/material'; // Import Material-UI Components
import { StateContext } from '../ToolbarDetect/StateContext';
import DropdownPie1 from '../Chart/DropdownPie1'
import DaySelect1 from '../Timeselect/DaySelect1';
import MonthSelect from '../Timeselect/MonthSelect';
import MonthSelect1 from '../Timeselect/MonthSelect1';
import WeekSelect from '../Timeselect/WeekSelect';
import GateInfo from '../TotalCar/TypeGate';

const Door = () => {
  
  const { _id } = useParams();
  const [startIndex, setStartIndex] = useState(0);
  const rowsPerPage = 50; // Number of rows to display per page
  const { setIsLoading,
          setSelectedMonthago,
          setSelectedDay,
          setSelectedDay2ago } = useContext(StateContext);
  const { selectedDay, 
          selectedDay1ago, 
          selectedDay2ago, 
          selectedDay3ago,
          selectedThisMonth, 
          selectedMonthago,
          isLoading } = useContext(StateContext);
  const [gates, setGates] = useState(null); // State for gates data
  const [loading, setLoading] = useState(false); // เพิ่ม state เพื่อติดตามสถานะการโหลด
  const [totalsum1, setTotalSum1] = useState(0); // State for total sum 1
  const [totalsum2, setTotalSum2] = useState(0); // State for total sum 2
  const [selectedDate, setSelectDate] = useState(new Date());
  const [totalsumcarinline1,setTotalsumcarinline1] = useState(0);
  const [totalsumcarinline2,setTotalsumcarinline2] = useState(0);
  const [totalsumcarinline3,setTotalsumcarinline3] = useState(0);
  const [totalsumcarinline4,setTotalsumcarinline4] = useState(0);
  const [totalsumcarinline5,setTotalsumcarinline5] = useState(0);
  const [totalsumcarinline6,setTotalsumcarinline6] = useState(0);
  const [totalsumtruckinline1, setTotalsumtruckinline1] = useState(0);
  const [totalsumtruckinline2, setTotalsumtruckinline2] = useState(0);
  const [totalsumtruckinline3, setTotalsumtruckinline3] = useState(0);
  const [totalsumtruckinline4, setTotalsumtruckinline4] = useState(0);
  const [totalsumtruckinline5, setTotalsumtruckinline5] = useState(0);
  const [totalsumtruckinline6, setTotalsumtruckinline6] = useState(0);
  const [totalsummotorbikeinline1, setTotalsummotorbikeinline1] = useState(0);
  const [totalsummotorbikeinline2, setTotalsummotorbikeinline2] = useState(0);
  const [totalsummotorbikeinline3, setTotalsummotorbikeinline3] = useState(0);
  const [totalsummotorbikeinline4, setTotalsummotorbikeinline4] = useState(0);
  const [totalsummotorbikeinline5, setTotalsummotorbikeinline5] = useState(0);
  const [totalsummotorbikeinline6, setTotalsummotorbikeinline6] = useState(0);
  const [totalsumcaroutline1, setTotalsumcaroutline1] = useState(0);
  const [totalsumcaroutline2, setTotalsumcaroutline2] = useState(0);
  const [totalsumcaroutline3, setTotalsumcaroutline3] = useState(0);
  const [totalsumcaroutline4, setTotalsumcaroutline4] = useState(0);
  const [totalsumcaroutline5, setTotalsumcaroutline5] = useState(0);
  const [totalsumcaroutline6, setTotalsumcaroutline6] = useState(0);
  const [totalsumtruckoutline1, setTotalsumtruckoutline1] = useState(0);
  const [totalsumtruckoutline2, setTotalsumtruckoutline2] = useState(0);
  const [totalsumtruckoutline3, setTotalsumtruckoutline3] = useState(0);
  const [totalsumtruckoutline4, setTotalsumtruckoutline4] = useState(0);
  const [totalsumtruckoutline5, setTotalsumtruckoutline5] = useState(0);
  const [totalsumtruckoutline6, setTotalsumtruckoutline6] = useState(0);
  const [totalsummotorbikeoutline1, setTotalsummotorbikeoutline1] = useState(0);
  const [totalsummotorbikeoutline2, setTotalsummotorbikeoutline2] = useState(0);
  const [totalsummotorbikeoutline3, setTotalsummotorbikeoutline3] = useState(0);
  const [totalsummotorbikeoutline4, setTotalsummotorbikeoutline4] = useState(0);
  const [totalsummotorbikeoutline5, setTotalsummotorbikeoutline5] = useState(0);
  const [totalsummotorbikeoutline6, setTotalsummotorbikeoutline6] = useState(0);
  const [totalsumscarin, setTotalsumscarin] = useState(0);
  const [totalsumstruckin, setTotalsumstruckin] = useState(0);
  const [totalsumsmotorbikein, setTotalsumsmotorbikein] = useState(0);
  const [totalsumscarout, setTotalsumscarout] = useState(0);
  const [totalsumstruckout, setTotalsumstruckout] = useState(0);
  const [totalsumsmotorbikeout, setTotalsumsmotorbikeout] = useState(0);
  const [totalsumsDayIn, setTotalsumsDayIn] = useState(0);
  const [totalsumsDayOut, setTotalsumsDayOut] = useState(0);
  const [totalsumsWeekIn, setTotalsumsWeekIn] = useState(0);
  const [totalsumsWeekOut, setTotalsumsWeekOut] = useState(0);
  const [totalsumcarinLineWeek1, setTotalsumcarinLineWeek1] = useState(0);
  const [totalsumcarinLineWeek2, setTotalsumcarinLineWeek2] = useState(0);
  const [totalsumcarinLineWeek3, setTotalsumcarinLineWeek3] = useState(0);
  const [totalsumcarinLineWeek4, setTotalsumcarinLineWeek4] = useState(0);
  const [totalsumcarinLineWeek5, setTotalsumcarinLineWeek5] = useState(0);
  const [totalsumcarinLineWeek6, setTotalsumcarinLineWeek6] = useState(0);
  const [totalsumcarinLineWeek7, setTotalsumcarinLineWeek7] = useState(0);
  const [totalsumtruckinLineWeek1, setTotalsumtruckinLineWeek1] = useState(0);
  const [totalsumtruckinLineWeek2, setTotalsumtruckinLineWeek2] = useState(0);
  const [totalsumtruckinLineWeek3, setTotalsumtruckinLineWeek3] = useState(0);
  const [totalsumtruckinLineWeek4, setTotalsumtruckinLineWeek4] = useState(0);
  const [totalsumtruckinLineWeek5, setTotalsumtruckinLineWeek5] = useState(0);
  const [totalsumtruckinLineWeek6, setTotalsumtruckinLineWeek6] = useState(0);
  const [totalsumtruckinLineWeek7, setTotalsumtruckinLineWeek7] = useState(0);
  const [totalsummotorbikeinLineWeek1, setTotalsummotorbikeinLineWeek1] = useState(0);
  const [totalsummotorbikeinLineWeek2, setTotalsummotorbikeinLineWeek2] = useState(0);
  const [totalsummotorbikeinLineWeek3, setTotalsummotorbikeinLineWeek3] = useState(0);
  const [totalsummotorbikeinLineWeek4, setTotalsummotorbikeinLineWeek4] = useState(0);
  const [totalsummotorbikeinLineWeek5, setTotalsummotorbikeinLineWeek5] = useState(0);
  const [totalsummotorbikeinLineWeek6, setTotalsummotorbikeinLineWeek6] = useState(0);
  const [totalsummotorbikeinLineWeek7, setTotalsummotorbikeinLineWeek7] = useState(0);
  const [totalsumcaroutLineWeek1, setTotalsumcaroutLineWeek1] = useState(0);
  const [totalsumcaroutLineWeek2, setTotalsumcaroutLineWeek2] = useState(0);
  const [totalsumcaroutLineWeek3, setTotalsumcaroutLineWeek3] = useState(0);
  const [totalsumcaroutLineWeek4, setTotalsumcaroutLineWeek4] = useState(0);
  const [totalsumcaroutLineWeek5, setTotalsumcaroutLineWeek5] = useState(0);
  const [totalsumcaroutLineWeek6, setTotalsumcaroutLineWeek6] = useState(0);
  const [totalsumcaroutLineWeek7, setTotalsumcaroutLineWeek7] = useState(0);
  const [totalsumtruckoutLineWeek1, setTotalsumtruckoutLineWeek1] = useState(0);
  const [totalsumtruckoutLineWeek2, setTotalsumtruckoutLineWeek2] = useState(0);
  const [totalsumtruckoutLineWeek3, setTotalsumtruckoutLineWeek3] = useState(0);
  const [totalsumtruckoutLineWeek4, setTotalsumtruckoutLineWeek4] = useState(0);
  const [totalsumtruckoutLineWeek5, setTotalsumtruckoutLineWeek5] = useState(0);
  const [totalsumtruckoutLineWeek6, setTotalsumtruckoutLineWeek6] = useState(0);
  const [totalsumtruckoutLineWeek7, setTotalsumtruckoutLineWeek7] = useState(0);
  const [totalsummotorbikeoutLineWeek1, setTotalsummotorbikeoutLineWeek1] = useState(0);
  const [totalsummotorbikeoutLineWeek2, setTotalsummotorbikeoutLineWeek2] = useState(0);
  const [totalsummotorbikeoutLineWeek3, setTotalsummotorbikeoutLineWeek3] = useState(0);
  const [totalsummotorbikeoutLineWeek4, setTotalsummotorbikeoutLineWeek4] = useState(0);
  const [totalsummotorbikeoutLineWeek5, setTotalsummotorbikeoutLineWeek5] = useState(0);
  const [totalsummotorbikeoutLineWeek6, setTotalsummotorbikeoutLineWeek6] = useState(0);
  const [totalsummotorbikeoutLineWeek7, setTotalsummotorbikeoutLineWeek7] = useState(0);
  const [totalsumsMonthIn, setTotalsumsMonthIn] = useState(0);
  const [totalsumsMonthOut, setTotalsumsMonthOut] = useState(0);
  const [totalsumcarinLineMonth1, setTotalsumcarinLineMonth1] = useState(0);
  const [totalsumcarinLineMonth2, setTotalsumcarinLineMonth2] = useState(0);
  const [totalsumcarinLineMonth3, setTotalsumcarinLineMonth3] = useState(0);
  const [totalsumcarinLineMonth4, setTotalsumcarinLineMonth4] = useState(0);
  const [totalsumcarinLineMonth5, setTotalsumcarinLineMonth5] = useState(0);
  const [totalsumcarinLineMonth6, setTotalsumcarinLineMonth6] = useState(0);
  const [totalsumcarinLineMonth7, setTotalsumcarinLineMonth7] = useState(0);
  const [totalsumcarinLineMonth8, setTotalsumcarinLineMonth8] = useState(0);
  const [totalsumcarinLineMonth9, setTotalsumcarinLineMonth9] = useState(0);
  const [totalsumcarinLineMonth10, setTotalsumcarinLineMonth10] = useState(0);
  const [totalsumcarinLineMonth11, setTotalsumcarinLineMonth11] = useState(0);
  const [totalsumcarinLineMonth12, setTotalsumcarinLineMonth12] = useState(0);
  const [totalsumcarinLineMonth13, setTotalsumcarinLineMonth13] = useState(0);
  const [totalsumcarinLineMonth14, setTotalsumcarinLineMonth14] = useState(0);
  const [totalsumcarinLineMonth15, setTotalsumcarinLineMonth15] = useState(0);
  const [totalsumcarinLineMonth16, setTotalsumcarinLineMonth16] = useState(0);
  const [totalsumcarinLineMonth17, setTotalsumcarinLineMonth17] = useState(0);
  const [totalsumcarinLineMonth18, setTotalsumcarinLineMonth18] = useState(0);
  const [totalsumcarinLineMonth19, setTotalsumcarinLineMonth19] = useState(0);
  const [totalsumcarinLineMonth20, setTotalsumcarinLineMonth20] = useState(0);
  const [totalsumcarinLineMonth21, setTotalsumcarinLineMonth21] = useState(0);
  const [totalsumcarinLineMonth22, setTotalsumcarinLineMonth22] = useState(0);
  const [totalsumcarinLineMonth23, setTotalsumcarinLineMonth23] = useState(0);
  const [totalsumcarinLineMonth24, setTotalsumcarinLineMonth24] = useState(0);
  const [totalsumcarinLineMonth25, setTotalsumcarinLineMonth25] = useState(0);
  const [totalsumcarinLineMonth26, setTotalsumcarinLineMonth26] = useState(0);
  const [totalsumcarinLineMonth27, setTotalsumcarinLineMonth27] = useState(0);
  const [totalsumcarinLineMonth28, setTotalsumcarinLineMonth28] = useState(0);
  const [totalsumcarinLineMonth29, setTotalsumcarinLineMonth29] = useState(0);
  const [totalsumcarinLineMonth30, setTotalsumcarinLineMonth30] = useState(0);
  const [totalsumcarinLineMonth31, setTotalsumcarinLineMonth31] = useState(0);

  const [totalsumcaroutLineMonth1, setTotalsumcaroutLineMonth1] = useState(0);
  const [totalsumcaroutLineMonth2, setTotalsumcaroutLineMonth2] = useState(0);
  const [totalsumcaroutLineMonth3, setTotalsumcaroutLineMonth3] = useState(0);
  const [totalsumcaroutLineMonth4, setTotalsumcaroutLineMonth4] = useState(0);
  const [totalsumcaroutLineMonth5, setTotalsumcaroutLineMonth5] = useState(0);
  const [totalsumcaroutLineMonth6, setTotalsumcaroutLineMonth6] = useState(0);
  const [totalsumcaroutLineMonth7, setTotalsumcaroutLineMonth7] = useState(0);
  const [totalsumcaroutLineMonth8, setTotalsumcaroutLineMonth8] = useState(0);
  const [totalsumcaroutLineMonth9, setTotalsumcaroutLineMonth9] = useState(0);
  const [totalsumcaroutLineMonth10, setTotalsumcaroutLineMonth10] = useState(0);
  const [totalsumcaroutLineMonth11, setTotalsumcaroutLineMonth11] = useState(0);
  const [totalsumcaroutLineMonth12, setTotalsumcaroutLineMonth12] = useState(0);
  const [totalsumcaroutLineMonth13, setTotalsumcaroutLineMonth13] = useState(0);
  const [totalsumcaroutLineMonth14, setTotalsumcaroutLineMonth14] = useState(0);
  const [totalsumcaroutLineMonth15, setTotalsumcaroutLineMonth15] = useState(0);
  const [totalsumcaroutLineMonth16, setTotalsumcaroutLineMonth16] = useState(0);
  const [totalsumcaroutLineMonth17, setTotalsumcaroutLineMonth17] = useState(0);
  const [totalsumcaroutLineMonth18, setTotalsumcaroutLineMonth18] = useState(0);
  const [totalsumcaroutLineMonth19, setTotalsumcaroutLineMonth19] = useState(0);
  const [totalsumcaroutLineMonth20, setTotalsumcaroutLineMonth20] = useState(0);
  const [totalsumcaroutLineMonth21, setTotalsumcaroutLineMonth21] = useState(0);
  const [totalsumcaroutLineMonth22, setTotalsumcaroutLineMonth22] = useState(0);
  const [totalsumcaroutLineMonth23, setTotalsumcaroutLineMonth23] = useState(0);
  const [totalsumcaroutLineMonth24, setTotalsumcaroutLineMonth24] = useState(0);
  const [totalsumcaroutLineMonth25, setTotalsumcaroutLineMonth25] = useState(0);
  const [totalsumcaroutLineMonth26, setTotalsumcaroutLineMonth26] = useState(0);
  const [totalsumcaroutLineMonth27, setTotalsumcaroutLineMonth27] = useState(0);
  const [totalsumcaroutLineMonth28, setTotalsumcaroutLineMonth28] = useState(0);
  const [totalsumcaroutLineMonth29, setTotalsumcaroutLineMonth29] = useState(0);
  const [totalsumcaroutLineMonth30, setTotalsumcaroutLineMonth30] = useState(0);
  const [totalsumcaroutLineMonth31, setTotalsumcaroutLineMonth31] = useState(0);

  const [totalsumtruckinLineMonth1, setTotalsumtruckinLineMonth1] = useState(0);
  const [totalsumtruckinLineMonth2, setTotalsumtruckinLineMonth2] = useState(0);
  const [totalsumtruckinLineMonth3, setTotalsumtruckinLineMonth3] = useState(0);
  const [totalsumtruckinLineMonth4, setTotalsumtruckinLineMonth4] = useState(0);
  const [totalsumtruckinLineMonth5, setTotalsumtruckinLineMonth5] = useState(0);
  const [totalsumtruckinLineMonth6, setTotalsumtruckinLineMonth6] = useState(0);
  const [totalsumtruckinLineMonth7, setTotalsumtruckinLineMonth7] = useState(0);
  const [totalsumtruckinLineMonth8, setTotalsumtruckinLineMonth8] = useState(0);
  const [totalsumtruckinLineMonth9, setTotalsumtruckinLineMonth9] = useState(0);
  const [totalsumtruckinLineMonth10, setTotalsumtruckinLineMonth10] = useState(0);
  const [totalsumtruckinLineMonth11, setTotalsumtruckinLineMonth11] = useState(0);
  const [totalsumtruckinLineMonth12, setTotalsumtruckinLineMonth12] = useState(0);
  const [totalsumtruckinLineMonth13, setTotalsumtruckinLineMonth13] = useState(0);
  const [totalsumtruckinLineMonth14, setTotalsumtruckinLineMonth14] = useState(0);
  const [totalsumtruckinLineMonth15, setTotalsumtruckinLineMonth15] = useState(0);
  const [totalsumtruckinLineMonth16, setTotalsumtruckinLineMonth16] = useState(0);
  const [totalsumtruckinLineMonth17, setTotalsumtruckinLineMonth17] = useState(0);
  const [totalsumtruckinLineMonth18, setTotalsumtruckinLineMonth18] = useState(0);
  const [totalsumtruckinLineMonth19, setTotalsumtruckinLineMonth19] = useState(0);
  const [totalsumtruckinLineMonth20, setTotalsumtruckinLineMonth20] = useState(0);
  const [totalsumtruckinLineMonth21, setTotalsumtruckinLineMonth21] = useState(0);
  const [totalsumtruckinLineMonth22, setTotalsumtruckinLineMonth22] = useState(0);
  const [totalsumtruckinLineMonth23, setTotalsumtruckinLineMonth23] = useState(0);
  const [totalsumtruckinLineMonth24, setTotalsumtruckinLineMonth24] = useState(0);
  const [totalsumtruckinLineMonth25, setTotalsumtruckinLineMonth25] = useState(0);
  const [totalsumtruckinLineMonth26, setTotalsumtruckinLineMonth26] = useState(0);
  const [totalsumtruckinLineMonth27, setTotalsumtruckinLineMonth27] = useState(0);
  const [totalsumtruckinLineMonth28, setTotalsumtruckinLineMonth28] = useState(0);
  const [totalsumtruckinLineMonth29, setTotalsumtruckinLineMonth29] = useState(0);
  const [totalsumtruckinLineMonth30, setTotalsumtruckinLineMonth30] = useState(0);
  const [totalsumtruckinLineMonth31, setTotalsumtruckinLineMonth31] = useState(0);

  const [totalsummotorbikeinLineMonth1, setTotalsummotorbikeinLineMonth1] = useState(0);
  const [totalsummotorbikeinLineMonth2, setTotalsummotorbikeinLineMonth2] = useState(0);
  const [totalsummotorbikeinLineMonth3, setTotalsummotorbikeinLineMonth3] = useState(0);
  const [totalsummotorbikeinLineMonth4, setTotalsummotorbikeinLineMonth4] = useState(0);
  const [totalsummotorbikeinLineMonth5, setTotalsummotorbikeinLineMonth5] = useState(0);
  const [totalsummotorbikeinLineMonth6, setTotalsummotorbikeinLineMonth6] = useState(0);
  const [totalsummotorbikeinLineMonth7, setTotalsummotorbikeinLineMonth7] = useState(0);
  const [totalsummotorbikeinLineMonth8, setTotalsummotorbikeinLineMonth8] = useState(0);
  const [totalsummotorbikeinLineMonth9, setTotalsummotorbikeinLineMonth9] = useState(0);
  const [totalsummotorbikeinLineMonth10, setTotalsummotorbikeinLineMonth10] = useState(0);
  const [totalsummotorbikeinLineMonth11, setTotalsummotorbikeinLineMonth11] = useState(0);
  const [totalsummotorbikeinLineMonth12, setTotalsummotorbikeinLineMonth12] = useState(0);
  const [totalsummotorbikeinLineMonth13, setTotalsummotorbikeinLineMonth13] = useState(0);
  const [totalsummotorbikeinLineMonth14, setTotalsummotorbikeinLineMonth14] = useState(0);
  const [totalsummotorbikeinLineMonth15, setTotalsummotorbikeinLineMonth15] = useState(0);
  const [totalsummotorbikeinLineMonth16, setTotalsummotorbikeinLineMonth16] = useState(0);
  const [totalsummotorbikeinLineMonth17, setTotalsummotorbikeinLineMonth17] = useState(0);
  const [totalsummotorbikeinLineMonth18, setTotalsummotorbikeinLineMonth18] = useState(0);
  const [totalsummotorbikeinLineMonth19, setTotalsummotorbikeinLineMonth19] = useState(0);
  const [totalsummotorbikeinLineMonth20, setTotalsummotorbikeinLineMonth20] = useState(0);
  const [totalsummotorbikeinLineMonth21, setTotalsummotorbikeinLineMonth21] = useState(0);
  const [totalsummotorbikeinLineMonth22, setTotalsummotorbikeinLineMonth22] = useState(0);
  const [totalsummotorbikeinLineMonth23, setTotalsummotorbikeinLineMonth23] = useState(0);
  const [totalsummotorbikeinLineMonth24, setTotalsummotorbikeinLineMonth24] = useState(0);
  const [totalsummotorbikeinLineMonth25, setTotalsummotorbikeinLineMonth25] = useState(0);
  const [totalsummotorbikeinLineMonth26, setTotalsummotorbikeinLineMonth26] = useState(0);
  const [totalsummotorbikeinLineMonth27, setTotalsummotorbikeinLineMonth27] = useState(0);
  const [totalsummotorbikeinLineMonth28, setTotalsummotorbikeinLineMonth28] = useState(0);
  const [totalsummotorbikeinLineMonth29, setTotalsummotorbikeinLineMonth29] = useState(0);
  const [totalsummotorbikeinLineMonth30, setTotalsummotorbikeinLineMonth30] = useState(0);
  const [totalsummotorbikeinLineMonth31, setTotalsummotorbikeinLineMonth31] = useState(0);

  const [totalsumtruckoutLineMonth1, setTotalsumtruckoutLineMonth1] = useState(0);
  const [totalsumtruckoutLineMonth2, setTotalsumtruckoutLineMonth2] = useState(0);
  const [totalsumtruckoutLineMonth3, setTotalsumtruckoutLineMonth3] = useState(0);
  const [totalsumtruckoutLineMonth4, setTotalsumtruckoutLineMonth4] = useState(0);
  const [totalsumtruckoutLineMonth5, setTotalsumtruckoutLineMonth5] = useState(0);
  const [totalsumtruckoutLineMonth6, setTotalsumtruckoutLineMonth6] = useState(0);
  const [totalsumtruckoutLineMonth7, setTotalsumtruckoutLineMonth7] = useState(0);
  const [totalsumtruckoutLineMonth8, setTotalsumtruckoutLineMonth8] = useState(0);
  const [totalsumtruckoutLineMonth9, setTotalsumtruckoutLineMonth9] = useState(0);
  const [totalsumtruckoutLineMonth10, setTotalsumtruckoutLineMonth10] = useState(0);
  const [totalsumtruckoutLineMonth11, setTotalsumtruckoutLineMonth11] = useState(0);
  const [totalsumtruckoutLineMonth12, setTotalsumtruckoutLineMonth12] = useState(0);
  const [totalsumtruckoutLineMonth13, setTotalsumtruckoutLineMonth13] = useState(0);
  const [totalsumtruckoutLineMonth14, setTotalsumtruckoutLineMonth14] = useState(0);
  const [totalsumtruckoutLineMonth15, setTotalsumtruckoutLineMonth15] = useState(0);
  const [totalsumtruckoutLineMonth16, setTotalsumtruckoutLineMonth16] = useState(0);
  const [totalsumtruckoutLineMonth17, setTotalsumtruckoutLineMonth17] = useState(0);
  const [totalsumtruckoutLineMonth18, setTotalsumtruckoutLineMonth18] = useState(0);
  const [totalsumtruckoutLineMonth19, setTotalsumtruckoutLineMonth19] = useState(0);
  const [totalsumtruckoutLineMonth20, setTotalsumtruckoutLineMonth20] = useState(0);
  const [totalsumtruckoutLineMonth21, setTotalsumtruckoutLineMonth21] = useState(0);
  const [totalsumtruckoutLineMonth22, setTotalsumtruckoutLineMonth22] = useState(0);
  const [totalsumtruckoutLineMonth23, setTotalsumtruckoutLineMonth23] = useState(0);
  const [totalsumtruckoutLineMonth24, setTotalsumtruckoutLineMonth24] = useState(0);
  const [totalsumtruckoutLineMonth25, setTotalsumtruckoutLineMonth25] = useState(0);
  const [totalsumtruckoutLineMonth26, setTotalsumtruckoutLineMonth26] = useState(0);
  const [totalsumtruckoutLineMonth27, setTotalsumtruckoutLineMonth27] = useState(0);
  const [totalsumtruckoutLineMonth28, setTotalsumtruckoutLineMonth28] = useState(0);
  const [totalsumtruckoutLineMonth29, setTotalsumtruckoutLineMonth29] = useState(0);
  const [totalsumtruckoutLineMonth30, setTotalsumtruckoutLineMonth30] = useState(0);
  const [totalsumtruckoutLineMonth31, setTotalsumtruckoutLineMonth31] = useState(0);

  const [totalsummotorbikeoutLineMonth1, setTotalsummotorbikeoutLineMonth1] = useState(0);
  const [totalsummotorbikeoutLineMonth2, setTotalsummotorbikeoutLineMonth2] = useState(0);
  const [totalsummotorbikeoutLineMonth3, setTotalsummotorbikeoutLineMonth3] = useState(0);
  const [totalsummotorbikeoutLineMonth4, setTotalsummotorbikeoutLineMonth4] = useState(0);
  const [totalsummotorbikeoutLineMonth5, setTotalsummotorbikeoutLineMonth5] = useState(0);
  const [totalsummotorbikeoutLineMonth6, setTotalsummotorbikeoutLineMonth6] = useState(0);
  const [totalsummotorbikeoutLineMonth7, setTotalsummotorbikeoutLineMonth7] = useState(0);
  const [totalsummotorbikeoutLineMonth8, setTotalsummotorbikeoutLineMonth8] = useState(0);
  const [totalsummotorbikeoutLineMonth9, setTotalsummotorbikeoutLineMonth9] = useState(0);
  const [totalsummotorbikeoutLineMonth10, setTotalsummotorbikeoutLineMonth10] = useState(0);
  const [totalsummotorbikeoutLineMonth11, setTotalsummotorbikeoutLineMonth11] = useState(0);
  const [totalsummotorbikeoutLineMonth12, setTotalsummotorbikeoutLineMonth12] = useState(0);
  const [totalsummotorbikeoutLineMonth13, setTotalsummotorbikeoutLineMonth13] = useState(0);
  const [totalsummotorbikeoutLineMonth14, setTotalsummotorbikeoutLineMonth14] = useState(0);
  const [totalsummotorbikeoutLineMonth15, setTotalsummotorbikeoutLineMonth15] = useState(0);
  const [totalsummotorbikeoutLineMonth16, setTotalsummotorbikeoutLineMonth16] = useState(0);
  const [totalsummotorbikeoutLineMonth17, setTotalsummotorbikeoutLineMonth17] = useState(0);
  const [totalsummotorbikeoutLineMonth18, setTotalsummotorbikeoutLineMonth18] = useState(0);
  const [totalsummotorbikeoutLineMonth19, setTotalsummotorbikeoutLineMonth19] = useState(0);
  const [totalsummotorbikeoutLineMonth20, setTotalsummotorbikeoutLineMonth20] = useState(0);
  const [totalsummotorbikeoutLineMonth21, setTotalsummotorbikeoutLineMonth21] = useState(0);
  const [totalsummotorbikeoutLineMonth22, setTotalsummotorbikeoutLineMonth22] = useState(0);
  const [totalsummotorbikeoutLineMonth23, setTotalsummotorbikeoutLineMonth23] = useState(0);
  const [totalsummotorbikeoutLineMonth24, setTotalsummotorbikeoutLineMonth24] = useState(0);
  const [totalsummotorbikeoutLineMonth25, setTotalsummotorbikeoutLineMonth25] = useState(0);
  const [totalsummotorbikeoutLineMonth26, setTotalsummotorbikeoutLineMonth26] = useState(0);
  const [totalsummotorbikeoutLineMonth27, setTotalsummotorbikeoutLineMonth27] = useState(0);
  const [totalsummotorbikeoutLineMonth28, setTotalsummotorbikeoutLineMonth28] = useState(0);
  const [totalsummotorbikeoutLineMonth29, setTotalsummotorbikeoutLineMonth29] = useState(0);
  const [totalsummotorbikeoutLineMonth30, setTotalsummotorbikeoutLineMonth30] = useState(0);
  const [totalsummotorbikeoutLineMonth31, setTotalsummotorbikeoutLineMonth31] = useState(0);
  const [totalsumscarInWeek, setTotalsumscarInWeek] = useState(0);
  const [totalsumstruckInWeek, setTotalsumstruckInWeek] = useState(0);
  const [totalsumsmotorbikeInWeek, setTotalsumsmotorbikeInWeek] = useState(0);
  const [totalsumscarOutWeek, setTotalsumscarOutWeek] = useState(0);
  const [totalsumstruckOutWeek, setTotalsumstruckOutWeek] = useState(0);
  const [totalsumsmotorbikeOutWeek, setTotalsumsmotorbikeOutWeek] = useState(0);
  const [totalsumscarInMonth, setTotalsumscarInMonth] = useState(0);
  const [totalsumstruckInMonth, setTotalsumstruckInMonth] = useState(0);
  const [totalsumsmotorbikeInMonth, setTotalsumsmotorbikeInMonth] = useState(0);
  const [totalsumscarOutMonth, setTotalsumscarOutMonth] = useState(0);
  const [totalsumstruckOutMonth, setTotalsumstruckOutMonth] = useState(0);
  const [totalsumsmotorbikeOutMonth, setTotalsumsmotorbikeOutMonth] = useState(0);
  const [totalsumcarinLineDay1, setTotalsumcarinLineDay1] = useState(0);
  const [totalsumcarinLineDay2, setTotalsumcarinLineDay2] = useState(0);
  const [totalsumcarinLineDay3, setTotalsumcarinLineDay3] = useState(0);
  const [totalsumcarinLineDay4, setTotalsumcarinLineDay4] = useState(0);
  const [totalsumcarinLineDay5, setTotalsumcarinLineDay5] = useState(0);
  const [totalsumcarinLineDay6, setTotalsumcarinLineDay6] = useState(0);
  const [totalsumcarinLineDay7, setTotalsumcarinLineDay7] = useState(0);
  const [totalsumcarinLineDay8, setTotalsumcarinLineDay8] = useState(0);
  const [totalsumcarinLineDay9, setTotalsumcarinLineDay9] = useState(0);
  const [totalsumcarinLineDay10, setTotalsumcarinLineDay10] = useState(0);
  const [totalsumcarinLineDay11, setTotalsumcarinLineDay11] = useState(0);
  const [totalsumcarinLineDay12, setTotalsumcarinLineDay12] = useState(0);
  const [totalsumcarinLineDay13, setTotalsumcarinLineDay13] = useState(0);
  const [totalsumcarinLineDay14, setTotalsumcarinLineDay14] = useState(0);
  const [totalsumcarinLineDay15, setTotalsumcarinLineDay15] = useState(0);
  const [totalsumcarinLineDay16, setTotalsumcarinLineDay16] = useState(0);
  const [totalsumcarinLineDay17, setTotalsumcarinLineDay17] = useState(0);
  const [totalsumcarinLineDay18, setTotalsumcarinLineDay18] = useState(0);
  const [totalsumcarinLineDay19, setTotalsumcarinLineDay19] = useState(0);
  const [totalsumcarinLineDay20, setTotalsumcarinLineDay20] = useState(0);
  const [totalsumcarinLineDay21, setTotalsumcarinLineDay21] = useState(0);
  const [totalsumcarinLineDay22, setTotalsumcarinLineDay22] = useState(0);
  const [totalsumcarinLineDay23, setTotalsumcarinLineDay23] = useState(0);
  const [totalsumcarinLineDay24, setTotalsumcarinLineDay24] = useState(0);
  const [totalsumtruckinLineDay1, setTotalsumtruckinLineDay1] = useState(0);
  const [totalsumtruckinLineDay2, setTotalsumtruckinLineDay2] = useState(0);
  const [totalsumtruckinLineDay3, setTotalsumtruckinLineDay3] = useState(0);
  const [totalsumtruckinLineDay4, setTotalsumtruckinLineDay4] = useState(0);
  const [totalsumtruckinLineDay5, setTotalsumtruckinLineDay5] = useState(0);
  const [totalsumtruckinLineDay6, setTotalsumtruckinLineDay6] = useState(0);
  const [totalsumtruckinLineDay7, setTotalsumtruckinLineDay7] = useState(0);
  const [totalsumtruckinLineDay8, setTotalsumtruckinLineDay8] = useState(0);
  const [totalsumtruckinLineDay9, setTotalsumtruckinLineDay9] = useState(0);
  const [totalsumtruckinLineDay10, setTotalsumtruckinLineDay10] = useState(0);
  const [totalsumtruckinLineDay11, setTotalsumtruckinLineDay11] = useState(0);
  const [totalsumtruckinLineDay12, setTotalsumtruckinLineDay12] = useState(0);
  const [totalsumtruckinLineDay13, setTotalsumtruckinLineDay13] = useState(0);
  const [totalsumtruckinLineDay14, setTotalsumtruckinLineDay14] = useState(0);
  const [totalsumtruckinLineDay15, setTotalsumtruckinLineDay15] = useState(0);
  const [totalsumtruckinLineDay16, setTotalsumtruckinLineDay16] = useState(0);
  const [totalsumtruckinLineDay17, setTotalsumtruckinLineDay17] = useState(0);
  const [totalsumtruckinLineDay18, setTotalsumtruckinLineDay18] = useState(0);
  const [totalsumtruckinLineDay19, setTotalsumtruckinLineDay19] = useState(0);
  const [totalsumtruckinLineDay20, setTotalsumtruckinLineDay20] = useState(0);
  const [totalsumtruckinLineDay21, setTotalsumtruckinLineDay21] = useState(0);
  const [totalsumtruckinLineDay22, setTotalsumtruckinLineDay22] = useState(0);
  const [totalsumtruckinLineDay23, setTotalsumtruckinLineDay23] = useState(0);
  const [totalsumtruckinLineDay24, setTotalsumtruckinLineDay24] = useState(0);
  const [totalsummotorbikeinLineDay1, setTotalsummotorbikeinLineDay1] = useState(0);
  const [totalsummotorbikeinLineDay2, setTotalsummotorbikeinLineDay2] = useState(0);
  const [totalsummotorbikeinLineDay3, setTotalsummotorbikeinLineDay3] = useState(0);
  const [totalsummotorbikeinLineDay4, setTotalsummotorbikeinLineDay4] = useState(0);
  const [totalsummotorbikeinLineDay5, setTotalsummotorbikeinLineDay5] = useState(0);
  const [totalsummotorbikeinLineDay6, setTotalsummotorbikeinLineDay6] = useState(0);
  const [totalsummotorbikeinLineDay7, setTotalsummotorbikeinLineDay7] = useState(0);
  const [totalsummotorbikeinLineDay8, setTotalsummotorbikeinLineDay8] = useState(0);
  const [totalsummotorbikeinLineDay9, setTotalsummotorbikeinLineDay9] = useState(0);
  const [totalsummotorbikeinLineDay10, setTotalsummotorbikeinLineDay10] = useState(0);
  const [totalsummotorbikeinLineDay11, setTotalsummotorbikeinLineDay11] = useState(0);
  const [totalsummotorbikeinLineDay12, setTotalsummotorbikeinLineDay12] = useState(0);
  const [totalsummotorbikeinLineDay13, setTotalsummotorbikeinLineDay13] = useState(0);
  const [totalsummotorbikeinLineDay14, setTotalsummotorbikeinLineDay14] = useState(0);
  const [totalsummotorbikeinLineDay15, setTotalsummotorbikeinLineDay15] = useState(0);
  const [totalsummotorbikeinLineDay16, setTotalsummotorbikeinLineDay16] = useState(0);
  const [totalsummotorbikeinLineDay17, setTotalsummotorbikeinLineDay17] = useState(0);
  const [totalsummotorbikeinLineDay18, setTotalsummotorbikeinLineDay18] = useState(0);
  const [totalsummotorbikeinLineDay19, setTotalsummotorbikeinLineDay19] = useState(0);
  const [totalsummotorbikeinLineDay20, setTotalsummotorbikeinLineDay20] = useState(0);
  const [totalsummotorbikeinLineDay21, setTotalsummotorbikeinLineDay21] = useState(0);
  const [totalsummotorbikeinLineDay22, setTotalsummotorbikeinLineDay22] = useState(0);
  const [totalsummotorbikeinLineDay23, setTotalsummotorbikeinLineDay23] = useState(0);
  const [totalsummotorbikeinLineDay24, setTotalsummotorbikeinLineDay24] = useState(0);
  const [totalsumcaroutLineDay1, setTotalsumcaroutLineDay1] = useState(0);
  const [totalsumcaroutLineDay2, setTotalsumcaroutLineDay2] = useState(0);
  const [totalsumcaroutLineDay3, setTotalsumcaroutLineDay3] = useState(0);
  const [totalsumcaroutLineDay4, setTotalsumcaroutLineDay4] = useState(0);
  const [totalsumcaroutLineDay5, setTotalsumcaroutLineDay5] = useState(0);
  const [totalsumcaroutLineDay6, setTotalsumcaroutLineDay6] = useState(0);
  const [totalsumcaroutLineDay7, setTotalsumcaroutLineDay7] = useState(0);
  const [totalsumcaroutLineDay8, setTotalsumcaroutLineDay8] = useState(0);
  const [totalsumcaroutLineDay9, setTotalsumcaroutLineDay9] = useState(0);
  const [totalsumcaroutLineDay10, setTotalsumcaroutLineDay10] = useState(0);
  const [totalsumcaroutLineDay11, setTotalsumcaroutLineDay11] = useState(0);
  const [totalsumcaroutLineDay12, setTotalsumcaroutLineDay12] = useState(0);
  const [totalsumcaroutLineDay13, setTotalsumcaroutLineDay13] = useState(0);
  const [totalsumcaroutLineDay14, setTotalsumcaroutLineDay14] = useState(0);
  const [totalsumcaroutLineDay15, setTotalsumcaroutLineDay15] = useState(0);
  const [totalsumcaroutLineDay16, setTotalsumcaroutLineDay16] = useState(0);
  const [totalsumcaroutLineDay17, setTotalsumcaroutLineDay17] = useState(0);
  const [totalsumcaroutLineDay18, setTotalsumcaroutLineDay18] = useState(0);
  const [totalsumcaroutLineDay19, setTotalsumcaroutLineDay19] = useState(0);
  const [totalsumcaroutLineDay20, setTotalsumcaroutLineDay20] = useState(0);
  const [totalsumcaroutLineDay21, setTotalsumcaroutLineDay21] = useState(0);
  const [totalsumcaroutLineDay22, setTotalsumcaroutLineDay22] = useState(0);
  const [totalsumcaroutLineDay23, setTotalsumcaroutLineDay23] = useState(0);
  const [totalsumcaroutLineDay24, setTotalsumcaroutLineDay24] = useState(0);
  const [totalsumtruckoutLineDay1, setTotalsumtruckoutLineDay1] = useState(0);
  const [totalsumtruckoutLineDay2, setTotalsumtruckoutLineDay2] = useState(0);
  const [totalsumtruckoutLineDay3, setTotalsumtruckoutLineDay3] = useState(0);
  const [totalsumtruckoutLineDay4, setTotalsumtruckoutLineDay4] = useState(0);
  const [totalsumtruckoutLineDay5, setTotalsumtruckoutLineDay5] = useState(0);
  const [totalsumtruckoutLineDay6, setTotalsumtruckoutLineDay6] = useState(0);
  const [totalsumtruckoutLineDay7, setTotalsumtruckoutLineDay7] = useState(0);
  const [totalsumtruckoutLineDay8, setTotalsumtruckoutLineDay8] = useState(0);
  const [totalsumtruckoutLineDay9, setTotalsumtruckoutLineDay9] = useState(0);
  const [totalsumtruckoutLineDay10, setTotalsumtruckoutLineDay10] = useState(0);
  const [totalsumtruckoutLineDay11, setTotalsumtruckoutLineDay11] = useState(0);
  const [totalsumtruckoutLineDay12, setTotalsumtruckoutLineDay12] = useState(0);
  const [totalsumtruckoutLineDay13, setTotalsumtruckoutLineDay13] = useState(0);
  const [totalsumtruckoutLineDay14, setTotalsumtruckoutLineDay14] = useState(0);
  const [totalsumtruckoutLineDay15, setTotalsumtruckoutLineDay15] = useState(0);
  const [totalsumtruckoutLineDay16, setTotalsumtruckoutLineDay16] = useState(0);
  const [totalsumtruckoutLineDay17, setTotalsumtruckoutLineDay17] = useState(0);
  const [totalsumtruckoutLineDay18, setTotalsumtruckoutLineDay18] = useState(0);
  const [totalsumtruckoutLineDay19, setTotalsumtruckoutLineDay19] = useState(0);
  const [totalsumtruckoutLineDay20, setTotalsumtruckoutLineDay20] = useState(0);
  const [totalsumtruckoutLineDay21, setTotalsumtruckoutLineDay21] = useState(0);
  const [totalsumtruckoutLineDay22, setTotalsumtruckoutLineDay22] = useState(0);
  const [totalsumtruckoutLineDay23, setTotalsumtruckoutLineDay23] = useState(0);
  const [totalsumtruckoutLineDay24, setTotalsumtruckoutLineDay24] = useState(0);
  const [totalsummotorbikeoutLineDay1, setTotalsummotorbikeoutLineDay1] = useState(0);
  const [totalsummotorbikeoutLineDay2, setTotalsummotorbikeoutLineDay2] = useState(0);
  const [totalsummotorbikeoutLineDay3, setTotalsummotorbikeoutLineDay3] = useState(0);
  const [totalsummotorbikeoutLineDay4, setTotalsummotorbikeoutLineDay4] = useState(0);
  const [totalsummotorbikeoutLineDay5, setTotalsummotorbikeoutLineDay5] = useState(0);
  const [totalsummotorbikeoutLineDay6, setTotalsummotorbikeoutLineDay6] = useState(0);
  const [totalsummotorbikeoutLineDay7, setTotalsummotorbikeoutLineDay7] = useState(0);
  const [totalsummotorbikeoutLineDay8, setTotalsummotorbikeoutLineDay8] = useState(0);
  const [totalsummotorbikeoutLineDay9, setTotalsummotorbikeoutLineDay9] = useState(0);
  const [totalsummotorbikeoutLineDay10, setTotalsummotorbikeoutLineDay10] = useState(0);
  const [totalsummotorbikeoutLineDay11, setTotalsummotorbikeoutLineDay11] = useState(0);
  const [totalsummotorbikeoutLineDay12, setTotalsummotorbikeoutLineDay12] = useState(0);
  const [totalsummotorbikeoutLineDay13, setTotalsummotorbikeoutLineDay13] = useState(0);
  const [totalsummotorbikeoutLineDay14, setTotalsummotorbikeoutLineDay14] = useState(0);
  const [totalsummotorbikeoutLineDay15, setTotalsummotorbikeoutLineDay15] = useState(0);
  const [totalsummotorbikeoutLineDay16, setTotalsummotorbikeoutLineDay16] = useState(0);
  const [totalsummotorbikeoutLineDay17, setTotalsummotorbikeoutLineDay17] = useState(0);
  const [totalsummotorbikeoutLineDay18, setTotalsummotorbikeoutLineDay18] = useState(0);
  const [totalsummotorbikeoutLineDay19, setTotalsummotorbikeoutLineDay19] = useState(0);
  const [totalsummotorbikeoutLineDay20, setTotalsummotorbikeoutLineDay20] = useState(0);
  const [totalsummotorbikeoutLineDay21, setTotalsummotorbikeoutLineDay21] = useState(0);
  const [totalsummotorbikeoutLineDay22, setTotalsummotorbikeoutLineDay22] = useState(0);
  const [totalsummotorbikeoutLineDay23, setTotalsummotorbikeoutLineDay23] = useState(0);
  const [totalsummotorbikeoutLineDay24, setTotalsummotorbikeoutLineDay24] = useState(0);
// const [totalsumcarinLineDay, setTotalsumcarinLineDay] = useState(Array(24).fill(0));
// const [totalsummotorbikeinLineDay, setTotalsumtruckinLineDay] = useState(Array(24).fill(0));
// const [totalsummotorbikeinLineDay, setTotalsummotorbikeinLineDay] = useState(Array(24).fill(0));
// const [totalsumcaroutLineDay, setTotalsumcaroutLineDay] = useState(Array(24).fill(0));
// const [totalsumtruckoutLineDay, setTotalsumtruckoutLineDay] = useState(Array(24).fill(0));
// const [totalsumsummotorbikeoutLineDay, setTotalsummotorbikeoutLineDay] = useState(Array(24).fill(0));

  
  const[totalsumscarInDay,setTotalsumscarInDay]= useState(0);
  const[totalsumstruckInDay,setTotalsumstruckInDay]= useState(0);
  const[totalsumsmotorbikeInDay,setTotalsumsmotorbikeInDay] = useState(0);
  const[totalsumscarOutDay,setTotalsumscarOutDay]= useState(0);
  const[totalsumstruckOutDay,setTotalsumstruckOutDay]= useState(0);
  const[totalsumsmotorbikeOutDay,setTotalsumsmotorbikeOutDay]= useState(0); 




  let k = gates ? gates.name : '';
  let z = gates ? gates.description : '';

  async function fetchGatesAndDoor() {
    try {
      setLoading(true); // เริ่มการโหลด
      const response = await axios.get(`http://localhost:3000/api/gates/${_id}`);
      const gatesData = response.data;
      console.log(response);
      
      if (gatesData) {
        const k = gatesData.name;
        const z = gatesData.description;
        console.log(z)
        const convertToGMT7 = (date) => {
          const offset = 7; // ชั่วโมง
          const utc = date.getTime() + (date.getTimezoneOffset() * 60000); // UTC 0
          return new Date(utc + (3600000 * offset)); // GMT+07
      };
    
      // ฟังก์ชันแปลงเวลากลับเป็นรูปแบบของวันที่
      const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
      };
    
      // ฟังก์ชันแปลงเวลากลับเป็นรูปแบบของเดือน
      const formatMonth = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          return `${year}-${month}`;
      };
    
      // คำนวณวันที่ย้อนหลัง 6 วัน
      const sixDaysAgo = new Date(selectedDate);
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      const gmt7SixDaysAgo = convertToGMT7(sixDaysAgo);
      const gmt7SixDaysAgoFormatted = formatDate(gmt7SixDaysAgo);
    
      // คำนวณวันที่ย้อนหลัง 5 วัน
      const fiveDaysAgo = new Date(selectedDate);
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const gmt7fiveDaysAgo = convertToGMT7(fiveDaysAgo);
      const gmt7FiveDaysAgoFormatted = formatDate(gmt7fiveDaysAgo);
    
      // คำนวณวันที่ย้อนหลัง 4 วัน
      const fourDaysAgo = new Date(selectedDate);
      fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
      const gmt7fourDaysAgo = convertToGMT7(fourDaysAgo);
      const gmt7FourDaysAgoFormatted = formatDate(gmt7fourDaysAgo);
    
      // คำนวณวันที่ย้อนหลัง 3 วัน
      const threeDaysAgo = new Date(selectedDate);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const gmt7threeDaysAgo = convertToGMT7(threeDaysAgo);
      const gmt7ThreeDaysAgoFormatted = formatDate(gmt7threeDaysAgo);
    
      // คำนวณวันที่ย้อนหลัง 2 วัน
      const twoDaysAgo = new Date(selectedDate);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const gmt7twoDaysAgo = convertToGMT7(twoDaysAgo);
      const gmt7TwoDaysAgoFormatted = formatDate(gmt7twoDaysAgo);
    
      // คำนวณวันที่ย้อนหลัง 1 วัน
      const oneDayAgo = new Date(selectedDate);
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const gmt7oneDayAgo = convertToGMT7(oneDayAgo);
      const gmt7OneDayAgoFormatted = formatDate(gmt7oneDayAgo);
    
          // คำนวณวันที่ย้อนหลัง 1 เดือน
          const oneMonthAgo = new Date(selectedDate);
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          const gmt7OneMonthAgo = convertToGMT7(oneMonthAgo);
          const gmt7OneMonthAgoFormatted = formatMonth(gmt7OneMonthAgo);
    
          // คำนวณวันที่ย้อนหลัง 2 เดือน
          const twoMonthsAgo = new Date(selectedDate);
          twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
          const gmt7TwoMonthsAgo = convertToGMT7(twoMonthsAgo);
          const gmt7TwoMonthsAgoFormatted = formatMonth(gmt7TwoMonthsAgo);
    
          // คำนวณวันที่ย้อนหลัง 3 เดือน
          const threeMonthsAgo = new Date(selectedDate);
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          const gmt7ThreeMonthsAgo = convertToGMT7(threeMonthsAgo);
          const gmt7ThreeMonthsAgoFormatted = formatMonth(gmt7ThreeMonthsAgo);
    
          // คำนวณวันที่ย้อนหลัง 4 เดือน
          const fourMonthsAgo = new Date(selectedDate);
          fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
          const gmt7FourMonthsAgo = convertToGMT7(fourMonthsAgo);
          const gmt7FourMonthsAgoFormatted = formatMonth(gmt7FourMonthsAgo);
    
          // คำนวณวันที่ย้อนหลัง 5 เดือน
          const fiveMonthsAgo = new Date(selectedDate);
          fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
          const gmt7FiveMonthsAgo = convertToGMT7(fiveMonthsAgo);
          const gmt7FiveMonthsAgoFormatted = formatMonth(gmt7FiveMonthsAgo);
    
              
    
          // คำนวณเดือนปัจจุบัน
          const selectedDateFormatted = formatDate(selectedDate);
          const ThisMonthFormatted = formatMonth(selectedDate);
          
          // this.setState({ isLoading: true });
          
            
        const urls = [
          `http://localhost:3000/api/sums/?gatein=${z}`,
          `http://localhost:3000/api/sums/?gateout=${z}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${ThisMonthFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7OneMonthAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7TwoMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7ThreeMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7FourMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7FiveMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${ThisMonthFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7OneMonthAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7TwoMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7ThreeMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7FourMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7FiveMonthsAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDateFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7OneDayAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7TwoDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7ThreeDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7FourDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7FiveDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${gmt7SixDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDateFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7OneDayAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7TwoDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7ThreeDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7FourDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7FiveDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7SixDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDateFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7OneDayAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7TwoDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7ThreeDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7FourDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7FiveDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${gmt7SixDaysAgoFormatted}`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-01`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-02`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-03`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-04`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-05`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-06`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-07`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-08`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-09`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-10`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-11`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-12`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-13`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-14`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-15`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-16`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-17`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-18`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-19`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-20`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-21`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-22`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-23`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-24`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-25`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-26`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-27`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-28`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-29`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-30`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedThisMonth}-31`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-01`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-02`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-03`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-04`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-05`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-06`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-07`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-08`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-09`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-10`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-11`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-12`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-13`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-14`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-15`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-16`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-17`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-18`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-19`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-20`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-21`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-22`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-23`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-24`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-25`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-26`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-27`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-28`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-29`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-30`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedThisMonth}-31`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T00`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T01`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T02`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T03`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T04`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T05`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T06`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T07`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T08`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T09`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T10`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T11`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T12`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T13`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T14`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T15`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T16`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T17`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T18`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T19`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T20`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T21`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T22`,
          `http://localhost:3000/api/sums/?gatein=${z}&timein=${selectedDay}T23`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T00`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T01`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T02`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T03`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T04`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T05`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T06`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T07`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T08`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T09`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T10`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T11`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T12`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T13`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T14`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T15`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T16`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T17`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T18`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T19`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T20`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T21`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T22`,
          `http://localhost:3000/api/sums/?gateout=${z}&timeout=${selectedDay}T23`,          

        ];
  
        console.log(`http://localhost:3000/api/sums/?gatein=${z}`);
  
          const responses = await Promise.all(urls.map(url => axios.get(url)));
          const dataSets = responses.map(response => response.data);
          const sums = dataSets.slice(0, 2).map(dataSet => dataSet.map(item => item.sum));
          const sumscarin = dataSets.slice(2,8).map(dataSet => dataSet.map(item => item.sumcar));
          const sumscarout = dataSets.slice(8,14).map(dataSet => dataSet.map(item => item.sumcar));
          const sumstruckin = dataSets.slice(2,8).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumstruckout = dataSets.slice(8,14).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumsmotorbikein = dataSets.slice(2,8).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumsmotorbikeout = dataSets.slice(8,14).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumscarinLine = dataSets.slice(2, 8).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLine = dataSets.slice(2, 8).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLine = dataSets.slice(2, 8).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLine = dataSets.slice(8, 14).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLine = dataSets.slice(8, 14).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLine = dataSets.slice(8, 14).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumsDayIn = dataSets.slice(14, 15).map(dataSet => dataSet.map(item => item.sum));
          const sumsDayOut = dataSets.slice(15, 16).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekIn = dataSets.slice(16,23).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekOut = dataSets.slice(23,30).map(dataSet => dataSet.map(item => item.sum));
          const sumscarinLineWeek = dataSets.slice(16,23).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLineWeek = dataSets.slice(16,23).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLineWeek = dataSets.slice(16,23).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLineWeek = dataSets.slice(23,30).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLineWeek = dataSets.slice(23,30).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLineWeek = dataSets.slice(23,30).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumsMonthIn = dataSets.slice(30,31).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthOut = dataSets.slice(31,32).map(dataSet => dataSet.map(item => item.sum));
          const sumscarinLineMonth = dataSets.slice(39,70).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLineMonth = dataSets.slice(39,70).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLineMonth = dataSets.slice(39,70).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLineMonth = dataSets.slice(70,101).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLineMonth = dataSets.slice(70,101).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLineMonth = dataSets.slice(70,101).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscarinLineDay = dataSets.slice(100,124).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLineDay = dataSets.slice(100,124).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLineDay = dataSets.slice(100,124).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLineDay = dataSets.slice(124, 148).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLineDay = dataSets.slice(124, 148).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLineDay = dataSets.slice(124, 148).map(dataSet => dataSet.map(item => item.sumtruck));


          const totalSum1 = sums[0].reduce((acc, curr) => acc + curr, 0);
          const totalSum2 = sums[1].reduce((acc, curr) => acc + curr, 0);
          const totalsumscarin = sumscarin[0].reduce((acc, curr) => acc + curr, 0) + sumscarin[1].reduce((acc, curr) => acc + curr, 0) + 
           sumscarin[2].reduce((acc, curr) => acc + curr, 0) + sumscarin[3].reduce((acc, curr) => acc + curr, 0)+ sumscarin[4].reduce((acc, curr) => acc + curr, 0) + sumscarin[5].reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckin = sumstruckin[0].reduce((acc, curr) => acc + curr, 0) + sumstruckin[1].reduce((acc, curr) => acc + curr, 0) + 
          sumstruckin[2].reduce((acc, curr) => acc + curr, 0) + sumstruckin[3].reduce((acc, curr) => acc + curr, 0)+ sumstruckin[4].reduce((acc, curr) => acc + curr, 0) + sumstruckin[5].reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikein = sumsmotorbikein[0].reduce((acc, curr) => acc + curr, 0) + sumsmotorbikein[1].reduce((acc, curr) => acc + curr, 0) + 
          sumsmotorbikein[2].reduce((acc, curr) => acc + curr, 0) + sumsmotorbikein[3].reduce((acc, curr) => acc + curr, 0)+ sumsmotorbikein[4].reduce((acc, curr) => acc + curr, 0) + sumsmotorbikein[5].reduce((acc, curr) => acc + curr, 0);
          const totalsumscarout = sumscarout[0].reduce((acc, curr) => acc + curr, 0) + sumscarout[1].reduce((acc, curr) => acc + curr, 0) + 
          sumscarout[2].reduce((acc, curr) => acc + curr, 0) + sumscarout[3].reduce((acc, curr) => acc + curr, 0)+ sumscarout[4].reduce((acc, curr) => acc + curr, 0) + sumscarout[5].reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckout = sumstruckout[0].reduce((acc, curr) => acc + curr, 0) + sumstruckout[1].reduce((acc, curr) => acc + curr, 0) + 
          sumstruckout[2].reduce((acc, curr) => acc + curr, 0) + sumstruckout[3].reduce((acc, curr) => acc + curr, 0)+ sumstruckout[4].reduce((acc, curr) => acc + curr, 0) + sumstruckout[5].reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeout = sumsmotorbikeout[0].reduce((acc, curr) => acc + curr, 0)+ sumsmotorbikeout[1].reduce((acc, curr) => acc + curr, 0) + 
          sumsmotorbikeout[2].reduce((acc, curr) => acc + curr, 0) + sumsmotorbikeout[3].reduce((acc, curr) => acc + curr, 0)+ sumsmotorbikeout[4].reduce((acc, curr) => acc + curr, 0) + sumsmotorbikeout[5].reduce((acc, curr) => acc + curr, 0);
          
          const totalsumscarinline = sumscarinLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckinline = sumstruckinLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeinline = sumsmotorbikeinLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscaroutline = sumscaroutLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckoutline = sumstruckoutLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeoutline = sumsmotorbikeoutLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsDayIn = sumsDayIn[0].reduce((acc, curr) => acc + curr, 0);
          const totalsumsDayOut = sumsDayOut[0].reduce((acc, curr) => acc + curr, 0);
          const tsumsWeekIn = sumsWeekIn.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const tsumsWeekOut = sumsWeekOut.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscarinLineWeek = sumscarinLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckinLineWeek = sumstruckinLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeinLineWeek = sumsmotorbikeinLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscaroutLineWeek = sumscaroutLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckoutLineWeek = sumstruckoutLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeoutLineWeek = sumsmotorbikeoutLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthIn = sumsMonthIn[0].reduce((acc, curr) => acc + curr, 0);
          const totalsumsMonthOut = sumsMonthOut[0].reduce((acc, curr) => acc + curr, 0);
          const totalsumscarinLineMonth = sumscarinLineMonth.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckinLineMonth = sumstruckinLineMonth.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeinLineMonth = sumsmotorbikeinLineMonth.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscaroutLineMonth = sumscaroutLineMonth.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckoutLineMonth = sumstruckoutLineMonth.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeoutLineMonth = sumsmotorbikeoutLineMonth.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscarinLineDay = sumscarinLineDay.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckinLineDay = sumstruckinLineDay.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeinLineDay = sumsmotorbikeinLineDay.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscaroutLineDay = sumscaroutLineDay.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckoutLineDay = sumstruckoutLineDay.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeoutLineDay = sumsmotorbikeoutLineDay.map(arr => arr.reduce((acc, curr) => acc + curr, 0));

          // const totalsumscarin = sumscarin.reduce((acc, curr) => acc + curr, 0);
          // const totalsumstruckin = sumstruckin[0].reduce((acc, curr) => acc + curr, 0);
          // const Totalsumsmotorbikein = sumsmotorbikein[0].reduce((acc, curr) => acc + curr, 0);
          // const Totalsumscarout = sumscarout[0].reduce((acc, curr) => acc + curr, 0);
          // const Totalsumstruckout = sumstruckout[0].reduce((acc, curr) => acc + curr, 0);
          // const Totalsumsmotorbikeout = sumsmotorbikeout[0].reduce((acc, curr) => acc + curr, 0);
          const totalsumscarInDay = totalsumscarinLineDay.reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckInDay = totalsumstruckinLineDay.reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeInDay = totalsumsmotorbikeinLineDay.reduce((acc, curr) => acc + curr, 0);
          const totalsumscarOutDay = totalsumscaroutLineDay.reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckOutDay = totalsumstruckoutLineDay.reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeOutDay = totalsumsmotorbikeoutLineDay.reduce((acc, curr) => acc + curr, 0)
          const totalsumscarInWeek = totalsumscarinLineWeek.reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckInWeek = totalsumstruckinLineWeek.reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeInWeek = totalsumsmotorbikeinLineWeek.reduce((acc, curr) => acc + curr, 0);
          const totalsumscarOutWeek = totalsumscaroutLineWeek.reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckOutWeek = totalsumstruckoutLineWeek.reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeOutWeek = totalsumsmotorbikeoutLineWeek.reduce((acc, curr) => acc + curr, 0)
          const totalsumscarInMonth = totalsumscarinLineMonth.reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckInMonth = totalsumstruckinLineMonth.reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeInMonth = totalsumsmotorbikeinLineMonth.reduce((acc, curr) => acc + curr, 0);
          const totalsumscarOutMonth = totalsumscaroutLineMonth.reduce((acc, curr) => acc + curr, 0);
          const totalsumstruckOutMonth = totalsumstruckoutLineMonth.reduce((acc, curr) => acc + curr, 0);
          const totalsumsmotorbikeOutMonth = totalsumsmotorbikeoutLineMonth.reduce((acc, curr) => acc + curr, 0)
          const totalsumsWeekIn = tsumsWeekIn.reduce((acc, curr) => acc + curr, 0);
          const totalsumsWeekOut = tsumsWeekOut.reduce((acc, curr) => acc + curr, 0);
          // const Totalsumscarout = totalsumscaroutLine.reduce((acc, curr) => acc + curr, 0);
          // const Totalsumstruckout = totalsumstruckoutLine.reduce((acc, curr) => acc + curr, 0);
          // const Totalsumsmotorbikeout = totalsumsmotorbikeoutLine.reduce((acc, curr) => acc + curr, 0);
          // const TotalsumsWeekIn= totalsumsWeekIn.reduce((acc, curr) => acc + curr, 0);
          // const TotalsumsWeekOut= totalsumsWeekOut.reduce((acc, curr) => acc + curr, 0);

  
        console.log(sums);
        console.log(totalsumsmotorbikeinline);
        console.log(sumsWeekIn);
  
        setGates(gatesData);
        setTotalSum1(totalSum1);
        setTotalSum2(totalSum2);
        setTotalsumcarinline1(totalsumscarinline[0]);
        setTotalsumcarinline2(totalsumscarinline[1]);
        setTotalsumcarinline3(totalsumscarinline[2]);
        setTotalsumcarinline4(totalsumscarinline[3]);
        setTotalsumcarinline5(totalsumscarinline[4]);
        setTotalsumcarinline6(totalsumscarinline[5]);
        setTotalsumtruckinline1(totalsumstruckinline[0]);
        setTotalsumtruckinline2(totalsumstruckinline[1]);
        setTotalsumtruckinline3(totalsumstruckinline[2]);
        setTotalsumtruckinline4(totalsumstruckinline[3]);
        setTotalsumtruckinline5(totalsumstruckinline[4]);
        setTotalsumtruckinline6(totalsumstruckinline[5]);
        setTotalsummotorbikeinline1(totalsumsmotorbikeinline[0]);
        setTotalsummotorbikeinline2(totalsumsmotorbikeinline[1]);
        setTotalsummotorbikeinline3(totalsumsmotorbikeinline[2]);
        setTotalsummotorbikeinline4(totalsumsmotorbikeinline[3]);
        setTotalsummotorbikeinline5(totalsumsmotorbikeinline[4]);
        setTotalsummotorbikeinline6(totalsumsmotorbikeinline[5]);
        setTotalsumcaroutline1(totalsumscaroutline[0]);
        setTotalsumcaroutline2(totalsumscaroutline[1]);
        setTotalsumcaroutline3(totalsumscaroutline[2]);
        setTotalsumcaroutline4(totalsumscaroutline[3]);
        setTotalsumcaroutline5(totalsumscaroutline[4]);
        setTotalsumcaroutline6(totalsumscaroutline[5]);
        setTotalsumtruckoutline1(totalsumstruckoutline[0]);
        setTotalsumtruckoutline2(totalsumstruckoutline[1]);
        setTotalsumtruckoutline3(totalsumstruckoutline[2]);
        setTotalsumtruckoutline4(totalsumstruckoutline[3]);
        setTotalsumtruckoutline5(totalsumstruckoutline[4]);
        setTotalsumtruckoutline6(totalsumstruckoutline[5]);
        setTotalsummotorbikeoutline1(totalsumsmotorbikeoutline[0]);
        setTotalsummotorbikeoutline2(totalsumsmotorbikeoutline[1]);
        setTotalsummotorbikeoutline3(totalsumsmotorbikeoutline[2]);
        setTotalsummotorbikeoutline4(totalsumsmotorbikeoutline[3]);
        setTotalsummotorbikeoutline5(totalsumsmotorbikeoutline[4]);
        setTotalsummotorbikeoutline6(totalsumsmotorbikeoutline[5]); 
        setTotalsumscarin(totalsumscarin);
        setTotalsumstruckin(totalsumstruckin);
        setTotalsumsmotorbikein(totalsumsmotorbikein);
        setTotalsumscarout(totalsumscarout);
        setTotalsumstruckout(totalsumstruckout);
        setTotalsumsmotorbikeout(totalsumsmotorbikeout);
        setTotalsumsDayIn(totalsumsDayIn);
        setTotalsumsDayOut(totalsumsDayOut);
        setTotalsumsWeekIn(totalsumsWeekIn);
        setTotalsumsWeekOut(totalsumsWeekOut);
        setTotalsumcarinLineWeek1(totalsumscarinLineWeek[0]);
        setTotalsumcarinLineWeek2(totalsumscarinLineWeek[1]);
        setTotalsumcarinLineWeek3(totalsumscarinLineWeek[2]);
        setTotalsumcarinLineWeek4(totalsumscarinLineWeek[3]);
        setTotalsumcarinLineWeek5(totalsumscarinLineWeek[4]);
        setTotalsumcarinLineWeek6(totalsumscarinLineWeek[5]);
        setTotalsumcarinLineWeek7(totalsumscarinLineWeek[6]);
        setTotalsumtruckinLineWeek1(totalsumstruckinLineWeek[0]);
        setTotalsumtruckinLineWeek2(totalsumstruckinLineWeek[1]);
        setTotalsumtruckinLineWeek3(totalsumstruckinLineWeek[2]);
        setTotalsumtruckinLineWeek4(totalsumstruckinLineWeek[3]);
        setTotalsumtruckinLineWeek5(totalsumstruckinLineWeek[4]);
        setTotalsumtruckinLineWeek6(totalsumstruckinLineWeek[5]);
        setTotalsumtruckinLineWeek7(totalsumstruckinLineWeek[6]);
        setTotalsummotorbikeinLineWeek1(totalsumsmotorbikeinLineWeek[0]);
        setTotalsummotorbikeinLineWeek2(totalsumsmotorbikeinLineWeek[1]);
        setTotalsummotorbikeinLineWeek3(totalsumsmotorbikeinLineWeek[2]);
        setTotalsummotorbikeinLineWeek4(totalsumsmotorbikeinLineWeek[3]);
        setTotalsummotorbikeinLineWeek5(totalsumsmotorbikeinLineWeek[4]);
        setTotalsummotorbikeinLineWeek6(totalsumsmotorbikeinLineWeek[5]);
        setTotalsummotorbikeinLineWeek7(totalsumsmotorbikeinLineWeek[6]);
        setTotalsumcaroutLineWeek1(totalsumscaroutLineWeek[0]);
        setTotalsumcaroutLineWeek2(totalsumscaroutLineWeek[1]);
        setTotalsumcaroutLineWeek3(totalsumscaroutLineWeek[2]);
        setTotalsumcaroutLineWeek4(totalsumscaroutLineWeek[3]);
        setTotalsumcaroutLineWeek5(totalsumscaroutLineWeek[4]);
        setTotalsumcaroutLineWeek6(totalsumscaroutLineWeek[5]);
        setTotalsumcaroutLineWeek7(totalsumscaroutLineWeek[6]);
        setTotalsumtruckoutLineWeek1(totalsumstruckoutLineWeek[0]);
        setTotalsumtruckoutLineWeek2(totalsumstruckoutLineWeek[1]);
        setTotalsumtruckoutLineWeek3(totalsumstruckoutLineWeek[2]);
        setTotalsumtruckoutLineWeek4(totalsumstruckoutLineWeek[3]);
        setTotalsumtruckoutLineWeek5(totalsumstruckoutLineWeek[4]);
        setTotalsumtruckoutLineWeek6(totalsumstruckoutLineWeek[5]);
        setTotalsumtruckoutLineWeek7(totalsumstruckoutLineWeek[6]);
        setTotalsummotorbikeoutLineWeek1(totalsumsmotorbikeoutLineWeek[0]);
        setTotalsummotorbikeoutLineWeek2(totalsumsmotorbikeoutLineWeek[1]);
        setTotalsummotorbikeoutLineWeek3(totalsumsmotorbikeoutLineWeek[2]);
        setTotalsummotorbikeoutLineWeek4(totalsumsmotorbikeoutLineWeek[3]);
        setTotalsummotorbikeoutLineWeek5(totalsumsmotorbikeoutLineWeek[4]);
        setTotalsummotorbikeoutLineWeek6(totalsumsmotorbikeoutLineWeek[5]);
        setTotalsummotorbikeoutLineWeek7(totalsumsmotorbikeoutLineWeek[6]);
        setTotalsumsMonthIn(totalsumsMonthIn);
        setTotalsumsMonthOut(totalsumsMonthOut);
        setTotalsumcarinLineMonth1(totalsumscarinLineMonth[0]);
        setTotalsumcarinLineMonth2(totalsumscarinLineMonth[1]);
        setTotalsumcarinLineMonth3(totalsumscarinLineMonth[2]);
        setTotalsumcarinLineMonth4(totalsumscarinLineMonth[3]);
        setTotalsumcarinLineMonth5(totalsumscarinLineMonth[4]);
        setTotalsumcarinLineMonth6(totalsumscarinLineMonth[5]);
        setTotalsumcarinLineMonth7(totalsumscarinLineMonth[6]);
        setTotalsumcarinLineMonth8(totalsumscarinLineMonth[7]);
        setTotalsumcarinLineMonth9(totalsumscarinLineMonth[8]);
        setTotalsumcarinLineMonth10(totalsumscarinLineMonth[9]);
        setTotalsumcarinLineMonth11(totalsumscarinLineMonth[10]);
        setTotalsumcarinLineMonth12(totalsumscarinLineMonth[11]);
        setTotalsumcarinLineMonth13(totalsumscarinLineMonth[12]);
        setTotalsumcarinLineMonth14(totalsumscarinLineMonth[13]);
        setTotalsumcarinLineMonth15(totalsumscarinLineMonth[14]);
        setTotalsumcarinLineMonth16(totalsumscarinLineMonth[15]);
        setTotalsumcarinLineMonth17(totalsumscarinLineMonth[16]);
        setTotalsumcarinLineMonth18(totalsumscarinLineMonth[17]);
        setTotalsumcarinLineMonth19(totalsumscarinLineMonth[18]);
        setTotalsumcarinLineMonth20(totalsumscarinLineMonth[19]);
        setTotalsumcarinLineMonth21(totalsumscarinLineMonth[20]);
        setTotalsumcarinLineMonth22(totalsumscarinLineMonth[21]);
        setTotalsumcarinLineMonth23(totalsumscarinLineMonth[22]);
        setTotalsumcarinLineMonth24(totalsumscarinLineMonth[23]);
        setTotalsumcarinLineMonth25(totalsumscarinLineMonth[24]);
        setTotalsumcarinLineMonth26(totalsumscarinLineMonth[25]);
        setTotalsumcarinLineMonth27(totalsumscarinLineMonth[26]);
        setTotalsumcarinLineMonth28(totalsumscarinLineMonth[27]);
        setTotalsumcarinLineMonth29(totalsumscarinLineMonth[28]);
        setTotalsumcarinLineMonth30(totalsumscarinLineMonth[29]);
        setTotalsumcarinLineMonth31(totalsumscarinLineMonth[30]);
        setTotalsumtruckinLineMonth1(totalsumstruckinLineMonth[0]);
        setTotalsumtruckinLineMonth2(totalsumstruckinLineMonth[1]);
        setTotalsumtruckinLineMonth3(totalsumstruckinLineMonth[2]);
        setTotalsumtruckinLineMonth4(totalsumstruckinLineMonth[3]);
        setTotalsumtruckinLineMonth5(totalsumstruckinLineMonth[4]);
        setTotalsumtruckinLineMonth6(totalsumstruckinLineMonth[5]);
        setTotalsumtruckinLineMonth7(totalsumstruckinLineMonth[6]);
        setTotalsumtruckinLineMonth8(totalsumstruckinLineMonth[7]);
        setTotalsumtruckinLineMonth9(totalsumstruckinLineMonth[8]);
        setTotalsumtruckinLineMonth10(totalsumstruckinLineMonth[9]);
        setTotalsumtruckinLineMonth11(totalsumstruckinLineMonth[10]);
        setTotalsumtruckinLineMonth12(totalsumstruckinLineMonth[11]);
        setTotalsumtruckinLineMonth13(totalsumstruckinLineMonth[12]);
        setTotalsumtruckinLineMonth14(totalsumstruckinLineMonth[13]);
        setTotalsumtruckinLineMonth15(totalsumstruckinLineMonth[14]);
        setTotalsumtruckinLineMonth16(totalsumstruckinLineMonth[15]);
        setTotalsumtruckinLineMonth17(totalsumstruckinLineMonth[16]);
        setTotalsumtruckinLineMonth18(totalsumstruckinLineMonth[17]);
        setTotalsumtruckinLineMonth19(totalsumstruckinLineMonth[18]);
        setTotalsumtruckinLineMonth20(totalsumstruckinLineMonth[19]);
        setTotalsumtruckinLineMonth21(totalsumstruckinLineMonth[20]);
        setTotalsumtruckinLineMonth22(totalsumstruckinLineMonth[21]);
        setTotalsumtruckinLineMonth23(totalsumstruckinLineMonth[22]);
        setTotalsumtruckinLineMonth24(totalsumstruckinLineMonth[23]);
        setTotalsumtruckinLineMonth25(totalsumstruckinLineMonth[24]);
        setTotalsumtruckinLineMonth26(totalsumstruckinLineMonth[25]);
        setTotalsumtruckinLineMonth27(totalsumstruckinLineMonth[26]);
        setTotalsumtruckinLineMonth28(totalsumstruckinLineMonth[27]);
        setTotalsumtruckinLineMonth29(totalsumstruckinLineMonth[28]);
        setTotalsumtruckinLineMonth30(totalsumstruckinLineMonth[29]);
        setTotalsumtruckinLineMonth31(totalsumstruckinLineMonth[30]);
        setTotalsummotorbikeinLineMonth1(totalsumsmotorbikeinLineMonth[0]);
        setTotalsummotorbikeinLineMonth2(totalsumsmotorbikeinLineMonth[1]);
        setTotalsummotorbikeinLineMonth3(totalsumsmotorbikeinLineMonth[2]);
        setTotalsummotorbikeinLineMonth4(totalsumsmotorbikeinLineMonth[3]);
        setTotalsummotorbikeinLineMonth5(totalsumsmotorbikeinLineMonth[4]);
        setTotalsummotorbikeinLineMonth6(totalsumsmotorbikeinLineMonth[5]);
        setTotalsummotorbikeinLineMonth7(totalsumsmotorbikeinLineMonth[6]);
        setTotalsummotorbikeinLineMonth8(totalsumsmotorbikeinLineMonth[7]);
        setTotalsummotorbikeinLineMonth9(totalsumsmotorbikeinLineMonth[8]);
        setTotalsummotorbikeinLineMonth10(totalsumsmotorbikeinLineMonth[9]);
        setTotalsummotorbikeinLineMonth11(totalsumsmotorbikeinLineMonth[10]);
        setTotalsummotorbikeinLineMonth12(totalsumsmotorbikeinLineMonth[11]);
        setTotalsummotorbikeinLineMonth13(totalsumsmotorbikeinLineMonth[12]);
        setTotalsummotorbikeinLineMonth14(totalsumsmotorbikeinLineMonth[13]);
        setTotalsummotorbikeinLineMonth15(totalsumsmotorbikeinLineMonth[14]);
        setTotalsummotorbikeinLineMonth16(totalsumsmotorbikeinLineMonth[15]);
        setTotalsummotorbikeinLineMonth17(totalsumsmotorbikeinLineMonth[16]);
        setTotalsummotorbikeinLineMonth18(totalsumsmotorbikeinLineMonth[17]);
        setTotalsummotorbikeinLineMonth19(totalsumsmotorbikeinLineMonth[18]);
        setTotalsummotorbikeinLineMonth20(totalsumsmotorbikeinLineMonth[19]);
        setTotalsummotorbikeinLineMonth21(totalsumsmotorbikeinLineMonth[20]);
        setTotalsummotorbikeinLineMonth22(totalsumsmotorbikeinLineMonth[21]);
        setTotalsummotorbikeinLineMonth23(totalsumsmotorbikeinLineMonth[22]);
        setTotalsummotorbikeinLineMonth24(totalsumsmotorbikeinLineMonth[23]);
        setTotalsummotorbikeinLineMonth25(totalsumsmotorbikeinLineMonth[24]);
        setTotalsummotorbikeinLineMonth26(totalsumsmotorbikeinLineMonth[25]);
        setTotalsummotorbikeinLineMonth27(totalsumsmotorbikeinLineMonth[26]);
        setTotalsummotorbikeinLineMonth28(totalsumsmotorbikeinLineMonth[27]);
        setTotalsummotorbikeinLineMonth29(totalsumsmotorbikeinLineMonth[28]);
        setTotalsummotorbikeinLineMonth30(totalsumsmotorbikeinLineMonth[29]);
        setTotalsummotorbikeinLineMonth31(totalsumsmotorbikeinLineMonth[30]);
        setTotalsumcaroutLineMonth1(totalsumscaroutLineMonth[0]);
        setTotalsumcaroutLineMonth2(totalsumscaroutLineMonth[1]);
        setTotalsumcaroutLineMonth3(totalsumscaroutLineMonth[2]);
        setTotalsumcaroutLineMonth4(totalsumscaroutLineMonth[3]);
        setTotalsumcaroutLineMonth5(totalsumscaroutLineMonth[4]);
        setTotalsumcaroutLineMonth6(totalsumscaroutLineMonth[5]);
        setTotalsumcaroutLineMonth7(totalsumscaroutLineMonth[6]);
        setTotalsumcaroutLineMonth8(totalsumscaroutLineMonth[7]);
        setTotalsumcaroutLineMonth9(totalsumscaroutLineMonth[8]);
        setTotalsumcaroutLineMonth10(totalsumscaroutLineMonth[9]);
        setTotalsumcaroutLineMonth11(totalsumscaroutLineMonth[10]);
        setTotalsumcaroutLineMonth12(totalsumscaroutLineMonth[11]);
        setTotalsumcaroutLineMonth13(totalsumscaroutLineMonth[12]);
        setTotalsumcaroutLineMonth14(totalsumscaroutLineMonth[13]);
        setTotalsumcaroutLineMonth15(totalsumscaroutLineMonth[14]);
        setTotalsumcaroutLineMonth16(totalsumscaroutLineMonth[15]);
        setTotalsumcaroutLineMonth17(totalsumscaroutLineMonth[16]);
        setTotalsumcaroutLineMonth18(totalsumscaroutLineMonth[17]);
        setTotalsumcaroutLineMonth19(totalsumscaroutLineMonth[18]);
        setTotalsumcaroutLineMonth20(totalsumscaroutLineMonth[19]);
        setTotalsumcaroutLineMonth21(totalsumscaroutLineMonth[20]);
        setTotalsumcaroutLineMonth22(totalsumscaroutLineMonth[21]);
        setTotalsumcaroutLineMonth23(totalsumscaroutLineMonth[22]);
        setTotalsumcaroutLineMonth24(totalsumscaroutLineMonth[23]);
        setTotalsumcaroutLineMonth25(totalsumscaroutLineMonth[24]);
        setTotalsumcaroutLineMonth26(totalsumscaroutLineMonth[25]);
        setTotalsumcaroutLineMonth27(totalsumscaroutLineMonth[26]);
        setTotalsumcaroutLineMonth28(totalsumscaroutLineMonth[27]);
        setTotalsumcaroutLineMonth29(totalsumscaroutLineMonth[28]);
        setTotalsumcaroutLineMonth30(totalsumscaroutLineMonth[29]);
        setTotalsumcaroutLineMonth31(totalsumscaroutLineMonth[30]);
        setTotalsumtruckoutLineMonth1(totalsumstruckoutLineMonth[0]);
        setTotalsumtruckoutLineMonth2(totalsumstruckoutLineMonth[1]);
        setTotalsumtruckoutLineMonth3(totalsumstruckoutLineMonth[2]);
        setTotalsumtruckoutLineMonth4(totalsumstruckoutLineMonth[3]);
        setTotalsumtruckoutLineMonth5(totalsumstruckoutLineMonth[4]);
        setTotalsumtruckoutLineMonth6(totalsumstruckoutLineMonth[5]);
        setTotalsumtruckoutLineMonth7(totalsumstruckoutLineMonth[6]);
        setTotalsumtruckoutLineMonth8(totalsumstruckoutLineMonth[7]);
        setTotalsumtruckoutLineMonth9(totalsumstruckoutLineMonth[8]);
        setTotalsumtruckoutLineMonth10(totalsumstruckoutLineMonth[9]);
        setTotalsumtruckoutLineMonth11(totalsumstruckoutLineMonth[10]);
        setTotalsumtruckoutLineMonth12(totalsumstruckoutLineMonth[11]);
        setTotalsumtruckoutLineMonth13(totalsumstruckoutLineMonth[12]);
        setTotalsumtruckoutLineMonth14(totalsumstruckoutLineMonth[13]);
        setTotalsumtruckoutLineMonth15(totalsumstruckoutLineMonth[14]);
        setTotalsumtruckoutLineMonth16(totalsumstruckoutLineMonth[15]);
        setTotalsumtruckoutLineMonth17(totalsumstruckoutLineMonth[16]);
        setTotalsumtruckoutLineMonth18(totalsumstruckoutLineMonth[17]);
        setTotalsumtruckoutLineMonth19(totalsumstruckoutLineMonth[18]);
        setTotalsumtruckoutLineMonth20(totalsumstruckoutLineMonth[19]);
        setTotalsumtruckoutLineMonth21(totalsumstruckoutLineMonth[20]);
        setTotalsumtruckoutLineMonth22(totalsumstruckoutLineMonth[21]);
        setTotalsumtruckoutLineMonth23(totalsumstruckoutLineMonth[22]);
        setTotalsumtruckoutLineMonth24(totalsumstruckoutLineMonth[23]);
        setTotalsumtruckoutLineMonth25(totalsumstruckoutLineMonth[24]);
        setTotalsumtruckoutLineMonth26(totalsumstruckoutLineMonth[25]);
        setTotalsumtruckoutLineMonth27(totalsumstruckoutLineMonth[26]);
        setTotalsumtruckoutLineMonth28(totalsumstruckoutLineMonth[27]);
        setTotalsumtruckoutLineMonth29(totalsumstruckoutLineMonth[28]);
        setTotalsumtruckoutLineMonth30(totalsumstruckoutLineMonth[29]);
        setTotalsumtruckoutLineMonth31(totalsumstruckoutLineMonth[30]);
        setTotalsummotorbikeoutLineMonth1(totalsumsmotorbikeoutLineMonth[0]);
        setTotalsummotorbikeoutLineMonth2(totalsumsmotorbikeoutLineMonth[1]);
        setTotalsummotorbikeoutLineMonth3(totalsumsmotorbikeoutLineMonth[2]);
        setTotalsummotorbikeoutLineMonth4(totalsumsmotorbikeoutLineMonth[3]);
        setTotalsummotorbikeoutLineMonth5(totalsumsmotorbikeoutLineMonth[4]);
        setTotalsummotorbikeoutLineMonth6(totalsumsmotorbikeoutLineMonth[5]);
        setTotalsummotorbikeoutLineMonth7(totalsumsmotorbikeoutLineMonth[6]);
        setTotalsummotorbikeoutLineMonth8(totalsumsmotorbikeoutLineMonth[7]);
        setTotalsummotorbikeoutLineMonth9(totalsumsmotorbikeoutLineMonth[8]);
        setTotalsummotorbikeoutLineMonth10(totalsumsmotorbikeoutLineMonth[9]);
        setTotalsummotorbikeoutLineMonth11(totalsumsmotorbikeoutLineMonth[10]);
        setTotalsummotorbikeoutLineMonth12(totalsumsmotorbikeoutLineMonth[11]);
        setTotalsummotorbikeoutLineMonth13(totalsumsmotorbikeoutLineMonth[12]);
        setTotalsummotorbikeoutLineMonth14(totalsumsmotorbikeoutLineMonth[13]);
        setTotalsummotorbikeoutLineMonth15(totalsumsmotorbikeoutLineMonth[14]);
        setTotalsummotorbikeoutLineMonth16(totalsumsmotorbikeoutLineMonth[15]);
        setTotalsummotorbikeoutLineMonth17(totalsumsmotorbikeoutLineMonth[16]);
        setTotalsummotorbikeoutLineMonth18(totalsumsmotorbikeoutLineMonth[17]);
        setTotalsummotorbikeoutLineMonth19(totalsumsmotorbikeoutLineMonth[18]);
        setTotalsummotorbikeoutLineMonth20(totalsumsmotorbikeoutLineMonth[19]);
        setTotalsummotorbikeoutLineMonth21(totalsumsmotorbikeoutLineMonth[20]);
        setTotalsummotorbikeoutLineMonth22(totalsumsmotorbikeoutLineMonth[21]);
        setTotalsummotorbikeoutLineMonth23(totalsumsmotorbikeoutLineMonth[22]);
        setTotalsummotorbikeoutLineMonth24(totalsumsmotorbikeoutLineMonth[23]);
        setTotalsummotorbikeoutLineMonth25(totalsumsmotorbikeoutLineMonth[24]);
        setTotalsummotorbikeoutLineMonth26(totalsumsmotorbikeoutLineMonth[25]);
        setTotalsummotorbikeoutLineMonth27(totalsumsmotorbikeoutLineMonth[26]);
        setTotalsummotorbikeoutLineMonth28(totalsumsmotorbikeoutLineMonth[27]);
        setTotalsummotorbikeoutLineMonth29(totalsumsmotorbikeoutLineMonth[28]);
        setTotalsummotorbikeoutLineMonth30(totalsumsmotorbikeoutLineMonth[29]);
        setTotalsummotorbikeoutLineMonth31(totalsumsmotorbikeoutLineMonth[30]);
        setTotalsumscarInWeek(totalsumscarInWeek);
        setTotalsumstruckInWeek(totalsumstruckInWeek);
        setTotalsumsmotorbikeInWeek(totalsumsmotorbikeInWeek);
        setTotalsumscarOutWeek(totalsumscarOutWeek);
        setTotalsumstruckOutWeek(totalsumstruckOutWeek);
        setTotalsumsmotorbikeOutWeek(totalsumsmotorbikeOutWeek);
        setTotalsumscarOutWeek(totalsumscarOutWeek);
        setTotalsumstruckOutWeek(totalsumstruckOutWeek);
        setTotalsumscarInMonth(totalsumscarInMonth);
        setTotalsumstruckInMonth(totalsumstruckInMonth);
        setTotalsumsmotorbikeInMonth(totalsumsmotorbikeInMonth);
        setTotalsumscarOutMonth(totalsumscarOutMonth);
        
        setTotalsumsmotorbikeOutMonth(totalsumsmotorbikeOutMonth);
        setTotalsumscarOutMonth(totalsumscarOutMonth);
        setTotalsumstruckOutMonth(totalsumstruckOutMonth);
        setTotalsumcarinLineDay1(totalsumscarinLineDay[0]);
        setTotalsumcarinLineDay2(totalsumscarinLineDay[1]);
        setTotalsumcarinLineDay3(totalsumscarinLineDay[2]);
        setTotalsumcarinLineDay4(totalsumscarinLineDay[3]);
        setTotalsumcarinLineDay5(totalsumscarinLineDay[4]);
        setTotalsumcarinLineDay6(totalsumscarinLineDay[5]);
        setTotalsumcarinLineDay7(totalsumscarinLineDay[6]);
        setTotalsumcarinLineDay8(totalsumscarinLineDay[7]);
        setTotalsumcarinLineDay9(totalsumscarinLineDay[8]);
        setTotalsumcarinLineDay10(totalsumscarinLineDay[9]);
        setTotalsumcarinLineDay11(totalsumscarinLineDay[10]);
        setTotalsumcarinLineDay12(totalsumscarinLineDay[11]);
        setTotalsumcarinLineDay13(totalsumscarinLineDay[12]);
        setTotalsumcarinLineDay14(totalsumscarinLineDay[13]);
        setTotalsumcarinLineDay15(totalsumscarinLineDay[14]);
        setTotalsumcarinLineDay16(totalsumscarinLineDay[15]);
        setTotalsumcarinLineDay17(totalsumscarinLineDay[16]);
        setTotalsumcarinLineDay18(totalsumscarinLineDay[17]);
        setTotalsumcarinLineDay19(totalsumscarinLineDay[18]);
        setTotalsumcarinLineDay20(totalsumscarinLineDay[19]);
        setTotalsumcarinLineDay21(totalsumscarinLineDay[20]);
        setTotalsumcarinLineDay22(totalsumscarinLineDay[21]);
        setTotalsumcarinLineDay23(totalsumscarinLineDay[22]);
        setTotalsumcarinLineDay24(totalsumscarinLineDay[23]);
        setTotalsumtruckinLineDay1(totalsumstruckinLineDay[0]);
        setTotalsumtruckinLineDay2(totalsumstruckinLineDay[1]);
        setTotalsumtruckinLineDay3(totalsumstruckinLineDay[2]);
        setTotalsumtruckinLineDay4(totalsumstruckinLineDay[3]);
        setTotalsumtruckinLineDay5(totalsumstruckinLineDay[4]);
        setTotalsumtruckinLineDay6(totalsumstruckinLineDay[5]);
        setTotalsumtruckinLineDay7(totalsumstruckinLineDay[6]);
        setTotalsumtruckinLineDay8(totalsumstruckinLineDay[7]);
        setTotalsumtruckinLineDay9(totalsumstruckinLineDay[8]);
        setTotalsumtruckinLineDay10(totalsumstruckinLineDay[9]);
        setTotalsumtruckinLineDay11(totalsumstruckinLineDay[10]);
        setTotalsumtruckinLineDay12(totalsumstruckinLineDay[11]);
        setTotalsumtruckinLineDay13(totalsumstruckinLineDay[12]);
        setTotalsumtruckinLineDay14(totalsumstruckinLineDay[13]);
        setTotalsumtruckinLineDay15(totalsumstruckinLineDay[14]);
        setTotalsumtruckinLineDay16(totalsumstruckinLineDay[15]);
        setTotalsumtruckinLineDay17(totalsumstruckinLineDay[16]);
        setTotalsumtruckinLineDay18(totalsumstruckinLineDay[17]);
        setTotalsumtruckinLineDay19(totalsumstruckinLineDay[18]);
        setTotalsumtruckinLineDay20(totalsumstruckinLineDay[19]);
        setTotalsumtruckinLineDay21(totalsumstruckinLineDay[20]);
        setTotalsumtruckinLineDay22(totalsumstruckinLineDay[21]);
        setTotalsumtruckinLineDay23(totalsumstruckinLineDay[22]);
        setTotalsumtruckinLineDay24(totalsumstruckinLineDay[23]);
        setTotalsummotorbikeinLineDay1(totalsumsmotorbikeinLineDay[0]);
        setTotalsummotorbikeinLineDay2(totalsumsmotorbikeinLineDay[1]);
        setTotalsummotorbikeinLineDay3(totalsumsmotorbikeinLineDay[2]);
        setTotalsummotorbikeinLineDay4(totalsumsmotorbikeinLineDay[3]);
        setTotalsummotorbikeinLineDay5(totalsumsmotorbikeinLineDay[4]);
        setTotalsummotorbikeinLineDay6(totalsumsmotorbikeinLineDay[5]);
        setTotalsummotorbikeinLineDay7(totalsumsmotorbikeinLineDay[6]);
        setTotalsummotorbikeinLineDay8(totalsumsmotorbikeinLineDay[7]);
        setTotalsummotorbikeinLineDay9(totalsumsmotorbikeinLineDay[8]);
        setTotalsummotorbikeinLineDay10(totalsumsmotorbikeinLineDay[9]);
        setTotalsummotorbikeinLineDay11(totalsumsmotorbikeinLineDay[10]);
        setTotalsummotorbikeinLineDay12(totalsumsmotorbikeinLineDay[11]);
        setTotalsummotorbikeinLineDay13(totalsumsmotorbikeinLineDay[12]);
        setTotalsummotorbikeinLineDay14(totalsumsmotorbikeinLineDay[13]);
        setTotalsummotorbikeinLineDay15(totalsumsmotorbikeinLineDay[14]);
        setTotalsummotorbikeinLineDay16(totalsumsmotorbikeinLineDay[15]);
        setTotalsummotorbikeinLineDay17(totalsumsmotorbikeinLineDay[16]);
        setTotalsummotorbikeinLineDay18(totalsumsmotorbikeinLineDay[17]);
        setTotalsummotorbikeinLineDay19(totalsumsmotorbikeinLineDay[18]);
        setTotalsummotorbikeinLineDay20(totalsumsmotorbikeinLineDay[19]);
        setTotalsummotorbikeinLineDay21(totalsumsmotorbikeinLineDay[20]);
        setTotalsummotorbikeinLineDay22(totalsumsmotorbikeinLineDay[21]);
        setTotalsummotorbikeinLineDay23(totalsumsmotorbikeinLineDay[22]);
        setTotalsummotorbikeinLineDay24(totalsumsmotorbikeinLineDay[23]);
        setTotalsumcaroutLineDay1(totalsumscaroutLineDay[0]);
        setTotalsumcaroutLineDay2(totalsumscaroutLineDay[1]);
        setTotalsumcaroutLineDay3(totalsumscaroutLineDay[2]);
        setTotalsumcaroutLineDay4(totalsumscaroutLineDay[3]);
        setTotalsumcaroutLineDay5(totalsumscaroutLineDay[4]);
        setTotalsumcaroutLineDay6(totalsumscaroutLineDay[5]);
        setTotalsumcaroutLineDay7(totalsumscaroutLineDay[6]);
        setTotalsumcaroutLineDay8(totalsumscaroutLineDay[7]);
        setTotalsumcaroutLineDay9(totalsumscaroutLineDay[8]);
        setTotalsumcaroutLineDay10(totalsumscaroutLineDay[9]);
        setTotalsumcaroutLineDay11(totalsumscaroutLineDay[10]);
        setTotalsumcaroutLineDay12(totalsumscaroutLineDay[11]);
        setTotalsumcaroutLineDay13(totalsumscaroutLineDay[12]);
        setTotalsumcaroutLineDay14(totalsumscaroutLineDay[13]);
        setTotalsumcaroutLineDay15(totalsumscaroutLineDay[14]);
        setTotalsumcaroutLineDay16(totalsumscaroutLineDay[15]);
        setTotalsumcaroutLineDay17(totalsumscaroutLineDay[16]);
        setTotalsumcaroutLineDay18(totalsumscaroutLineDay[17]);
        setTotalsumcaroutLineDay19(totalsumscaroutLineDay[18]);
        setTotalsumcaroutLineDay20(totalsumscaroutLineDay[19]);
        setTotalsumcaroutLineDay21(totalsumscaroutLineDay[20]);
        setTotalsumcaroutLineDay22(totalsumscaroutLineDay[21]);
        setTotalsumcaroutLineDay23(totalsumscaroutLineDay[22]);
        setTotalsumcaroutLineDay24(totalsumscaroutLineDay[23]);
        setTotalsumtruckoutLineDay1(totalsumstruckoutLineDay[0]);
        setTotalsumtruckoutLineDay2(totalsumstruckoutLineDay[1]);
        setTotalsumtruckoutLineDay3(totalsumstruckoutLineDay[2]);
        setTotalsumtruckoutLineDay4(totalsumstruckoutLineDay[3]);
        setTotalsumtruckoutLineDay5(totalsumstruckoutLineDay[4]);
        setTotalsumtruckoutLineDay6(totalsumstruckoutLineDay[5]);
        setTotalsumtruckoutLineDay7(totalsumstruckoutLineDay[6]);
        setTotalsumtruckoutLineDay8(totalsumstruckoutLineDay[7]);
        setTotalsumtruckoutLineDay9(totalsumstruckoutLineDay[8]);
        setTotalsumtruckoutLineDay10(totalsumstruckoutLineDay[9]);
        setTotalsumtruckoutLineDay11(totalsumstruckoutLineDay[10]);
        setTotalsumtruckoutLineDay12(totalsumstruckoutLineDay[11]);
        setTotalsumtruckoutLineDay13(totalsumstruckoutLineDay[12]);
        setTotalsumtruckoutLineDay14(totalsumstruckoutLineDay[13]);
        setTotalsumtruckoutLineDay15(totalsumstruckoutLineDay[14]);
        setTotalsumtruckoutLineDay16(totalsumstruckoutLineDay[15]);
        setTotalsumtruckoutLineDay17(totalsumstruckoutLineDay[16]);
        setTotalsumtruckoutLineDay18(totalsumstruckoutLineDay[17]);
        setTotalsumtruckoutLineDay19(totalsumstruckoutLineDay[18]);
        setTotalsumtruckoutLineDay20(totalsumstruckoutLineDay[19]);
        setTotalsumtruckoutLineDay21(totalsumstruckoutLineDay[20]);
        setTotalsumtruckoutLineDay22(totalsumstruckoutLineDay[21]);
        setTotalsumtruckoutLineDay23(totalsumstruckoutLineDay[22]);
        setTotalsumtruckoutLineDay24(totalsumstruckoutLineDay[23]);
        setTotalsummotorbikeoutLineDay1(totalsumsmotorbikeoutLineDay[0]);
        setTotalsummotorbikeoutLineDay2(totalsumsmotorbikeoutLineDay[1]);
        setTotalsummotorbikeoutLineDay3(totalsumsmotorbikeoutLineDay[2]);
        setTotalsummotorbikeoutLineDay4(totalsumsmotorbikeoutLineDay[3]);
        setTotalsummotorbikeoutLineDay5(totalsumsmotorbikeoutLineDay[4]);
        setTotalsummotorbikeoutLineDay6(totalsumsmotorbikeoutLineDay[5]);
        setTotalsummotorbikeoutLineDay7(totalsumsmotorbikeoutLineDay[6]);
        setTotalsummotorbikeoutLineDay8(totalsumsmotorbikeoutLineDay[7]);
        setTotalsummotorbikeoutLineDay9(totalsumsmotorbikeoutLineDay[8]);
        setTotalsummotorbikeoutLineDay10(totalsumsmotorbikeoutLineDay[9]);
        setTotalsummotorbikeoutLineDay11(totalsumsmotorbikeoutLineDay[10]);
        setTotalsummotorbikeoutLineDay12(totalsumsmotorbikeoutLineDay[11]);
        setTotalsummotorbikeoutLineDay13(totalsumsmotorbikeoutLineDay[12]);
        setTotalsummotorbikeoutLineDay14(totalsumsmotorbikeoutLineDay[13]);
        setTotalsummotorbikeoutLineDay15(totalsumsmotorbikeoutLineDay[14]);
        setTotalsummotorbikeoutLineDay16(totalsumsmotorbikeoutLineDay[15]);
        setTotalsummotorbikeoutLineDay17(totalsumsmotorbikeoutLineDay[16]);
        setTotalsummotorbikeoutLineDay18(totalsumsmotorbikeoutLineDay[17]);
        setTotalsummotorbikeoutLineDay19(totalsumsmotorbikeoutLineDay[18]);
        setTotalsummotorbikeoutLineDay20(totalsumsmotorbikeoutLineDay[19]);
        setTotalsummotorbikeoutLineDay21(totalsumsmotorbikeoutLineDay[20]);
        setTotalsummotorbikeoutLineDay22(totalsumsmotorbikeoutLineDay[21]);
        setTotalsummotorbikeoutLineDay23(totalsumsmotorbikeoutLineDay[22]);
        setTotalsummotorbikeoutLineDay24(totalsumsmotorbikeinLineDay[23]);
        setTotalsumscarInDay(totalsumscarInDay);
        setTotalsumstruckInDay(totalsumstruckInDay);
        setTotalsumsmotorbikeInDay(totalsumsmotorbikeInDay);
        setTotalsumscarOutDay(totalsumscarOutDay);
        setTotalsumstruckOutDay(totalsumstruckOutDay);
        setTotalsumsmotorbikeOutDay(totalsumsmotorbikeOutDay);       
        setLoading(false); // สิ้นสุดการโหลด
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // สิ้นสุดการโหลด
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchGatesAndDoor();
    setIsLoading(false);
  }, [_id,selectedDay,selectedThisMonth]); // เพิ่ม fetchGatesAndDoor เป็น dependency ของ useEffect เพื่อป้องกันการรันซ้ำ

  useEffect(() => {
    setSelectedMonthago(true);
    setSelectedDay(false);
    setSelectedDay2ago(false);
    fetchGatesAndDoor();
  }, []); // เพิ่ม fetchGatesAndDoor เป็น dependency ของ useEffect เพื่อป้องกันการรันซ้ำ

  console.log(k)
   

  return (
    <>
      <div style={{display: 'flex', width: '100vw', backgroundColor: "white", display: 'flex', flexDirection: 'column', height: 'auto'}}>
        <Menubar />
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
         <div style={{ position: 'relativeLe', width: '100%', maxWidth: '100%' }}>
         {loading ? (
              <Backdrop open={loading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="loading-screen" style={{ color: 'white', fontSize: '24px' }}>
                  <Hourglass
                    color="#4fa94d"
                    width="150"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                  />
                  Loading.....
                </div>
              </Backdrop>
            ) : null}
               {isLoading ? (
              <Backdrop open={isLoading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="isloading-screen" style={{ color: 'white', fontSize: '24px' }}>
                  <Hourglass
                    color="#4fa94d"
                    width="150"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                  />
                  Loading.....
                </div>
              </Backdrop>
            ) : null}
            {/* <>{totalsum2}</> */}
            {/* <>{selectedDay1ago} 
             {selectedDay2ago} 
             {selectedDay3ago}</> */}
         <ImageSlot style={{ maxWidth: '100vw', height: 'auto' }} />
           </div>
            <div style={{ position: 'absolute',left: '0.5%', fontSize: '3vw', fontWeight: 'bold', color: 'white' }}>Gate {k}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex',  width: '100vw', marginBottom: '2px', height: 'auto' }}></div>
          <Menu.Item header style={{ width: '100%', fontSize: '1.5vw', padding: '10px', backgroundColor: "white", color: 'black', marginTop: '2px', display: 'flex', alignItems: 'center' }}>
            ข้อมูลของรถที่ผ่านเข้าออกประตู {k} <DropdownPie1></DropdownPie1> 
            {selectedDay && selectedThisMonth && ( 
              <DaySelect1></DaySelect1> 
            )}
            {/* {selectedDay1ago && (  
              <WeekSelect></WeekSelect>
            )} */}
            {selectedThisMonth && selectedDay2ago && ( 
              <MonthSelect1></MonthSelect1>
            )}
          </Menu.Item>
          <div className='charts-container' style={{display: 'flex', width: '100vw', padding: '10px', backgroundColor: 'white', height: '45vh', marginBottom: '10px', color: 'black', borderRadius: '20px' }}>
            <div style={{ display: 'flex', width: '100vw' }}>
            {selectedMonthago && (  
              <div id="pie2Chart" style={{ width: '100vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', color: 'black', borderRadius: '20px' }}>
                {(totalsum1 !== 0 || totalsum2 !== 0) && 
                <Pie2Chart 
                totalsum1={totalsum1} 
                totalsum2={totalsum2} />}
          </div>
          )}
                {selectedDay && selectedThisMonth && (  
              <div id="pie1GateChart" style={{ width: '100vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', color: 'black', borderRadius: '20px' }}>
                {(totalsum1 !== 0 || totalsum2 !== 0) && 
                <Pie1GateChart 
                totalsumsDayIn={totalsumsDayIn} 
                totalsumsDayOut={totalsumsDayOut} />}
          </div>
          )}
                {selectedDay1ago && (  
              <div id="pie3GateChart" style={{ width: '100vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', color: 'black', borderRadius: '20px' }}>
                {(totalsum1 !== 0 || totalsum2 !== 0) && 
                <Pie3GateChart  
                totalsumsWeekIn={totalsumsWeekIn} 
                totalsumsWeekOut={totalsumsWeekOut} />}
          </div>
          )}
                {selectedThisMonth && selectedDay2ago && (  
              <div id="pie4GateChart" style={{ width: '100vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', color: 'black', borderRadius: '20px' }}>
                {(totalsum1 !== 0 || totalsum2 !== 0) && 
                <Pie4GateChart  
                totalsumsMonthIn={totalsumsMonthIn} 
                totalsumsMonthOut={totalsumsMonthOut} />}
          </div>
          )}              
            </div>
          </div>
          <div className='charts-container' style={{ display: 'flex', justifyContent: 'space-between', width: '100vw' }}>
            <div style={{ width: '33vw', padding: '10px', backgroundColor: 'white', border: '5px solid #f2f0f0', color: 'black', borderRadius: '20px' }}>
            {selectedMonthago && (
              <div id="lineChart" style={{ height: '250px' }}>
                {(totalsum1 !== 0 || totalsum2 !== 0) && 
                <LineChart 
                totalsumcarinline1={totalsumcarinline1} 
                totalsumcarinline2={totalsumcarinline2} 
                totalsumcarinline3={totalsumcarinline3} 
                totalsumcarinline4={totalsumcarinline4} 
                totalsumcarinline5={totalsumcarinline5} 
                totalsumcarinline6={totalsumcarinline6} 
                totalsumcaroutline1={totalsumcaroutline1} 
                totalsumcaroutline2={totalsumcaroutline2} 
                totalsumcaroutline3={totalsumcaroutline3} 
                totalsumcaroutline4={totalsumcaroutline4} 
                totalsumcaroutline5={totalsumcaroutline5} 
                totalsumcaroutline6={totalsumcaroutline6} 
                />}
              </div>
              )}
              {selectedDay1ago && (
                  <div id="line5Chart" style={{ height: '250px' }}>
                  { (totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line5Chart 
                  totalsumcarinLineWeek1={totalsumcarinLineWeek1} 
                  totalsumcarinLineWeek2={totalsumcarinLineWeek2} 
                  totalsumcarinLineWeek3={totalsumcarinLineWeek3} 
                  totalsumcarinLineWeek4={totalsumcarinLineWeek4} 
                  totalsumcarinLineWeek5={totalsumcarinLineWeek5} 
                  totalsumcarinLineWeek6={totalsumcarinLineWeek6} 
                  totalsumcarinLineWeek7={totalsumcarinLineWeek7} 
                  totalsumcaroutLineWeek1={totalsumcaroutLineWeek1} 
                  totalsumcaroutLineWeek2={totalsumcaroutLineWeek2} 
                  totalsumcaroutLineWeek3={totalsumcaroutLineWeek3} 
                  totalsumcaroutLineWeek4={totalsumcaroutLineWeek4} 
                  totalsumcaroutLineWeek5={totalsumcaroutLineWeek5} 
                  totalsumcaroutLineWeek6={totalsumcaroutLineWeek6} 
                  totalsumcaroutLineWeek7={totalsumcaroutLineWeek7} 
                  />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div id="line8Chart" style={{ height: '250px' }}>
                  { (totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line8Chart 
                  totalsumcarinLineMonth1= {totalsumcarinLineMonth1} 
                  totalsumcarinLineMonth2= {totalsumcarinLineMonth2} 
                  totalsumcarinLineMonth3 ={totalsumcarinLineMonth3} 
                  totalsumcarinLineMonth4= {totalsumcarinLineMonth4} 
                  totalsumcarinLineMonth5= {totalsumcarinLineMonth5} 
                  totalsumcarinLineMonth6= {totalsumcarinLineMonth6} 
                  totalsumcarinLineMonth7= {totalsumcarinLineMonth7} 
                  totalsumcarinLineMonth8= {totalsumcarinLineMonth8} 
                  totalsumcarinLineMonth9= {totalsumcarinLineMonth9} 
                  totalsumcarinLineMonth10= {totalsumcarinLineMonth10} 
                  totalsumcarinLineMonth11= {totalsumcarinLineMonth11} 
                  totalsumcarinLineMonth12= {totalsumcarinLineMonth12} 
                  totalsumcarinLineMonth13= {totalsumcarinLineMonth13} 
                  totalsumcarinLineMonth14= {totalsumcarinLineMonth14} 
                  totalsumcarinLineMonth15= {totalsumcarinLineMonth15} 
                  totalsumcarinLineMonth16= {totalsumcarinLineMonth16} 
                  totalsumcarinLineMonth17= {totalsumcarinLineMonth17} 
                  totalsumcarinLineMonth18= {totalsumcarinLineMonth18} 
                  totalsumcarinLineMonth19= {totalsumcarinLineMonth19} 
                  totalsumcarinLineMonth20= {totalsumcarinLineMonth20} 
                  totalsumcarinLineMonth21= {totalsumcarinLineMonth21} 
                  totalsumcarinLineMonth22= {totalsumcarinLineMonth22} 
                  totalsumcarinLineMonth23= {totalsumcarinLineMonth23} 
                  totalsumcarinLineMonth24= {totalsumcarinLineMonth24} 
                  totalsumcarinLineMonth25= {totalsumcarinLineMonth25} 
                  totalsumcarinLineMonth26= {totalsumcarinLineMonth26} 
                  totalsumcarinLineMonth27= {totalsumcarinLineMonth27} 
                  totalsumcarinLineMonth28= {totalsumcarinLineMonth28} 
                  totalsumcarinLineMonth29= {totalsumcarinLineMonth29} 
                  totalsumcarinLineMonth30= {totalsumcarinLineMonth30} 
                  totalsumcarinLineMonth31= {totalsumcarinLineMonth31} 
                  totalsumcaroutLineMonth1= {totalsumcaroutLineMonth1} 
                  totalsumcaroutLineMonth2= {totalsumcaroutLineMonth2} 
                  totalsumcaroutLineMonth3 ={totalsumcaroutLineMonth3} 
                  totalsumcaroutLineMonth4= {totalsumcaroutLineMonth4} 
                  totalsumcaroutLineMonth5= {totalsumcaroutLineMonth5} 
                  totalsumcaroutLineMonth6= {totalsumcaroutLineMonth6} 
                  totalsumcaroutLineMonth7= {totalsumcaroutLineMonth7} 
                  totalsumcaroutLineMonth8= {totalsumcaroutLineMonth8} 
                  totalsumcaroutLineMonth9= {totalsumcaroutLineMonth9} 
                  totalsumcaroutLineMonth10= {totalsumcaroutLineMonth10} 
                  totalsumcaroutLineMonth11= {totalsumcaroutLineMonth11} 
                  totalsumcaroutLineMonth12= {totalsumcaroutLineMonth12} 
                  totalsumcaroutLineMonth13= {totalsumcaroutLineMonth13} 
                  totalsumcaroutLineMonth14= {totalsumcaroutLineMonth14} 
                  totalsumcaroutLineMonth15= {totalsumcaroutLineMonth15} 
                  totalsumcaroutLineMonth16= {totalsumcaroutLineMonth16} 
                  totalsumcaroutLineMonth17= {totalsumcaroutLineMonth17} 
                  totalsumcaroutLineMonth18= {totalsumcaroutLineMonth18} 
                  totalsumcaroutLineMonth19= {totalsumcaroutLineMonth19} 
                  totalsumcaroutLineMonth20= {totalsumcaroutLineMonth20} 
                  totalsumcaroutLineMonth21= {totalsumcaroutLineMonth21} 
                  totalsumcaroutLineMonth22= {totalsumcaroutLineMonth22} 
                  totalsumcaroutLineMonth23= {totalsumcaroutLineMonth23} 
                  totalsumcaroutLineMonth24= {totalsumcaroutLineMonth24} 
                  totalsumcaroutLineMonth25= {totalsumcaroutLineMonth25} 
                  totalsumcaroutLineMonth26= {totalsumcaroutLineMonth26} 
                  totalsumcaroutLineMonth27= {totalsumcaroutLineMonth27} 
                  totalsumcaroutLineMonth28= {totalsumcaroutLineMonth28} 
                  totalsumcaroutLineMonth29= {totalsumcaroutLineMonth29} 
                  totalsumcaroutLineMonth30= {totalsumcaroutLineMonth30} 
                  totalsumcaroutLineMonth31= {totalsumcaroutLineMonth31} 
                  />}
                  </div>
                  )}
                  {selectedDay && selectedThisMonth && (
                  <div id="line11Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line11Chart 
                  totalsumcarinLineDay1= {totalsumcarinLineDay1} 
                  totalsumcarinLineDay2= {totalsumcarinLineDay2} 
                  totalsumcarinLineDay3 ={totalsumcarinLineDay3} 
                  totalsumcarinLineDay4= {totalsumcarinLineDay4} 
                  totalsumcarinLineDay5= {totalsumcarinLineDay5} 
                  totalsumcarinLineDay6= {totalsumcarinLineDay6} 
                  totalsumcarinLineDay7= {totalsumcarinLineDay7} 
                  totalsumcarinLineDay8= {totalsumcarinLineDay8} 
                  totalsumcarinLineDay9= {totalsumcarinLineDay9} 
                  totalsumcarinLineDay10= {totalsumcarinLineDay10} 
                  totalsumcarinLineDay11= {totalsumcarinLineDay11} 
                  totalsumcarinLineDay12= {totalsumcarinLineDay12} 
                  totalsumcarinLineDay13= {totalsumcarinLineDay13} 
                  totalsumcarinLineDay14= {totalsumcarinLineDay14} 
                  totalsumcarinLineDay15= {totalsumcarinLineDay15} 
                  totalsumcarinLineDay16= {totalsumcarinLineDay16} 
                  totalsumcarinLineDay17= {totalsumcarinLineDay17} 
                  totalsumcarinLineDay18= {totalsumcarinLineDay18} 
                  totalsumcarinLineDay19= {totalsumcarinLineDay19} 
                  totalsumcarinLineDay20= {totalsumcarinLineDay20} 
                  totalsumcarinLineDay21= {totalsumcarinLineDay21} 
                  totalsumcarinLineDay22= {totalsumcarinLineDay22} 
                  totalsumcarinLineDay23= {totalsumcarinLineDay23} 
                  totalsumcarinLineDay24= {totalsumcarinLineDay24} 
                  totalsumcaroutLineDay1= {totalsumcaroutLineDay1} 
                  totalsumcaroutLineDay2= {totalsumcaroutLineDay2} 
                  totalsumcaroutLineDay3 ={totalsumcaroutLineDay3} 
                  totalsumcaroutLineDay4= {totalsumcaroutLineDay4} 
                  totalsumcaroutLineDay5= {totalsumcaroutLineDay5} 
                  totalsumcaroutLineDay6= {totalsumcaroutLineDay6} 
                  totalsumcaroutLineDay7= {totalsumcaroutLineDay7} 
                  totalsumcaroutLineDay8= {totalsumcaroutLineDay8} 
                  totalsumcaroutLineDay9= {totalsumcaroutLineDay9} 
                  totalsumcaroutLineDay10= {totalsumcaroutLineDay10} 
                  totalsumcaroutLineDay11= {totalsumcaroutLineDay11} 
                  totalsumcaroutLineDay12= {totalsumcaroutLineDay12} 
                  totalsumcaroutLineDay13= {totalsumcaroutLineDay13} 
                  totalsumcaroutLineDay14= {totalsumcaroutLineDay14} 
                  totalsumcaroutLineDay15= {totalsumcaroutLineDay15} 
                  totalsumcaroutLineDay16= {totalsumcaroutLineDay16} 
                  totalsumcaroutLineDay17= {totalsumcaroutLineDay17} 
                  totalsumcaroutLineDay18= {totalsumcaroutLineDay18} 
                  totalsumcaroutLineDay19= {totalsumcaroutLineDay19} 
                  totalsumcaroutLineDay20= {totalsumcaroutLineDay20} 
                  totalsumcaroutLineDay21= {totalsumcaroutLineDay21} 
                  totalsumcaroutLineDay22= {totalsumcaroutLineDay22} 
                  totalsumcaroutLineDay23= {totalsumcaroutLineDay23} 
                  totalsumcaroutLineDay24= {totalsumcaroutLineDay24} 
                  />}
                  </div>
                  )}
              <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
              {selectedMonthago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0) && 
                    <CarInOut Totalsumscarin={totalsumscarin} Totalsumscarout={totalsumscarout} />}
                  </div>
                   )}
                     {selectedDay1ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0)!== 0 && 
                    <CarInOut1 
                    TotalsumscarInWeek={totalsumscarInWeek} TotalsumscarOutWeek={totalsumscarOutWeek} />}
                  </div>
                   )}
                  {selectedDay && selectedThisMonth && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0) && 
                    <CarInOut3 
                    TotalsumscarInDay={totalsumscarInDay} TotalsumscarOutDay={totalsumscarOutDay} />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0) && 
                    <CarInOut2 
                    TotalsumscarInMonth={totalsumscarInMonth} TotalsumscarOutMonth={totalsumscarOutMonth} />}
                  </div>
                   )}
              </div>
            </div>
            <div style={{ width: '33vw', padding: '10px', backgroundColor: 'white', border: '5px solid #f2f0f0', color: 'black', borderRadius: '20px', whiteSpace: 'nowrap' }}>
              {selectedMonthago && (
                  <div id="line1Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) &&
                  <Line1Chart
                    totalsummotorbikeinline1={totalsummotorbikeinline1}
                    totalsummotorbikeinline2={totalsummotorbikeinline2}
                    totalsummotorbikeinline3={totalsummotorbikeinline3}
                    totalsummotorbikeinline4={totalsummotorbikeinline4}
                    totalsummotorbikeinline5={totalsummotorbikeinline5}
                    totalsummotorbikeinline6={totalsummotorbikeinline6}
                    totalsummotorbikeoutline1={totalsummotorbikeoutline1}
                    totalsummotorbikeoutline2={totalsummotorbikeoutline2}
                    totalsummotorbikeoutline3={totalsummotorbikeoutline3}
                    totalsummotorbikeoutline4={totalsummotorbikeoutline4}
                    totalsummotorbikeoutline5={totalsummotorbikeoutline5}
                    totalsummotorbikeoutline6={totalsummotorbikeoutline6}
                  />
                  }
                  </div>
                  )}
                    {selectedDay1ago && (
                  <div id="line6Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line6Chart 
                  totalsummotorbikeinLineWeek1={totalsummotorbikeinLineWeek1} 
                  totalsummotorbikeinLineWeek2={totalsummotorbikeinLineWeek2} 
                  totalsummotorbikeinLineWeek3={totalsummotorbikeinLineWeek3} 
                  totalsummotorbikeinLineWeek4={totalsummotorbikeinLineWeek4} 
                  totalsummotorbikeinLineWeek5={totalsummotorbikeinLineWeek5} 
                  totalsummotorbikeinLineWeek6={totalsummotorbikeinLineWeek6} 
                  totalsummotorbikeinLineWeek7={totalsummotorbikeinLineWeek7} 
                  totalsummotorbikeoutLineWeek1={totalsummotorbikeoutLineWeek1} 
                  totalsummotorbikeoutLineWeek2={totalsummotorbikeoutLineWeek2} 
                  totalsummotorbikeoutLineWeek3={totalsummotorbikeoutLineWeek3} 
                  totalsummotorbikeoutLineWeek4={totalsummotorbikeoutLineWeek4} 
                  totalsummotorbikeoutLineWeek5={totalsummotorbikeoutLineWeek5} 
                  totalsummotorbikeoutLineWeek6={totalsummotorbikeoutLineWeek6} 
                  totalsummotorbikeoutLineWeek7={totalsummotorbikeoutLineWeek7} 
                  />}
                  </div>
                  )}
                   {selectedDay && selectedThisMonth && (
                  <div id="line13Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line13Chart 
                  totalsummotorbikeinLineDay1= {totalsummotorbikeinLineDay1} 
                  totalsummotorbikeinLineDay2= {totalsummotorbikeinLineDay2} 
                  totalsummotorbikeinLineDay3 ={totalsummotorbikeinLineDay3} 
                  totalsummotorbikeinLineDay4= {totalsummotorbikeinLineDay4} 
                  totalsummotorbikeinLineDay5= {totalsummotorbikeinLineDay5} 
                  totalsummotorbikeinLineDay6= {totalsummotorbikeinLineDay6} 
                  totalsummotorbikeinLineDay7= {totalsummotorbikeinLineDay7} 
                  totalsummotorbikeinLineDay8= {totalsummotorbikeinLineDay8} 
                  totalsummotorbikeinLineDay9= {totalsummotorbikeinLineDay9} 
                  totalsummotorbikeinLineDay10= {totalsummotorbikeinLineDay10} 
                  totalsummotorbikeinLineDay11= {totalsummotorbikeinLineDay11} 
                  totalsummotorbikeinLineDay12= {totalsummotorbikeinLineDay12} 
                  totalsummotorbikeinLineDay13= {totalsummotorbikeinLineDay13} 
                  totalsummotorbikeinLineDay14= {totalsummotorbikeinLineDay14} 
                  totalsummotorbikeinLineDay15= {totalsummotorbikeinLineDay15} 
                  totalsummotorbikeinLineDay16= {totalsummotorbikeinLineDay16} 
                  totalsummotorbikeinLineDay17= {totalsummotorbikeinLineDay17} 
                  totalsummotorbikeinLineDay18= {totalsummotorbikeinLineDay18} 
                  totalsummotorbikeinLineDay19= {totalsummotorbikeinLineDay19} 
                  totalsummotorbikeinLineDay20= {totalsummotorbikeinLineDay20} 
                  totalsummotorbikeinLineDay21= {totalsummotorbikeinLineDay21} 
                  totalsummotorbikeinLineDay22= {totalsummotorbikeinLineDay22} 
                  totalsummotorbikeinLineDay23= {totalsummotorbikeinLineDay23} 
                  totalsummotorbikeinLineDay24= {totalsummotorbikeinLineDay24} 
                  totalsummotorbikeoutLineDay1= {totalsummotorbikeoutLineDay1} 
                  totalsummotorbikeoutLineDay2= {totalsummotorbikeoutLineDay2} 
                  totalsummotorbikeoutLineDay3 ={totalsummotorbikeoutLineDay3} 
                  totalsummotorbikeoutLineDay4= {totalsummotorbikeoutLineDay4} 
                  totalsummotorbikeoutLineDay5= {totalsummotorbikeoutLineDay5} 
                  totalsummotorbikeoutLineDay6= {totalsummotorbikeoutLineDay6} 
                  totalsummotorbikeoutLineDay7= {totalsummotorbikeoutLineDay7} 
                  totalsummotorbikeoutLineDay8= {totalsummotorbikeoutLineDay8} 
                  totalsummotorbikeoutLineDay9= {totalsummotorbikeoutLineDay9} 
                  totalsummotorbikeoutLineDay10= {totalsummotorbikeoutLineDay10} 
                  totalsummotorbikeoutLineDay11= {totalsummotorbikeoutLineDay11} 
                  totalsummotorbikeoutLineDay12= {totalsummotorbikeoutLineDay12} 
                  totalsummotorbikeoutLineDay13= {totalsummotorbikeoutLineDay13} 
                  totalsummotorbikeoutLineDay14= {totalsummotorbikeoutLineDay14} 
                  totalsummotorbikeoutLineDay15= {totalsummotorbikeoutLineDay15} 
                  totalsummotorbikeoutLineDay16= {totalsummotorbikeoutLineDay16} 
                  totalsummotorbikeoutLineDay17= {totalsummotorbikeoutLineDay17} 
                  totalsummotorbikeoutLineDay18= {totalsummotorbikeoutLineDay18} 
                  totalsummotorbikeoutLineDay19= {totalsummotorbikeoutLineDay19} 
                  totalsummotorbikeoutLineDay20= {totalsummotorbikeoutLineDay20} 
                  totalsummotorbikeoutLineDay21= {totalsummotorbikeoutLineDay21} 
                  totalsummotorbikeoutLineDay22= {totalsummotorbikeoutLineDay22} 
                  totalsummotorbikeoutLineDay23= {totalsummotorbikeoutLineDay23} 
                  totalsummotorbikeoutLineDay24= {totalsummotorbikeoutLineDay24} 
                  />}
                  </div>
                  )}
                       {selectedThisMonth && selectedDay2ago && (
                  <div id="line10Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line10Chart 
                  totalsummotorbikeinLineMonth1= {totalsummotorbikeinLineMonth1} 
                  totalsummotorbikeinLineMonth2= {totalsummotorbikeinLineMonth2} 
                  totalsummotorbikeinLineMonth3 ={totalsummotorbikeinLineMonth3} 
                  totalsummotorbikeinLineMonth4= {totalsummotorbikeinLineMonth4} 
                  totalsummotorbikeinLineMonth5= {totalsummotorbikeinLineMonth5} 
                  totalsummotorbikeinLineMonth6= {totalsummotorbikeinLineMonth6} 
                  totalsummotorbikeinLineMonth7= {totalsummotorbikeinLineMonth7} 
                  totalsummotorbikeinLineMonth8= {totalsummotorbikeinLineMonth8} 
                  totalsummotorbikeinLineMonth9= {totalsummotorbikeinLineMonth9} 
                  totalsummotorbikeinLineMonth10= {totalsummotorbikeinLineMonth10} 
                  totalsummotorbikeinLineMonth11= {totalsummotorbikeinLineMonth11} 
                  totalsummotorbikeinLineMonth12= {totalsummotorbikeinLineMonth12} 
                  totalsummotorbikeinLineMonth13= {totalsummotorbikeinLineMonth13} 
                  totalsummotorbikeinLineMonth14= {totalsummotorbikeinLineMonth14} 
                  totalsummotorbikeinLineMonth15= {totalsummotorbikeinLineMonth15} 
                  totalsummotorbikeinLineMonth16= {totalsummotorbikeinLineMonth16} 
                  totalsummotorbikeinLineMonth17= {totalsummotorbikeinLineMonth17} 
                  totalsummotorbikeinLineMonth18= {totalsummotorbikeinLineMonth18} 
                  totalsummotorbikeinLineMonth19= {totalsummotorbikeinLineMonth19} 
                  totalsummotorbikeinLineMonth20= {totalsummotorbikeinLineMonth20} 
                  totalsummotorbikeinLineMonth21= {totalsummotorbikeinLineMonth21} 
                  totalsummotorbikeinLineMonth22= {totalsummotorbikeinLineMonth22} 
                  totalsummotorbikeinLineMonth23= {totalsummotorbikeinLineMonth23} 
                  totalsummotorbikeinLineMonth24= {totalsummotorbikeinLineMonth24} 
                  totalsummotorbikeinLineMonth25= {totalsummotorbikeinLineMonth25} 
                  totalsummotorbikeinLineMonth26= {totalsummotorbikeinLineMonth26} 
                  totalsummotorbikeinLineMonth27= {totalsummotorbikeinLineMonth27} 
                  totalsummotorbikeinLineMonth28= {totalsummotorbikeinLineMonth28} 
                  totalsummotorbikeinLineMonth29= {totalsummotorbikeinLineMonth29} 
                  totalsummotorbikeinLineMonth30= {totalsummotorbikeinLineMonth30} 
                  totalsummotorbikeinLineMonth31= {totalsummotorbikeinLineMonth31} 
                  totalsummotorbikeoutLineMonth1= {totalsummotorbikeoutLineMonth1} 
                  totalsummotorbikeoutLineMonth2= {totalsummotorbikeoutLineMonth2} 
                  totalsummotorbikeoutLineMonth3 ={totalsummotorbikeoutLineMonth3} 
                  totalsummotorbikeoutLineMonth4= {totalsummotorbikeoutLineMonth4} 
                  totalsummotorbikeoutLineMonth5= {totalsummotorbikeoutLineMonth5} 
                  totalsummotorbikeoutLineMonth6= {totalsummotorbikeoutLineMonth6} 
                  totalsummotorbikeoutLineMonth7= {totalsummotorbikeoutLineMonth7} 
                  totalsummotorbikeoutLineMonth8= {totalsummotorbikeoutLineMonth8} 
                  totalsummotorbikeoutLineMonth9= {totalsummotorbikeoutLineMonth9} 
                  totalsummotorbikeoutLineMonth10= {totalsummotorbikeoutLineMonth10} 
                  totalsummotorbikeoutLineMonth11= {totalsummotorbikeoutLineMonth11} 
                  totalsummotorbikeoutLineMonth12= {totalsummotorbikeoutLineMonth12} 
                  totalsummotorbikeoutLineMonth13= {totalsummotorbikeoutLineMonth13} 
                  totalsummotorbikeoutLineMonth14= {totalsummotorbikeoutLineMonth14} 
                  totalsummotorbikeoutLineMonth15= {totalsummotorbikeoutLineMonth15} 
                  totalsummotorbikeoutLineMonth16= {totalsummotorbikeoutLineMonth16} 
                  totalsummotorbikeoutLineMonth17= {totalsummotorbikeoutLineMonth17} 
                  totalsummotorbikeoutLineMonth18= {totalsummotorbikeoutLineMonth18} 
                  totalsummotorbikeoutLineMonth19= {totalsummotorbikeoutLineMonth19} 
                  totalsummotorbikeoutLineMonth20= {totalsummotorbikeoutLineMonth20} 
                  totalsummotorbikeoutLineMonth21= {totalsummotorbikeoutLineMonth21} 
                  totalsummotorbikeoutLineMonth22= {totalsummotorbikeoutLineMonth22} 
                  totalsummotorbikeoutLineMonth23= {totalsummotorbikeoutLineMonth23} 
                  totalsummotorbikeoutLineMonth24= {totalsummotorbikeoutLineMonth24} 
                  totalsummotorbikeoutLineMonth25= {totalsummotorbikeoutLineMonth25} 
                  totalsummotorbikeoutLineMonth26= {totalsummotorbikeoutLineMonth26} 
                  totalsummotorbikeoutLineMonth27= {totalsummotorbikeoutLineMonth27} 
                  totalsummotorbikeoutLineMonth28= {totalsummotorbikeoutLineMonth28} 
                  totalsummotorbikeoutLineMonth29= {totalsummotorbikeoutLineMonth29} 
                  totalsummotorbikeoutLineMonth30= {totalsummotorbikeoutLineMonth30} 
                  totalsummotorbikeoutLineMonth31= {totalsummotorbikeoutLineMonth31} 
                  />}
                  </div>
                  )}

              <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0'  }}>
              {selectedMonthago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(totalsum1 !== 0 || totalsum2 !== 0) && 
                      <MotorcycleInOut 
                      Totalsumsmotorbikein={totalsumsmotorbikein} Totalsumsmotorbikeout={totalsumsmotorbikeout} />}
                    </div>
                    )}
                  {selectedDay1ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(totalsum1 !== 0 || totalsum2 !== 0) && 
                      <MotorcycleInOut1 
                      TotalsumsmotorbikeInWeek={totalsumsmotorbikeInWeek} TotalsumsmotorbikeOutWeek={totalsumsmotorbikeOutWeek} />}
                    </div>
                    )}
                  {selectedDay && selectedThisMonth && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0) && 
                    <MotorcycleInOut3 
                    TotalsumsmotorbikeInDay={totalsumsmotorbikeInDay} TotalsumsmotorbikeOutDay={totalsumsmotorbikeOutDay} />}
                  </div>
                  )}
                     {selectedThisMonth && selectedDay2ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(totalsum1 !== 0 || totalsum2 !== 0) && 
                      <MotorcycleInOut2 
                      TotalsumsmotorbikeInMonth={totalsumsmotorbikeInMonth} TotalsumsmotorbikeOutMonth={totalsumsmotorbikeOutMonth} />}
                    </div>
                    )}
              </div>
            </div>
            <div style={{ width: '33vw', padding: '10px', backgroundColor: 'white', border: '5px solid #f2f0f0', color: 'black', borderRadius: '20px'}}>
            {selectedMonthago && ( 
                  <div id="line2Chart" style={{ height: '250px' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0)&&
                      <Line2Chart
                        totalsumtruckinline1={totalsumtruckinline1}
                        totalsumtruckinline2={totalsumtruckinline2}
                        totalsumtruckinline3={totalsumtruckinline3}
                        totalsumtruckinline4={totalsumtruckinline4}
                        totalsumtruckinline5={totalsumtruckinline5}
                        totalsumtruckinline6={totalsumtruckinline6}
                        totalsumtruckoutline1={totalsumtruckoutline1}
                        totalsumtruckoutline2={totalsumtruckoutline2}
                        totalsumtruckoutline3={totalsumtruckoutline3}
                        totalsumtruckoutline4={totalsumtruckoutline4}
                        totalsumtruckoutline5={totalsumtruckoutline5}
                        totalsumtruckoutline6={totalsumtruckoutline6}
                      />
                    }
                  </div>
                  )}
                  {selectedDay1ago && (
                  <div id="line7Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line7Chart 
                  totalsumtruckinLineWeek1={totalsumtruckinLineWeek1} 
                  totalsumtruckinLineWeek2={totalsumtruckinLineWeek2} 
                  totalsumtruckinLineWeek3={totalsumtruckinLineWeek3} 
                  totalsumtruckinLineWeek4={totalsumtruckinLineWeek4} 
                  totalsumtruckinLineWeek5={totalsumtruckinLineWeek5} 
                  totalsumtruckinLineWeek6={totalsumtruckinLineWeek6} 
                  totalsumtruckinLineWeek7={totalsumtruckinLineWeek7} 
                  totalsumtruckoutLineWeek1={totalsumtruckoutLineWeek1} 
                  totalsumtruckoutLineWeek2={totalsumtruckoutLineWeek2} 
                  totalsumtruckoutLineWeek3={totalsumtruckoutLineWeek3} 
                  totalsumtruckoutLineWeek4={totalsumtruckoutLineWeek4} 
                  totalsumtruckoutLineWeek5={totalsumtruckoutLineWeek5} 
                  totalsumtruckoutLineWeek6={totalsumtruckoutLineWeek6} 
                  totalsumtruckoutLineWeek7={totalsumtruckoutLineWeek7} 
                  />}
                  </div>
                  )}
                      {selectedDay && selectedThisMonth && (
                  <div id="line12Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line12Chart 
                  totalsumtruckinLineDay1= {totalsumtruckinLineDay1} 
                  totalsumtruckinLineDay2= {totalsumtruckinLineDay2} 
                  totalsumtruckinLineDay3 ={totalsumtruckinLineDay3} 
                  totalsumtruckinLineDay4= {totalsumtruckinLineDay4} 
                  totalsumtruckinLineDay5= {totalsumtruckinLineDay5} 
                  totalsumtruckinLineDay6= {totalsumtruckinLineDay6} 
                  totalsumtruckinLineDay7= {totalsumtruckinLineDay7} 
                  totalsumtruckinLineDay8= {totalsumtruckinLineDay8} 
                  totalsumtruckinLineDay9= {totalsumtruckinLineDay9} 
                  totalsumtruckinLineDay10= {totalsumtruckinLineDay10} 
                  totalsumtruckinLineDay11= {totalsumtruckinLineDay11} 
                  totalsumtruckinLineDay12= {totalsumtruckinLineDay12} 
                  totalsumtruckinLineDay13= {totalsumtruckinLineDay13} 
                  totalsumtruckinLineDay14= {totalsumtruckinLineDay14} 
                  totalsumtruckinLineDay15= {totalsumtruckinLineDay15} 
                  totalsumtruckinLineDay16= {totalsumtruckinLineDay16} 
                  totalsumtruckinLineDay17= {totalsumtruckinLineDay17} 
                  totalsumtruckinLineDay18= {totalsumtruckinLineDay18} 
                  totalsumtruckinLineDay19= {totalsumtruckinLineDay19} 
                  totalsumtruckinLineDay20= {totalsumtruckinLineDay20} 
                  totalsumtruckinLineDay21= {totalsumtruckinLineDay21} 
                  totalsumtruckinLineDay22= {totalsumtruckinLineDay22} 
                  totalsumtruckinLineDay23= {totalsumtruckinLineDay23} 
                  totalsumtruckinLineDay24= {totalsumtruckinLineDay24} 
                  totalsumtruckoutLineDay1= {totalsumtruckoutLineDay1} 
                  totalsumtruckoutLineDay2= {totalsumtruckoutLineDay2} 
                  totalsumtruckoutLineDay3 ={totalsumtruckoutLineDay3} 
                  totalsumtruckoutLineDay4= {totalsumtruckoutLineDay4} 
                  totalsumtruckoutLineDay5= {totalsumtruckoutLineDay5} 
                  totalsumtruckoutLineDay6= {totalsumtruckoutLineDay6} 
                  totalsumtruckoutLineDay7= {totalsumtruckoutLineDay7} 
                  totalsumtruckoutLineDay8= {totalsumtruckoutLineDay8} 
                  totalsumtruckoutLineDay9= {totalsumtruckoutLineDay9} 
                  totalsumtruckoutLineDay10= {totalsumtruckoutLineDay10} 
                  totalsumtruckoutLineDay11= {totalsumtruckoutLineDay11} 
                  totalsumtruckoutLineDay12= {totalsumtruckoutLineDay12} 
                  totalsumtruckoutLineDay13= {totalsumtruckoutLineDay13} 
                  totalsumtruckoutLineDay14= {totalsumtruckoutLineDay14} 
                  totalsumtruckoutLineDay15= {totalsumtruckoutLineDay15} 
                  totalsumtruckoutLineDay16= {totalsumtruckoutLineDay16} 
                  totalsumtruckoutLineDay17= {totalsumtruckoutLineDay17} 
                  totalsumtruckoutLineDay18= {totalsumtruckoutLineDay18} 
                  totalsumtruckoutLineDay19= {totalsumtruckoutLineDay19} 
                  totalsumtruckoutLineDay20= {totalsumtruckoutLineDay20} 
                  totalsumtruckoutLineDay21= {totalsumtruckoutLineDay21} 
                  totalsumtruckoutLineDay22= {totalsumtruckoutLineDay22} 
                  totalsumtruckoutLineDay23= {totalsumtruckoutLineDay23} 
                  totalsumtruckoutLineDay24= {totalsumtruckoutLineDay24} 
                  />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div id="line9Chart" style={{ height: '250px' }}>
                  {(totalsum1 !== 0 || totalsum2 !== 0) && 
                  <Line9Chart 
                  totalsumtruckinLineMonth1= {totalsumtruckinLineMonth1} 
                  totalsumtruckinLineMonth2= {totalsumtruckinLineMonth2} 
                  totalsumtruckinLineMonth3 ={totalsumtruckinLineMonth3} 
                  totalsumtruckinLineMonth4= {totalsumtruckinLineMonth4} 
                  totalsumtruckinLineMonth5= {totalsumtruckinLineMonth5} 
                  totalsumtruckinLineMonth6= {totalsumtruckinLineMonth6} 
                  totalsumtruckinLineMonth7= {totalsumtruckinLineMonth7} 
                  totalsumtruckinLineMonth8= {totalsumtruckinLineMonth8} 
                  totalsumtruckinLineMonth9= {totalsumtruckinLineMonth9} 
                  totalsumtruckinLineMonth10= {totalsumtruckinLineMonth10} 
                  totalsumtruckinLineMonth11= {totalsumtruckinLineMonth11} 
                  totalsumtruckinLineMonth12= {totalsumtruckinLineMonth12} 
                  totalsumtruckinLineMonth13= {totalsumtruckinLineMonth13} 
                  totalsumtruckinLineMonth14= {totalsumtruckinLineMonth14} 
                  totalsumtruckinLineMonth15= {totalsumtruckinLineMonth15} 
                  totalsumtruckinLineMonth16= {totalsumtruckinLineMonth16} 
                  totalsumtruckinLineMonth17= {totalsumtruckinLineMonth17} 
                  totalsumtruckinLineMonth18= {totalsumtruckinLineMonth18} 
                  totalsumtruckinLineMonth19= {totalsumtruckinLineMonth19} 
                  totalsumtruckinLineMonth20= {totalsumtruckinLineMonth20} 
                  totalsumtruckinLineMonth21= {totalsumtruckinLineMonth21} 
                  totalsumtruckinLineMonth22= {totalsumtruckinLineMonth22} 
                  totalsumtruckinLineMonth23= {totalsumtruckinLineMonth23} 
                  totalsumtruckinLineMonth24= {totalsumtruckinLineMonth24} 
                  totalsumtruckinLineMonth25= {totalsumtruckinLineMonth25} 
                  totalsumtruckinLineMonth26= {totalsumtruckinLineMonth26} 
                  totalsumtruckinLineMonth27= {totalsumtruckinLineMonth27} 
                  totalsumtruckinLineMonth28= {totalsumtruckinLineMonth28} 
                  totalsumtruckinLineMonth29= {totalsumtruckinLineMonth29} 
                  totalsumtruckinLineMonth30= {totalsumtruckinLineMonth30} 
                  totalsumtruckinLineMonth31= {totalsumtruckinLineMonth31} 
                  totalsumtruckoutLineMonth1= {totalsumtruckoutLineMonth1} 
                  totalsumtruckoutLineMonth2= {totalsumtruckoutLineMonth2} 
                  totalsumtruckoutLineMonth3 ={totalsumtruckoutLineMonth3} 
                  totalsumtruckoutLineMonth4= {totalsumtruckoutLineMonth4} 
                  totalsumtruckoutLineMonth5= {totalsumtruckoutLineMonth5} 
                  totalsumtruckoutLineMonth6= {totalsumtruckoutLineMonth6} 
                  totalsumtruckoutLineMonth7= {totalsumtruckoutLineMonth7} 
                  totalsumtruckoutLineMonth8= {totalsumtruckoutLineMonth8} 
                  totalsumtruckoutLineMonth9= {totalsumtruckoutLineMonth9} 
                  totalsumtruckoutLineMonth10= {totalsumtruckoutLineMonth10} 
                  totalsumtruckoutLineMonth11= {totalsumtruckoutLineMonth11} 
                  totalsumtruckoutLineMonth12= {totalsumtruckoutLineMonth12} 
                  totalsumtruckoutLineMonth13= {totalsumtruckoutLineMonth13} 
                  totalsumtruckoutLineMonth14= {totalsumtruckoutLineMonth14} 
                  totalsumtruckoutLineMonth15= {totalsumtruckoutLineMonth15} 
                  totalsumtruckoutLineMonth16= {totalsumtruckoutLineMonth16} 
                  totalsumtruckoutLineMonth17= {totalsumtruckoutLineMonth17} 
                  totalsumtruckoutLineMonth18= {totalsumtruckoutLineMonth18} 
                  totalsumtruckoutLineMonth19= {totalsumtruckoutLineMonth19} 
                  totalsumtruckoutLineMonth20= {totalsumtruckoutLineMonth20} 
                  totalsumtruckoutLineMonth21= {totalsumtruckoutLineMonth21} 
                  totalsumtruckoutLineMonth22= {totalsumtruckoutLineMonth22} 
                  totalsumtruckoutLineMonth23= {totalsumtruckoutLineMonth23} 
                  totalsumtruckoutLineMonth24= {totalsumtruckoutLineMonth24} 
                  totalsumtruckoutLineMonth25= {totalsumtruckoutLineMonth25} 
                  totalsumtruckoutLineMonth26= {totalsumtruckoutLineMonth26} 
                  totalsumtruckoutLineMonth27= {totalsumtruckoutLineMonth27} 
                  totalsumtruckoutLineMonth28= {totalsumtruckoutLineMonth28} 
                  totalsumtruckoutLineMonth29= {totalsumtruckoutLineMonth29} 
                  totalsumtruckoutLineMonth30= {totalsumtruckoutLineMonth30} 
                  totalsumtruckoutLineMonth31= {totalsumtruckoutLineMonth31} 
                  />}
                  </div>
                  )}
              <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
              {selectedMonthago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0 ) && 
                    <TruckInOut 
                    Totalsumstruckin={totalsumstruckin} Totalsumstruckout={totalsumstruckout} />}
                  </div>
                  )}
                  {selectedDay && selectedThisMonth && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0 ) && 
                    <TruckInOut3 
                    TotalsumstruckInDay={totalsumstruckInDay} TotalsumstruckOutDay={totalsumstruckOutDay} />}
                  </div>
                  )}
                   {selectedDay1ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0 ) && 
                    <TruckInOut1 
                    TotalsumstruckInWeek={totalsumstruckInWeek} TotalsumstruckOutWeek={totalsumstruckOutWeek} />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(totalsum1 !== 0 || totalsum2 !== 0 ) && 
                    <TruckInOut2 TotalsumstruckInMonth={totalsumstruckInMonth} TotalsumstruckOutMonth={totalsumstruckOutMonth} />}
                  </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>    
    </>
  );
  
}

export default Door;
