import React, { Component } from 'react';
import FormLoginDetails from './FormLoginDetails';

export class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { username, password } = this.state;
    const values = { username, password };

    return (
        <FormLoginDetails
        handleChange={this.handleChange}
        values={values}
        />
    )
  }
}

export default LoginForm;