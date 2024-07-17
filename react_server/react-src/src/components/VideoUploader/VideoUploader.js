// VideoUploader.js
import React, { useCallback, useState,useEffect ,useContext, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams, useNavigate} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './VideoUploader.module.css';
import Menubar from '../MenuBar/Menubar';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner'
import '../Loading/LoadingScreen.css';
import { Backdrop } from '@mui/material'; // Import Material-UI Components
import tree from '../App/tree.jpg';
import { format,addYears } from 'date-fns-tz';
import th from 'date-fns/locale/th'; // Import locale for Thai
import ReactPlayer from 'react-player'
import { StateContext } from '../ToolbarDetect/StateContext';
import { FaCalendarAlt } from 'react-icons/fa';
import { Button } from 'semantic-ui-react'; // เพิ่ม Button จาก semantic-ui-react


const VideoUploader = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [intime, setIntime] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { door,UserId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // เพิ่ม state เพื่อติดตามสถานะการโหลด
  const [number,setNumber] = useState(null);
  const [fileName, setFileName] = useState('');
  const { isLoading,setIsLoading } = useContext(StateContext);

  useEffect(() => {
    let k;
    setLoading(true); // เริ่มการโหลด
    if (door === 'Wilaisila-in' || door === 'Wilaisila-out') {
      k = 3;
    } else if (door === 'Suranaree-in' || door === 'Suranaree-out') {
      k = 1;
    } else if (door === 'Sithongchai-in' || door === 'Sithongchai-out') {
      k = 2;
    } else {
      k = 4;
    }
    setNumber(k);
    setLoading(false);
  }, [door]);

  useEffect(() => {
    let k;
    setLoading(true); // เริ่มการโหลด
    setIsLoading(true); // เริ่มการโหลด
    if (door === 'Wilaisila-in' || door === 'Wilaisila-out') {
      k = 3;
    } else if (door === 'Suranaree-in' || door === 'Suranaree-out') {
      k = 1;
    } else if (door === 'Sithongchai-in' || door === 'Sithongchai-out') {
      k = 2;
    } else {
      k = 4;
    }
    setNumber(k);
    setLoading(false);

  }, []);
  
  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setFileName(file.name); // เก็บชื่อไฟล์
    setLoading(false);
  }, []);

  const handleIntimeChange = (Date) => {
    setIntime(Date);
  };

  const handleDoorSelection = (event, data) => {
    setSelectedDoor(data.value);
  };

  const handleCancelUpload = () => {
    setVideoUrl(null); // ยกเลิกการเลือกไฟล์วิดีโอ
    setFileName(null);
  };

  const CustomInputButton = forwardRef(({ value, onClick, clear }, ref) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button className="btn btn-primary" onClick={onClick} ref={ref}>
        <FaCalendarAlt /> {value || 'เลือกเวลาและวันที่'}
      </button>
      {value && (
        <button className="btn btn-secondary ms-2" onClick={clear}>
          Clear
        </button>
      )}
    </div>
  ));

  const handleClear = () => {
    setIntime(null);
  };

  // ฟังก์ชันสำหรับการแปลงวันที่เป็นรูปแบบที่ต้องการ
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


  const handleUpload = async () => {
    let z, z1, k;
    try {
      
      if (door === 'Wilaisila-in' || door === 'Suranaree-in' || door === 'Sithongchai-in' || door === 'Kanlayanamit-in') {
        z = 'ingate'; // แก้ไขเครื่องหมายเท่ากับเป็น =
        z1 = 'in'; // แก้ไขเครื่องหมายเท่ากับเป็น =
      } else {
        z = 'outgate'; // แก้ไขเครื่องหมายเท่ากับเป็น =
        z1 = 'out'; // แก้ไขเครื่องหมายเท่ากับเป็น =
      }
  
      if (door === 'Wilaisila-in' || door === 'Wilaisila-out') {
        k = 3;
      } else if (door === 'Suranaree-in' || door === 'Suranaree-out') {
        k = 1;
      } else if (door === 'Sithongchai-in' || door === 'Sithongchai-out') {
        k = 2;
      } else {
        k = 4;
      }
  
      if (intime && selectedFile) {
        setLoading(true); // เริ่มการโหลด
        const formData = new FormData();
        const intimeAsDate = new Date(intime);
        const formattedIntime = format(intimeAsDate, 'yyyy-MM-dd\'T\'HH:mm:ssXXX', { timeZone: 'Asia/Bangkok' });
        formData.append('video', selectedFile);
        formData.append('intime', formattedIntime);
        console.log(formattedIntime)
        console.log(formattedIntime);
        await axios.post(`http://127.0.0.1:5000/cnn/api/analyze/${formattedIntime}/${z1}/${k}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setLoading(false); 
        navigate(`/evaluate/${UserId}/${fileName}`);
      } else {
        alert("กรุณาเลือกเวลาหรือเพิ่มวิดีโอ");
      }
    } catch (error) {
      setLoading(false); // สิ้นสุดการโหลด
      console.error('Error: ', error);       
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/mp4, video/avi',
    maxSize: 3000 * 1024 * 1024, // 3GB
    onDropRejected: (fileRejections) => {
        fileRejections.forEach((file) => {
          alert(`ไฟล์ขนาดเกินกำหนด: ${file.file.name}`);
        }
      );
    }
  });
    const dropzoneStyle = {
      border: '2px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: 'rgba(251, 252, 251, 1)',
    };
    
  return (
    <div style={{ backgroundImage: `url(${tree})`, 
                  backgroundSize: 'cover', 
                  width: '100vw', 
                  height: '100vh' }}>
      <Menubar />
      <div 
        className="container" 
        style={{ 
          width: '100vw', 
          margin: 'auto', 
          marginTop: '1.5vh' // Adjust this value to control the distance from the top
        }}
      >
        <h1 
          style={{ 
            width: '50vw', 
            margin: 'auto', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'white', 
            backgroundColor: 'black',
            fontWeight: 'bold',
            fontSize: '2.5vw',
            padding: '0.5vw' // Adding padding to make the h1 content more balanced
          }}
        >
          {`${door} Gate (Gate ${number})`}
        </h1>
        <div style={{width: '50vw', margin: 'auto', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
          {videoUrl === null && (
            <div {...getRootProps()} className={`border ${styles.background}`} style={dropzoneStyle}>
              <p className="mt-3">ลากและวางวิดีโอที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
            </div>
          )}
            </div>
            <input {...getInputProps()} />
            {videoUrl && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <video controls className="mt-3" src={videoUrl} style={{ width: '50vw', margin: 'auto', height: 'auto' }} />
              </div>
            )}
            {loading ? (
              <Backdrop open={loading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="loading-screen" style={{ color: 'white', fontSize: '24px' }}>
                  <Hourglass
                    color="#4fa94d"
                    width="150"
                    visible={true}
                    ariaLabel="falling-circles-loading"/>
                    Loading.....
                </div>
              </Backdrop> ) : null
            }  
              {isLoading ? (
              <Backdrop open={isLoading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
      </div>
          <div className="mt-4">
          <div className="mt-3">
          {videoUrl && (
            <label style={{ width:'50vw',
                            display: 'flex',
                            marginLeft:'25vw',
                            backgroundColor: 'white', 
                            color: 'black', 
                            padding: '5px', 
                            borderRadius: '5px' 
                          }}>ไฟล์ที่เลือก: {fileName}</label>)
          }
          <div style={{ display: 'flex', flexDirection: 'column'}}>
          {videoUrl && (
        <div className="mt-3" style={{ display: 'flex', marginLeft: '25vw', width: '50vw' }}>
          {/* <label
            className="me-2"
            style={{
              width: '9vw',
              display: 'flex',
              backgroundColor: 'white',
              color: 'black',
              padding: '5px',
              borderRadius: '5px',
              fontSize: '0.9vw'
            }}
          >
            เวลาขาเข้า/ขาออก :
          </label> */}
          <DatePicker
            selected={intime}
            onChange={handleIntimeChange}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="Pp"
            locale={th}
            customInput={<CustomInputButton value={intime ? formatDateThai(intime) : ''} clear={handleClear}/>}
          />``
        </div>
      )}
          {videoUrl && (
          <div className="mt-3"style={{ display: 'flex',marginLeft:'5vw',width:'25vw',marginTop:'0px'}}>
              <Button color='green' className="btn btn-primary" 
                style={{ display: 'flex',marginLeft:'20vw'}} 
                onClick={handleUpload}>Upload</Button>
              <Button className="btn btn-secondary ms-3" 
                style={{color:'white',backgroundColor:'red',border: 'red'}} 
                onClick={handleCancelUpload }>Cancel</Button>
            </div>
            )}
            {uploadMessage && <div className="mt-3">{uploadMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;