import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Nav from '../Nav'
import img from '../../static/images/avatar/tiger.jpg'; 
import RaisedButton from 'material-ui/RaisedButton';
import PasswordDialog from './AccountPassDialog';

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            user: [],
            disabled: true,
            label: "Edit Account",
            username: "",
            first: "",
            last: "",
            display: "none",
            open: false
        };

        this.initialState = this.state
    }

    componentDidMount() {
      this.getUserInfo()
    }

    getUserInfo = e => {
        var url = process.env.REACT_APP_API_URI + 'user'

        var token = localStorage.getItem("token");

        fetch(url, {
            method: "GET",
          headers: {
            'Authorization': 'bearer ' + token
          }
        })
          .then(res => res.json())
          .then( (result) => {                                
                var name = result.name.split(" ");
                var first = name[0];
                var last = name[1];
                
                this.setState({
                    isLoaded: true,
                    user: result,
                    first: first,
                    last: last,
                    username: result.username
                });                
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    updateUserPass = e => {
        this.setState({
            open: true
        })
    }

    enableFields = e => {
        var isDisabled;
        var label;
        if (this.state.disabled){
            isDisabled =  false;
            label = "Cancel Changes";
            this.setState({
                display: "block"
            })
        } else {
            var name = this.state.user.name.split(" ");
            var firstSet = name[0];
            var lastSet = name[1];
            this.setState({
                username: this.state.user.username,
                first: firstSet,
                last: lastSet,
                display: "none"
            })
            isDisabled = true;
            label = "Edit Account";
        }
        this.setState({
            disabled: isDisabled,
            label: label
        })         
    }

    handleChange = (field, e) => {
        switch(field){
            case "username":
                this.setState({ username: e.target.value})
                break;
            case "first":
                this.setState({ first: e.target.value})
                break;
            case "last":
                this.setState({ last: e.target.value})
                break;
            default:
                break;
        }
    }

    handleClose = value => {
        this.setState({open: false});
      };

    updateUser = e => {
        var name = this.state.user.name.split(" ");
        var first = name[0];
        var last = name[1];
        var username = this.state.user.username        

        if( (first !== this.state.first) || (last !== this.state.last) || (username !== this.state.username) ){
            var url = process.env.REACT_APP_API_URI + 'users/' + this.state.user.user_id

            var token = localStorage.getItem("token");

            var fullname = this.state.first + " " + this.state.last
            
            fetch(url, {
                method: "PUT",
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                username: this.state.username,
                name: fullname,
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
                this.setState(this.initialState)
                this.getUserInfo()
              })
        } else {
            alert("Please Change A Value")
        }
    }

    render() {
        const { error, isLoaded, username, first, last, display, open } = this.state;

        // var userArr = user.name.split(" ");
        // const firstname = userArr[0];
        // const lastname = userArr[1];
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <MuiThemeProvider>
                        <React.Fragment>
                            <Nav menuName="Account Information" history={this.props.history} selected={[true, false]} />
                            <br></br>
                            <div style={{ display:'flex', justifyContent:'center' }}>
                                <Card style={{width:720}}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        height="280"
                                        image={img}
                                        title="Tiger"
                                        />
                                        <CardContent>
                                            <TextField
                                                hintText="Username"
                                                floatingLabelText="Username"
                                                value={username}
                                                onChange={(e) => this.handleChange("username", e)}
                                                disabled={this.state.disabled}
                                            />
                                            <br />
                                            <TextField
                                                hintText="First Name"
                                                type="text"
                                                floatingLabelText="First Name"
                                                value={first}
                                                onChange={(e) => this.handleChange("first", e)}
                                                disabled={this.state.disabled}
                                            />
                                            <br />
                                            <TextField
                                                hintText="Last Name"
                                                type="text"
                                                floatingLabelText="Last Name"
                                                value={last}
                                                onChange={(e) => this.handleChange("last", e)}
                                                disabled={this.state.disabled}
                                            />
                                            <br />
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{ display:'flex', justifyContent:'center', backgroundColor:'#3f51b5' }}>
                                    <RaisedButton
                                        label="Update Account Password"
                                        primary={true}
                                        style={{margin: 15, display: display}}
                                        onClick={this.updateUserPass}
                                    />
                                    <RaisedButton
                                        label={this.state.label}
                                        secondary={true}
                                        style={styles.button}
                                        onClick={this.enableFields}
                                    />
                                    <RaisedButton
                                        label="Save Account"
                                        primary={true}
                                        style={{margin: 15, display: display}}
                                        onClick={this.updateUser}
                                    />
                                    </CardActions>
                                </Card>
                            </div>
                            <PasswordDialog open = { open } onClose={this.handleClose} id={this.state.user._id} history={this.props.history} />
                        </React.Fragment>
                    </MuiThemeProvider>
                </div>
            )
        }
    }
}
const styles = {
    button: {
        margin: 15,
    },
    input: {
        color: "white"
      }
};
  

export default Account
