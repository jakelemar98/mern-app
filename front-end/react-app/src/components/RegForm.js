import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from './auth';
import Nav from './Nav';




export class RegForm extends Component {
  state = {
    username: '',
    password: '',
    user_id: '',
    name: ''
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

  register = e => {    
    e.preventDefault();
    var url = process.env.REACT_APP_API_URI + 'register'
    fetch(url, {
    	method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            name: this.state.name,
            // user_id: this.state.user_id,
            username: this.state.username,
            password: this.state.password,
          })
    })
    .then((response) => {
      if (response.status === 200){
        this.props.history.push("/dashboard")
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then((responseData) => {
      localStorage.setItem('token', responseData.token);
      Auth.login( () => {
      });
    })
    .catch(error => console.warn("big error" + error));    
  };
  render() {
    const { username, password, name} = this.state;
    const values = { username, password, name };
    const handleChange = this.handleChange;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Nav menuName={"Register"} selected={[0,0]}/>
          <TextField
            hintText="Enter Your Name"
            floatingLabelText="Full Name"
            onChange={handleChange('name')}
          />
          <br/>
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
            label="Register"
            primary={true}
            style={styles.button}
            onClick={this.register}
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

export default RegForm;
