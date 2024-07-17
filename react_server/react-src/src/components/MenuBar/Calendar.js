import React, { useState, useEffect,useContext } from 'react';
import { Button, Grid, Modal, Header, Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { StateContext } from '../ToolbarDetect/StateContext';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner'
import { Backdrop } from '@mui/material'; // Import Material-UI Components
import GateSelectForMenu from './GateSelectForMenu';
import { Box,Typography } from '@mui/material';

const Calendar = ({ openModal,onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const {setClose,selectedTime,selectedGate,selectedDirection} = useContext(StateContext);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(false); // เพิ่ม state เพื่อติดตามสถานะการโหลด
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [timeSlots, setTimeSlots] = useState(Array(24 * 4).fill('blue'));

  useEffect(() => {
    const calculateDaysInMonth = () => {
      setTimeSlots(Array(24 * 4).fill('blue'));
      const year = new Date().getFullYear();
      const days = new Date(year, selectedMonth, 0).getDate();
      setDaysInMonth(days);
    };
    calculateDaysInMonth();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setTimeSlots(Array(24 * 4).fill('blue'));
    if (selectedDate !== null && selectedMonth) {
      setLoadingProgress(true);
      checkAvailability();
      setLoadingProgress(false);
    }
  }, [selectedDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
    setClose(false);
  };

  const handleUndo = () => {
    setOpen(false);
    setSelectedDate(null);
    // setClose(false);
  };

  const handleMonthChange = (e, { value }) => {
    setSelectedMonth(value);
  };
  
  const handleYearChange = (e, { value }) => {
    setSelectedYear(value);
  };

  const checkAvailability = async () => {
    setLoadingProgress(true);
    const newTimeSlots = [...timeSlots];
    for (let i = 0; i < 24 * 4; i++) {
      const hours = String(Math.floor(i / 4)).padStart(2, '0');
      const minutes = String((i % 4) * 15).padStart(2, '0');
      const nextMinutes = (i % 4 + 1) * 15;
      const nextHours = Math.floor(nextMinutes / 60);
      const formattedMinutes = String(nextMinutes % 60).padStart(2, '0');
      const day = String(selectedDate).padStart(2, '0');
      const startTime = `${selectedYear}-${selectedMonth}-${day}T${hours}:${minutes}:00`;
      const endTime = `${selectedYear}-${selectedMonth}-${day}T${String((parseInt(hours) + nextHours) % 24).padStart(2, '0')}:${formattedMinutes}:00`;
      
      try {
        setLoadingProgress(true);
        const response = await axios.get(
          `http://localhost:3000/api/cars/?${selectedGate}=${selectedDirection}&${selectedTime}={}&startTime=${startTime}&endTime=${endTime}&`
        );
        console.log(response);
        if (response.data.length > 0) {
          newTimeSlots[i] = 'red';
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    }
    setTimeSlots(newTimeSlots);
    setLoadingProgress(false);
  };

  const renderTimeSlots = () => {
    return timeSlots.map((color, i) => {
      const hours = String(Math.floor(i / 4)).padStart(2, '0');
      const minutes = String((i % 4) * 15).padStart(2, '0');
      const time = `${hours}:${minutes}`;
  
      return (
        <Button key={i} style={{ backgroundColor: color, margin: '2px' ,color: 'white' }}>
          {time}
        </Button>
      );
    });
  };
  

  const monthOptions = [
    { key: 1, text: 'มกราคม', value: '01' },
    { key: 2, text: 'กุมภาพันธ์', value: '02' },
    { key: 3, text: 'มีนาคม', value: '03' },
    { key: 4, text: 'เมษายน', value: '04' },
    { key: 5, text: 'พฤษภาคม', value: '05' },
    { key: 6, text: 'มิถุนายน', value: '06' },
    { key: 7, text: 'กรกฎาคม', value: '07' },
    { key: 8, text: 'สิงหาคม', value: '08' },
    { key: 9, text: 'กันยายน', value: '09' },
    { key: 10, text: 'ตุลาคม', value: '10' },
    { key: 11, text: 'พฤศจิกายน', value: '11' },
    { key: 12, text: 'ธันวาคม', value: '12' },
  ];

  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  ).map((year) => ({
    key: year,
    text: year,
    value: year,
  }));


  const formatDate = (date, month, year) => {
    if (date === null) return '';
    const day = String(date).padStart(2, '0');
    const monthName = monthOptions.find((m) => m.value === month).text;
    return `${day} ${monthName} ${year}`;
  };

  return (
    <div>
    <Modal open={openModal} onClose={onClose}>
      <Modal.Header>เลือกวันที่</Modal.Header>
      <GateSelectForMenu />
      <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '10px' }}>
        <Dropdown
          placeholder="Select Year"
          fluid
          selection
          options={yearOptions}
          onChange={handleYearChange}
          value={selectedYear}
          style={{ flex: 1 }}
        />
        <Dropdown
          placeholder="Select Month"
          fluid
          selection
          options={monthOptions}
          onChange={handleMonthChange}
          value={selectedMonth}
          style={{ flex: 1 }}
        />
      </div>
      <Modal.Content>
        {selectedMonth && (
          <Grid columns={10} divided style={{ marginTop: '10px' }}>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <Grid.Column key={i} style={{ padding: '5px' }}>
                <Button fluid color="blue" onClick={() => handleDateClick(i + 1)}>
                  {i + 1}
                </Button>
              </Grid.Column>
            ))}
          </Grid>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClose}>ปิด</Button>
      </Modal.Actions>
    </Modal>

    <Modal open={open} onClose={handleClose}>
      <Header>ประตู {selectedDirection} </Header>
      <Header>{formatDate(selectedDate, selectedMonth, selectedYear)}</Header>
      <Typography variant="h6" style={{ marginTop: '0px' }}>
        <Box color="red" display="inline" fontSize="1.2em" style={{ marginLeft: '10px' }} >●</Box> มีการอัปโหลดข้อมูล 
        <Box color="blue" display="inline" fontSize="1.2em" style={{ marginLeft: '10px' }}>●</Box> ยังไม่มีการอัปโหลดข้อมูล
      </Typography>
      <Grid columns={8} divided style={{ marginLeft: '10px',marginTop: '3px' }}>
          {renderTimeSlots().map((timeSlot, i) => (
            <Grid.Column key={i} style={{ padding: '2px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', color: 'white' }}>
                {timeSlot}
              </div>
            </Grid.Column>
          ))}
        </Grid>
      <Modal.Content />

      <Modal.Actions>
        <Button color="blue" onClick={handleUndo}>ย้อนกลับ</Button>
      </Modal.Actions>
      {loadingProgress && (
        <Backdrop open={loadingProgress} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="loadingProgress-screen" style={{ color: 'white', fontSize: '24px' }}>
            <Hourglass color="#4fa94d" width="150" visible={true} ariaLabel="falling-circles-loadingProgress" />
            LoadingProgress.....
          </div>
        </Backdrop>
      )}
    </Modal>
  </div>
);
};

export default Calendar;
