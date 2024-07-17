import React, { useState, useEffect } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const FormDetect = ({ carID, onDetectAdded, onDataUpdated,buttonSubmitTitle,buttonColor }) => {
  const [formClassName, setFormClassName] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState('');
  console.log(carID)
  const [state, setState] = useState({
    timein: '',
    timeout: '',
    gatein: '',
    gateout: '',
    licenseplatenumber: '',
    cartype: '',
    vihecle_number: '',
  });

  useEffect(() => {
    if (carID) {
      axios.get(`http://127.0.0.1:5000/api/dataA/${carID}`)
        .then((response) => {
          setState({
            ...state,
            timein: response.data.timein,
            timeout: response.data.timeout,
            gatein: response.data.gatein,
            licenseplatenumber: response.data.licenseplatenumber,
            gateout: response.data.gateout,
            cartype: response.data.cartype,
            vihecle_number: response.data.vihecle_number,
            
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleDetectChange = (e) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
    
      setState({
        ...state,
        [name]: value,
      });
    }
    

  const handleSelectChange = (e, data) => {
    setState({
      ...state,
      gender: data.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const car = {
      timein: state.timein,
      timeout: state.timeout,
      gatein: state.gatein,
      licenseplatenumber: state.licenseplatenumber,
      gateout: state.gateout,
      cartype: state.cartype,
      vihecle_number: state.vihecle_number,
    };

    const method = carID ? 'put' : 'post';
    const params = carID ? carID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `http://127.0.0.1:5000/api/dataA/${params}`,
      data: car
    })
      .then((response) => {
        setFormClassName('success');
        setFormSuccessMessage(response.data.msg);

        if (!carID) {
          setState({
            ...state,
            timein: '',
            timeout: ''
          });
          onDetectAdded(response.data.result);
        } else {
          onDataUpdated(response.data.result);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            setFormClassName('warning');
            setFormErrorMessage(err.response.data.msg);
          }
        } else {
          setFormClassName('warning');
          setFormErrorMessage('Something went wrong. ' + err);
        }
      });
  }

  return (
    <Form className={formClassName} onSubmit={handleSubmit}>
      <Form.Input
        label='cartype'
        type='text'
        placeholder='Elon Musk'
        name='cartype'
        maxLength='40'
        required
        value={state.cartype}
        onChange={handleDetectChange}
      />
      <Form.Input
        label='licenseplatenumber'
        type='text'
        placeholder='Elon Musk'
        name='licenseplatenumber'
        maxLength='40'
        required
        value={state.licenseplatenumber}
        onChange={handleDetectChange}
      />
      <Form.Input
        label='gatein'
        type='text'
        placeholder='Elon Musk'
        name='gatein'
        maxLength='40'
        required
        value={state.gatein}
        onChange={handleDetectChange}
      />
      <Form.Input
        label='gateout'
        type='text'
        placeholder='Elon Musk'
        name='gateout'
        maxLength='40'
        required
        value={state.gateout}
        onChange={handleDetectChange}
      />
      <Form.Input
        label='timein'
        type='text'
        placeholder='Elon Musk'
        name='timein'
        maxLength='40'
        required
        value={state.timein}
        onChange={handleDetectChange}
      />
      <Form.Input
        label='timeout'
        type='text'
        placeholder='เวลาขาออก'
        name='timeout'
        maxLength='256'
        value={state.timeout}
        onChange={handleDetectChange}
      />
      <Message
        success
        color='green'
        header='Nice one!'
        content={formSuccessMessage}
      />
      <Message
        warning
        color='yellow'
        header='Woah!'
        content={formErrorMessage}
      />
      <Button color={buttonColor} floated='right'> Save </Button>
      <br /><br />
    </Form>
  );
};

export default FormDetect;
