import React, { useState } from 'react';
import { Modal, Form, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const ModalEditUser = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e, { value }) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/users/${user._id}`, formData);
      alert('ข้อมูลผู้ใช้ถูกแก้ไขเรียบร้อยแล้ว');
      onClose();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ใช้:', error);
      alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ใช้');
    }
  };

  const roleOptions = [
    { key: 'guest', text: 'Guest', value: 'guest' },
    { key: 'admin', text: 'Admin', value: 'admin' },
  ];

  return (
    <Modal open onClose={onClose}>
      <Modal.Header>แก้ไขข้อมูลผู้ใช้</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label='ชื่อผู้ใช้'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Input
            label='อีเมล'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Field>
            <label>บทบาท</label>
            <Dropdown
              placeholder='เลือกบทบาท'
              fluid
              selection
              options={roleOptions}
              value={formData.role}
              onChange={handleDropdownChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={onClose}>ยกเลิก</Button>
        <Button color='green' onClick={handleSubmit}>บันทึก</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalEditUser;
