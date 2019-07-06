import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from './auth';
import Nav from './Nav';

export class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  
  componentDidMount() {
    if(Auth.isAuthenticated()){
      this.props.history.push("/dashboard")
    }
  }

  login = e => {    
    e.preventDefault();
    var url = process.env.REACT_APP_API_URI + 'login'
    fetch(url, {
    	method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
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
      localStorage.setItem('token', responseData.token);
      Auth.login( () => {
        this.props.history.push("/dashboard")
      });
    })
    .catch(error => console.warn("big error" + error));    
  };
  render() {
    const { username, password } = this.state;
    const values = { username, password };
    const handleChange = this.handleChange;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Nav menuName={"App Login"}/>
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

export default LoginForm;