import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dropdown, Button,Modal } from 'semantic-ui-react'; // เพิ่ม Button จาก semantic-ui-react
import { StateContext } from './StateContext';
import { format } from 'date-fns-tz';
import th from 'date-fns/locale/th'; // Import locale for Thai
import { FaCalendarAlt } from 'react-icons/fa';

const DateSelect = () => {
  const { selectedDate, setSelectedDate, setStartTime, setEndTime, setSelectedTime, selectedTime } = useContext(StateContext);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [confirmed, setConfirmed] = useState(false); // เพิ่มตัวแปรสถานะเพื่อตรวจสอบการยืนยัน
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleTimeSelect = (event, data) => {
    setSelectedTime(data.value);
  };

  const handleConfirm = () => {
    setStartTime(selectedStartDate);
    setEndTime(selectedEndDate);
    setSelectedTime(selectedTime);
    setConfirmed(true); // ตั้งค่าการยืนยันเป็น true เมื่อกดยืนยัน
    setModalOpen(false); // ปิด Modal หลังจากยืนยัน
  };
  
  const handleClear = () => {
    setSelectedTime(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setModalOpen(false); // ปิด Modal หลังจากยืนยัน
  };

  const timeOptions = [
    { key: 'all', text: 'ทั้งหมด', value: null },
    { key: 'in', text: 'เวลาขาเข้า', value: 'timein' },
    { key: 'out', text: 'เวลาขาออก', value: 'timeout' }
  ];
  
  const formatDateThai = (date) => {
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
      'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
      'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const day = format(date, 'dd');
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    const time = format(date, 'HH.mm');
    return `${day} ${month} ${year} เวลา ${time} น.`;
  };

  
  return  (
    <div>
     <Button style={{ width: '25vw', height: '5vh' }} color='red' onClick={() => setModalOpen(true)}>
        <FaCalendarAlt /> {'ค้นหาเป็นช่วงเวลา'}
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
      >
        <Modal.Header>เลือกเวลาและวันที่</Modal.Header>
        <Modal.Content>
          <Dropdown
            placeholder='เลือกเวลา'
            fluid
            selection
            options={timeOptions}
            onChange={handleTimeSelect}
            value={selectedTime}
            style={{ width: '20vw', height: '5vh', marginRight: '0px' }}
          />
          {selectedTime && (
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
              <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                placeholderText="เลือกเวลาเริ่มต้น"
                isClearable
                showTimeSelect
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="Pp"
                locale={th}
                className="form-control"
                style={{ width: '3vw', margin: 'auto' }}
              />
              <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                placeholderText="เลือกเวลาสิ้นสุด"
                isClearable
                showTimeSelect
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="Pp"
                locale={th}
                className="form-control"
                style={{ width: '3vw', margin: 'auto' }}
              />
            </div>
          )}
          {selectedStartDate && selectedEndDate && selectedTime && (
             <>
             <Button color = 'green' onClick={handleConfirm} style={{ marginTop: '10px', marginRight: '5px' }}>ยืนยัน</Button>
             <Button color = 'red' onClick={handleClear} style={{ marginTop: '10px' }}>ยกเลิก </Button>
           </>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default DateSelect;