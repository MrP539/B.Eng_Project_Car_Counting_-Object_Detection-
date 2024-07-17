import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const genderOptions = [
  { key: 'male', text: 'Male', value: 'm' },
  { key: 'female', text: 'Female', value: 'f' },
  { key: 'undefined', text: 'Not specified', value: 'u' },
];

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/users/', {
        name: name,
        email: email,
        age: age,
        gender: gender,
        password: password,
        role: 'guest',
      });
      alert('บัญชีผู้ใช้ถูกสร้างเรียบร้อยแล้ว');
      navigate('/');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้:', error);
      alert('เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้');
    }
  };

  return (
    <div  style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url('https://i.imgur.com/zrQ2Qzi.jpeg')`, // เปลี่ยน URL ของรูปภาพ background ตรงนี้
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="signup-form" style={{ maxWidth: '500px', width: '100%',height:'65vh', background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',margintop:'20px' }}>
      <Grid textAlign="center" style={{ height: '1vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center" style={{ color: 'white' }}>
            Sign Up
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="calendar"
                iconPosition="left"
                placeholder="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Form.Field
                fluid
                control={Dropdown}
                selection
                placeholder="Gender"
                options={genderOptions}
                value={gender}
                onChange={(e, { value }) => setGender(value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button color="teal" fluid size="large" style={{ backgroundColor: '#42B72A', color: 'white' }} onClick={handleSignUp}>
                Sign Up
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
    </div>
  );
};

export default SignUp;




