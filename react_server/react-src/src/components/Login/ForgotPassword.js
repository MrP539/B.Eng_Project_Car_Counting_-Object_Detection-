// src/ForgotPassword.js
import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending reset email. Please try again.');
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
      <div className="forgot-password-form" style={{ maxWidth: '500px', width: '100%', background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Grid textAlign="center">
          <Grid.Column>
            <Header as="h2" color="black" textAlign="center" style={{ fontSize: '36px', marginBottom: '30px' }}>
              Forgot Password <Icon name="lock" size="large" />
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button style={{ backgroundColor: '#1877F2', color: 'white' }} fluid size="large">
                  Send Reset Link
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

export default ForgotPassword;
