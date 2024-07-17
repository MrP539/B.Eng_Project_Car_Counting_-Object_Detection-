import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Grid, Dropdown, Modal, Tab, Table } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalEditUser from './ModalEditUser';
import './ModalUser.css';

const ModalUser = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [genderOptions] = useState([
    { key: 'male', text: 'ชาย', value: 'm' },
    { key: 'female', text: 'หญิง', value: 'f' },
    { key: 'undefined', text: 'ไม่ระบุเพศ', value: 'u' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleEditClick = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
      
      fetchUsers();
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedUser(null);
      setCount(prevCount => prevCount + 1); // อัปเดตค่า count
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleRoleChange = (e, { value }) => {
      setSelectedRole(value);
    };


  useEffect(() => {
    if (open) {
      fetchUsers();
    }
    fetchUsers();
  }, [open,count]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
    }
  };
  
  const filteredUsers = users.filter(user => {
    // กรองตามชื่อผู้ใช้หรืออีเมล
    const isNameOrEmailMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // กรองตามบทบาท
    let isRoleMatch = true; // ถ้าไม่ได้เลือก role ให้แสดงผู้ใช้ทุกคน
    if (selectedRole !== '') {
      isRoleMatch = user.role === selectedRole;
    }
    
    // รวมการกรองด้วย logical AND
    return isNameOrEmailMatch && isRoleMatch;
  });
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      setLoading(true);

      const existingUsersResponse = await axios.get('http://localhost:3000/api/users/', {
        params: { name, email }
      });

      const existingUsers = existingUsersResponse.data;
      const isNameDuplicate = existingUsers.some(user => user.name === name);
      const isEmailDuplicate = existingUsers.some(user => user.email === email);

      if (isNameDuplicate) {
        alert('ชื่อผู้ใช้ซ้ำ');
        setLoading(false);
        return;
      }

      if (isEmailDuplicate) {
        alert('อีเมลซ้ำ');
        setLoading(false);
        return;
      }

      await axios.post('http://localhost:3000/api/users/', {
        name,
        email,
        age,
        gender,
        password,
        role: "admin"
      });

      alert('บัญชีผู้ใช้ถูกสร้างเรียบร้อยแล้ว');
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error('เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้:', error);
      alert('เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้');
    }
  };

  const panes = [
    {
      menuItem: 'เพื่มผู้ใช้ใหม่',
      render: () => (
        <Tab.Pane>
          <Grid textAlign="center">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="ชื่อผู้ใช้"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="อีเมล"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Input
                    fluid
                    icon="calendar"
                    iconPosition="left"
                    placeholder="อายุ"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <Form.Field
                    fluid
                    control={Dropdown}
                    selection
                    placeholder="เพศ"
                    options={genderOptions}
                    value={gender}
                    onChange={(e, { value }) => setGender(value)}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="รหัสผ่าน"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="ยืนยันรหัสผ่าน"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'เพื่มจากผู้ใช้เดิม',
      render: () => (
        <Tab.Pane>
          <Table celled>
            <Table.Header>
            <Table.HeaderCell>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อผู้ใช้หรืออีเมล"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Dropdown
                  placeholder='เลือกบทบาท'
                  selection
                  options={[
                    { key: 'all', text: 'ทั้งหมด', value: '' },
                    { key: 'guest', text: 'Guest', value: 'guest' },
                    { key: 'admin', text: 'Admin', value: 'admin' }
                  ]}
                  value={selectedRole}
                  onChange={handleRoleChange}
                />
              </Table.HeaderCell>
              <Table.Row>
                <Table.HeaderCell>ชื่อผู้ใช้</Table.HeaderCell>
                <Table.HeaderCell>อีเมล</Table.HeaderCell>
                <Table.HeaderCell>บทบาท</Table.HeaderCell>
                <Table.HeaderCell>แก้ไขบทบาท</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
             {filteredUsers.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <Button color='blue' onClick={() => handleEditClick(user)}>แก้ไข</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
  
          {isModalOpen && (
            <ModalEditUser
              user={selectedUser}
              onClose={handleModalClose}
              buttonColor='green'
            />
          )}
        </Tab.Pane>
      )
    }
  ];
  

  return (
    <>
    <Button color='violet' onClick={() => setOpen(true)}>ADD ADMIN USER</Button>
    <div className="modal">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        color='blue'
      >
        <Modal.Header>สร้างบัญชีผู้ดูแล</Modal.Header>
        <Tab panes={panes} />
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button
            content="สร้างบัญชี"
            labelPosition='right'
            icon='checkmark'
            onClick={handleSignUp}
            positive
          />
        </Modal.Actions>
      </Modal>
      </div>
    </>
  );
};

export default ModalUser;
