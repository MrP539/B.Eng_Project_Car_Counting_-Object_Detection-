import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'm' },
  { key: 'f', text: 'Female', value: 'f' },
  { key: 'o', text: 'Do Not Disclose', value: 'o' }
]

class FormInput extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        timein: '',
        timeout: '',
        gatein: '',
        gateout: '',
        licenseplatenumber:'',
        cartype:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if car id is provided
    if (this.props.carID) {
      axios.get(`${this.props.server}/api/cars/${this.props.carID}`)
      .then((response) => {
        this.setState({
          timein: response.data.timein[0],
          timeout: response.data.timeout,
          gatein: response.data.gatein,
          licenseplatenumber: response.data.licenseplatenumber,
          gateout: response.data.gateout,
          cartype: response.data.cartype,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const timein = target.timein;
    const timeout = target.timeout;
    const gatein = target.gatein;
    const gateout= target.gateout;
    const licenseplatenumber= target.licenseplatenumber;
    const cartype= target.cartype;

    this.setState({ [timein]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ gender: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const car = {
      timein: this.state.timein,
      timeout: this.state.timeout,
      gatein: this.state.data.gatein,
      licenseplatenumber: this.state.data.licenseplatenumber,
      gateout: this.state.data.gateout,
      cartype: this.state.data.cartype,
    }

    console.log(car)

    // Acknowledge that if the car id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.carID ? 'put' : 'post';
    const params = this.props.carID ? this.props.carID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/cars/${params}`,
      data: car
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.carID) {
        this.setState({
          timein: '',
          timeout: '',
        });
        this.props.onInputAdded(response.data.result);
        //this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onInputUpdated(response.data.result);
        //this.props.socket.emit('update', response.data.result);
      }
      
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
           <Form.Input
          label='cartype'
          type='text'
          placeholder='Elon Musk'
          cartype='cartype'
          maxLength='40'
          required
          value={this.state.cartype}
          onChange={this.handleInputChange}
        />
          <Form.Input
          label='licenseplatenumber'
          type='text'
          placeholder='Elon Musk'
          licenseplatenumber='licenseplatenumber'
          maxLength='40'
          required
          value={this.state.licenseplatenumber}
          onChange={this.handleInputChange}
        />
         <Form.Input
          label='gatein'
          type='text'
          placeholder='Elon Musk'
          gatein='gatein'
          maxLength='40'
          required
          value={this.state.gatein}
          onChange={this.handleInputChange}
        />
          <Form.Input
          label='timegateoutin'
          type='text'
          placeholder='Elon Musk'
          gateout='gateout'
          maxLength='40'
          required
          value={this.state.gateout}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='timein'
          type='text'
          placeholder='Elon Musk'
          timein='timein'
          maxLength='40'
          required
          value={this.state.timein}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='timeout'
          type='text'
          placeholder='เวลาขาออก'
          timeout='timeout'
          maxLength='256'
          value={this.state.timeout}
          onChange={this.handleInputChange}
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
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormInput;
