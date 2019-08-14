import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import FormValidator from '../../Utils/FormValidation';
import TeamCode from './TeamCode'
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
}));

export default function SignUp() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [showSignUp, setShow] = React.useState("block")
    var submitted = "false"

    function teamCodeOpen() {
        setOpen(true)
    }
    
    function onClose() {
        setOpen(false)
    }

    var validator = new FormValidator([
        {
            field: 'teamName',
            method: "isEmpty",
            validWhen: false,
            message: 'Please provide an team name'
        },
        { 
            field: 'city',
            method: "isEmpty",
            validWhen: false,
            message: 'Please provide a city.'
        },
        { 
            field: 'state',
            method: "isEmpty",
            validWhen: false,
            message: 'Please provide a state.'
        },        
        { 
            field: 'zip',
            method: "isEmpty",
            validWhen: false,
            message: 'Please provide a zip.'
        },
        { 
            field: 'email',
            method: "isEmpty",
            validWhen: false,
            message: 'Please provide a email.'
        },
        { 
            field: 'email',
            method: "isEmail",
            validWhen: true,
            message: 'Please provide a valid email.'
        }
    ]);

    const [state, setState] = React.useState({
        teamName: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        validation: validator.valid(),
    })

    function callback(e){
        e.persist()
      
        setState( prevState => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));    
      }

    function handleSignUp(event) {
        event.preventDefault();
    
        const validation = validator.validate(state);
        
        console.log(validation);
        

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
          createTeam().then( (result) => {
            console.log(result);
            
          })
        }    
      }

      function createTeam() {
        var url = process.env.REACT_APP_API_URI + 'teams';    
        return fetch(url, {
            method: "POST",
            headers: {
             'Accept': 'application/json',
              'Content-Type': 'application/json'
            },        
            body: JSON.stringify({
              team_name: state.teamName,
              city: state.city,
              state: state.state,
              zip: state.zip,
              email: state.email,
              team_owner: localStorage.getItem("userId")
            })
        })
        .then(res => res.json())
        .then( (result) => {          
               setSuccess(true)
               setLoading(false)
               setShow("none")
               localStorage.removeItem("userId")
               return result
            },
            (error) => {
                console.log(error);
                return error
            }
        )
      }

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
        <Container component="main" maxWidth="xs" style={{ display: showSignUp }}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Create A Team
                </Typography>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style = {{ color: 'red' }} className={validation.teamName.isInvalid ? 'has-error' : undefined}>
                            <TextField
                                autoComplete="tName"
                                name="teamName"
                                variant="outlined"
                                required
                                fullWidth
                                id="teamName"
                                label="Team Name"
                                autoFocus
                                onChange={callback}
                            />
                            <span className="help-block">{validation.teamName.message}</span>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <div style = {{ color: 'red' }} className={validation.city.isInvalid ? 'has-error' : undefined}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                onChange={callback}
                            />
                            <span className="help-block">{validation.city.message}</span>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div style = {{ color: 'red' }} className={validation.state.isInvalid ? 'has-error' : undefined}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                autoComplete="state"
                                onChange={callback}
                            />
                            <span className="help-block">{validation.state.message}</span>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div style = {{ color: 'red' }} className={validation.zip.isInvalid ? 'has-error' : undefined}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="zip"
                                label="Zip"
                                name="zip"
                                autoComplete="zip"
                                onChange={callback}
                            />
                            <span className="help-block">{validation.zip.message}</span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style = {{ color: 'red' }} className={validation.zip.isInvalid ? 'has-error' : undefined}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                label="Team Email"
                                type="email"
                                id="email"
                                autoComplete="email"
                                onChange={callback}
                            />
                            <span className="help-block">{validation.email.message}</span>
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
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link onClick={teamCodeOpen} >
                        Already part of a team? Join now
                    </Link>
                    </Grid>
                </Grid>
                </form>
                <TeamCode open={open} onClose={ onClose } />
            </div>
        </Container>
        {success ? <CompletedSignUp /> : null}
        </div>
  );
}