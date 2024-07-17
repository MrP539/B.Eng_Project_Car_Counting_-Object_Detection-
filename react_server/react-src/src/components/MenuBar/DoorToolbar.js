import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const DoorToolbar = () => {
  const { UserId } = useParams();
  const navigate = useNavigate();

  // ข้อมูลประตู
  const doors = [
    { key: 'none', text: 'Dashboard', value: null },
    { key: 'gate1in', text: 'ประตู 1 ขาเข้า', value: 'Suranaree-in' },
    { key: 'gate1out', text: 'ประตู 1 ขาออก', value: 'Suranaree-out' },
    { key: 'gate2in', text: 'ประตู 2 ขาเข้า', value: 'Sithongchai-in' },
    { key: 'gate2out', text: 'ประตู 2 ขาออก', value: 'Sithongchai-out' },
    { key: 'gate3in', text: 'ประตู 3 ขาเข้า', value: 'Wilaisila-in' },
    { key: 'gate3out', text: 'ประตู 3 ขาออก', value: 'Wilaisila-out' },
    { key: 'gate4in', text: 'ประตู 4 ขาเข้า', value: 'Kanlayanamit-in' },
    { key: 'gate4out', text: 'ประตู 4 ขาออก', value: 'Kanlayanamit-out' }
  ];

  // สถานะสำหรับเก็บค่าที่เลือก
  const [selectedValue, setSelectedValue] = useState(null);
  const [page, setPage] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
};

  useEffect(() => {
    // ดึงค่าจาก URL และ Local Storage เมื่อ component ถูกสร้าง
    const pages = window.location.href.split('/')[3];
    setPage(pages);

    const storedValue = localStorage.getItem('selectedDoor');
    if (pages !== 'upload') {
      setSelectedValue(null);
    } else if (storedValue) {
      setSelectedValue(storedValue);
    }
  }, []);

  const handleChange = (e, { value }) => {
    // อัพเดตค่าที่เลือกในสถานะและ Local Storage
    setSelectedValue(value);
    localStorage.setItem('selectedDoor', value);

    // นำทางไปยังหน้า dashboard เมื่อเลือก "ปิด"
    if (value === null) {
      navigate(`/dashboard/${UserId}`);
    } else {
      navigate(`/upload/${UserId}/${value}`);
    }
  };

  return (
    <div className="dropdown" onClick={toggleDropdown}>
    <Dropdown
      placeholder="Upload Video"
      selection
      options={doors.map((door) => ({
        key: door.key,
        text: door.text,
        value: door.value,
        as: door.value ? Link : 'div',
        to: door.value ? `/upload/${UserId}/${door.value}` : '',
      }))}
      className="black"
      value={selectedValue}
      onChange={handleChange}
    />
    </div>
  );
};

export default DoorToolbar;
