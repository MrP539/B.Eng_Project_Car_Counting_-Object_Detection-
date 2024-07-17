import React, { useState, useEffect, useContext } from 'react';
import { Modal, Image, Table,Button } from 'semantic-ui-react';
import ModalDetect from '../ModalDetect/ModalDetect';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper 
} from '@mui/material';
import { BsFillCarFrontFill, BsFillTruckFrontFill, BsFillCollectionFill } from 'react-icons/bs';
import { FaMotorcycle,FaVideo } from 'react-icons/fa'; // นำเข้าไอคอนจาก Font Awesome
import { StateContext } from '../ToolbarDetect/StateContext.js';
import axios from 'axios';

const DataList = ({ data, onSave, summary,ondelete,fileName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [open, setOpen] = useState(false);
  const {count,setCount}= useContext(StateContext);

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setModalOpen(true);
  };

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
    };
    dateTime.setHours(dateTime.getHours() - 7);
    let formattedDateTime = new Intl.DateTimeFormat('th-TH', options).format(dateTime);
    return formattedDateTime;
  };

  const handleDelete = async (vihecle_number) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/delete/some_data/${vihecle_number}`);
      setCount(prevCount => prevCount + 1); // อัปเดตค่า count
      // const updatedData = data.filter(item => item.vihecle_number !== vihecle_number);
      // setData(updatedData);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
    setOpen(false); // ปิด modal หลังจากลบข้อมูลเสร็จสิ้น
  };

  const openDeleteModal = (vihecle_number) => {
    setSelectedVehicle(vihecle_number);
    setOpen(true);
  };

  return (
    <div>
         <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>

    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#f0f4c3', // สีพื้นหลังสำหรับรถยนต์
              color: '#1a237e' // สีตัวอักษรสำหรับรถยนต์
            }}
          >
            <BsFillCarFrontFill size={24} style={{ marginRight: '10px' }} />
            <div>
              <Typography variant="h6">จำนวนของรถยนต์</Typography>
              <Typography variant="h4">{summary.sumcar}</Typography>
            </div>   
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#ffccbc', // สีพื้นหลังสำหรับรถบรรทุก
              color: '#bf360c' // สีตัวอักษรสำหรับรถบรรทุก
            }}
          >
            <BsFillTruckFrontFill size={24} style={{ marginRight: '10px' }} />
            <div>
              <Typography variant="h6">จำนวนของรถบรรทุก</Typography>
              <Typography variant="h4">{summary.sumtruck}</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#e1bee7', // สีพื้นหลังสำหรับรถจักรยานยนต์
              color: '#4a148c' // สีตัวอักษรสำหรับรถจักรยานยนต์
            }}
          >
            <FaMotorcycle size={24} style={{ marginRight: '10px' }} />
            <div>
              <Typography variant="h6">จำนวนของรถจักรยานยนต์</Typography>
              <Typography variant="h4">{summary.summotorbike}</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#bbdefb', // สีพื้นหลังสำหรับจำนวนรถทั้งหมด
              color: '#0d47a1' // สีตัวอักษรสำหรับจำนวนรถทั้งหมด
            }}
          >
            <BsFillCollectionFill size={24} style={{ marginRight: '10px' }} />
            <div>
              <Typography variant="h6">จำนวนของรถทั้งหมด</Typography>
              <Typography variant="h4">{summary.sum}</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#66bb6a', // สีเขียวที่เข้มขึ้นแต่ไม่เข้มมาก
        color: '#ffffff', // สีตัวอักษรสีขาวเพื่อให้ตัดกับพื้นหลัง
        borderRadius: '5px', 
        display: 'flex', 
        alignItems: 'center', 
        width: '100%', // กำหนดความกว้างเท่ากับช่องด้านบน
        marginLeft: 0 // เลื่อน Box ไปให้อยู่ริมซ้ายสุด
      }}>
        <FaVideo size={24} style={{ marginRight: '10px' }} />
        <Typography variant="h6" sx={{ marginRight: '10px' }}>ไฟล์ที่เลือก</Typography>
        <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>{fileName}</Typography>
      </Box>
      
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        ตารางแสดงผลการวิเคราะห์
      </Typography>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>รถลำดับที่</Table.HeaderCell>
            <Table.HeaderCell>ประเภทรถ</Table.HeaderCell>
            <Table.HeaderCell>เลขทะเบียน</Table.HeaderCell>
            <Table.HeaderCell>ประตูเข้า</Table.HeaderCell>
            <Table.HeaderCell>ประตูออก</Table.HeaderCell>
            <Table.HeaderCell>เวลาเข้า</Table.HeaderCell>
            <Table.HeaderCell>เวลาออก</Table.HeaderCell>
            <Table.HeaderCell>รูปภาพ</Table.HeaderCell>
            <Table.HeaderCell>แก้ไข/ลบข้อมูล</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(item => (
            <Table.Row key={item.vihecle_number}>
              <Table.Cell>{item.vihecle_number}</Table.Cell>
              <Table.Cell>{item.cartype}</Table.Cell>
              <Table.Cell>{item.licenseplatenumber}</Table.Cell>
              <Table.Cell>{item.gatein}</Table.Cell>
              <Table.Cell>{item.gateout}</Table.Cell>
              <Table.Cell>{formatDateTime(item.timein)}</Table.Cell>
              <Table.Cell>{formatDateTime(item.timeout)}</Table.Cell>
              <Table.Cell>
                <img 
                  src={item.base64} 
                  onClick={() => handleImageClick(item.base64)} 
                  style={{ cursor: 'pointer', width: '100px', height: '100px' }} 
                  alt="vehicle"
                />
              </Table.Cell>
              <Table.Cell>
        <ModalDetect
          headerTitle='Edit Data'
          buttonTriggerTitle='Edit Data'
          buttonSubmitTitle='Save'
          buttonColor='green'
          onSave={onSave}
          buttonStyle={{ fontSize: '1.2vw' }}
          carID={item.vihecle_number}
          modalStyle={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
          }}
        />
         <Button 
          color='red' 
          onClick={() => openDeleteModal(item.vihecle_number)} 
          style={{ marginLeft: '10px', fontSize: '1vw', padding: '10.5px 20px' }}
        >
          Delete
        </Button>
      </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size='small'
      >
        <Modal.Header>ยืนยันการลบข้อมูล</Modal.Header>
        <Modal.Content>
          <p>คุณต้องการลบข้อมูลรถคันที่ {selectedVehicle} ใช่หรือไม่ ?</p>
        </Modal.Content>
        <Modal.Actions>
        <Button positive onClick={() => handleDelete(selectedVehicle)}>Yes</Button>
        <Button negative onClick={() => setOpen(false)}>No</Button>
        </Modal.Actions>
      </Modal>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size='medium'
        dimmer='inverted'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        closeIcon='close'
      >
        <Modal.Content image>
          <Image
            src={modalImage}
            size='large'
            style={{ display: 'flex', justifyContent: 'center', width: '300px', height: '300px' }}
            wrapped
          />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default DataList;
