import React, { useContext } from 'react';
import { StateContext } from './StateContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm} = useContext(StateContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // เรียกใช้งานฟังก์ชันที่คุณต้องการส่งค่า searchTerm ไปยังตัวอื่นๆ ที่ใช้ SearchBar
      console.log(searchTerm); // ตัวอย่างการใช้งาน: ให้แทนที่ด้วยโค้ดที่ต้องการทำงานเมื่อกด Enter หลังจากพิมคำค้นหาเสร็จสิ้น
    }
  };

  return (
    <div>
        <input
            type="text"
            placeholder="ค้นหาจากป้ายทะเบียนรถ..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            style={{ width: '20vw', height: '5vh' }} // ตัวอย่างการกำหนดขนาด
        />
    </div>
);

};

export default SearchBar;
