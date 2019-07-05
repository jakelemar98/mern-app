import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class FormLoginDetails extends Component {
  login = e => {
    e.preventDefault();
    var url= "";
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
      url = 'http://127.0.0.1:5004/api/login';
    } else {
      url = 'http://backend.jalema01-mern-app.com/api/login';
    }
    fetch(url, {
    	method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            username: this.props.values.username,
            password: this.props.values.password,
          })
    })
    .then((response) => {
      if (response.status === 200){
        return response.json()
      } else {
        throw new Error(response.json())
      }
    })
    .then((responseData) => {
      console.log(responseData);
      localStorage.setItem('token', responseData.token);
      console.log(localStorage.getItem('token'));
      window.location.href = '/Dashboard';
    })
    .catch(error => console.warn("big error" + error));    
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter User Credintials" />
          <TextField
            hintText="Enter Your Username"
            floatingLabelText="Username"
            onChange={handleChange('username')}
            defaultValue={values.username}
          />
          <br />
          <TextField
            hintText="Enter Your Password"
            type="password"
            floatingLabelText="Password"
            onChange={handleChange('password')}
            defaultValue={values.password}
          />
          <br />
          <RaisedButton
            label="Login"
            primary={true}
            style={styles.button}
            onClick={this.login}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default FormLoginDetails;