import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataList from '../Evaluate/DataList';
import { useNavigate,useLocation  } from 'react-router-dom';
import { Container, Table, Menu, Header, Pagination,Button,Modal  } from 'semantic-ui-react';
import Menubar from '../MenuBar/Menubar'
import { useParams } from 'react-router-dom';

const Test = () => {
    // const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const [count,setCount] = useState(0);
    const { UserId } = useParams();
    // const [summary, setSummary] = useState([]);
    // const [dataList, setDataList] = useState([]);
    // const [result,setResult] =  useState({});
    
  
  
    const handleDataUpdated = (data) => {
    //   setData(prevData => {
    //   // //   const newData = [...prevData];
    //   // //   // const index = newData.findIndex(item => item.vihecle_number === data.vihecle_number);
    //   // //   // if (index !== -1) {
    //   // //   //   newData[index] = data;
    //   // // //   // }
    //   // //   return newData;
    //   });
    //   setCount(prevCount => prevCount + 1); // อัปเดตค่า count
    };
  
    //   // Cleanup the listener on component unmount
    
      // useEffect(() => {
    //     fetchData();
    //   }, [count]);
    
    const data = [
        {
            "__v": "-",
            "cartype": "car",
            "gatein": "4",
            "gateout": "-",
            "licenseplatenumber": "None",
            "timein": "2024-12-31T23:59:55Z",
            "timeout": "-",
            "vihecle_number": 1,
        },
        {
            "__v": "-",
            "gatein": "4",
            "gateout": "-",
            "licenseplatenumber": "None",
            "timein": "2024-12-31T23:59:55Z",
            "timeout": "-",
            "vihecle_number": 1,
        },
        [
            {
                "sum": 14,
                "sumcar": 7,
                "summotorbike": 7,
                "sumtruck": 0,
                "timeout": "2024-05-25T23:00:00Z"
            }, 
            {
                "sum": 14,
                "sumcar": 7,
                "summotorbike": 7,
                "sumtruck": 0,
                "timeout": "2024-05-25T23:00:00Z"
            }
        ]
    ];
    
    const dataList = data.filter(item => !Array.isArray(item));
    const summary = data.filter(item => Array.isArray(item)).flat();
    const totalSum = summary.reduce((acc, item) => acc + item.sum, 0);
    const totalSumcar = summary.reduce((acc, item) => acc + item.sumcar, 0);
    const totalSumtruck = summary.reduce((acc, item) => acc + item.sumtruck, 0);
    const totalSummotorbike = summary.reduce((acc, item) => acc + item.summotorbike, 0);
    const result = { sum: totalSum , sumcar: totalSumcar,
    summotorbike: totalSumtruck,
    sumtruck: totalSummotorbike,
  };
    
    console.log(dataList);
    console.log(result);
  
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:5000/api/dataA');
    //     setData(response.data);
    //     const listData = data.filter(item => !Array.isArray(item));
    //     const summaryData = data.filter(item => Array.isArray(item)).flat();
    //     const totalSum = summaryData.reduce((acc, item) => acc + item.sum, 0);
    //     const totalSumcar = summaryData.reduce((acc, item) => acc + item.sumcar, 0);
    //     const totalSumtruck = summaryData.reduce((acc, item) => acc + item.sumtruck, 0);
    //     const totalSummotorbike = summaryData.reduce((acc, item) => acc + item.summotorbike, 0);
    //     const total = { sum: totalSum , sumcar: totalSumcar, summotorbike: totalSumtruck, sumtruck: totalSummotorbike,};
    //     setDataList(listData);
    //     setSummary(summaryData);
    //     setResult(total);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  
    const sendDataToMongoDB = async () => {
      try {
        setConfirmModalOpen(true);
        setMessage('กำลังส่งข้อมูล...');
      
        // ส่งข้อมูล dataList
        for (const item of dataList) {
          const { cartype, gateout, licenseplatenumber, timeout, timein, vihecle_number, gatein } = item;
          
          // แปลง timeout และ timein เป็นวัตถุ Date ของ JavaScript
          const timeoutDate = new Date(timeout);
          const timeinDate = new Date(timein);
      
          const newData = { cartype, gatein, gateout, licenseplatenumber, timeout: timeoutDate, timein: timeinDate, vihecle_number };
      
          // ส่งข้อมูลไปยัง API
          await axios.post('http://localhost:3000/api/cars', newData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
        
        for (const item of summary) {
        // ส่งข้อมูล summary ไปยัง API
        await axios.post('http://localhost:3000/api/sums', item, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }
    
        console.log('ส่งข้อมูลทั้งหมดไปยัง MongoDB เรียบร้อยแล้ว');
    
        // ลบข้อมูลใน http://127.0.0.1:5000/api/dataA
        await axios.delete('http://127.0.0.1:5000/api/dataA');
        console.log('ลบข้อมูลใน http://127.0.0.1:5000/api/dataA เรียบร้อยแล้ว');
        
        // นำทางไปยังหน้า dashboard
        navigate(`/dashboard/${UserId}`);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง MongoDB:', error);
      }
    };
  
    const cancel = async () => {
      try {
        setConfirmModalOpen(true);
        setMessage('ยกเลิกการส้งข้อมูล');
        // if (confirmModalOpen === false) {
        await axios.delete('http://127.0.0.1:5000/api/dataA');
        console.log('All data sent to MongoDB successfully');
        navigate(`/dashboard/${UserId}`);
        // }
      } catch (error) {
        console.error('Error sending data to MongoDB:', error);
      }
    };
  
  
    return (
      <>
        <Container style={{ backgroundColor: '#f2f0f0', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className='App' style={{ backgroundColor: '#f2f0f0', width: '100vw', maxWidth: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>     
            <Menubar></Menubar>
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '0', backgroundImage: 'url("./App/detect.png")', backgroundSize: 'cover' }}>
              {/* รูปภาพเป็นพื้นหลัง */}
            </div>
            <Menu.Menu position="right">
              <Menu.Item style={{ width: '99vw', display: 'flex', alignItems: 'center' }}>
              </Menu.Item>
            </Menu.Menu>
          </div>
        </Container>
            {
                  <div>
            <DataList 
            data={dataList}    
            summary={result}     
              onSave={handleDataUpdated} 
                 />
                  </div>
                }
        <Button color='green' onClick={sendDataToMongoDB}>ยืนยันการส่งข้อมูล</Button>
        <Button color='red' onClick={cancel}>ยกเลิกการส่งข้อมูล</Button>
        </>
    );
  };
export default Test;
