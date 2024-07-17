import React, { useState, useEffect } from 'react';
import './Clock.css'

const Clock = () => {
  // สร้าง state เพื่อเก็บเวลาปัจจุบัน
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // สร้าง interval เพื่ออัปเดตเวลาทุกๆ 1 วินาที
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // คืนฟังก์ชัน cleanup ที่ใช้เพื่อลบ interval เมื่อ component ถูก unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // เพียงแค่ component ถูก mount ครั้งแรกเท่านั้นที่ต้องใช้ useEffect ดังนั้นเราจึงใส่ [] ที่เป็น dependency array เพื่อให้ useEffect ทำงานครั้งเดียวเมื่อ component ถูก mount

  // สร้างฟังก์ชันเพื่อแปลงเวลาให้อยู่ในรูปแบบที่ต้องการ
  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  return (
    <div>
       <div className="container"></div>
      <h1>เวลาปัจจุบัน</h1>
      <p>{formatTime(currentTime)}</p>
    </div>
  );
};

export default Clock;
