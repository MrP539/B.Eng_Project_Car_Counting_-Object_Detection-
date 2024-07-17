import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'm' },
  { key: 'f', text: 'Female', value: 'f' },
  { key: 'o', text: 'Do Not Disclose', value: 'o' }
]

class FormGate extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      description: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if gate id is provided
    if (this.props.gateID) {
      axios.get(`${this.props.server}/api/gates/${this.props.gateID}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          description: response.data.description
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
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ gender: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const gate = {
      name: this.state.name,
      description: this.state.description
    }

    console.log(gate)

    // Acknowledge that if the gate id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.gateID ? 'put' : 'post';
    const params = this.props.gateID ? this.props.gateID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/gates/${params}`,
      data: gate
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.gateID) {
        this.setState({
          name: '',
          description: '',
        });
        this.props.onGateAdded(response.data.result);
        //this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onGateUpdated(response.data.result);
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
          label='ชื่อประตู'
          type='text'
          placeholder=''
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='ประตูที่'
          type='text'
          placeholder=''
          name='description'
          maxLength='256'
          value={this.state.description}
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

export default FormGate;
