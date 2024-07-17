import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Menu, Pagination,Button } from 'semantic-ui-react';
import axios from 'axios';
import { StateContext } from '../ToolbarDetect/StateContext.js';
import CartypeSelect from '../ToolbarDetect/CartypeSelect.js';
import Gateselect from '../ToolbarDetect/Gateselect.js';
import DateSelect from '../ToolbarDetect/DateSelect.js';
import SearchBar from '../ToolbarDetect/SearchBar.js';
import Menubar from '../MenuBar/Menubar.js';
import DETECT from '../App/detect.png';
import { Hourglass } from 'react-loader-spinner';
import { Backdrop } from '@mui/material';
import { subHours } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF and the autotable plugin
import thSarabunBase64 from './THSarabunNew-normal.js'; // ไฟล์ base64 ของฟอนต์
import * as XLSX from 'xlsx';
import { AiFillFileExcel } from 'react-icons/ai';
import { FaFileExcel } from 'react-icons/fa';


const Detect = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    selectedGate, selectedDirection,
    selectedType, selectedDate,
    selectedTime, searchTerm,
    startTime, setStartTime,
    endTime, setEndTime,setSelectedGate,
    setSelectedDirection,setSelectedType,
    setSelectedTime
  } = useContext(StateContext);
  const itemsPerPage = 50;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedGate, selectedDirection, selectedType,
      selectedDate, selectedTime, searchTerm,
      activePage, totalPages, startTime, endTime]);

      useEffect(() => {
        setStartTime(null);
        setEndTime(null);
        setSelectedGate(null);
        setSelectedDirection(null);
        setSelectedTime(null);
        setSelectedType(null);
      }, []);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) {
      return '-';
    }

    const dateTime = new Date(dateTimeString);

    if (isNaN(dateTime.getTime())) {
      return '-';
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      locale: 'th-TH'
    };

    let formattedDateTime = new Intl.DateTimeFormat('th-TH', options).format(dateTime);
    if (dateTime.getHours() >= 13) {
      formattedDateTime += ' น.';
    }

    return formattedDateTime;
  };

  const nextDay = new Date(selectedDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const formattedDate = nextDay.toISOString().slice(0, 10) + 'T';
  const newStartTime = subHours(startTime, 7);
  const newEndTime = subHours(endTime, 7);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response, response1;

      let apiUrl = 'http://localhost:3000/api/cars/?';
      if (selectedGate) {
        apiUrl += `${selectedGate}=${selectedDirection}&`;
      }
      if (selectedDate) {
        apiUrl += `${selectedTime}=${formattedDate}&`;
      }
      if (startTime && endTime) {
        apiUrl += `${selectedTime}={}&startTime=${newStartTime}&endTime=${newEndTime}&`;
      }
      if (selectedType) {
        apiUrl += `cartype=${selectedType}&`;
      }
      if (searchTerm) {
        apiUrl += `licenseplatenumber=${searchTerm}&`;
      }

      let apiUrl1 = 'http://localhost:3000/api/cars/?';
      if (selectedGate) {
        apiUrl1 += `${selectedGate}=${selectedDirection}&`;
      }
      if (selectedDate) {
        apiUrl1 += `${selectedTime}=${formattedDate}&`;
      }
      if (selectedType) {
        apiUrl1 += `cartype=${selectedType}&`;
      }
      if (searchTerm) {
        apiUrl1 += `licenseplatenumber=${searchTerm}&`;
      }
      if (startTime && endTime) {
        apiUrl1 += `${selectedTime}={}&startTime=${startTime}&endTime=${endTime}&`;
      }

      apiUrl += `page=${activePage}&pageSize=${itemsPerPage}`;
      response = await axios.get(apiUrl);
      response1 = await axios.get(apiUrl1);

      const count = response1.data.length;
      const pageCount = Math.ceil(count / itemsPerPage);
      setTotalPages(pageCount);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const startIndex = (activePage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, data.length);

  let cars = data;

  cars.sort((a, b) => {
    const timeoutA = a.timeout;
    const timeoutB = b.timeout;

    if (timeoutA > timeoutB) {
      return -1;
    }
    if (timeoutA < timeoutB) {
      return 1;
    }

    const timeinA = a.timein;
    const timeinB = b.timein;

    if (timeinA < timeinB) {
      return -1;
    }
    if (timeinA > timeinB) {
      return 1;
    }

    return 0;
  });

  cars = cars.map((car, index) =>
    <Table.Row key={car._id}>
      <Table.Cell>{startIndex + index}</Table.Cell>
      <Table.Cell>{car.cartype || '-'}</Table.Cell>
      <Table.Cell>{car.licenseplatenumber || '-'}</Table.Cell>
      <Table.Cell>{formatDateTime(car.timein)}</Table.Cell>
      <Table.Cell>{car.gatein || '-'}</Table.Cell>
      <Table.Cell>{formatDateTime(car.timeout) || '-'}</Table.Cell>
      <Table.Cell>{car.gateout || '-'}</Table.Cell>
    </Table.Row>
  );

  const downloadExcel = () => {
    // สร้าง workbook
    const wb = XLSX.utils.book_new();
    
    // เตรียมข้อมูลสำหรับ sheet
    const wsData = [
      ['NO.', 'Type', 'Licenceplate', 'Time in', 'Gate in', 'Time out', 'Gate out'],
      ...data.map((car, index) => [
        startIndex + index,
        car.cartype || '-',
        car.licenseplatenumber || '-',
        formatDateTime(car.timein),
        car.gatein || '-',
        formatDateTime(car.timeout) || '-',
        car.gateout || '-'
      ])
    ];
    
    // สร้าง worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // เพิ่ม worksheet ลงใน workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Car In Out Report');
    
    // ส่งออกเป็นไฟล์ Excel
    XLSX.writeFile(wb, 'car_in_out_report.xlsx');
  };

  return (
    <Container style={{ backgroundColor: '#f2f0f0', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className='App' style={{ backgroundColor: '#f2f0f0', width: '100vw', maxWidth: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Menubar />
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0' }}>
          <img src={DETECT} style={{ maxWidth: '100vw' }} />
        </div>
        <div>
        <Menu.Menu position="right" style={{ display: 'flex', alignItems: 'center', width: '100vw', justifyContent: 'space-between' }}>
        <Menu.Item style={{ display: 'flex', alignItems: 'center', width: '100vw', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '99%' }}>
            <SearchBar />
            <Gateselect />
            <CartypeSelect />
            <DateSelect />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            <Button 
              color='green' 
              onClick={downloadExcel} 
              style={{ alignItems: 'center', width: '20.5vw', height: '5vh'}}
            >
              <FaFileExcel style={{ marginRight: '8px' }} />
              Download Excel
            </Button>
          </div>
        </Menu.Item>
        </Menu.Menu>
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
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100vw', maxWidth: '98vw' }}>
                </div>
              </div>
            </div>
            {cars && (
              <div>
                <div style={{ textAlign: 'center', marginTop: '0px' }}>
                  <Pagination
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={totalPages}
                  />
                </div>
                <div style={{ width: '100vw', maxWidth: '100vw', textAlign: 'center', marginTop: '0px' }}>
                  <Table singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell className="table-header">ลำดับที่</Table.HeaderCell>
                        <Table.HeaderCell className="table-header">ประเภทรถ</Table.HeaderCell>
                        <Table.HeaderCell className="table-header">ป้ายทะเบียน</Table.HeaderCell>
                        <Table.HeaderCell className="table-header">เวลารถเข้า</Table.HeaderCell>
                        <Table.HeaderCell className="table-header">ประตูรถเข้า</Table.HeaderCell>
                        <Table.HeaderCell className="table-header">เวลารถออก</Table.HeaderCell>
                        <Table.HeaderCell className="table-header">ประตูรถออก</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {cars}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              activePage={activePage}
              onPageChange={handlePaginationChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Detect;
