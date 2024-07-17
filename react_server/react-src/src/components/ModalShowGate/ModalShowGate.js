import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import Door from '../ShowDoor/Door'; // Import the Door component

const ModalShowGate = ({ headerTitle, buttonTriggerTitle, gate }) => {
  const navigate = useNavigate();
  const { UserId } = useParams();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    navigate(`/show/${UserId}/${gate._id}`); // ใช้ gate.id แทน gate.name
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button to open the modal */}
      <Button color='green' onClick={handleOpen}>
        {buttonTriggerTitle}
      </Button>
          {/* Use the Door component */}
          
  

    </>
  );
};

export default ModalShowGate;
