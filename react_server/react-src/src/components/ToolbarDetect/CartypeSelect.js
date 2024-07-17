import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { StateContext } from './StateContext';

const CartypeSelect = () => {
  const { selectedType, setSelectedType } = useContext(StateContext); // เรียกใช้ state และ setSelectedType จาก StateContext

  const options = [
    { key: 'none', text: 'ทั้งหมด', value: null }, // เพิ่มตัวเลือก "ปิด"
    { key: 'car', text: 'Car', value: 'car' },
    { key: 'truck', text: 'Truck', value: 'truck' },
    { key: 'motorbike', text: 'Motorbike', value: 'motorbike' },
    
  ];

  const handleChange = (e, { value }) => {
    setSelectedType(value); // เปลี่ยนค่า state selectedType ตามที่เลือกจาก Dropdown
  };

  return (
    <>
      <Dropdown
        placeholder='เลือกประเภทยานพาหนะ'
        fluid
        selection
        options={options}
        onChange={handleChange}
        value={selectedType} // ใช้ค่า selectedType เป็นค่าที่เลือกใน Dropdowncdแกกกก
        style={{ width: '35vw', height: '5vh' }}
      />
    </>
  );
};

export default CartypeSelect;
