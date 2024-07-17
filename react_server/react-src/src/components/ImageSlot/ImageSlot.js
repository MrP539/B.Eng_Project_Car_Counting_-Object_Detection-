import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Door1 from '../image/door1.png';
import Door2 from '../image/door2.jpg';
import Door3 from '../image/door3.png';
import Door4 from '../image/door4.png';

const ImageSlot = ({ menubarSize }) => {
  const { _id } = useParams();
  const [gates, setGates] = useState(null); // State for gates data

  async function fetchGates() {
    try {
      const response = await axios.get(`http://localhost:3000/api/gates/${_id}`);
      setGates(response.data); // Set gates data from response
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  let k = '', z = ''; // Initialize k with empty string

  if (gates) { // Check if gates data is available
    k = gates.name; // Assign gates.name to k if available
    z = gates.description;
  }
  
  useEffect(() => {
    fetchGates();
  }, [_id]); // Call fetchGates() when _id changes
  
  let imagePath;
  if (z === '1') {
    imagePath = Door1;
  } else if (z === '2') {
    imagePath = Door2;
  } else if (z === '3') {
    imagePath = Door3;
  } else {
    // Default image if z is not 1, 2, or 3
    imagePath = Door4;
  }

  return (
    <div style={{ width: `calc(100% - ${menubarSize}px)`,position: 'relative' }}>
      {/* ใช้ชื่อไฟล์รูปภาพเป็น src */}
      <img src={imagePath} alt="Image" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default ImageSlot;

