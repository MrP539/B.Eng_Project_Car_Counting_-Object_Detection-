import React, { useState, useEffect,useContext } from 'react';
import { Link, useParams, useNavigate ,useLocation} from 'react-router-dom';
import DoorToolbar from './DoorToolbar';
import Door1 from '../image/door1.png';
import Door2 from '../image/door2.jpg';
import Door3 from '../image/door3.png';
import NavigationDrawer from './NavigationDrawer';
import { BsPersonFill } from 'react-icons/bs'; // Import Bootstrap Icons
import UserProfileModal from './UserProfileModal';
import { StateContext } from '../ToolbarDetect/StateContext';
import axios from 'axios';
import './Menubar.css'
import Calendar from './Calendar';
import { Button } from 'semantic-ui-react';
import { FaClock } from 'react-icons/fa';


const Menubar = () => {
  const { _id, door,UserId } = useParams();
  const [selectedGate, setSelectedGate] = useState({ name: '' });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileModalShow = () => setShowProfileModal(true);
  const { userId,setUserId,userName,setIsLoading,setClose,close } = useContext(StateContext);
  const [users, setUsers] = useState(null); // State for gates data
  const [userRole,setUserRole] = useState(null);
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const { profilePic } = location.state || {};
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleOpenCalendar = () => setClose(true);
  const handleCloseCalendar = () => setClose(false);
  
  console.log(profilePic)
  useEffect(() => {
    fetchMenu();
    
  }, []);
 
  const fetchMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${UserId}`);
      const fetchedUsers = response.data;
      setUsers(fetchedUsers);
      
      const userRole = fetchedUsers.role; // Use the fetched users data to get the role
      setUserRole(userRole);
      console.log(userRole);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const [darkMode, setDarkMode] = useState(false);
  
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add logic to toggle dark mode styles or other relevant changes
  };

  let imagePath;
  switch (door) {
    case '1':
      imagePath = Door1;
      break;
    case '2':
      imagePath = Door2;
      break;
    case '3':
      imagePath = Door3;
      break;
    default:
      imagePath = Door1; // Default image if door is not 1, 2, or 3
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: '100vw' }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link className="navbar-brand d-flex" to="/" style={{ fontSize: '25px', fontWeight: 'bold' }}>
            SUT CARDETECTION
          </Link>
          <ul className="navbar-nav mb-0 mb-lg-0 d-flex align-items-center flex-row" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li className="nav-item" style={{ marginRight: '1rem' }}>
              <Link className="nav-link" to={`/dashboard/${UserId}`} style={{ color: 'white' }}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item" style={{ marginRight: '1rem' }}>
              <Link className="nav-link" to={`/detect/${UserId}`} style={{ color: 'white' }}>
                Detect
              </Link>
            </li>
            {userRole === 'admin' && (
          <>
            <li className="nav-item" style={{ marginRight: '1rem' }}>
              <DoorToolbar />
            </li>
            <li className="nav-item" style={{ marginRight: '1rem' }}>
            <Button color='red' size='mini' onClick={handleOpenCalendar} style={{ fontSize: '0.9em' }}>
              <FaClock size={16} style={{ fontSize: '1em', marginRight: '0.5rem' }} />
              Upload History
            </Button>
            <Calendar openModal={close} onClose={handleCloseCalendar} />
          </li>
          </>
        )}
            <li className="nav-item" style={{ marginRight: '1rem' }}>
              <button className="btn btn-link" style={{ color: 'white' }} onClick={handleProfileModalShow}>
                <BsPersonFill size={20} />
              </button>
            </li>
          </ul>
          <UserProfileModal
            show={showProfileModal}
            handleClose={handleProfileModalClose}
            userName={userName}
            userRole={userId}
          />
        </div>
      </nav>
    );
  };

export default Menubar;
