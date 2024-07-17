// src/ResetPassword.js
import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://i.imgur.com/zrQ2Qzi.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="reset-password-form" style={{ maxWidth: '500px', width: '100%', background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Grid textAlign="center">
          <Grid.Column>
            <Header as="h2" color="black" textAlign="center" style={{ fontSize: '36px', marginBottom: '30px' }}>
              Reset Password <Icon name="lock" size="large" />
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button style={{ backgroundColor: '#1877F2', color: 'white' }} fluid size="large">
                  Reset Password
                </Button>
              </Segment>
            </Form>
            {message && <p>{message}</p>}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default ResetPassword;
