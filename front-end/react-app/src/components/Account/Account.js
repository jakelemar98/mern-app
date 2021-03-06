import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Nav from '../Utils/Nav'
import img from '../../static/images/avatar/tiger.jpg'; 
import RaisedButton from 'material-ui/RaisedButton';
import PasswordDialog from './AccountPassDialog';
import SweetAlert from 'react-bootstrap-sweetalert'

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
            open: false,
            show: false
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
                var first = result.first;
                var last = result.last;
                
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
                display: "block",
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
        var first = this.state.user.first;
        var last = this.state.user.last;
        var username = this.state.user.username        

        if( (first !== this.state.first) || (last !== this.state.last) || (username !== this.state.username) ){
            var url = process.env.REACT_APP_API_URI + 'users/' + this.state.user._id

            var token = localStorage.getItem("token");
            
            fetch(url, {
                method: "PUT",
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                username: this.state.username,
                first: this.state.first,
                last: this.state.last
              })
            })
            .then((response) => {
                if (response.status === 200){
                    return response.json()
                } else if (response.status === 403){
                    return 403;
                }
              })
              .then((responseData) => {
                if(responseData === 403){
                    this.props.history.push("/login")              
                } else {
                    localStorage.setItem('token', responseData.token);
                    this.setState(this.initialState)
                    this.getUserInfo()
                }
              })
        } else {
            this.setState({ show: true })
        }
    }

    valueSelect = e => {
        this.setState({ show: false })
    }

    render() {
        const { error, isLoaded, username, first, last, display, open } = this.state;
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
                            <SweetAlert
                                warning
                                confirmBtnText="OK"
                                title="Must Change A Value"
                                onConfirm={this.valueSelect}
                                show = {this.state.show}
                            >
                            </SweetAlert>
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
