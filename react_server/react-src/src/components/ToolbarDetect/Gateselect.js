import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { StateContext } from './StateContext';

  const Gateselect = () => {
    const { setSelectedGate, setSelectedDirection } = useContext(StateContext);
  
    const handleChange = (e, { value }) => {
      setSelectedGate(value.gate);
      setSelectedDirection(value.direction);
    };
  
  const options = [
    { key: 'none', text: 'ทั้งหมด', value: { gate: null , direction: null } }, // เพิ่มตัวเลือก "ปิด"
    { key: 'gate1in', text: 'ประตู 1 ขาเข้า', value: { gate: 'gatein', direction: '1' } },
    { key: 'gate1out', text: 'ประตู 1 ขาออก', value: { gate: 'gateout', direction: '1' } },
    { key: 'gate2in', text: 'ประตู 2 ขาเข้า', value: { gate: 'gatein', direction: '2' } },
    { key: 'gate2out', text: 'ประตู 2 ขาออก', value: { gate: 'gateout', direction: '2' } },
    { key: 'gate3in', text: 'ประตู 3 ขาเข้า', value: { gate: 'gatein', direction: '3' } },
    { key: 'gate3out', text: 'ประตู 3 ขาออก', value: { gate: 'gateout', direction: '3' } },
    { key: 'gate4in', text: 'ประตู 4 ขาเข้า', value: { gate: 'gatein', direction: '4' } },
    { key: 'gate4out', text: 'ประตู 4 ขาออก', value: { gate: 'gateout', direction: '4' } }
    
  ];

 

  return (
    <Dropdown
      placeholder='เลือกประตู'
      fluid
      selection
      options={options}
      onChange={handleChange}
      style={{ width: '35vw', height: '5vh' }}
    />
  );
}

export default Gateselect;