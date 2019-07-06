import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Nav from './Nav'
import img from '../static/images/avatar/tiger.jpg'; 
import RaisedButton from 'material-ui/RaisedButton';

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          user: [],
          disabled: true
        };
    }

    componentDidMount() {
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
                result.first = first;
                result.last = last;
                this.setState({
                    isLoaded: true,
                    user: result
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

    enableFields = e => {
        this.setState({
            disabled: false
        }) 
    }
    render() {
        const { error, isLoaded, user } = this.state;

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
                            <Nav menuName="Account Information" history={this.props.history}/>
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
                                                defaultValue={user.username}
                                                disabled={this.state.disabled}
                                            />
                                            <br />
                                            <TextField
                                                hintText="First Name"
                                                type="text"
                                                floatingLabelText="First Name"
                                                defaultValue={user.first}
                                                disabled={this.state.disabled}
                                            />
                                            <br />
                                            <TextField
                                                hintText="Last Name"
                                                type="text"
                                                floatingLabelText="Last Name"
                                                defaultValue={user.last}
                                                disabled={this.state.disabled}
                                            />
                                            <br />
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{ display:'flex', justifyContent:'center', backgroundColor:'#3f51b5' }}>
                                    <RaisedButton
                                        label="Edit Account"
                                        secondary={true}
                                        style={styles.button}
                                        onClick={this.enableFields}
                                    />
                                    <RaisedButton
                                        label="Save Account"
                                        primary={true}
                                        style={styles.button}
                                    />
                                    </CardActions>
                                </Card>
                            </div>
                        </React.Fragment>
                    </MuiThemeProvider>
                </div>
            )
        }
    }
}
const styles = {
    button: {
      margin: 15
    },
    input: {
        color: "white"
      }
};
  

export default Account
