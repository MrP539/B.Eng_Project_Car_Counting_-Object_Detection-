import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Toolbar = () => {
  const { door } = useParams();
  const navigate = useNavigate();

  const [selectedDoor, setSelectedDoor] = useState('');
  const doors = [`${door} ขาเข้า`, `${door} ขาออก`];


  return (
    <Dropdown
      placeholder="Select Door"
      fluid
      selection
      options={doors.map((door, index) => ({
        key: index,
        text: door,
        value: door,
        onClick: () => {
          if (door === 'Wilaisila ขาเข้า') {
            console.log('Selected door:', door);
            console.log('Sending to ingate:', 3);
            
            navigate(`/upload/Wilaisila`);
          } else if (door === 'Wilaisila ขาออก') {
            console.log('Selected door:', door);
            console.log('Sending to outgate:', 3);
            
            navigate(`/upload/Wilaisila`);
          } else {
             // ส่งประตูที่เลือกไปยัง MongoDB
            
          }
        },
      }))}
    />
  );
};

export default Toolbar;
