import React, {  Component, useContext, useEffect, useState } from 'react';
import { Menu, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Segment } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';
import TableGate from '../TableGate/TableGate';
import PieChart from '../Chart/PieChart'; 
import Pie1Chart from '../Chart/Pie1Chart'; 
import Pie4Chart from '../Chart/Pie4Chart';
import Pie5Chart from '../Chart/Pie5Chart';
import Pie6Chart from '../Chart/Pie6Chart';
import Pie7Chart from '../Chart/Pie7Chart'
import Pie8Chart from '../Chart/Pie8Chart';
import Pie9Chart from '../Chart/Pie9Chart';
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
import SUT from './sut.png';
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
import ModalGate from '../ModalGate/ModalGate';
import Menubar from '../MenuBar/Menubar';
import BarChart from '../Chart/BarChart'
import DropdownPie from '../Chart/DropdownPie';
import { StateContext } from '../ToolbarDetect/StateContext';
import LoadingApp from '../LoadingApp/LoadingApp';
import { FallingLines,Hourglass } from 'react-loader-spinner'
import { Backdrop } from '@mui/material'; // Import Material-UI Components
import DaySelect from '../Timeselect/DaySelect'
import MonthSelect from '../Timeselect/MonthSelect';
import { withRouter } from 'react-router-dom';
import ModalUser from '../ModalUser/ModalUser';


