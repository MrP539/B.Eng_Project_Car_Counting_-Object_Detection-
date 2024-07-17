import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { auth, googleProvider } from './firebase';
import { initializeApp } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';


const Login = () => {
  const [users, setUsers] = useState([]);
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    const user = users.find(user => (user.name === name || user.email === name) && user.password === password);
    if (user) {
      let UserId = user._id;
      setLoggedIn(true);
      alert('Login successful!');
      navigate(`/dashboard/${UserId}`); // ใช้เป็น template literal และเรียกใช้ user._id ในการนำทางไปยังหน้า dashboard
    } else {
      alert('Invalid login, please try again');
    }
  };

  const saveUserToDatabase = async (email,name) => {
    try {
      // Check if user already exists
      const existingUserResponse = await axios.get(`http://localhost:3000/api/users?email=${email}`);
      if (existingUserResponse.data && existingUserResponse.data.length > 0) {
        console.log("User already exists in database");
        return existingUserResponse.data[0]; // Return existing user
      } else {
        // Save new user to database
        const newUserResponse = await axios.post('http://localhost:3000/api/users/', { email,name,role: 'guest' });
        console.log("User saved to database");
        const existingUserResponse = await axios.get(`http://localhost:3000/api/users?email=${email}`);
        return existingUserResponse.data[0]; // Return existing user
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
      return null;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profilePic = result.user.photoURL; // ดึงรูปโปรไฟล์จาก Google
      setValue(result.user.email);
      localStorage.setItem("email", result.user.email);
      localStorage.setItem("ืname", result.user.displayName);
      localStorage.setItem("profilePic ", profilePic );
      setProfilePic(profilePic);
      const user = await saveUserToDatabase(result.user.email,result.user.displayName);
      if (user) {
        navigate(`/dashboard/${user._id}`, { state: { profilePic } }); // นำผู้ใช้ไปที่ dashboard โดยใช้ user._id
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };


  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://i.imgur.com/zrQ2Qzi.jpeg')`, // เปลี่ยน URL ของรูปภาพ background ตรงนี้
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="login-form" style={{ maxWidth: '500px', width: '100%', background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Grid textAlign="center">
          <Grid.Column>
            <Header as="h2" color="black" textAlign="center" style={{ fontSize: '36px', marginBottom: '30px' }}>
              Login <Icon name="user circle" size="large" />
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username or Email"
                  value={name}
                  onChange={(e) => setUsername(e.target.value)}
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
                <Button style={{ backgroundColor: '#1877F2', color: 'white',marginBottom: '10px' }} fluid size="large" onClick={handleLogin}>
                  Login
                </Button>
                <Button style={{ backgroundColor: '#42B72A', color: 'white' ,marginBottom: '10px'}} fluid size="large" as={Link} to="/signup">
                  Create new account
                </Button>
                <div className="App">
                  <Button style={{ backgroundColor: '#DB4437', color: 'white' }} fluid size="large" onClick={signInWithGoogle}>
                    <Icon name='google' /> Sign in with Google
                  </Button>
                </div>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
