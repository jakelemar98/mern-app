import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import FormValidator from '../../Utils/FormValidation';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    // margin: theme.spacing(1),
    // position: 'relative',
  }, 
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  var submitted = "false"

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [showSignup, setShow] = React.useState("block")

  var validator = new FormValidator([
    {
      field: 'first',
      method: "isEmpty",
      validWhen: false,
      message: 'Please provide an first name'
    },
    { 
      field: 'last',
      method: "isEmpty",
      validWhen: false,
      message: 'Please provide a last name.'
    },
    { 
      field: 'username',
      method: "isEmpty",
      validWhen: false,
      message: 'Please provide a username.'
    },        
    { 
      field: 'password',
      method: "isEmpty",
      validWhen: false,
      message: 'Please provide a password.'
    },
    { 
      field: 'confirm',
      method: "isEmpty",
      validWhen: false,
      message: 'Please provide a password.'
    },
    { 
      field: 'confirm',
      method: passwordMatch,
      validWhen: true,
      message: 'Please provide a matching password.'
    }
  ]);

  function passwordMatch(){
    return state.password === state.confirm
  }

  const [state, setState] = React.useState({
    first: '',
    last: '',
    username: '',
    password: '',
    confirm: '',
    validation: validator.valid(),
    userExists: false,
    userExistsMessage: ""
  })

  function Callback(e){
    e.persist()
  
    setState( prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));    
  }

  function handleSignUp(event) {
    event.preventDefault();

    const validation = validator.validate(state);
    
    setState( prevState => ({
        ...prevState,
        validation 
      })
    );

    submitted = true;

    if (validation.isValid) {
      if (!loading) {
        setSuccess(false)
        setLoading(true)
      }
      checkUser().then( (result) => {
        if (result === true) {
          setState( prevState => ({
              ...prevState,
              userExists: false,
              userExistsMessage: ""
            })
          )
          createUser().then( (result) => {
            if (result.response) {
              localStorage.setItem("userId", result.response)
              signInUser().then( (result) => {
                localStorage.setItem("token", result.token)
                props.callback()
              })
              
            } else {
              alert("error creating user")
            }
          })
        } else {
          setState( prevState => ({
              ...prevState,
              userExists: true,
              userExistsMessage: "Username already exists"
            })
          )
          setLoading(false)
        }
      })
    }    
  }

  function checkUser(){        
    var url = process.env.REACT_APP_API_URI + 'user/' + state.username;
    return fetch(url, {
        method: "GET",
    })
    .then(res => res.json())
    .then( (result) => {          
            if(result.result === true){                
                return false
            } else {
                return true
            }
        },
        (error) => {
            return false
        }
    )
  }

  function createUser(){
    var url = process.env.REACT_APP_API_URI + 'users';    
    return fetch(url, {
        method: "POST",
        headers: {
         'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
          first: state.first,
          last: state.last,
          username: state.username,
          password: state.password,
        })
    })
    .then(res => res.json())
    .then( (result) => {          
           setSuccess(true)
           setLoading(false)
           setShow("none")
           return result
        },
        (error) => {
            console.log(error);
            return error
        }
    )
  }

  function signInUser() {    
    // e.preventDefault();
    var url = process.env.REACT_APP_API_URI + 'login'
    return fetch(url, {
    	method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            username: state.username,
            password: state.password,
          })
    })
    .then((response) => {
      if (response.status === 200){
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn("big error" + error));    
  };

  function CompletedSignUp() {
    return (      
      <div>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CheckIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up Complete!
            </Typography>
        </div>
        </Container>
      </div>
    )
  }
  
  let validation = submitted === false ? validator.validate(state) : state.validation                     

  return (
      <div>
        <Container component="main" maxWidth="xs" style={{ display: showSignup }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div style = {{ color: 'red' }} className={validation.first.isInvalid ? 'has-error' : undefined}>
                    <TextField
                      autoComplete="first"
                      name="first"
                      variant="outlined"
                      required
                      fullWidth
                      id="first"
                      label="First Name"
                      autoFocus
                      onChange={Callback}
                    />
                    <span className="help-block">{validation.first.message}</span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style = {{ color: 'red' }} className={validation.last.isInvalid ? 'has-error' : undefined}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="last"
                      label="Last Name"
                      name="last"
                      autoComplete="lname"
                      onChange={Callback}
                    />
                      <span className="help-block">{validation.last.message}</span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style = {{ color: 'red' }} className={(validation.username.isInvalid || state.userExists) ? 'has-error' : undefined}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={Callback}
                    />
                    <span className="help-block">{validation.username.message}</span>
                    <span className="help-block">{state.userExistsMessage}</span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style = {{ color: 'red' }} className={validation.password.isInvalid ? 'has-error' : undefined}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      onChange={Callback}
                    />
                      <span className="help-block">{validation.password.message}</span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style = {{ color: 'red' }} className={validation.confirm.isInvalid ? 'has-error' : undefined}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirm"
                      label="Confirm Password"
                      type="password"
                      id="confirm"
                      autoComplete="confirm"
                      onChange={Callback}
                    />
                    <span style = {{ color: 'red' }} className="help-block" >
                      {validation.confirm.message}
                    </span>
                  </div>
                </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                  {loading && <CircularProgress size={128} className={classes.buttonProgress} />}
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        {success ? <CompletedSignUp /> : null}
      </div>
  );
}