class App extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.server = process.env.REACT_APP_API_URL || '';
    this.pieChartRef = React.createRef();
    this.state = {
      users: [],
      gates: [],
      online: 0,
      totalsum1: 0,
      totalsum2: 0,
      totalsum3: 0,
      totalsum4: 0,
      totalsum5: 0,
      totalsum6: 0,
      totalsum7: 0,
      totalsum8: 0,
      totalsum1: 0,
      Totalsumscarin: 0,
      Totalsumstruckin: 0,
      Totalsumsmotorbikein: 0,
      Totalsumscarout: 0,
      Totalsumstruckout: 0,
      Totalsumsmotorbikeout: 0,
      Totalsumscarout: 0,
      Totalsumstruckout: 0,
      totalsumsmotorbikeout: 0,
      selectedDate: new Date(),
      totalsumcarinline1: 0,
      totalsumcarinline2: 0,
      totalsumcarinline3: 0,
      totalsumcarinline4: 0,
      totalsumcarinline5: 0,
      totalsumcarinline6: 0,
      totalsumtruckinline1: 0,
      totalsumtruckinline2: 0,
      totalsumtruckinline3: 0,
      totalsumtruckinline4: 0,
      totalsumtruckinline5: 0,
      totalsumtruckinline6: 0,
      totalsummotorbikeinline1: 0,
      totalsummotorbikeinline2: 0,
      totalsummotorbikeinline3: 0,
      totalsummotorbikeinline4: 0,
      totalsummotorbikeinline5: 0,
      totalsummotorbikeinline6: 0,
      totalsumcaroutline1: 0,
      totalsumcaroutline2: 0,
      totalsumcaroutline3: 0,
      totalsumcaroutline4: 0,
      totalsumcaroutline5: 0,
      totalsumcaroutline6: 0,
      totalsumtruckoutline1: 0,
      totalsumtruckoutline2: 0,
      totalsumtruckoutline3: 0,
      totalsumtruckoutline4: 0,
      totalsumtruckoutline5: 0,
      totalsumtruckoutline6: 0,
      totalsummotorbikeoutline1: 0,
      totalsummotorbikeoutline2: 0,
      totalsummotorbikeoutline3: 0,
      totalsummotorbikeoutline4: 0,
      totalsummotorbikeoutline5: 0,
      totalsummotorbikeoutline6: 0,
      totalsumsDayIn1: 0,
      totalsumsDayIn2: 0,
      totalsumsDayIn3: 0,
      totalsumsDayIn4: 0,
      totalsumsDayOut1: 0,
      totalsumsDayOut2: 0,
      totalsumsDayOut3: 0,
      totalsumsDayOut4: 0,
      selectedThisMonth: 2024,
      TotalsumsWeekInGate1: 0,
      TotalsumsWeekInGate2: 0,
      TotalsumsWeekInGate3: 0,
      TotalsumsWeekInGate4: 0,
      TotalsumsWeekOutGate1: 0,
      TotalsumsWeekOutGate2: 0,
      TotalsumsWeekOutGate3: 0,
      TotalsumsWeekOutGate4: 0,
      totalsumcarinLineWeek1: 0,
      totalsumcarinLineWeek2: 0,
      totalsumcarinLineWeek3: 0,
      totalsumcarinLineWeek4: 0,
      totalsumcarinLineWeek5: 0,
      totalsumcarinLineWeek6: 0,
      totalsumcarinLineWeek7: 0,
      totalsumtruckinLineWeek1: 0,
      totalsumtruckinLineWeek2: 0,
      totalsumtruckinLineWeek3: 0,
      totalsumtruckinLineWeek4: 0,
      totalsumtruckinLineWeek5: 0,
      totalsumtruckinLineWeek6: 0,
      totalsumtruckinLineWeek7: 0,
      totalsummotorbikeinLineWeek1: 0,
      totalsummotorbikeinLineWeek2: 0,
      totalsummotorbikeinLineWeek3: 0,
      totalsummotorbikeinLineWeek4: 0,
      totalsummotorbikeinLineWeek5: 0,
      totalsummotorbikeinLineWeek6: 0,
      totalsummotorbikeinLineWeek7: 0,
      totalsumcaroutLineWeek1: 0,
      totalsumcaroutLineWeek2: 0,
      totalsumcaroutLineWeek3: 0,
      totalsumcaroutLineWeek4: 0,
      totalsumcaroutLineWeek5: 0,
      totalsumcaroutLineWeek6: 0,
      totalsumcaroutLineWeek7: 0,
      totalsumtruckoutLineWeek1: 0,
      totalsumtruckoutLineWeek2: 0,
      totalsumtruckoutLineWeek3: 0,
      totalsumtruckoutLineWeek4: 0,
      totalsumtruckoutLineWeek5: 0,
      totalsumtruckoutLineWeek6: 0,
      totalsumtruckoutLineWeek7: 0,
      totalsummotorbikeoutLineWeek1: 0,
      totalsummotorbikeoutLineWeek2: 0,
      totalsummotorbikeoutLineWeek3: 0,
      totalsummotorbikeoutLineWeek4: 0,
      totalsummotorbikeoutLineWeek5: 0,
      totalsummotorbikeoutLineWeek6: 0,
      totalsummotorbikeoutLineWeek7: 0,
      totalsumsMonthIn1: 0,
      totalsumsMonthIn2: 0,
      totalsumsMonthIn3: 0,
      totalsumsMonthIn4: 0,
      totalsumsMonthOut1: 0,
      totalsumsMonthOut2: 0,
      totalsumsMonthOut3: 0,
      totalsumsMonthOut4: 0,
      TotalsumscarInDay: 0,
      TotalsumstruckInDay: 0,
      TotalsumsmotorbikeInDay: 0,
      TotalsumscarOutDay: 0,
      TotalsumstruckOutDay: 0,
      TotalsumsmotorbikeOutDay: 0,
      TotalsumscarOutWeek: 0,
      TotalsumstruckOutWeek: 0,
      TotalsumscarInWeek: 0,
      TotalsumstruckInWeek: 0,
      TotalsumsmotorbikeInWeek: 0,
      TotalsumscarOutWeek: 0,
      TotalsumstruckOutWeek: 0,
      TotalsumsmotorbikeOutWeek: 0,
      TotalsumscarOutWeek: 0,
      TotalsumstruckOutWeek: 0,
      TotalsumscarInMonth: 0,
      TotalsumstruckInMonth: 0,
      TotalsumsmotorbikeInMonth: 0,
      TotalsumscarOutMonth: 0,
      TotalsumstruckOutMonth: 0,
      TotalsumsmotorbikeOutMonth: 0,
      TotalsumscarOutMonth: 0,
      TotalsumstruckOutMonth: 0,
      totalsumcarinLineDay1: 0,
      totalsumcarinLineDay2: 0,
      totalsumcarinLineDay3: 0,
      totalsumcarinLineDay4: 0,
      totalsumcarinLineDay5: 0,
      totalsumcarinLineDay6: 0,
      totalsumcarinLineDay7: 0,
      totalsumcarinLineDay8: 0,
      totalsumcarinLineDay9: 0,
      totalsumcarinLineDay10: 0,
      totalsumcarinLineDay11: 0,
      totalsumcarinLineDay12: 0,
      totalsumcarinLineDay13: 0,
      totalsumcarinLineDay14: 0,
      totalsumcarinLineDay15: 0,
      totalsumcarinLineDay16: 0,
      totalsumcarinLineDay17: 0,
      totalsumcarinLineDay18: 0,
      totalsumcarinLineDay19: 0,
      totalsumcarinLineDay20: 0,
      totalsumcarinLineDay21: 0,
      totalsumcarinLineDay22: 0,
      totalsumcarinLineDay23: 0,
      totalsumcarinLineDay24: 0,
      totalsumtruckinLineDay1: 0,
      totalsumtruckinLineDay2: 0,
      totalsumtruckinLineDay3: 0,
      totalsumtruckinLineDay4: 0,
      totalsumtruckinLineDay5: 0,
      totalsumtruckinLineDay6: 0,
      totalsumtruckinLineDay7: 0,
      totalsumtruckinLineDay8: 0,
      totalsumtruckinLineDay9: 0,
      totalsumtruckinLineDay10: 0,
      totalsumtruckinLineDay11: 0,
      totalsumtruckinLineDay12: 0,
      totalsumtruckinLineDay13: 0,
      totalsumtruckinLineDay14: 0,
      totalsumtruckinLineDay15: 0,
      totalsumtruckinLineDay16: 0,
      totalsumtruckinLineDay17: 0,
      totalsumtruckinLineDay18: 0,
      totalsumtruckinLineDay19: 0,
      totalsumtruckinLineDay20: 0,
      totalsumtruckinLineDay21: 0,
      totalsumtruckinLineDay22: 0,
      totalsumtruckinLineDay23: 0,
      totalsumtruckinLineDay24: 0,
      totalsummotorbikeinLineDay1: 0,
      totalsummotorbikeinLineDay2: 0,
      totalsummotorbikeinLineDay3: 0,
      totalsummotorbikeinLineDay4: 0,
      totalsummotorbikeinLineDay5: 0,
      totalsummotorbikeinLineDay6: 0,
      totalsummotorbikeinLineDay7: 0,
      totalsummotorbikeinLineDay8: 0,
      totalsummotorbikeinLineDay9: 0,
      totalsummotorbikeinLineDay10: 0,
      totalsummotorbikeinLineDay11: 0,
      totalsummotorbikeinLineDay12: 0,
      totalsummotorbikeinLineDay13: 0,
      totalsummotorbikeinLineDay14: 0,
      totalsummotorbikeinLineDay15: 0,
      totalsummotorbikeinLineDay16: 0,
      totalsummotorbikeinLineDay17: 0,
      totalsummotorbikeinLineDay18: 0,
      totalsummotorbikeinLineDay19: 0,
      totalsummotorbikeinLineDay20: 0,
      totalsummotorbikeinLineDay21: 0,
      totalsummotorbikeinLineDay22: 0,
      totalsummotorbikeinLineDay23: 0,
      totalsummotorbikeinLineDay24: 0,
      totalsumcaroutLineDay1: 0,
      totalsumcaroutLineDay2: 0,
      totalsumcaroutLineDay3: 0,
      totalsumcaroutLineDay4: 0,
      totalsumcaroutLineDay5: 0,
      totalsumcaroutLineDay6: 0,
      totalsumcaroutLineDay7: 0,
      totalsumcaroutLineDay8: 0,
      totalsumcaroutLineDay9: 0,
      totalsumcaroutLineDay10: 0,
      totalsumcaroutLineDay11: 0,
      totalsumcaroutLineDay12: 0,
      totalsumcaroutLineDay13: 0,
      totalsumcaroutLineDay14: 0,
      totalsumcaroutLineDay15: 0,
      totalsumcaroutLineDay16: 0,
      totalsumcaroutLineDay17: 0,
      totalsumcaroutLineDay18: 0,
      totalsumcaroutLineDay19: 0,
      totalsumcaroutLineDay20: 0,
      totalsumcaroutLineDay21: 0,
      totalsumcaroutLineDay22: 0,
      totalsumcaroutLineDay23: 0,
      totalsumcaroutLineDay24: 0,
      totalsumtruckoutLineDay1: 0,
      totalsumtruckoutLineDay2: 0,
      totalsumtruckoutLineDay3: 0,
      totalsumtruckoutLineDay4: 0,
      totalsumtruckoutLineDay5: 0,
      totalsumtruckoutLineDay6: 0,
      totalsumtruckoutLineDay7: 0,
      totalsumtruckoutLineDay8: 0,
      totalsumtruckoutLineDay9: 0,
      totalsumtruckoutLineDay10: 0,
      totalsumtruckoutLineDay11: 0,
      totalsumtruckoutLineDay12: 0,
      totalsumtruckoutLineDay13: 0,
      totalsumtruckoutLineDay14: 0,
      totalsumtruckoutLineDay15: 0,
      totalsumtruckoutLineDay16: 0,
      totalsumtruckoutLineDay17: 0,
      totalsumtruckoutLineDay18: 0,
      totalsumtruckoutLineDay19: 0,
      totalsumtruckoutLineDay20: 0,
      totalsumtruckoutLineDay21: 0,
      totalsumtruckoutLineDay22: 0,
      totalsumtruckoutLineDay23: 0,
      totalsumtruckoutLineDay24: 0,
      totalsummotorbikeoutLineDay1: 0,
      totalsummotorbikeoutLineDay2: 0,
      totalsummotorbikeoutLineDay3: 0,
      totalsummotorbikeoutLineDay4: 0,
      totalsummotorbikeoutLineDay5: 0,
      totalsummotorbikeoutLineDay6: 0,
      totalsummotorbikeoutLineDay7: 0,
      totalsummotorbikeoutLineDay8: 0,
      totalsummotorbikeoutLineDay9: 0,
      totalsummotorbikeoutLineDay10: 0,
      totalsummotorbikeoutLineDay11: 0,
      totalsummotorbikeoutLineDay12: 0,
      totalsummotorbikeoutLineDay13: 0,
      totalsummotorbikeoutLineDay14: 0,
      totalsummotorbikeoutLineDay15: 0,
      totalsummotorbikeoutLineDay16: 0,
      totalsummotorbikeoutLineDay17: 0,
      totalsummotorbikeoutLineDay18: 0,
      totalsummotorbikeoutLineDay19: 0,
      totalsummotorbikeoutLineDay20: 0,
      totalsummotorbikeoutLineDay21: 0,
      totalsummotorbikeoutLineDay22: 0,
      totalsummotorbikeoutLineDay23: 0,
      totalsummotorbikeoutLineDay24: 0,
      Loading: false,
      role:'',
      
    };
    this.fetchGates = this.fetchGates.bind(this);
    this.handleGateAdded = this.handleGateAdded.bind(this);
    this.handleGateUpdated = this.handleGateUpdated.bind(this);
    this.handleGateDeleted = this.handleGateDeleted.bind(this);
    // this.handleDaySelectClick = this.handleDaySelectClick.bind(this);
  }

  async componentDidMount() {
    const { setSelectedMonthago,setIsLoading,setSelectedDay,setSelectedDay2ago} = this.context;
    setSelectedMonthago(true);
    setSelectedDay(false);
    setSelectedDay2ago(false);
    this.setState({ Loading: true });
    await this.fetchGates();
    this.setState({ Loading: false });
   
  }
  async componentDidUpdate(prevProps, prevState) {
    const { setIsLoading } = this.context;
    const { selectedDay, isLoading, selectedThisMonth } = this.context;
  
    if (
      selectedDay !== prevState.selectedDay ||
      selectedThisMonth !== prevState.selectedThisMonth
    ) {
      await this.fetchGates(); 
    }
  }
  
  
  

  async fetchGates() {
        const { selectedDay,isLoading,selectedThisMonth,userId, } = this.context;
        const { setIsLoading,setUserId,setUserName } = this.context;
        const {
          selectedDate,
          selectedThisMonthFormatted,
          selectedMonthago,
          selectedTwoMonthago,
          selectedThreeMonthago,
          selectedFourMonthago,
          selectedFiveMonthago,
        } = this.state;

        const UserId = window.location.href.split('/')[4]
        console.log(UserId)

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
  
      try {
        
          const urls = [
            'http://localhost:3000/api/gates/',
            'http://localhost:3000/api/sums/?gatein=1',
            'http://localhost:3000/api/sums/?gatein=2',
            'http://localhost:3000/api/sums/?gatein=3',
            'http://localhost:3000/api/sums/?gatein=4',
            'http://localhost:3000/api/sums/?gateout=1',
            'http://localhost:3000/api/sums/?gateout=2',
            'http://localhost:3000/api/sums/?gateout=3',
            'http://localhost:3000/api/sums/?gateout=4',
            `http://localhost:3000/api/sums/?timein=${ThisMonthFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7OneMonthAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7TwoMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7ThreeMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7FourMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7FiveMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${ThisMonthFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7OneMonthAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7TwoMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7ThreeMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7FourMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7FiveMonthsAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?timein=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timein=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7OneDayAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7TwoDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7ThreeDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7FourDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7FiveDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?timeout=${gmt7SixDaysAgoFormatted}`,
            `http://localhost:3000/api/sums/?gatein=1&timein=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gatein=2&timein=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gatein=3&timein=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gatein=4&timein=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gateout=1&timeout=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gateout=2&timeout=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gateout=3&timeout=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?gateout=4&timeout=${this.context.selectedThisMonth}`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-01`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-02`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-03`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-04`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-05`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-06`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-07`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-08`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-09`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-10`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-11`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-12`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-13`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-14`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-15`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-16`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-17`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-18`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-19`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-20`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-21`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-22`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-23`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-24`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-25`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-26`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-27`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-28`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-29`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-30`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedThisMonth}-31`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-01`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-02`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-03`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-04`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-05`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-06`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-07`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-08`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-09`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-10`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-11`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-12`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-13`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-14`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-15`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-16`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-17`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-18`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-19`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-20`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-21`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-22`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-23`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-24`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-25`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-26`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-27`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-28`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-29`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-30`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedThisMonth}-31`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T00`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T01`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T02`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T03`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T04`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T05`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T06`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T07`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T08`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T09`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T10`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T11`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T12`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T13`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T14`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T15`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T16`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T17`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T18`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T19`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T20`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T21`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T22`,
            `http://localhost:3000/api/sums/?timein=${this.context.selectedDay}T23`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T00`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T01`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T02`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T03`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T04`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T05`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T06`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T07`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T08`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T09`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T10`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T11`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T12`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T13`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T14`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T15`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T16`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T17`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T18`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T19`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T20`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T21`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T22`,
            `http://localhost:3000/api/sums/?timeout=${this.context.selectedDay}T23`,
            `http://localhost:3000/api/users/${UserId}`,
            
          ];
  
          const responses = await Promise.all(urls.map(url => axios.get(url)));
          const dataSets = responses.map(response => response.data);

          // Extract sum data from each data set
          const gates = dataSets[0].map(dataSet => ({ _id: dataSet._id, name: dataSet.name, description: dataSet.description }));
          const sums = dataSets.slice(1, 9).map(dataSet => dataSet.map(item => item.sum));
          const sumscarin = dataSets.slice(9, 15).map(dataSet => dataSet.map(item => item.sumcar));
          const sumscarout = dataSets.slice(15,21).map(dataSet => dataSet.map(item => item.sumcar));
          const sumstruckin = dataSets.slice(9, 15).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumstruckout = dataSets.slice(15,21).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumsmotorbikein = dataSets.slice(9, 15).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumsmotorbikeout = dataSets.slice(15,21).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumscarinLine = dataSets.slice(9, 15).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLine = dataSets.slice(9, 15).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLine = dataSets.slice(9, 15).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLine = dataSets.slice(15, 21).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLine = dataSets.slice(15, 21).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLine = dataSets.slice(15, 21).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumsDayIn = dataSets.slice(21, 25).map(dataSet => dataSet.map(item => item.sum));
          const sumsDayOut = dataSets.slice(25, 29).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekInGate1 = dataSets.slice(29,36).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekInGate2 = dataSets.slice(36,43).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekInGate3 = dataSets.slice(43,50).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekInGate4 = dataSets.slice(50,57).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekOutGate1 = dataSets.slice(57,64).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekOutGate2 = dataSets.slice(64,71).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekOutGate3 = dataSets.slice(71,78).map(dataSet => dataSet.map(item => item.sum));
          const sumsWeekOutGate4 = dataSets.slice(78,85).map(dataSet => dataSet.map(item => item.sum));
          const sumscarinLineWeek = dataSets.slice(85, 92).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLineWeek = dataSets.slice(85, 92).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLineWeek = dataSets.slice(85, 92).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLineWeek = dataSets.slice(92, 99).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLineWeek = dataSets.slice(92, 99).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLineWeek = dataSets.slice(92, 99).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumsMonthInGate1 = dataSets.slice(99,100).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthInGate2 = dataSets.slice(100,101).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthInGate3 = dataSets.slice(101,102).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthInGate4 = dataSets.slice(102,103).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthOutGate1 = dataSets.slice(103,104).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthOutGate2 = dataSets.slice(104,195).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthOutGate3 = dataSets.slice(105,106).map(dataSet => dataSet.map(item => item.sum));
          const sumsMonthOutGate4 = dataSets.slice(106,107).map(dataSet => dataSet.map(item => item.sum));
          const sumscarinLineMonth = dataSets.slice(107, 138).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLineMonth = dataSets.slice(107, 138).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLineMonth = dataSets.slice(107, 138).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLineMonth = dataSets.slice(138,169).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLineMonth = dataSets.slice(138,169).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLineMonth = dataSets.slice(138,169).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscarinLineDay = dataSets.slice(169, 193).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeinLineDay = dataSets.slice(169, 193).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckinLineDay = dataSets.slice(169, 193).map(dataSet => dataSet.map(item => item.sumtruck));
          const sumscaroutLineDay = dataSets.slice(193, 217).map(dataSet => dataSet.map(item => item.sumcar));
          const sumsmotorbikeoutLineDay = dataSets.slice(193, 217).map(dataSet => dataSet.map(item => item.summotorbike));
          const sumstruckoutLineDay = dataSets.slice(193, 217).map(dataSet => dataSet.map(item => item.sumtruck));
          const usersData = dataSets.slice(217, 219).map(dataSet => ({
            _id: dataSet._id,
            name: dataSet.name,
            role: dataSet.role
          }));
          // const usersRole = dataSets.slice(217, 219).map(dataSet => ({
          //   role: dataSet.role
          // }));
          
          const usersRole = usersData.map(user => user.role);
          const userName = usersData.map(user => user.name);
          
          console.log(usersRole)
          setUserId(usersRole);
          setUserName(userName);
          this.setState({ gates: gates });
          this.setState({ users: usersData });
          
        
          // console.log(sumsMonthIn);
          // console.log(sumsMonthOut);
          console.log(this.context.userId);
          // console.log(usersRole);
          console.log(usersData);
          console.log(ThisMonthFormatted);
          // Calculate totalsum1 to totalsum8
          const totalsums = sums.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumscarin = sumscarin.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckin = sumstruckin.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikein = sumsmotorbikein.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscarout = sumscarout.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckout = sumstruckout.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeout = sumsmotorbikeout.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscarinline = sumscarinLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckinline = sumstruckinLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeinline = sumsmotorbikeinLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscaroutline = sumscaroutLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckoutline = sumstruckoutLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeoutline = sumsmotorbikeoutLine.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsDayIn = sumsDayIn.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsDayOut = sumsDayOut.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekInGate1 = sumsWeekInGate1.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekInGate2 = sumsWeekInGate2.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekInGate3 = sumsWeekInGate3.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekInGate4 = sumsWeekInGate4.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekOutGate1 = sumsWeekOutGate1.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekOutGate2 = sumsWeekOutGate2.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekOutGate3 = sumsWeekOutGate3.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsWeekOutGate4 = sumsWeekOutGate4.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumscarinLineWeek = sumscarinLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckinLineWeek = sumstruckinLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeinLineWeek = sumsmotorbikeinLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumscaroutLineWeek = sumscaroutLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumstruckoutLineWeek = sumstruckoutLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsmotorbikeoutLineWeek = sumsmotorbikeoutLineWeek.map(arr => arr.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthIn1 = sumsMonthInGate1.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthIn2 = sumsMonthInGate2.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthIn3 = sumsMonthInGate3.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthIn4 = sumsMonthInGate4.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthOut1 = sumsMonthOutGate1.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthOut2 = sumsMonthOutGate2.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthOut3 = sumsMonthOutGate3.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
          const totalsumsMonthOut4 = sumsMonthOutGate4.map(sumArray => sumArray.reduce((acc, curr) => acc + curr, 0));
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

          const Totalsumscarin = totalsumscarin.reduce((acc, curr) => acc + curr, 0);
          const Totalsumstruckin = totalsumstruckin.reduce((acc, curr) => acc + curr, 0);
          const Totalsumsmotorbikein = totalsumsmotorbikein.reduce((acc, curr) => acc + curr, 0);
          const TotalsumscarInDay = totalsumscarinLineDay.reduce((acc, curr) => acc + curr, 0);
          const TotalsumstruckInDay = totalsumstruckinLineDay.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsmotorbikeInDay = totalsumsmotorbikeinLineDay.reduce((acc, curr) => acc + curr, 0);
          const TotalsumscarOutDay = totalsumscaroutLineDay.reduce((acc, curr) => acc + curr, 0);
          const TotalsumstruckOutDay = totalsumstruckoutLineDay.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsmotorbikeOutDay = totalsumsmotorbikeoutLineDay.reduce((acc, curr) => acc + curr, 0)
          const TotalsumscarInWeek = totalsumscarinLineWeek.reduce((acc, curr) => acc + curr, 0);
          const TotalsumstruckInWeek = totalsumstruckinLineWeek.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsmotorbikeInWeek = totalsumsmotorbikeinLineWeek.reduce((acc, curr) => acc + curr, 0);
          const TotalsumscarOutWeek = totalsumscaroutLineWeek.reduce((acc, curr) => acc + curr, 0);
          const TotalsumstruckOutWeek = totalsumstruckoutLineWeek.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsmotorbikeOutWeek = totalsumsmotorbikeoutLineWeek.reduce((acc, curr) => acc + curr, 0)
          const TotalsumscarInMonth = totalsumscarinLineMonth.reduce((acc, curr) => acc + curr, 0);
          const TotalsumstruckInMonth = totalsumstruckinLineMonth.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsmotorbikeInMonth = totalsumsmotorbikeinLineMonth.reduce((acc, curr) => acc + curr, 0);
          const TotalsumscarOutMonth = totalsumscaroutLineMonth.reduce((acc, curr) => acc + curr, 0);
          const TotalsumstruckOutMonth = totalsumstruckoutLineMonth.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsmotorbikeOutMonth = totalsumsmotorbikeoutLineMonth.reduce((acc, curr) => acc + curr, 0)
          const Totalsumscarout = totalsumscarout.reduce((acc, curr) => acc + curr, 0);
          const Totalsumstruckout = totalsumstruckout.reduce((acc, curr) => acc + curr, 0);
          const Totalsumsmotorbikeout = totalsumsmotorbikeout.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekInGate1= totalsumsWeekInGate1.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekInGate2= totalsumsWeekInGate2.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekInGate3= totalsumsWeekInGate3.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekInGate4= totalsumsWeekInGate4.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekOutGate1= totalsumsWeekOutGate1.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekOutGate2= totalsumsWeekOutGate2.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekOutGate3= totalsumsWeekOutGate3.reduce((acc, curr) => acc + curr, 0);
          const TotalsumsWeekOutGate4= totalsumsWeekOutGate4.reduce((acc, curr) => acc + curr, 0);


  
          console.log(totalsumsMonthIn1[0]);
          console.log(totalsumsMonthOut1[0]);
          console.log(Totalsumstruckin);
          console.log(Totalsumsmotorbikein);
          console.log(Totalsumscarout);
          console.log(Totalsumstruckout);
          console.log(Totalsumsmotorbikeout);
          console.log(Totalsumscarout);
          console.log(Totalsumstruckout);
          console.log(Totalsumsmotorbikeout);
          
          
          this.setState({
              gates: gates,
              totalsum1: totalsums[0],
              totalsum2: totalsums[1],
              totalsum3: totalsums[2],
              totalsum4: totalsums[3],
              totalsum5: totalsums[4],
              totalsum6: totalsums[5],
              totalsum7: totalsums[6],
              totalsum8: totalsums[7],
              totalsumcarinline1: totalsumscarinline[0],
              totalsumcarinline2: totalsumscarinline[1],
              totalsumcarinline3: totalsumscarinline[2],
              totalsumcarinline4: totalsumscarinline[3],
              totalsumcarinline5: totalsumscarinline[4],
              totalsumcarinline6: totalsumscarinline[5],
              totalsumtruckinline1: totalsumstruckinline[0],
              totalsumtruckinline2: totalsumstruckinline[1],
              totalsumtruckinline3: totalsumstruckinline[2],
              totalsumtruckinline4: totalsumstruckinline[3],
              totalsumtruckinline5: totalsumstruckinline[4],
              totalsumtruckinline6: totalsumstruckinline[5],
              totalsummotorbikeinline1: totalsumsmotorbikeinline[0],
              totalsummotorbikeinline2: totalsumsmotorbikeinline[1],
              totalsummotorbikeinline3: totalsumsmotorbikeinline[2],
              totalsummotorbikeinline4: totalsumsmotorbikeinline[3],
              totalsummotorbikeinline5: totalsumsmotorbikeinline[4],
              totalsummotorbikeinline6: totalsumsmotorbikeinline[5],
              totalsumcaroutline1: totalsumscaroutline[0],
              totalsumcaroutline2: totalsumscaroutline[1],
              totalsumcaroutline3: totalsumscaroutline[2],
              totalsumcaroutline4: totalsumscaroutline[3],
              totalsumcaroutline5: totalsumscaroutline[4],
              totalsumcaroutline6: totalsumscaroutline[5],
              totalsumtruckoutline1: totalsumstruckoutline[0],
              totalsumtruckoutline2: totalsumstruckoutline[1],
              totalsumtruckoutline3: totalsumstruckoutline[2],
              totalsumtruckoutline4: totalsumstruckoutline[3],
              totalsumtruckoutline5: totalsumstruckoutline[4],
              totalsumtruckoutline6: totalsumstruckoutline[5],
              totalsummotorbikeoutline1: totalsumsmotorbikeoutline[0],
              totalsummotorbikeoutline2: totalsumsmotorbikeoutline[1],
              totalsummotorbikeoutline3: totalsumsmotorbikeoutline[2],
              totalsummotorbikeoutline4: totalsumsmotorbikeoutline[3],
              totalsummotorbikeoutline5: totalsumsmotorbikeoutline[4],
              totalsummotorbikeoutline6: totalsumsmotorbikeoutline[5],
              Totalsumscarin: Totalsumscarin,
              Totalsumstruckin: Totalsumstruckin,
              Totalsumsmotorbikein: Totalsumsmotorbikein,
              Totalsumscarout: Totalsumscarout,
              Totalsumstruckout: Totalsumstruckout,
              Totalsumsmotorbikeout: Totalsumsmotorbikeout,
              Totalsumscarout: Totalsumscarout,
              Totalsumstruckout: Totalsumstruckout,
              totalsumsmotorbikeout: totalsumsmotorbikeout,
              totalsumsDayIn1: totalsumsDayIn[0],
              totalsumsDayIn2: totalsumsDayIn[1],
              totalsumsDayIn3: totalsumsDayIn[2],
              totalsumsDayIn4: totalsumsDayIn[3],
              totalsumsDayOut1: totalsumsDayOut[0],
              totalsumsDayOut2: totalsumsDayOut[1],
              totalsumsDayOut3: totalsumsDayOut[2],
              totalsumsDayOut4: totalsumsDayOut[3],
              TotalsumsWeekInGate1: TotalsumsWeekInGate1,
              TotalsumsWeekInGate2: TotalsumsWeekInGate2,
              TotalsumsWeekInGate3: TotalsumsWeekInGate3,
              TotalsumsWeekInGate4: TotalsumsWeekInGate4,
              TotalsumsWeekOutGate1: TotalsumsWeekOutGate1,
              TotalsumsWeekOutGate2: TotalsumsWeekOutGate2,
              TotalsumsWeekOutGate3: TotalsumsWeekOutGate3,
              TotalsumsWeekOutGate4: TotalsumsWeekOutGate4,
              totalsumcarinLineWeek1: totalsumscarinLineWeek[0],
              totalsumcarinLineWeek2: totalsumscarinLineWeek[1],
              totalsumcarinLineWeek3: totalsumscarinLineWeek[2],
              totalsumcarinLineWeek4: totalsumscarinLineWeek[3],
              totalsumcarinLineWeek5: totalsumscarinLineWeek[4],
              totalsumcarinLineWeek6: totalsumscarinLineWeek[5],
              totalsumcarinLineWeek7: totalsumscarinLineWeek[6],
              totalsumtruckinLineWeek1: totalsumstruckinLineWeek[0],
              totalsumtruckinLineWeek2: totalsumstruckinLineWeek[1],
              totalsumtruckinLineWeek3: totalsumstruckinLineWeek[2],
              totalsumtruckinLineWeek4: totalsumstruckinLineWeek[3],
              totalsumtruckinLineWeek5: totalsumstruckinLineWeek[4],
              totalsumtruckinLineWeek6: totalsumstruckinLineWeek[5],
              totalsumtruckinLineWeek7: totalsumstruckinLineWeek[6],
              totalsummotorbikeinLineWeek1: totalsumsmotorbikeinLineWeek[0],
              totalsummotorbikeinLineWeek2: totalsumsmotorbikeinLineWeek[1],
              totalsummotorbikeinLineWeek3: totalsumsmotorbikeinLineWeek[2],
              totalsummotorbikeinLineWeek4: totalsumsmotorbikeinLineWeek[3],
              totalsummotorbikeinLineWeek5: totalsumsmotorbikeinLineWeek[4],
              totalsummotorbikeinLineWeek6: totalsumsmotorbikeinLineWeek[5],
              totalsummotorbikeinLineWeek7: totalsumsmotorbikeinLineWeek[6],
              totalsumcaroutLineWeek1: totalsumscaroutLineWeek[0],
              totalsumcaroutLineWeek2: totalsumscaroutLineWeek[1],
              totalsumcaroutLineWeek3: totalsumscaroutLineWeek[2],
              totalsumcaroutLineWeek4: totalsumscaroutLineWeek[3],
              totalsumcaroutLineWeek5: totalsumscaroutLineWeek[4],
              totalsumcaroutLineWeek6: totalsumscaroutLineWeek[5],
              totalsumcaroutLineWeek7: totalsumscaroutLineWeek[6],
              totalsumtruckoutLineWeek1: totalsumstruckoutLineWeek[0],
              totalsumtruckoutLineWeek2: totalsumstruckoutLineWeek[1],
              totalsumtruckoutLineWeek3: totalsumstruckoutLineWeek[2],
              totalsumtruckoutLineWeek4: totalsumstruckoutLineWeek[3],
              totalsumtruckoutLineWeek5: totalsumstruckoutLineWeek[4],
              totalsumtruckoutLineWeek6: totalsumstruckoutLineWeek[5],
              totalsumtruckoutLineWeek7: totalsumstruckoutLineWeek[6],
              totalsummotorbikeoutLineWeek1: totalsumsmotorbikeoutLineWeek[0],
              totalsummotorbikeoutLineWeek2: totalsumsmotorbikeoutLineWeek[1],
              totalsummotorbikeoutLineWeek3: totalsumsmotorbikeoutLineWeek[2],
              totalsummotorbikeoutLineWeek4: totalsumsmotorbikeoutLineWeek[3],
              totalsummotorbikeoutLineWeek5: totalsumsmotorbikeoutLineWeek[4],
              totalsummotorbikeoutLineWeek6: totalsumsmotorbikeoutLineWeek[5],
              totalsummotorbikeoutLineWeek7: totalsumsmotorbikeoutLineWeek[6],
              totalsumsMonthIn1: totalsumsMonthIn1[0],
              totalsumsMonthIn2: totalsumsMonthIn2[0],
              totalsumsMonthIn3: totalsumsMonthIn3[0],
              totalsumsMonthIn4: totalsumsMonthIn4[0],
              totalsumsMonthOut1: totalsumsMonthOut1[0],
              totalsumsMonthOut2: totalsumsMonthOut2[0],
              totalsumsMonthOut3: totalsumsMonthOut3[0],
              totalsumsMonthOut4: totalsumsMonthOut4[0],
              totalsumcarinLineMonth1: totalsumscarinLineMonth[0],
              totalsumcarinLineMonth2: totalsumscarinLineMonth[1],
              totalsumcarinLineMonth3: totalsumscarinLineMonth[2],
              totalsumcarinLineMonth4: totalsumscarinLineMonth[3],
              totalsumcarinLineMonth5: totalsumscarinLineMonth[4],
              totalsumcarinLineMonth6: totalsumscarinLineMonth[5],
              totalsumcarinLineMonth7: totalsumscarinLineMonth[6],
              totalsumcarinLineMonth8: totalsumscarinLineMonth[7],
              totalsumcarinLineMonth9: totalsumscarinLineMonth[8],
              totalsumcarinLineMonth10: totalsumscarinLineMonth[9],
              totalsumcarinLineMonth11: totalsumscarinLineMonth[10],
              totalsumcarinLineMonth12: totalsumscarinLineMonth[11],
              totalsumcarinLineMonth13: totalsumscarinLineMonth[12],
              totalsumcarinLineMonth14: totalsumscarinLineMonth[13],
              totalsumcarinLineMonth15: totalsumscarinLineMonth[14],
              totalsumcarinLineMonth16: totalsumscarinLineMonth[15],
              totalsumcarinLineMonth17: totalsumscarinLineMonth[16],
              totalsumcarinLineMonth18: totalsumscarinLineMonth[17],
              totalsumcarinLineMonth19: totalsumscarinLineMonth[18],
              totalsumcarinLineMonth20: totalsumscarinLineMonth[19],
              totalsumcarinLineMonth21: totalsumscarinLineMonth[20],
              totalsumcarinLineMonth22: totalsumscarinLineMonth[21],
              totalsumcarinLineMonth23: totalsumscarinLineMonth[22],
              totalsumcarinLineMonth24: totalsumscarinLineMonth[23],
              totalsumcarinLineMonth25: totalsumscarinLineMonth[24],
              totalsumcarinLineMonth26: totalsumscarinLineMonth[25],
              totalsumcarinLineMonth27: totalsumscarinLineMonth[26],
              totalsumcarinLineMonth28: totalsumscarinLineMonth[27],
              totalsumcarinLineMonth29: totalsumscarinLineMonth[28],
              totalsumcarinLineMonth30: totalsumscarinLineMonth[29],
              totalsumcarinLineMonth31: totalsumscarinLineMonth[30],
              totalsumtruckinLineMonth1: totalsumstruckinLineMonth[0],
              totalsumtruckinLineMonth2: totalsumstruckinLineMonth[1],
              totalsumtruckinLineMonth3: totalsumstruckinLineMonth[2],
              totalsumtruckinLineMonth4: totalsumstruckinLineMonth[3],
              totalsumtruckinLineMonth5: totalsumstruckinLineMonth[4],
              totalsumtruckinLineMonth6: totalsumstruckinLineMonth[5],
              totalsumtruckinLineMonth7: totalsumstruckinLineMonth[6],
              totalsumtruckinLineMonth8: totalsumstruckinLineMonth[7],
              totalsumtruckinLineMonth9: totalsumstruckinLineMonth[8],
              totalsumtruckinLineMonth10: totalsumstruckinLineMonth[9],
              totalsumtruckinLineMonth11: totalsumstruckinLineMonth[10],
              totalsumtruckinLineMonth12: totalsumstruckinLineMonth[11],
              totalsumtruckinLineMonth13: totalsumstruckinLineMonth[12],
              totalsumtruckinLineMonth14: totalsumstruckinLineMonth[13],
              totalsumtruckinLineMonth15: totalsumstruckinLineMonth[14],
              totalsumtruckinLineMonth16: totalsumstruckinLineMonth[15],
              totalsumtruckinLineMonth17: totalsumstruckinLineMonth[16],
              totalsumtruckinLineMonth18: totalsumstruckinLineMonth[17],
              totalsumtruckinLineMonth19: totalsumstruckinLineMonth[18],
              totalsumtruckinLineMonth20: totalsumstruckinLineMonth[19],
              totalsumtruckinLineMonth21: totalsumstruckinLineMonth[20],
              totalsumtruckinLineMonth22: totalsumstruckinLineMonth[21],
              totalsumtruckinLineMonth23: totalsumstruckinLineMonth[22],
              totalsumtruckinLineMonth24: totalsumstruckinLineMonth[23],
              totalsumtruckinLineMonth25: totalsumstruckinLineMonth[24],
              totalsumtruckinLineMonth26: totalsumstruckinLineMonth[25],
              totalsumtruckinLineMonth27: totalsumstruckinLineMonth[26],
              totalsumtruckinLineMonth28: totalsumstruckinLineMonth[27],
              totalsumtruckinLineMonth29: totalsumstruckinLineMonth[28],
              totalsumtruckinLineMonth30: totalsumstruckinLineMonth[29],
              totalsumtruckinLineMonth31: totalsumstruckinLineMonth[30],
              totalsummotorbikeinLineMonth1: totalsumsmotorbikeinLineMonth[0],
              totalsummotorbikeinLineMonth2: totalsumsmotorbikeinLineMonth[1],
              totalsummotorbikeinLineMonth3: totalsumsmotorbikeinLineMonth[2],
              totalsummotorbikeinLineMonth4: totalsumsmotorbikeinLineMonth[3],
              totalsummotorbikeinLineMonth5: totalsumsmotorbikeinLineMonth[4],
              totalsummotorbikeinLineMonth6: totalsumsmotorbikeinLineMonth[5],
              totalsummotorbikeinLineMonth7: totalsumsmotorbikeinLineMonth[6],
              totalsummotorbikeinLineMonth8: totalsumsmotorbikeinLineMonth[7],
              totalsummotorbikeinLineMonth9: totalsumsmotorbikeinLineMonth[8],
              totalsummotorbikeinLineMonth10: totalsumsmotorbikeinLineMonth[9],
              totalsummotorbikeinLineMonth11: totalsumsmotorbikeinLineMonth[10],
              totalsummotorbikeinLineMonth12: totalsumsmotorbikeinLineMonth[11],
              totalsummotorbikeinLineMonth13: totalsumsmotorbikeinLineMonth[12],
              totalsummotorbikeinLineMonth14: totalsumsmotorbikeinLineMonth[13],
              totalsummotorbikeinLineMonth15: totalsumsmotorbikeinLineMonth[14],
              totalsummotorbikeinLineMonth16: totalsumsmotorbikeinLineMonth[15],
              totalsummotorbikeinLineMonth17: totalsumsmotorbikeinLineMonth[16],
              totalsummotorbikeinLineMonth18: totalsumsmotorbikeinLineMonth[17],
              totalsummotorbikeinLineMonth19: totalsumsmotorbikeinLineMonth[18],
              totalsummotorbikeinLineMonth20: totalsumsmotorbikeinLineMonth[19],
              totalsummotorbikeinLineMonth21: totalsumsmotorbikeinLineMonth[20],
              totalsummotorbikeinLineMonth22: totalsumsmotorbikeinLineMonth[21],
              totalsummotorbikeinLineMonth23: totalsumsmotorbikeinLineMonth[22],
              totalsummotorbikeinLineMonth24: totalsumsmotorbikeinLineMonth[23],
              totalsummotorbikeinLineMonth25: totalsumsmotorbikeinLineMonth[24],
              totalsummotorbikeinLineMonth26: totalsumsmotorbikeinLineMonth[25],
              totalsummotorbikeinLineMonth27: totalsumsmotorbikeinLineMonth[26],
              totalsummotorbikeinLineMonth28: totalsumsmotorbikeinLineMonth[27],
              totalsummotorbikeinLineMonth29: totalsumsmotorbikeinLineMonth[28],
              totalsummotorbikeinLineMonth30: totalsumsmotorbikeinLineMonth[29],
              totalsummotorbikeinLineMonth31: totalsumsmotorbikeinLineMonth[30],
              totalsumcaroutLineMonth1: totalsumscaroutLineMonth[0],
              totalsumcaroutLineMonth2: totalsumscaroutLineMonth[1],
              totalsumcaroutLineMonth3: totalsumscaroutLineMonth[2],
              totalsumcaroutLineMonth4: totalsumscaroutLineMonth[3],
              totalsumcaroutLineMonth5: totalsumscaroutLineMonth[4],
              totalsumcaroutLineMonth6: totalsumscaroutLineMonth[5],
              totalsumcaroutLineMonth7: totalsumscaroutLineMonth[6],
              totalsumcaroutLineMonth8: totalsumscaroutLineMonth[7],
              totalsumcaroutLineMonth9: totalsumscaroutLineMonth[8],
              totalsumcaroutLineMonth10: totalsumscaroutLineMonth[9],
              totalsumcaroutLineMonth11: totalsumscaroutLineMonth[10],
              totalsumcaroutLineMonth12: totalsumscaroutLineMonth[11],
              totalsumcaroutLineMonth13: totalsumscaroutLineMonth[12],
              totalsumcaroutLineMonth14: totalsumscaroutLineMonth[13],
              totalsumcaroutLineMonth15: totalsumscaroutLineMonth[14],
              totalsumcaroutLineMonth16: totalsumscaroutLineMonth[15],
              totalsumcaroutLineMonth17: totalsumscaroutLineMonth[16],
              totalsumcaroutLineMonth18: totalsumscaroutLineMonth[17],
              totalsumcaroutLineMonth19: totalsumscaroutLineMonth[18],
              totalsumcaroutLineMonth20: totalsumscaroutLineMonth[19],
              totalsumcaroutLineMonth21: totalsumscaroutLineMonth[20],
              totalsumcaroutLineMonth22: totalsumscaroutLineMonth[21],
              totalsumcaroutLineMonth23: totalsumscaroutLineMonth[22],
              totalsumcaroutLineMonth24: totalsumscaroutLineMonth[23],
              totalsumcaroutLineMonth25: totalsumscaroutLineMonth[24],
              totalsumcaroutLineMonth26: totalsumscaroutLineMonth[25],
              totalsumcaroutLineMonth27: totalsumscaroutLineMonth[26],
              totalsumcaroutLineMonth28: totalsumscaroutLineMonth[27],
              totalsumcaroutLineMonth29: totalsumscaroutLineMonth[28],
              totalsumcaroutLineMonth30: totalsumscaroutLineMonth[29],
              totalsumcaroutLineMonth31: totalsumscaroutLineMonth[30],
              totalsumtruckoutLineMonth1: totalsumstruckoutLineMonth[0],
              totalsumtruckoutLineMonth2: totalsumstruckoutLineMonth[1],
              totalsumtruckoutLineMonth3: totalsumstruckoutLineMonth[2],
              totalsumtruckoutLineMonth4: totalsumstruckoutLineMonth[3],
              totalsumtruckoutLineMonth5: totalsumstruckoutLineMonth[4],
              totalsumtruckoutLineMonth6: totalsumstruckoutLineMonth[5],
              totalsumtruckoutLineMonth7: totalsumstruckoutLineMonth[6],
              totalsumtruckoutLineMonth8: totalsumstruckoutLineMonth[7],
              totalsumtruckoutLineMonth9: totalsumstruckoutLineMonth[8],
              totalsumtruckoutLineMonth10: totalsumstruckoutLineMonth[9],
              totalsumtruckoutLineMonth11: totalsumstruckoutLineMonth[10],
              totalsumtruckoutLineMonth12: totalsumstruckoutLineMonth[11],
              totalsumtruckoutLineMonth13: totalsumstruckoutLineMonth[12],
              totalsumtruckoutLineMonth14: totalsumstruckoutLineMonth[13],
              totalsumtruckoutLineMonth15: totalsumstruckoutLineMonth[14],
              totalsumtruckoutLineMonth16: totalsumstruckoutLineMonth[15],
              totalsumtruckoutLineMonth17: totalsumstruckoutLineMonth[16],
              totalsumtruckoutLineMonth18: totalsumstruckoutLineMonth[17],
              totalsumtruckoutLineMonth19: totalsumstruckoutLineMonth[18],
              totalsumtruckoutLineMonth20: totalsumstruckoutLineMonth[19],
              totalsumtruckoutLineMonth21: totalsumstruckoutLineMonth[20],
              totalsumtruckoutLineMonth22: totalsumstruckoutLineMonth[21],
              totalsumtruckoutLineMonth23: totalsumstruckoutLineMonth[22],
              totalsumtruckoutLineMonth24: totalsumstruckoutLineMonth[23],
              totalsumtruckoutLineMonth25: totalsumstruckoutLineMonth[24],
              totalsumtruckoutLineMonth26: totalsumstruckoutLineMonth[25],
              totalsumtruckoutLineMonth27: totalsumstruckoutLineMonth[26],
              totalsumtruckoutLineMonth28: totalsumstruckoutLineMonth[27],
              totalsumtruckoutLineMonth29: totalsumstruckoutLineMonth[28],
              totalsumtruckoutLineMonth30: totalsumstruckoutLineMonth[29],
              totalsumtruckoutLineMonth31: totalsumstruckoutLineMonth[30],
              totalsummotorbikeoutLineMonth1: totalsumsmotorbikeoutLineMonth[0],
              totalsummotorbikeoutLineMonth2: totalsumsmotorbikeoutLineMonth[1],
              totalsummotorbikeoutLineMonth3: totalsumsmotorbikeoutLineMonth[2],
              totalsummotorbikeoutLineMonth4: totalsumsmotorbikeoutLineMonth[3],
              totalsummotorbikeoutLineMonth5: totalsumsmotorbikeoutLineMonth[4],
              totalsummotorbikeoutLineMonth6: totalsumsmotorbikeoutLineMonth[5],
              totalsummotorbikeoutLineMonth7: totalsumsmotorbikeoutLineMonth[6],
              totalsummotorbikeoutLineMonth8: totalsumsmotorbikeoutLineMonth[7],
              totalsummotorbikeoutLineMonth9: totalsumsmotorbikeoutLineMonth[8],
              totalsummotorbikeoutLineMonth10: totalsumsmotorbikeoutLineMonth[9],
              totalsummotorbikeoutLineMonth11: totalsumsmotorbikeoutLineMonth[10],
              totalsummotorbikeoutLineMonth12: totalsumsmotorbikeoutLineMonth[11],
              totalsummotorbikeoutLineMonth13: totalsumsmotorbikeoutLineMonth[12],
              totalsummotorbikeoutLineMonth14: totalsumsmotorbikeoutLineMonth[13],
              totalsummotorbikeoutLineMonth15: totalsumsmotorbikeoutLineMonth[14],
              totalsummotorbikeoutLineMonth16: totalsumsmotorbikeoutLineMonth[15],
              totalsummotorbikeoutLineMonth17: totalsumsmotorbikeoutLineMonth[16],
              totalsummotorbikeoutLineMonth18: totalsumsmotorbikeoutLineMonth[17],
              totalsummotorbikeoutLineMonth19: totalsumsmotorbikeoutLineMonth[18],
              totalsummotorbikeoutLineMonth20: totalsumsmotorbikeoutLineMonth[19],
              totalsummotorbikeoutLineMonth21: totalsumsmotorbikeoutLineMonth[20],
              totalsummotorbikeoutLineMonth22: totalsumsmotorbikeoutLineMonth[21],
              totalsummotorbikeoutLineMonth23: totalsumsmotorbikeoutLineMonth[22],
              totalsummotorbikeoutLineMonth24: totalsumsmotorbikeoutLineMonth[23],
              totalsummotorbikeoutLineMonth25: totalsumsmotorbikeoutLineMonth[24],
              totalsummotorbikeoutLineMonth26: totalsumsmotorbikeoutLineMonth[25],
              totalsummotorbikeoutLineMonth27: totalsumsmotorbikeoutLineMonth[26],
              totalsummotorbikeoutLineMonth28: totalsumsmotorbikeoutLineMonth[27],
              totalsummotorbikeoutLineMonth29: totalsumsmotorbikeoutLineMonth[28],
              totalsummotorbikeoutLineMonth30: totalsumsmotorbikeoutLineMonth[29],
              totalsummotorbikeoutLineMonth31: totalsumsmotorbikeoutLineMonth[30],
              TotalsumscarInWeek: TotalsumscarInWeek,
              TotalsumstruckInWeek: TotalsumstruckInWeek,
              TotalsumsmotorbikeInWeek: TotalsumsmotorbikeInWeek,
              TotalsumscarOutWeek: TotalsumscarOutWeek,
              TotalsumstruckOutWeek: TotalsumstruckOutWeek,
              TotalsumsmotorbikeOutWeek: TotalsumsmotorbikeOutWeek,
              TotalsumscarOutWeek: TotalsumscarOutWeek,
              TotalsumstruckOutWeek: TotalsumstruckOutWeek,
              TotalsumscarInMonth: TotalsumscarInMonth,
              TotalsumstruckInMonth: TotalsumstruckInMonth,
              TotalsumsmotorbikeInMonth: TotalsumsmotorbikeInMonth,
              TotalsumscarOutMonth: TotalsumscarOutMonth,
              TotalsumstruckOutMonth: TotalsumstruckOutMonth,
              TotalsumsmotorbikeOutMonth: TotalsumsmotorbikeOutMonth,
              TotalsumscarOutMonth: TotalsumscarOutMonth,
              TotalsumstruckOutMonth: TotalsumstruckOutMonth,
              totalsumcarinLineDay1: totalsumscarinLineDay[0],
              totalsumcarinLineDay2: totalsumscarinLineDay[1],
              totalsumcarinLineDay3: totalsumscarinLineDay[2],
              totalsumcarinLineDay4: totalsumscarinLineDay[3],
              totalsumcarinLineDay5: totalsumscarinLineDay[4],
              totalsumcarinLineDay6: totalsumscarinLineDay[5],
              totalsumcarinLineDay7: totalsumscarinLineDay[6],
              totalsumcarinLineDay8: totalsumscarinLineDay[7],
              totalsumcarinLineDay9: totalsumscarinLineDay[8],
              totalsumcarinLineDay10: totalsumscarinLineDay[9],
              totalsumcarinLineDay11: totalsumscarinLineDay[10],
              totalsumcarinLineDay12: totalsumscarinLineDay[11],
              totalsumcarinLineDay13: totalsumscarinLineDay[12],
              totalsumcarinLineDay14: totalsumscarinLineDay[13],
              totalsumcarinLineDay15: totalsumscarinLineDay[14],
              totalsumcarinLineDay16: totalsumscarinLineDay[15],
              totalsumcarinLineDay17: totalsumscarinLineDay[16],
              totalsumcarinLineDay18: totalsumscarinLineDay[17],
              totalsumcarinLineDay19: totalsumscarinLineDay[18],
              totalsumcarinLineDay20: totalsumscarinLineDay[19],
              totalsumcarinLineDay21: totalsumscarinLineDay[20],
              totalsumcarinLineDay22: totalsumscarinLineDay[21],
              totalsumcarinLineDay23: totalsumscarinLineDay[22],
              totalsumcarinLineDay24: totalsumscarinLineDay[23],
              totalsumtruckinLineDay1: totalsumstruckinLineDay[0],
              totalsumtruckinLineDay2: totalsumstruckinLineDay[1],
              totalsumtruckinLineDay3: totalsumstruckinLineDay[2],
              totalsumtruckinLineDay4: totalsumstruckinLineDay[3],
              totalsumtruckinLineDay5: totalsumstruckinLineDay[4],
              totalsumtruckinLineDay6: totalsumstruckinLineDay[5],
              totalsumtruckinLineDay7: totalsumstruckinLineDay[6],
              totalsumtruckinLineDay8: totalsumstruckinLineDay[7],
              totalsumtruckinLineDay9: totalsumstruckinLineDay[8],
              totalsumtruckinLineDay10: totalsumstruckinLineDay[9],
              totalsumtruckinLineDay11: totalsumstruckinLineDay[10],
              totalsumtruckinLineDay12: totalsumstruckinLineDay[11],
              totalsumtruckinLineDay13: totalsumstruckinLineDay[12],
              totalsumtruckinLineDay14: totalsumstruckinLineDay[13],
              totalsumtruckinLineDay15: totalsumstruckinLineDay[14],
              totalsumtruckinLineDay16: totalsumstruckinLineDay[15],
              totalsumtruckinLineDay17: totalsumstruckinLineDay[16],
              totalsumtruckinLineDay18: totalsumstruckinLineDay[17],
              totalsumtruckinLineDay19: totalsumstruckinLineDay[18],
              totalsumtruckinLineDay20: totalsumstruckinLineDay[19],
              totalsumtruckinLineDay21: totalsumstruckinLineDay[20],
              totalsumtruckinLineDay22: totalsumstruckinLineDay[21],
              totalsumtruckinLineDay23: totalsumstruckinLineDay[22],
              totalsumtruckinLineDay24: totalsumstruckinLineDay[23],
              totalsummotorbikeinLineDay1: totalsumsmotorbikeinLineDay[0],
              totalsummotorbikeinLineDay2: totalsumsmotorbikeinLineDay[1],
              totalsummotorbikeinLineDay3: totalsumsmotorbikeinLineDay[2],
              totalsummotorbikeinLineDay4: totalsumsmotorbikeinLineDay[3],
              totalsummotorbikeinLineDay5: totalsumsmotorbikeinLineDay[4],
              totalsummotorbikeinLineDay6: totalsumsmotorbikeinLineDay[5],
              totalsummotorbikeinLineDay7: totalsumsmotorbikeinLineDay[6],
              totalsummotorbikeinLineDay8: totalsumsmotorbikeinLineDay[7],
              totalsummotorbikeinLineDay9: totalsumsmotorbikeinLineDay[8],
              totalsummotorbikeinLineDay10: totalsumsmotorbikeinLineDay[9],
              totalsummotorbikeinLineDay11: totalsumsmotorbikeinLineDay[10],
              totalsummotorbikeinLineDay12: totalsumsmotorbikeinLineDay[11],
              totalsummotorbikeinLineDay13: totalsumsmotorbikeinLineDay[12],
              totalsummotorbikeinLineDay14: totalsumsmotorbikeinLineDay[13],
              totalsummotorbikeinLineDay15: totalsumsmotorbikeinLineDay[14],
              totalsummotorbikeinLineDay16: totalsumsmotorbikeinLineDay[15],
              totalsummotorbikeinLineDay17: totalsumsmotorbikeinLineDay[16],
              totalsummotorbikeinLineDay18: totalsumsmotorbikeinLineDay[17],
              totalsummotorbikeinLineDay19: totalsumsmotorbikeinLineDay[18],
              totalsummotorbikeinLineDay20: totalsumsmotorbikeinLineDay[19],
              totalsummotorbikeinLineDay21: totalsumsmotorbikeinLineDay[20],
              totalsummotorbikeinLineDay22: totalsumsmotorbikeinLineDay[21],
              totalsummotorbikeinLineDay23: totalsumsmotorbikeinLineDay[22],
              totalsummotorbikeinLineDay24: totalsumsmotorbikeinLineDay[23],
              totalsumcaroutLineDay1: totalsumscaroutLineDay[0],
              totalsumcaroutLineDay2: totalsumscaroutLineDay[1],
              totalsumcaroutLineDay3: totalsumscaroutLineDay[2],
              totalsumcaroutLineDay4: totalsumscaroutLineDay[3],
              totalsumcaroutLineDay5: totalsumscaroutLineDay[4],
              totalsumcaroutLineDay6: totalsumscaroutLineDay[5],
              totalsumcaroutLineDay7: totalsumscaroutLineDay[6],
              totalsumcaroutLineDay8: totalsumscaroutLineDay[7],
              totalsumcaroutLineDay9: totalsumscaroutLineDay[8],
              totalsumcaroutLineDay10: totalsumscaroutLineDay[9],
              totalsumcaroutLineDay11: totalsumscaroutLineDay[10],
              totalsumcaroutLineDay12: totalsumscaroutLineDay[11],
              totalsumcaroutLineDay13: totalsumscaroutLineDay[12],
              totalsumcaroutLineDay14: totalsumscaroutLineDay[13],
              totalsumcaroutLineDay15: totalsumscaroutLineDay[14],
              totalsumcaroutLineDay16: totalsumscaroutLineDay[15],
              totalsumcaroutLineDay17: totalsumscaroutLineDay[16],
              totalsumcaroutLineDay18: totalsumscaroutLineDay[17],
              totalsumcaroutLineDay19: totalsumscaroutLineDay[18],
              totalsumcaroutLineDay20: totalsumscaroutLineDay[19],
              totalsumcaroutLineDay21: totalsumscaroutLineDay[20],
              totalsumcaroutLineDay22: totalsumscaroutLineDay[21],
              totalsumcaroutLineDay23: totalsumscaroutLineDay[22],
              totalsumcaroutLineDay24: totalsumscaroutLineDay[23],
              totalsumtruckoutLineDay1: totalsumstruckoutLineDay[0],
              totalsumtruckoutLineDay2: totalsumstruckoutLineDay[1],
              totalsumtruckoutLineDay3: totalsumstruckoutLineDay[2],
              totalsumtruckoutLineDay4: totalsumstruckoutLineDay[3],
              totalsumtruckoutLineDay5: totalsumstruckoutLineDay[4],
              totalsumtruckoutLineDay6: totalsumstruckoutLineDay[5],
              totalsumtruckoutLineDay7: totalsumstruckoutLineDay[6],
              totalsumtruckoutLineDay8: totalsumstruckoutLineDay[7],
              totalsumtruckoutLineDay9: totalsumstruckoutLineDay[8],
              totalsumtruckoutLineDay10: totalsumstruckoutLineDay[9],
              totalsumtruckoutLineDay11: totalsumstruckoutLineDay[10],
              totalsumtruckoutLineDay12: totalsumstruckoutLineDay[11],
              totalsumtruckoutLineDay13: totalsumstruckoutLineDay[12],
              totalsumtruckoutLineDay14: totalsumstruckoutLineDay[13],
              totalsumtruckoutLineDay15: totalsumstruckoutLineDay[14],
              totalsumtruckoutLineDay16: totalsumstruckoutLineDay[15],
              totalsumtruckoutLineDay17: totalsumstruckoutLineDay[16],
              totalsumtruckoutLineDay18: totalsumstruckoutLineDay[17],
              totalsumtruckoutLineDay19: totalsumstruckoutLineDay[18],
              totalsumtruckoutLineDay20: totalsumstruckoutLineDay[19],
              totalsumtruckoutLineDay21: totalsumstruckoutLineDay[20],
              totalsumtruckoutLineDay22: totalsumstruckoutLineDay[21],
              totalsumtruckoutLineDay23: totalsumstruckoutLineDay[22],
              totalsumtruckoutLineDay24: totalsumstruckoutLineDay[23],
              totalsummotorbikeoutLineDay1: totalsumsmotorbikeoutLineDay[0],
              totalsummotorbikeoutLineDay2: totalsumsmotorbikeoutLineDay[1],
              totalsummotorbikeoutLineDay3: totalsumsmotorbikeoutLineDay[2],
              totalsummotorbikeoutLineDay4: totalsumsmotorbikeoutLineDay[3],
              totalsummotorbikeoutLineDay5: totalsumsmotorbikeoutLineDay[4],
              totalsummotorbikeoutLineDay6: totalsumsmotorbikeoutLineDay[5],
              totalsummotorbikeoutLineDay7: totalsumsmotorbikeoutLineDay[6],
              totalsummotorbikeoutLineDay8: totalsumsmotorbikeoutLineDay[7],
              totalsummotorbikeoutLineDay9: totalsumsmotorbikeoutLineDay[8],
              totalsummotorbikeoutLineDay10: totalsumsmotorbikeoutLineDay[9],
              totalsummotorbikeoutLineDay11: totalsumsmotorbikeoutLineDay[10],
              totalsummotorbikeoutLineDay12: totalsumsmotorbikeoutLineDay[11],
              totalsummotorbikeoutLineDay13: totalsumsmotorbikeoutLineDay[12],
              totalsummotorbikeoutLineDay14: totalsumsmotorbikeoutLineDay[13],
              totalsummotorbikeoutLineDay15: totalsumsmotorbikeoutLineDay[14],
              totalsummotorbikeoutLineDay16: totalsumsmotorbikeoutLineDay[15],
              totalsummotorbikeoutLineDay17: totalsumsmotorbikeoutLineDay[16],
              totalsummotorbikeoutLineDay18: totalsumsmotorbikeoutLineDay[17],
              totalsummotorbikeoutLineDay19: totalsumsmotorbikeoutLineDay[18],
              totalsummotorbikeoutLineDay20: totalsumsmotorbikeoutLineDay[19],
              totalsummotorbikeoutLineDay21: totalsumsmotorbikeoutLineDay[20],
              totalsummotorbikeoutLineDay22: totalsumsmotorbikeoutLineDay[21],
              totalsummotorbikeoutLineDay23: totalsumsmotorbikeoutLineDay[22],
              totalsummotorbikeoutLineDay24: totalsumsmotorbikeinLineDay[23],
              TotalsumscarInDay: TotalsumscarInDay,
              TotalsumstruckInDay: TotalsumstruckInDay,
              TotalsumsmotorbikeInDay: TotalsumsmotorbikeInDay,
              TotalsumscarOutDay: TotalsumscarOutDay,
              TotalsumstruckOutDay: TotalsumstruckOutDay,
              TotalsumsmotorbikeOutDay: TotalsumsmotorbikeOutDay,
                     
          });
      } catch (error) {
          console.error('Error fetchInMonthg data:', error);
      }
  }


  

  handleGateAdded(gate) {
    let gates = this.state.gates.slice();
    gates.push(gate);
    this.setState({ gates: gates });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleGateUpdated(gate) {
    let gates = this.state.gates.slice();
    let i = gates.findIndex(u => u._id === gate._id);
    if (gates.length > i) { gates[i] = gate }
    this.setState({ gates: gates });
  }

  handleGateDeleted(gate) {
    let gates = this.state.gates.slice();
    gates = gates.filter(u => { return u._id !== gate._id; });
    this.setState({ gates: gates });
  }
  

  render() {
    let peopleOnline = this.state.online - 1;
    let onlineText = "";
    const { Loading } = this.state;
    const { selectedDay, selectedThisMonth,selectedDay1ago,selectedDay2ago,selectedDay3ago,selectedDay4ago,selectedDay5ago,selectedDay6ago,selectedMonthago,selectedTwoMonthago,selectedThreeMonthago,selectedFourMonthago,selectedFiveMonthago,userId } = this.context;
    // const { totalsum1, totalsum2, totalsum3, totalsum4 } = this.state;
    if (peopleOnline < 1) {
      onlineText = 'No one else is online';
    } else {
      onlineText = peopleOnline > 1 ? `${this.state.online - 1} people are online` : `${this.state.online - 1} person is online`;
    }

    return (
      <Container style={{ backgroundColor: "#f2f0f0", width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>        
              {this.state.Loading ? (
              <Backdrop open={this.state.Loading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
            {this.context.isLoading ? (
              <Backdrop open={this.context.isLoading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
        <div className='App' style={{ backgroundColor: "#f2f0f0", width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Menubar style={{ width: '100vw', height: '10vh', fontSize: '2vw'}} />
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: '100vw',justifyContent: 'center', alignItems: 'center'}}>
        <div className="container-fluid" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <h1 className="navbar-brand" href="#" style={{ fontSize: '20px', fontWeight: 'bold'}}>Dashboard for {userId}</h1>
      <ul className="navbar-nav mb-2 mb-lg-0   flex-row" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {userId == 'admin' && (
          <>
            <li className="nav-item">
              <ModalGate
                headerTitle='Add Gate'
                buttonTriggerTitle='ADD GATE'
                buttonSubmitTitle='Add'
                buttonColor='orange'
                onGateAdded={this.handleGateAdded}
                server={this.server}
                socket={this.socket}
                buttonStyle={{ fontSize: '1vw', padding: '0.5vw 1vw', whiteSpace: 'nowrap' }}
                buttonTriggerStyle={{ width: 'auto', height: 'auto', fontSize: '1vw', padding: '0.5vw 1vw', whiteSpace: 'nowrap' }}
              />
            </li>
            <li className="nav-item">
              <ModalUser
                headerTitle="Add Gate"
                buttonTriggerTitle="ADD ADMINUSER"
                buttonSubmitTitle="Add"
                buttonColor="purple"
                onGateAdded={this.handleUserAdded}
                server={this.server}
                socket={this.socket}
                buttonStyle={{ width: 'auto', height: 'auto', fontSize: '1vw', padding: '0.5vw 1vw', whiteSpace: 'nowrap' }}
                buttonTriggerStyle={{ fontSize: '1vw', padding: '0.5vw 1vw', whiteSpace: 'nowrap' }}
              />
            </li>
          </>
        )}
      </ul>

            </div>
        </nav>
          <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
          <img src={SUT} style={{ maxWidth: '100vw' }} />
          </div>
          <div style={{ width: '100vw', display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '50%', maxWidth: '100%' }}>
              {this.state.gates && (
                <div>
                  <TableGate
                    onGateUpdated={this.handleGateUpdated}
                    onGateDeleted={this.handleGateDeleted}
                    gates={this.state.gates}
                    server={this.server}
                  />
                </div>
              )}
            </div>
            <div style={{ width: '50%', padding: '5px', backgroundColor: 'white', height: '287px'}}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1934.3183240856748!2d102.0181212954299!3d14.881771481979681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311eada1f2cc53f1%3A0x10533e4b3f07a09f!2sSuranaree%20University%20of%20Technology!5e0!3m2!1sen!2sth!4v1649286510732!5m2!1sen!2sth"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
          <div className='charts-container' style={{ width: '100vw', backgroundColor: "#f2f0f0", flexDirection: 'column', alignItems: 'center', justifyContent: 'center',marginTop:'0px'  }}>
            <div style={{ width: '100%', display: 'flex', width: '100vw', justifyContent: 'space-between',marginTop:'0px' }}>
            <div className="container-fluid px-0">
            <Container fluid className="px-0">
            <div className="d-flex justify-content-between mt-0">
              <Segment
                className="custom-bg custom-text w-100 d-flex justify-content-center align-items-center p-2"
                style={{ fontSize: '1.5vw' }}
              >
                กราฟแสดงจำนวนของรถที่เข้าออกมหาวิทยาลัย
                  <DropdownPie disabled={this.state.Loading} />
              {selectedDay && selectedThisMonth && (
                  <DaySelect></DaySelect>
              )}
              {selectedThisMonth && selectedDay2ago && ( 
                  <MonthSelect></MonthSelect>
              )}
              </Segment>
              </div>
            </Container>
            </div>
            </div>
            </div>
            </div>
            <div className='charts-container' style={{ width: '99vw', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', width: '99vw' }}>
              {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                    <div id="pieChart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                      <PieChart ref={this.pieChartRef} 
                      totalsum1={this.state.totalsum1} 
                      totalsum2={this.state.totalsum2} 
                      totalsum3={this.state.totalsum3} 
                      totalsum4={this.state.totalsum4} />}
                    </div>
                  )}
              {selectedMonthago && (
                    <div id="pieChart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                      <PieChart ref={this.pieChartRef} 
                      totalsum1={this.state.totalsum1} 
                      totalsum2={this.state.totalsum2} 
                      totalsum3={this.state.totalsum3} 
                      totalsum4={this.state.totalsum4} />}
                    </div>
                  )}
                  {selectedDay && selectedThisMonth &&(
                    <div id="pie4Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                        <Pie4Chart 
                          totalsumsDayIn1={this.state.totalsumsDayIn1} 
                          totalsumsDayIn2={this.state.totalsumsDayIn2} 
                          totalsumsDayIn3={this.state.totalsumsDayIn3} 
                          totalsumsDayIn4={this.state.totalsumsDayIn4} />}
                    </div>
                  )}
                 {selectedDay1ago &&(
                    <div id="pie6Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      { (this.state.totalsumsWeekIn1 !== 0 || this.state.totalsumsWeekIn2 !== 0 || this.state.totalsumsWeekIn3 !== 0 || this.state.totalsumsWeekIn4 !== 0 )&& 
                        <Pie6Chart 
                        TotalsumsWeekInGate1={this.state.TotalsumsWeekInGate1} 
                        TotalsumsWeekInGate2={this.state.TotalsumsWeekInGate2} 
                        TotalsumsWeekInGate3={this.state.TotalsumsWeekInGate3} 
                        TotalsumsWeekInGate4={this.state.TotalsumsWeekInGate4} />}
                    </div>
                  )}
                  {selectedThisMonth && selectedDay2ago &&(
                    <div id="pie8Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      {  (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0)&& 
                        <Pie8Chart 
                          totalsumsMonthIn1={this.state.totalsumsMonthIn1} 
                          totalsumsMonthIn2={this.state.totalsumsMonthIn2} 
                          totalsumsMonthIn3={this.state.totalsumsMonthIn3} 
                          totalsumsMonthIn4={this.state.totalsumsMonthIn4} />}
                    </div>
                  )}
                {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                <div id="pie1Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                  { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                        <Pie1Chart 
                        totalsum5={this.state.totalsum5} 
                        totalsum6={this.state.totalsum6} 
                        totalsum7={this.state.totalsum7} 
                        totalsum8={this.state.totalsum8} />}
                  </div>
                )}
                 {selectedMonthago && (
                <div id="pie1Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                  { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                        <Pie1Chart 
                        totalsum5={this.state.totalsum5} 
                        totalsum6={this.state.totalsum6} 
                        totalsum7={this.state.totalsum7} 
                        totalsum8={this.state.totalsum8} />}
                  </div>
                )}
                  {selectedDay && selectedThisMonth &&(
                    <div id="pie5Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      {  (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                        <Pie5Chart
                          totalsumsDayOut1={this.state.totalsumsDayOut1} 
                          totalsumsDayOut2={this.state.totalsumsDayOut2} 
                          totalsumsDayOut3={this.state.totalsumsDayOut3} 
                          totalsumsDayOut4={this.state.totalsumsDayOut4} />}
                    </div>
                  )}
                   {selectedDay1ago &&(
                    <div id="pie7Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      {  (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                        <Pie7Chart 
                        TotalsumsWeekOutGate1={this.state.TotalsumsWeekOutGate1} 
                        TotalsumsWeekOutGate2={this.state.TotalsumsWeekOutGate2} 
                        TotalsumsWeekOutGate3={this.state.TotalsumsWeekOutGate3} 
                        TotalsumsWeekOutGate4={this.state.TotalsumsWeekOutGate4} />}
                    </div>
                  )}
                  {selectedThisMonth && selectedDay2ago &&(
                    <div id="pie9Chart" style={{ width: '50vw', padding: '10px', backgroundColor: 'white', height: '300px', marginBottom: '10px', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', marginLeft: '10px' }}>
                      {  (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                        <Pie9Chart 
                          totalsumsMonthOut1={this.state.totalsumsMonthOut1} 
                          totalsumsMonthOut2={this.state.totalsumsMonthOut2} 
                          totalsumsMonthOut3={this.state.totalsumsMonthOut3} 
                          totalsumsMonthOut4={this.state.totalsumsMonthOut4} />}
                    </div>
                  )}
              </div>
              
              <div style={{ display: 'flex', width: '100vw', justifyContent: 'space-between' }}>
                <div style={{ width: '34vw', padding: '10px', backgroundColor: 'white', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px' }}>
                {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                  <div id="lineChart" style={{ height: '300px' }}>
                  { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <LineChart 
                  totalsumcarinline1={this.state.totalsumcarinline1} 
                  totalsumcarinline2={this.state.totalsumcarinline2} 
                  totalsumcarinline3={this.state.totalsumcarinline3} 
                  totalsumcarinline4={this.state.totalsumcarinline4} 
                  totalsumcarinline5={this.state.totalsumcarinline5} 
                  totalsumcarinline6={this.state.totalsumcarinline6} 
                  totalsumcaroutline1={this.state.totalsumcaroutline1} 
                  totalsumcaroutline2={this.state.totalsumcaroutline2} 
                  totalsumcaroutline3={this.state.totalsumcaroutline3} 
                  totalsumcaroutline4={this.state.totalsumcaroutline4} 
                  totalsumcaroutline5={this.state.totalsumcaroutline5} 
                  totalsumcaroutline6={this.state.totalsumcaroutline6} 
                  />}
                  </div>
                  )}
                {selectedMonthago && (
                  <div id="lineChart" style={{ height: '300px' }}>
                  { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <LineChart 
                  totalsumcarinline1={this.state.totalsumcarinline1} 
                  totalsumcarinline2={this.state.totalsumcarinline2} 
                  totalsumcarinline3={this.state.totalsumcarinline3} 
                  totalsumcarinline4={this.state.totalsumcarinline4} 
                  totalsumcarinline5={this.state.totalsumcarinline5} 
                  totalsumcarinline6={this.state.totalsumcarinline6} 
                  totalsumcaroutline1={this.state.totalsumcaroutline1} 
                  totalsumcaroutline2={this.state.totalsumcaroutline2} 
                  totalsumcaroutline3={this.state.totalsumcaroutline3} 
                  totalsumcaroutline4={this.state.totalsumcaroutline4} 
                  totalsumcaroutline5={this.state.totalsumcaroutline5} 
                  totalsumcaroutline6={this.state.totalsumcaroutline6} 
                  />}
                  </div>
                  )}
                  {selectedDay1ago && (
                  <div id="line5Chart" style={{ height: '300px' }}>
                  { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line5Chart 
                  totalsumcarinLineWeek1={this.state.totalsumcarinLineWeek1} 
                  totalsumcarinLineWeek2={this.state.totalsumcarinLineWeek2} 
                  totalsumcarinLineWeek3={this.state.totalsumcarinLineWeek3} 
                  totalsumcarinLineWeek4={this.state.totalsumcarinLineWeek4} 
                  totalsumcarinLineWeek5={this.state.totalsumcarinLineWeek5} 
                  totalsumcarinLineWeek6={this.state.totalsumcarinLineWeek6} 
                  totalsumcarinLineWeek7={this.state.totalsumcarinLineWeek7} 
                  totalsumcaroutLineWeek1={this.state.totalsumcaroutLineWeek1} 
                  totalsumcaroutLineWeek2={this.state.totalsumcaroutLineWeek2} 
                  totalsumcaroutLineWeek3={this.state.totalsumcaroutLineWeek3} 
                  totalsumcaroutLineWeek4={this.state.totalsumcaroutLineWeek4} 
                  totalsumcaroutLineWeek5={this.state.totalsumcaroutLineWeek5} 
                  totalsumcaroutLineWeek6={this.state.totalsumcaroutLineWeek6} 
                  totalsumcaroutLineWeek7={this.state.totalsumcaroutLineWeek7} 
                  />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div id="line8Chart" style={{ height: '300px' }}>
                  { (this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line8Chart 
                  totalsumcarinLineMonth1= {this.state.totalsumcarinLineMonth1} 
                  totalsumcarinLineMonth2= {this.state.totalsumcarinLineMonth2} 
                  totalsumcarinLineMonth3 ={this.state.totalsumcarinLineMonth3} 
                  totalsumcarinLineMonth4= {this.state.totalsumcarinLineMonth4} 
                  totalsumcarinLineMonth5= {this.state.totalsumcarinLineMonth5} 
                  totalsumcarinLineMonth6= {this.state.totalsumcarinLineMonth6} 
                  totalsumcarinLineMonth7= {this.state.totalsumcarinLineMonth7} 
                  totalsumcarinLineMonth8= {this.state.totalsumcarinLineMonth8} 
                  totalsumcarinLineMonth9= {this.state.totalsumcarinLineMonth9} 
                  totalsumcarinLineMonth10= {this.state.totalsumcarinLineMonth10} 
                  totalsumcarinLineMonth11= {this.state.totalsumcarinLineMonth11} 
                  totalsumcarinLineMonth12= {this.state.totalsumcarinLineMonth12} 
                  totalsumcarinLineMonth13= {this.state.totalsumcarinLineMonth13} 
                  totalsumcarinLineMonth14= {this.state.totalsumcarinLineMonth14} 
                  totalsumcarinLineMonth15= {this.state.totalsumcarinLineMonth15} 
                  totalsumcarinLineMonth16= {this.state.totalsumcarinLineMonth16} 
                  totalsumcarinLineMonth17= {this.state.totalsumcarinLineMonth17} 
                  totalsumcarinLineMonth18= {this.state.totalsumcarinLineMonth18} 
                  totalsumcarinLineMonth19= {this.state.totalsumcarinLineMonth19} 
                  totalsumcarinLineMonth20= {this.state.totalsumcarinLineMonth20} 
                  totalsumcarinLineMonth21= {this.state.totalsumcarinLineMonth21} 
                  totalsumcarinLineMonth22= {this.state.totalsumcarinLineMonth22} 
                  totalsumcarinLineMonth23= {this.state.totalsumcarinLineMonth23} 
                  totalsumcarinLineMonth24= {this.state.totalsumcarinLineMonth24} 
                  totalsumcarinLineMonth25= {this.state.totalsumcarinLineMonth25} 
                  totalsumcarinLineMonth26= {this.state.totalsumcarinLineMonth26} 
                  totalsumcarinLineMonth27= {this.state.totalsumcarinLineMonth27} 
                  totalsumcarinLineMonth28= {this.state.totalsumcarinLineMonth28} 
                  totalsumcarinLineMonth29= {this.state.totalsumcarinLineMonth29} 
                  totalsumcarinLineMonth30= {this.state.totalsumcarinLineMonth30} 
                  totalsumcarinLineMonth31= {this.state.totalsumcarinLineMonth31} 
                  totalsumcaroutLineMonth1= {this.state.totalsumcaroutLineMonth1} 
                  totalsumcaroutLineMonth2= {this.state.totalsumcaroutLineMonth2} 
                  totalsumcaroutLineMonth3 ={this.state.totalsumcaroutLineMonth3} 
                  totalsumcaroutLineMonth4= {this.state.totalsumcaroutLineMonth4} 
                  totalsumcaroutLineMonth5= {this.state.totalsumcaroutLineMonth5} 
                  totalsumcaroutLineMonth6= {this.state.totalsumcaroutLineMonth6} 
                  totalsumcaroutLineMonth7= {this.state.totalsumcaroutLineMonth7} 
                  totalsumcaroutLineMonth8= {this.state.totalsumcaroutLineMonth8} 
                  totalsumcaroutLineMonth9= {this.state.totalsumcaroutLineMonth9} 
                  totalsumcaroutLineMonth10= {this.state.totalsumcaroutLineMonth10} 
                  totalsumcaroutLineMonth11= {this.state.totalsumcaroutLineMonth11} 
                  totalsumcaroutLineMonth12= {this.state.totalsumcaroutLineMonth12} 
                  totalsumcaroutLineMonth13= {this.state.totalsumcaroutLineMonth13} 
                  totalsumcaroutLineMonth14= {this.state.totalsumcaroutLineMonth14} 
                  totalsumcaroutLineMonth15= {this.state.totalsumcaroutLineMonth15} 
                  totalsumcaroutLineMonth16= {this.state.totalsumcaroutLineMonth16} 
                  totalsumcaroutLineMonth17= {this.state.totalsumcaroutLineMonth17} 
                  totalsumcaroutLineMonth18= {this.state.totalsumcaroutLineMonth18} 
                  totalsumcaroutLineMonth19= {this.state.totalsumcaroutLineMonth19} 
                  totalsumcaroutLineMonth20= {this.state.totalsumcaroutLineMonth20} 
                  totalsumcaroutLineMonth21= {this.state.totalsumcaroutLineMonth21} 
                  totalsumcaroutLineMonth22= {this.state.totalsumcaroutLineMonth22} 
                  totalsumcaroutLineMonth23= {this.state.totalsumcaroutLineMonth23} 
                  totalsumcaroutLineMonth24= {this.state.totalsumcaroutLineMonth24} 
                  totalsumcaroutLineMonth25= {this.state.totalsumcaroutLineMonth25} 
                  totalsumcaroutLineMonth26= {this.state.totalsumcaroutLineMonth26} 
                  totalsumcaroutLineMonth27= {this.state.totalsumcaroutLineMonth27} 
                  totalsumcaroutLineMonth28= {this.state.totalsumcaroutLineMonth28} 
                  totalsumcaroutLineMonth29= {this.state.totalsumcaroutLineMonth29} 
                  totalsumcaroutLineMonth30= {this.state.totalsumcaroutLineMonth30} 
                  totalsumcaroutLineMonth31= {this.state.totalsumcaroutLineMonth31} 
                  />}
                  </div>
                  )}
                  {selectedDay && selectedThisMonth && (
                  <div id="line11Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line11Chart 
                  totalsumcarinLineDay1= {this.state.totalsumcarinLineDay1} 
                  totalsumcarinLineDay2= {this.state.totalsumcarinLineDay2} 
                  totalsumcarinLineDay3 ={this.state.totalsumcarinLineDay3} 
                  totalsumcarinLineDay4= {this.state.totalsumcarinLineDay4} 
                  totalsumcarinLineDay5= {this.state.totalsumcarinLineDay5} 
                  totalsumcarinLineDay6= {this.state.totalsumcarinLineDay6} 
                  totalsumcarinLineDay7= {this.state.totalsumcarinLineDay7} 
                  totalsumcarinLineDay8= {this.state.totalsumcarinLineDay8} 
                  totalsumcarinLineDay9= {this.state.totalsumcarinLineDay9} 
                  totalsumcarinLineDay10= {this.state.totalsumcarinLineDay10} 
                  totalsumcarinLineDay11= {this.state.totalsumcarinLineDay11} 
                  totalsumcarinLineDay12= {this.state.totalsumcarinLineDay12} 
                  totalsumcarinLineDay13= {this.state.totalsumcarinLineDay13} 
                  totalsumcarinLineDay14= {this.state.totalsumcarinLineDay14} 
                  totalsumcarinLineDay15= {this.state.totalsumcarinLineDay15} 
                  totalsumcarinLineDay16= {this.state.totalsumcarinLineDay16} 
                  totalsumcarinLineDay17= {this.state.totalsumcarinLineDay17} 
                  totalsumcarinLineDay18= {this.state.totalsumcarinLineDay18} 
                  totalsumcarinLineDay19= {this.state.totalsumcarinLineDay19} 
                  totalsumcarinLineDay20= {this.state.totalsumcarinLineDay20} 
                  totalsumcarinLineDay21= {this.state.totalsumcarinLineDay21} 
                  totalsumcarinLineDay22= {this.state.totalsumcarinLineDay22} 
                  totalsumcarinLineDay23= {this.state.totalsumcarinLineDay23} 
                  totalsumcarinLineDay24= {this.state.totalsumcarinLineDay24} 
                  totalsumcaroutLineDay1= {this.state.totalsumcaroutLineDay1} 
                  totalsumcaroutLineDay2= {this.state.totalsumcaroutLineDay2} 
                  totalsumcaroutLineDay3 ={this.state.totalsumcaroutLineDay3} 
                  totalsumcaroutLineDay4= {this.state.totalsumcaroutLineDay4} 
                  totalsumcaroutLineDay5= {this.state.totalsumcaroutLineDay5} 
                  totalsumcaroutLineDay6= {this.state.totalsumcaroutLineDay6} 
                  totalsumcaroutLineDay7= {this.state.totalsumcaroutLineDay7} 
                  totalsumcaroutLineDay8= {this.state.totalsumcaroutLineDay8} 
                  totalsumcaroutLineDay9= {this.state.totalsumcaroutLineDay9} 
                  totalsumcaroutLineDay10= {this.state.totalsumcaroutLineDay10} 
                  totalsumcaroutLineDay11= {this.state.totalsumcaroutLineDay11} 
                  totalsumcaroutLineDay12= {this.state.totalsumcaroutLineDay12} 
                  totalsumcaroutLineDay13= {this.state.totalsumcaroutLineDay13} 
                  totalsumcaroutLineDay14= {this.state.totalsumcaroutLineDay14} 
                  totalsumcaroutLineDay15= {this.state.totalsumcaroutLineDay15} 
                  totalsumcaroutLineDay16= {this.state.totalsumcaroutLineDay16} 
                  totalsumcaroutLineDay17= {this.state.totalsumcaroutLineDay17} 
                  totalsumcaroutLineDay18= {this.state.totalsumcaroutLineDay18} 
                  totalsumcaroutLineDay19= {this.state.totalsumcaroutLineDay19} 
                  totalsumcaroutLineDay20= {this.state.totalsumcaroutLineDay20} 
                  totalsumcaroutLineDay21= {this.state.totalsumcaroutLineDay21} 
                  totalsumcaroutLineDay22= {this.state.totalsumcaroutLineDay22} 
                  totalsumcaroutLineDay23= {this.state.totalsumcaroutLineDay23} 
                  totalsumcaroutLineDay24= {this.state.totalsumcaroutLineDay24} 
                  />}
                  </div>
                  )}
                    {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <CarInOut Totalsumscarin={this.state.Totalsumscarin} Totalsumscarout={this.state.Totalsumscarout} />}
                  </div>
                   )}
                  {selectedMonthago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <CarInOut Totalsumscarin={this.state.Totalsumscarin} Totalsumscarout={this.state.Totalsumscarout} />}
                  </div>
                   )}
                     {selectedDay1ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0)!== 0 && 
                    <CarInOut1 TotalsumscarInWeek={this.state.TotalsumscarInWeek} TotalsumscarOutWeek={this.state.TotalsumscarOutWeek} />}
                  </div>
                   )}
                  {selectedDay && selectedThisMonth && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <CarInOut3 TotalsumscarInDay={this.state.TotalsumscarInDay} TotalsumscarOutDay={this.state.TotalsumscarOutDay} />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && <CarInOut2 TotalsumscarInMonth={this.state.TotalsumscarInMonth} TotalsumscarOutMonth={this.state.TotalsumscarOutMonth} />}
                  </div>
                   )}
                </div>
                <div style={{ width: '34vw', padding: '10px', backgroundColor: 'white', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                  <div id="line1Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) &&
                  <Line1Chart
                    totalsummotorbikeinline1={this.state.totalsummotorbikeinline1}
                    totalsummotorbikeinline2={this.state.totalsummotorbikeinline2}
                    totalsummotorbikeinline3={this.state.totalsummotorbikeinline3}
                    totalsummotorbikeinline4={this.state.totalsummotorbikeinline4}
                    totalsummotorbikeinline5={this.state.totalsummotorbikeinline5}
                    totalsummotorbikeinline6={this.state.totalsummotorbikeinline6}
                    totalsummotorbikeoutline1={this.state.totalsummotorbikeoutline1}
                    totalsummotorbikeoutline2={this.state.totalsummotorbikeoutline2}
                    totalsummotorbikeoutline3={this.state.totalsummotorbikeoutline3}
                    totalsummotorbikeoutline4={this.state.totalsummotorbikeoutline4}
                    totalsummotorbikeoutline5={this.state.totalsummotorbikeoutline5}
                    totalsummotorbikeoutline6={this.state.totalsummotorbikeoutline6}
                  />
                  }
                  </div>
                  )}
                {selectedMonthago && (
                  <div id="line1Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) &&
                  <Line1Chart
                    totalsummotorbikeinline1={this.state.totalsummotorbikeinline1}
                    totalsummotorbikeinline2={this.state.totalsummotorbikeinline2}
                    totalsummotorbikeinline3={this.state.totalsummotorbikeinline3}
                    totalsummotorbikeinline4={this.state.totalsummotorbikeinline4}
                    totalsummotorbikeinline5={this.state.totalsummotorbikeinline5}
                    totalsummotorbikeinline6={this.state.totalsummotorbikeinline6}
                    totalsummotorbikeoutline1={this.state.totalsummotorbikeoutline1}
                    totalsummotorbikeoutline2={this.state.totalsummotorbikeoutline2}
                    totalsummotorbikeoutline3={this.state.totalsummotorbikeoutline3}
                    totalsummotorbikeoutline4={this.state.totalsummotorbikeoutline4}
                    totalsummotorbikeoutline5={this.state.totalsummotorbikeoutline5}
                    totalsummotorbikeoutline6={this.state.totalsummotorbikeoutline6}
                  />
                  }
                  </div>
                  )}
                    {selectedDay1ago && (
                  <div id="line6Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line6Chart 
                  totalsummotorbikeinLineWeek1={this.state.totalsummotorbikeinLineWeek1} 
                  totalsummotorbikeinLineWeek2={this.state.totalsummotorbikeinLineWeek2} 
                  totalsummotorbikeinLineWeek3={this.state.totalsummotorbikeinLineWeek3} 
                  totalsummotorbikeinLineWeek4={this.state.totalsummotorbikeinLineWeek4} 
                  totalsummotorbikeinLineWeek5={this.state.totalsummotorbikeinLineWeek5} 
                  totalsummotorbikeinLineWeek6={this.state.totalsummotorbikeinLineWeek6} 
                  totalsummotorbikeinLineWeek7={this.state.totalsummotorbikeinLineWeek7} 
                  totalsummotorbikeoutLineWeek1={this.state.totalsummotorbikeoutLineWeek1} 
                  totalsummotorbikeoutLineWeek2={this.state.totalsummotorbikeoutLineWeek2} 
                  totalsummotorbikeoutLineWeek3={this.state.totalsummotorbikeoutLineWeek3} 
                  totalsummotorbikeoutLineWeek4={this.state.totalsummotorbikeoutLineWeek4} 
                  totalsummotorbikeoutLineWeek5={this.state.totalsummotorbikeoutLineWeek5} 
                  totalsummotorbikeoutLineWeek6={this.state.totalsummotorbikeoutLineWeek6} 
                  totalsummotorbikeoutLineWeek7={this.state.totalsummotorbikeoutLineWeek7} 
                  />}
                  </div>
                  )}
                   {selectedDay && selectedThisMonth && (
                  <div id="line13Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line13Chart 
                  totalsummotorbikeinLineDay1= {this.state.totalsummotorbikeinLineDay1} 
                  totalsummotorbikeinLineDay2= {this.state.totalsummotorbikeinLineDay2} 
                  totalsummotorbikeinLineDay3 ={this.state.totalsummotorbikeinLineDay3} 
                  totalsummotorbikeinLineDay4= {this.state.totalsummotorbikeinLineDay4} 
                  totalsummotorbikeinLineDay5= {this.state.totalsummotorbikeinLineDay5} 
                  totalsummotorbikeinLineDay6= {this.state.totalsummotorbikeinLineDay6} 
                  totalsummotorbikeinLineDay7= {this.state.totalsummotorbikeinLineDay7} 
                  totalsummotorbikeinLineDay8= {this.state.totalsummotorbikeinLineDay8} 
                  totalsummotorbikeinLineDay9= {this.state.totalsummotorbikeinLineDay9} 
                  totalsummotorbikeinLineDay10= {this.state.totalsummotorbikeinLineDay10} 
                  totalsummotorbikeinLineDay11= {this.state.totalsummotorbikeinLineDay11} 
                  totalsummotorbikeinLineDay12= {this.state.totalsummotorbikeinLineDay12} 
                  totalsummotorbikeinLineDay13= {this.state.totalsummotorbikeinLineDay13} 
                  totalsummotorbikeinLineDay14= {this.state.totalsummotorbikeinLineDay14} 
                  totalsummotorbikeinLineDay15= {this.state.totalsummotorbikeinLineDay15} 
                  totalsummotorbikeinLineDay16= {this.state.totalsummotorbikeinLineDay16} 
                  totalsummotorbikeinLineDay17= {this.state.totalsummotorbikeinLineDay17} 
                  totalsummotorbikeinLineDay18= {this.state.totalsummotorbikeinLineDay18} 
                  totalsummotorbikeinLineDay19= {this.state.totalsummotorbikeinLineDay19} 
                  totalsummotorbikeinLineDay20= {this.state.totalsummotorbikeinLineDay20} 
                  totalsummotorbikeinLineDay21= {this.state.totalsummotorbikeinLineDay21} 
                  totalsummotorbikeinLineDay22= {this.state.totalsummotorbikeinLineDay22} 
                  totalsummotorbikeinLineDay23= {this.state.totalsummotorbikeinLineDay23} 
                  totalsummotorbikeinLineDay24= {this.state.totalsummotorbikeinLineDay24} 
                  totalsummotorbikeoutLineDay1= {this.state.totalsummotorbikeoutLineDay1} 
                  totalsummotorbikeoutLineDay2= {this.state.totalsummotorbikeoutLineDay2} 
                  totalsummotorbikeoutLineDay3 ={this.state.totalsummotorbikeoutLineDay3} 
                  totalsummotorbikeoutLineDay4= {this.state.totalsummotorbikeoutLineDay4} 
                  totalsummotorbikeoutLineDay5= {this.state.totalsummotorbikeoutLineDay5} 
                  totalsummotorbikeoutLineDay6= {this.state.totalsummotorbikeoutLineDay6} 
                  totalsummotorbikeoutLineDay7= {this.state.totalsummotorbikeoutLineDay7} 
                  totalsummotorbikeoutLineDay8= {this.state.totalsummotorbikeoutLineDay8} 
                  totalsummotorbikeoutLineDay9= {this.state.totalsummotorbikeoutLineDay9} 
                  totalsummotorbikeoutLineDay10= {this.state.totalsummotorbikeoutLineDay10} 
                  totalsummotorbikeoutLineDay11= {this.state.totalsummotorbikeoutLineDay11} 
                  totalsummotorbikeoutLineDay12= {this.state.totalsummotorbikeoutLineDay12} 
                  totalsummotorbikeoutLineDay13= {this.state.totalsummotorbikeoutLineDay13} 
                  totalsummotorbikeoutLineDay14= {this.state.totalsummotorbikeoutLineDay14} 
                  totalsummotorbikeoutLineDay15= {this.state.totalsummotorbikeoutLineDay15} 
                  totalsummotorbikeoutLineDay16= {this.state.totalsummotorbikeoutLineDay16} 
                  totalsummotorbikeoutLineDay17= {this.state.totalsummotorbikeoutLineDay17} 
                  totalsummotorbikeoutLineDay18= {this.state.totalsummotorbikeoutLineDay18} 
                  totalsummotorbikeoutLineDay19= {this.state.totalsummotorbikeoutLineDay19} 
                  totalsummotorbikeoutLineDay20= {this.state.totalsummotorbikeoutLineDay20} 
                  totalsummotorbikeoutLineDay21= {this.state.totalsummotorbikeoutLineDay21} 
                  totalsummotorbikeoutLineDay22= {this.state.totalsummotorbikeoutLineDay22} 
                  totalsummotorbikeoutLineDay23= {this.state.totalsummotorbikeoutLineDay23} 
                  totalsummotorbikeoutLineDay24= {this.state.totalsummotorbikeoutLineDay24} 
                  />}
                  </div>
                  )}
                       {selectedThisMonth && selectedDay2ago && (
                  <div id="line10Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line10Chart 
                  totalsummotorbikeinLineMonth1= {this.state.totalsummotorbikeinLineMonth1} 
                  totalsummotorbikeinLineMonth2= {this.state.totalsummotorbikeinLineMonth2} 
                  totalsummotorbikeinLineMonth3 ={this.state.totalsummotorbikeinLineMonth3} 
                  totalsummotorbikeinLineMonth4= {this.state.totalsummotorbikeinLineMonth4} 
                  totalsummotorbikeinLineMonth5= {this.state.totalsummotorbikeinLineMonth5} 
                  totalsummotorbikeinLineMonth6= {this.state.totalsummotorbikeinLineMonth6} 
                  totalsummotorbikeinLineMonth7= {this.state.totalsummotorbikeinLineMonth7} 
                  totalsummotorbikeinLineMonth8= {this.state.totalsummotorbikeinLineMonth8} 
                  totalsummotorbikeinLineMonth9= {this.state.totalsummotorbikeinLineMonth9} 
                  totalsummotorbikeinLineMonth10= {this.state.totalsummotorbikeinLineMonth10} 
                  totalsummotorbikeinLineMonth11= {this.state.totalsummotorbikeinLineMonth11} 
                  totalsummotorbikeinLineMonth12= {this.state.totalsummotorbikeinLineMonth12} 
                  totalsummotorbikeinLineMonth13= {this.state.totalsummotorbikeinLineMonth13} 
                  totalsummotorbikeinLineMonth14= {this.state.totalsummotorbikeinLineMonth14} 
                  totalsummotorbikeinLineMonth15= {this.state.totalsummotorbikeinLineMonth15} 
                  totalsummotorbikeinLineMonth16= {this.state.totalsummotorbikeinLineMonth16} 
                  totalsummotorbikeinLineMonth17= {this.state.totalsummotorbikeinLineMonth17} 
                  totalsummotorbikeinLineMonth18= {this.state.totalsummotorbikeinLineMonth18} 
                  totalsummotorbikeinLineMonth19= {this.state.totalsummotorbikeinLineMonth19} 
                  totalsummotorbikeinLineMonth20= {this.state.totalsummotorbikeinLineMonth20} 
                  totalsummotorbikeinLineMonth21= {this.state.totalsummotorbikeinLineMonth21} 
                  totalsummotorbikeinLineMonth22= {this.state.totalsummotorbikeinLineMonth22} 
                  totalsummotorbikeinLineMonth23= {this.state.totalsummotorbikeinLineMonth23} 
                  totalsummotorbikeinLineMonth24= {this.state.totalsummotorbikeinLineMonth24} 
                  totalsummotorbikeinLineMonth25= {this.state.totalsummotorbikeinLineMonth25} 
                  totalsummotorbikeinLineMonth26= {this.state.totalsummotorbikeinLineMonth26} 
                  totalsummotorbikeinLineMonth27= {this.state.totalsummotorbikeinLineMonth27} 
                  totalsummotorbikeinLineMonth28= {this.state.totalsummotorbikeinLineMonth28} 
                  totalsummotorbikeinLineMonth29= {this.state.totalsummotorbikeinLineMonth29} 
                  totalsummotorbikeinLineMonth30= {this.state.totalsummotorbikeinLineMonth30} 
                  totalsummotorbikeinLineMonth31= {this.state.totalsummotorbikeinLineMonth31} 
                  totalsummotorbikeoutLineMonth1= {this.state.totalsummotorbikeoutLineMonth1} 
                  totalsummotorbikeoutLineMonth2= {this.state.totalsummotorbikeoutLineMonth2} 
                  totalsummotorbikeoutLineMonth3 ={this.state.totalsummotorbikeoutLineMonth3} 
                  totalsummotorbikeoutLineMonth4= {this.state.totalsummotorbikeoutLineMonth4} 
                  totalsummotorbikeoutLineMonth5= {this.state.totalsummotorbikeoutLineMonth5} 
                  totalsummotorbikeoutLineMonth6= {this.state.totalsummotorbikeoutLineMonth6} 
                  totalsummotorbikeoutLineMonth7= {this.state.totalsummotorbikeoutLineMonth7} 
                  totalsummotorbikeoutLineMonth8= {this.state.totalsummotorbikeoutLineMonth8} 
                  totalsummotorbikeoutLineMonth9= {this.state.totalsummotorbikeoutLineMonth9} 
                  totalsummotorbikeoutLineMonth10= {this.state.totalsummotorbikeoutLineMonth10} 
                  totalsummotorbikeoutLineMonth11= {this.state.totalsummotorbikeoutLineMonth11} 
                  totalsummotorbikeoutLineMonth12= {this.state.totalsummotorbikeoutLineMonth12} 
                  totalsummotorbikeoutLineMonth13= {this.state.totalsummotorbikeoutLineMonth13} 
                  totalsummotorbikeoutLineMonth14= {this.state.totalsummotorbikeoutLineMonth14} 
                  totalsummotorbikeoutLineMonth15= {this.state.totalsummotorbikeoutLineMonth15} 
                  totalsummotorbikeoutLineMonth16= {this.state.totalsummotorbikeoutLineMonth16} 
                  totalsummotorbikeoutLineMonth17= {this.state.totalsummotorbikeoutLineMonth17} 
                  totalsummotorbikeoutLineMonth18= {this.state.totalsummotorbikeoutLineMonth18} 
                  totalsummotorbikeoutLineMonth19= {this.state.totalsummotorbikeoutLineMonth19} 
                  totalsummotorbikeoutLineMonth20= {this.state.totalsummotorbikeoutLineMonth20} 
                  totalsummotorbikeoutLineMonth21= {this.state.totalsummotorbikeoutLineMonth21} 
                  totalsummotorbikeoutLineMonth22= {this.state.totalsummotorbikeoutLineMonth22} 
                  totalsummotorbikeoutLineMonth23= {this.state.totalsummotorbikeoutLineMonth23} 
                  totalsummotorbikeoutLineMonth24= {this.state.totalsummotorbikeoutLineMonth24} 
                  totalsummotorbikeoutLineMonth25= {this.state.totalsummotorbikeoutLineMonth25} 
                  totalsummotorbikeoutLineMonth26= {this.state.totalsummotorbikeoutLineMonth26} 
                  totalsummotorbikeoutLineMonth27= {this.state.totalsummotorbikeoutLineMonth27} 
                  totalsummotorbikeoutLineMonth28= {this.state.totalsummotorbikeoutLineMonth28} 
                  totalsummotorbikeoutLineMonth29= {this.state.totalsummotorbikeoutLineMonth29} 
                  totalsummotorbikeoutLineMonth30= {this.state.totalsummotorbikeoutLineMonth30} 
                  totalsummotorbikeoutLineMonth31= {this.state.totalsummotorbikeoutLineMonth31} 
                  />}
                  </div>
                  )}
                   {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                      <MotorcycleInOut 
                      Totalsumsmotorbikein={this.state.Totalsumsmotorbikein} Totalsumsmotorbikeout={this.state.Totalsumsmotorbikeout} />}
                    </div>
                    )}
                  {selectedMonthago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                      <MotorcycleInOut 
                      Totalsumsmotorbikein={this.state.Totalsumsmotorbikein} Totalsumsmotorbikeout={this.state.Totalsumsmotorbikeout} />}
                    </div>
                    )}
                  {selectedDay1ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                      <MotorcycleInOut1 
                      TotalsumsmotorbikeInWeek={this.state.TotalsumsmotorbikeInWeek} TotalsumsmotorbikeOutWeek={this.state.TotalsumsmotorbikeOutWeek} />}
                    </div>
                    )}
                  {selectedDay && selectedThisMonth && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <MotorcycleInOut3 
                    TotalsumsmotorbikeInDay={this.state.TotalsumsmotorbikeInDay} TotalsumsmotorbikeOutDay={this.state.TotalsumsmotorbikeOutDay} />}
                  </div>
                  )}
                     {selectedThisMonth && selectedDay2ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                      {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                      <MotorcycleInOut2 
                      TotalsumsmotorbikeInMonth={this.state.TotalsumsmotorbikeInMonth} TotalsumsmotorbikeOutMonth={this.state.TotalsumsmotorbikeOutMonth} />}
                    </div>
                    )}
                </div>
                
                {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && ( 
                  <div id="line2Chart" style={{ height: '300px' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) &&
                      <Line2Chart
                        totalsumtruckinline1={this.state.totalsumtruckinline1}
                        totalsumtruckinline2={this.state.totalsumtruckinline2}
                        totalsumtruckinline3={this.state.totalsumtruckinline3}
                        totalsumtruckinline4={this.state.totalsumtruckinline4}
                        totalsumtruckinline5={this.state.totalsumtruckinline5}
                        totalsumtruckinline6={this.state.totalsumtruckinline6}
                        totalsumtruckoutline1={this.state.totalsumtruckoutline1}
                        totalsumtruckoutline2={this.state.totalsumtruckoutline2}
                        totalsumtruckoutline3={this.state.totalsumtruckoutline3}
                        totalsumtruckoutline4={this.state.totalsumtruckoutline4}
                        totalsumtruckoutline5={this.state.totalsumtruckinline1}
                        totalsumtruckoutline6={this.state.totalsumtruckoutline6}
                      />
                    }
                  </div>
                  )}
                  <div style={{ width: '34vw', padding: '10px', backgroundColor: 'white', border: '1px solid #f2f0f0', color: 'black', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                {selectedMonthago && ( 
                  <div id="line2Chart" style={{ height: '300px' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) &&
                      <Line2Chart
                        totalsumtruckinline1={this.state.totalsumtruckinline1}
                        totalsumtruckinline2={this.state.totalsumtruckinline2}
                        totalsumtruckinline3={this.state.totalsumtruckinline3}
                        totalsumtruckinline4={this.state.totalsumtruckinline4}
                        totalsumtruckinline5={this.state.totalsumtruckinline5}
                        totalsumtruckinline6={this.state.totalsumtruckinline6}
                        totalsumtruckoutline1={this.state.totalsumtruckoutline1}
                        totalsumtruckoutline2={this.state.totalsumtruckoutline2}
                        totalsumtruckoutline3={this.state.totalsumtruckoutline3}
                        totalsumtruckoutline4={this.state.totalsumtruckoutline4}
                        totalsumtruckoutline5={this.state.totalsumtruckoutline5}
                        totalsumtruckoutline6={this.state.totalsumtruckoutline6}
                      />
                    }
                  </div>
                  )}
                  {selectedDay1ago && (
                  <div id="line7Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line7Chart 
                  totalsumtruckinLineWeek1={this.state.totalsumtruckinLineWeek1} 
                  totalsumtruckinLineWeek2={this.state.totalsumtruckinLineWeek2} 
                  totalsumtruckinLineWeek3={this.state.totalsumtruckinLineWeek3} 
                  totalsumtruckinLineWeek4={this.state.totalsumtruckinLineWeek4} 
                  totalsumtruckinLineWeek5={this.state.totalsumtruckinLineWeek5} 
                  totalsumtruckinLineWeek6={this.state.totalsumtruckinLineWeek6} 
                  totalsumtruckinLineWeek7={this.state.totalsumtruckinLineWeek7} 
                  totalsumtruckoutLineWeek1={this.state.totalsumtruckoutLineWeek1} 
                  totalsumtruckoutLineWeek2={this.state.totalsumtruckoutLineWeek2} 
                  totalsumtruckoutLineWeek3={this.state.totalsumtruckoutLineWeek3} 
                  totalsumtruckoutLineWeek4={this.state.totalsumtruckoutLineWeek4} 
                  totalsumtruckoutLineWeek5={this.state.totalsumtruckoutLineWeek5} 
                  totalsumtruckoutLineWeek6={this.state.totalsumtruckoutLineWeek6} 
                  totalsumtruckoutLineWeek7={this.state.totalsumtruckoutLineWeek7} 
                  />}
                  </div>
                  )}
                      {selectedDay && selectedThisMonth && (
                  <div id="line12Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line12Chart 
                  totalsumtruckinLineDay1= {this.state.totalsumtruckinLineDay1} 
                  totalsumtruckinLineDay2= {this.state.totalsumtruckinLineDay2} 
                  totalsumtruckinLineDay3 ={this.state.totalsumtruckinLineDay3} 
                  totalsumtruckinLineDay4= {this.state.totalsumtruckinLineDay4} 
                  totalsumtruckinLineDay5= {this.state.totalsumtruckinLineDay5} 
                  totalsumtruckinLineDay6= {this.state.totalsumtruckinLineDay6} 
                  totalsumtruckinLineDay7= {this.state.totalsumtruckinLineDay7} 
                  totalsumtruckinLineDay8= {this.state.totalsumtruckinLineDay8} 
                  totalsumtruckinLineDay9= {this.state.totalsumtruckinLineDay9} 
                  totalsumtruckinLineDay10= {this.state.totalsumtruckinLineDay10} 
                  totalsumtruckinLineDay11= {this.state.totalsumtruckinLineDay11} 
                  totalsumtruckinLineDay12= {this.state.totalsumtruckinLineDay12} 
                  totalsumtruckinLineDay13= {this.state.totalsumtruckinLineDay13} 
                  totalsumtruckinLineDay14= {this.state.totalsumtruckinLineDay14} 
                  totalsumtruckinLineDay15= {this.state.totalsumtruckinLineDay15} 
                  totalsumtruckinLineDay16= {this.state.totalsumtruckinLineDay16} 
                  totalsumtruckinLineDay17= {this.state.totalsumtruckinLineDay17} 
                  totalsumtruckinLineDay18= {this.state.totalsumtruckinLineDay18} 
                  totalsumtruckinLineDay19= {this.state.totalsumtruckinLineDay19} 
                  totalsumtruckinLineDay20= {this.state.totalsumtruckinLineDay20} 
                  totalsumtruckinLineDay21= {this.state.totalsumtruckinLineDay21} 
                  totalsumtruckinLineDay22= {this.state.totalsumtruckinLineDay22} 
                  totalsumtruckinLineDay23= {this.state.totalsumtruckinLineDay23} 
                  totalsumtruckinLineDay24= {this.state.totalsumtruckinLineDay24} 
                  totalsumtruckoutLineDay1= {this.state.totalsumtruckoutLineDay1} 
                  totalsumtruckoutLineDay2= {this.state.totalsumtruckoutLineDay2} 
                  totalsumtruckoutLineDay3 ={this.state.totalsumtruckoutLineDay3} 
                  totalsumtruckoutLineDay4= {this.state.totalsumtruckoutLineDay4} 
                  totalsumtruckoutLineDay5= {this.state.totalsumtruckoutLineDay5} 
                  totalsumtruckoutLineDay6= {this.state.totalsumtruckoutLineDay6} 
                  totalsumtruckoutLineDay7= {this.state.totalsumtruckoutLineDay7} 
                  totalsumtruckoutLineDay8= {this.state.totalsumtruckoutLineDay8} 
                  totalsumtruckoutLineDay9= {this.state.totalsumtruckoutLineDay9} 
                  totalsumtruckoutLineDay10= {this.state.totalsumtruckoutLineDay10} 
                  totalsumtruckoutLineDay11= {this.state.totalsumtruckoutLineDay11} 
                  totalsumtruckoutLineDay12= {this.state.totalsumtruckoutLineDay12} 
                  totalsumtruckoutLineDay13= {this.state.totalsumtruckoutLineDay13} 
                  totalsumtruckoutLineDay14= {this.state.totalsumtruckoutLineDay14} 
                  totalsumtruckoutLineDay15= {this.state.totalsumtruckoutLineDay15} 
                  totalsumtruckoutLineDay16= {this.state.totalsumtruckoutLineDay16} 
                  totalsumtruckoutLineDay17= {this.state.totalsumtruckoutLineDay17} 
                  totalsumtruckoutLineDay18= {this.state.totalsumtruckoutLineDay18} 
                  totalsumtruckoutLineDay19= {this.state.totalsumtruckoutLineDay19} 
                  totalsumtruckoutLineDay20= {this.state.totalsumtruckoutLineDay20} 
                  totalsumtruckoutLineDay21= {this.state.totalsumtruckoutLineDay21} 
                  totalsumtruckoutLineDay22= {this.state.totalsumtruckoutLineDay22} 
                  totalsumtruckoutLineDay23= {this.state.totalsumtruckoutLineDay23} 
                  totalsumtruckoutLineDay24= {this.state.totalsumtruckoutLineDay24} 
                  />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div id="line9Chart" style={{ height: '300px' }}>
                  {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                  <Line9Chart 
                  totalsumtruckinLineMonth1= {this.state.totalsumtruckinLineMonth1} 
                  totalsumtruckinLineMonth2= {this.state.totalsumtruckinLineMonth2} 
                  totalsumtruckinLineMonth3 ={this.state.totalsumtruckinLineMonth3} 
                  totalsumtruckinLineMonth4= {this.state.totalsumtruckinLineMonth4} 
                  totalsumtruckinLineMonth5= {this.state.totalsumtruckinLineMonth5} 
                  totalsumtruckinLineMonth6= {this.state.totalsumtruckinLineMonth6} 
                  totalsumtruckinLineMonth7= {this.state.totalsumtruckinLineMonth7} 
                  totalsumtruckinLineMonth8= {this.state.totalsumtruckinLineMonth8} 
                  totalsumtruckinLineMonth9= {this.state.totalsumtruckinLineMonth9} 
                  totalsumtruckinLineMonth10= {this.state.totalsumtruckinLineMonth10} 
                  totalsumtruckinLineMonth11= {this.state.totalsumtruckinLineMonth11} 
                  totalsumtruckinLineMonth12= {this.state.totalsumtruckinLineMonth12} 
                  totalsumtruckinLineMonth13= {this.state.totalsumtruckinLineMonth13} 
                  totalsumtruckinLineMonth14= {this.state.totalsumtruckinLineMonth14} 
                  totalsumtruckinLineMonth15= {this.state.totalsumtruckinLineMonth15} 
                  totalsumtruckinLineMonth16= {this.state.totalsumtruckinLineMonth16} 
                  totalsumtruckinLineMonth17= {this.state.totalsumtruckinLineMonth17} 
                  totalsumtruckinLineMonth18= {this.state.totalsumtruckinLineMonth18} 
                  totalsumtruckinLineMonth19= {this.state.totalsumtruckinLineMonth19} 
                  totalsumtruckinLineMonth20= {this.state.totalsumtruckinLineMonth20} 
                  totalsumtruckinLineMonth21= {this.state.totalsumtruckinLineMonth21} 
                  totalsumtruckinLineMonth22= {this.state.totalsumtruckinLineMonth22} 
                  totalsumtruckinLineMonth23= {this.state.totalsumtruckinLineMonth23} 
                  totalsumtruckinLineMonth24= {this.state.totalsumtruckinLineMonth24} 
                  totalsumtruckinLineMonth25= {this.state.totalsumtruckinLineMonth25} 
                  totalsumtruckinLineMonth26= {this.state.totalsumtruckinLineMonth26} 
                  totalsumtruckinLineMonth27= {this.state.totalsumtruckinLineMonth27} 
                  totalsumtruckinLineMonth28= {this.state.totalsumtruckinLineMonth28} 
                  totalsumtruckinLineMonth29= {this.state.totalsumtruckinLineMonth29} 
                  totalsumtruckinLineMonth30= {this.state.totalsumtruckinLineMonth30} 
                  totalsumtruckinLineMonth31= {this.state.totalsumtruckinLineMonth31} 
                  totalsumtruckoutLineMonth1= {this.state.totalsumtruckoutLineMonth1} 
                  totalsumtruckoutLineMonth2= {this.state.totalsumtruckoutLineMonth2} 
                  totalsumtruckoutLineMonth3 ={this.state.totalsumtruckoutLineMonth3} 
                  totalsumtruckoutLineMonth4= {this.state.totalsumtruckoutLineMonth4} 
                  totalsumtruckoutLineMonth5= {this.state.totalsumtruckoutLineMonth5} 
                  totalsumtruckoutLineMonth6= {this.state.totalsumtruckoutLineMonth6} 
                  totalsumtruckoutLineMonth7= {this.state.totalsumtruckoutLineMonth7} 
                  totalsumtruckoutLineMonth8= {this.state.totalsumtruckoutLineMonth8} 
                  totalsumtruckoutLineMonth9= {this.state.totalsumtruckoutLineMonth9} 
                  totalsumtruckoutLineMonth10= {this.state.totalsumtruckoutLineMonth10} 
                  totalsumtruckoutLineMonth11= {this.state.totalsumtruckoutLineMonth11} 
                  totalsumtruckoutLineMonth12= {this.state.totalsumtruckoutLineMonth12} 
                  totalsumtruckoutLineMonth13= {this.state.totalsumtruckoutLineMonth13} 
                  totalsumtruckoutLineMonth14= {this.state.totalsumtruckoutLineMonth14} 
                  totalsumtruckoutLineMonth15= {this.state.totalsumtruckoutLineMonth15} 
                  totalsumtruckoutLineMonth16= {this.state.totalsumtruckoutLineMonth16} 
                  totalsumtruckoutLineMonth17= {this.state.totalsumtruckoutLineMonth17} 
                  totalsumtruckoutLineMonth18= {this.state.totalsumtruckoutLineMonth18} 
                  totalsumtruckoutLineMonth19= {this.state.totalsumtruckoutLineMonth19} 
                  totalsumtruckoutLineMonth20= {this.state.totalsumtruckoutLineMonth20} 
                  totalsumtruckoutLineMonth21= {this.state.totalsumtruckoutLineMonth21} 
                  totalsumtruckoutLineMonth22= {this.state.totalsumtruckoutLineMonth22} 
                  totalsumtruckoutLineMonth23= {this.state.totalsumtruckoutLineMonth23} 
                  totalsumtruckoutLineMonth24= {this.state.totalsumtruckoutLineMonth24} 
                  totalsumtruckoutLineMonth25= {this.state.totalsumtruckoutLineMonth25} 
                  totalsumtruckoutLineMonth26= {this.state.totalsumtruckoutLineMonth26} 
                  totalsumtruckoutLineMonth27= {this.state.totalsumtruckoutLineMonth27} 
                  totalsumtruckoutLineMonth28= {this.state.totalsumtruckoutLineMonth28} 
                  totalsumtruckoutLineMonth29= {this.state.totalsumtruckoutLineMonth29} 
                  totalsumtruckoutLineMonth30= {this.state.totalsumtruckoutLineMonth30} 
                  totalsumtruckoutLineMonth31= {this.state.totalsumtruckoutLineMonth31} 
                  />}
                  </div>
                  )}
                   {selectedMonthago === null && selectedDay === null && selectedThisMonth === null && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <TruckInOut 
                    Totalsumstruckin={this.state.Totalsumstruckin} Totalsumstruckout={this.state.Totalsumstruckout} />}
                  </div>
                  )}
                  {selectedMonthago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <TruckInOut 
                    Totalsumstruckin={this.state.Totalsumstruckin} Totalsumstruckout={this.state.Totalsumstruckout} />}
                  </div>
                  )}
                  {selectedDay && selectedThisMonth && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <TruckInOut3 
                    TotalsumstruckInDay={this.state.TotalsumstruckInDay} TotalsumstruckOutDay={this.state.TotalsumstruckOutDay} />}
                  </div>
                  )}
                   {selectedDay1ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <TruckInOut1 
                    TotalsumstruckInWeek={this.state.TotalsumstruckInWeek} TotalsumstruckOutWeek={this.state.TotalsumstruckOutWeek} />}
                  </div>
                  )}
                  {selectedThisMonth && selectedDay2ago && (
                  <div style={{ width: '31vw', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
                    {(this.state.totalsum1 !== 0 || this.state.totalsum2 !== 0 || this.state.totalsum3 !== 0 || this.state.totalsum4 !== 0|| this.state.totalsum5 !== 0|| this.state.totalsum6 !== 0|| this.state.totalsum7 !== 0|| this.state.totalsum8 !== 0) && 
                    <TruckInOut2 TotalsumstruckInMonth={this.state.TotalsumstruckInMonth} TotalsumstruckOutMonth={this.state.TotalsumstruckOutMonth} />}
                  </div>
                  )}
                
            </div>
          </div>
        </div>
      </Container>
    );
    
  }
}

export default App;