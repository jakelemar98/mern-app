import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import SignUpForm from './SignUpForm'; 
import TeamSignUp from './TeamSignUp';
import Complete from './Complete';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1)
},
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function Register(props) {
    const { onClose, selectedValue, ...other } = props;
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    var signUpArr = [];

    function handleNext(page) {
        if (page === "team") {
            createTeam().then( () => {
                return true;
            });
        } else if(page === "sign"){            
            checkUser().then( (result) => {
                if (result) {                    
                    setActiveStep(prevActiveStep => prevActiveStep + 1);
                } else {
                    alert("Try Filling Out the Form Properly")
                }
            });
        }
    }

    function getSteps() {
        return ['Sign Up', 'Team Sign Up', 'Complete'];
      }
      
      function getStepContent(step) {
        switch (step) {
          case 0:
            return <SignUpForm callback={signUpCallback}/>;
          case 1:
            return <TeamSignUp />;
          case 2:
            return <Complete />;
          default:
            return 'Unknown step';
        }
      }

      function getNextButton(step) {
        switch (step) {
            case 0:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { handleNext("sign") }}
                        className={classes.button}
                    >
                        Next
                    </Button>
                )
            case 1:
                return (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { handleNext("team") }}
                            className={classes.button}
                        >
                            Next
                        </Button>
                    )
            case 2:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { handleFinish() }}
                        className={classes.button}
                    >
                        Next
                    </Button>
                )
            default:
                return 'Unknown step';
        }
      }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleFinish(){
        onClose()
    }

    function handleClose(){
        onClose();
    }

    function createTeam(){
        console.log("created team");
    }

    function checkUser(){        
        var url = process.env.REACT_APP_API_URI + 'user/' + signUpArr['username'];
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

    function signUpCallback(e) {
        signUpArr[e.target.name] = e.target.value        
    }

    return (
        <div className={classes.root}>
            <Dialog onClose={() => handleClose("close")} aria-labelledby="simple-dialog-title" {...other}>
                    <DialogTitle id="todoModal">
                        <List>
                            <ListItem>
                                Register                           
                            </ListItem>
                        </List>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                            })}
                        </Stepper>
                            <div  className={classes.instructions}>
                                <div>
                                    {getStepContent(activeStep)}
                                </div>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                    {getNextButton(activeStep)}
                                </div>
                            </div>
                    </DialogContent>
                </Dialog>
            </div>
    );
}
const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);