import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsPersonFill } from 'react-icons/bs'; // เพิ่ม import สำหรับ icon
import { Link, useParams, useNavigate } from 'react-router-dom';

import './UserProfileModal.css'; // เพิ่มไฟล์ CSS

const UserProfileModal = ({ show, handleClose, userName, userRole }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton className="custom-header">
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="profile-info">
          <button className="profile-button" style={{ backgroundColor: 'white' }}>
            <BsPersonFill className="profile-icon" /> {/* Bootstrap Icon for user profile */}
          </button>
          <div className="profile-text">
            <div>
              UserName: {userName}
            </div>
            <div>
              Role: {userRole}
            </div>
          </div>
        </div>
        <li className="nav1-item" style={{ marginRight: '1rem' }}>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </li>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;

// อันนี้ css

  