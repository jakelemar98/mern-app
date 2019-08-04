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
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps(props) {
  return ['Sign Up', 'Team Sign Up', 'Complete'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SignUpForm />;
    case 1:
      return <TeamSignUp />;
    case 2:
      return <Complete />;
    default:
      return 'Unknown step';
  }
}

export default function Register(props) {
    const { onClose, selectedValue, ...other } = props;

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    function handleNext() {
        if(runSignUpChecks()){
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }  else {
            alert("Try Filling Out the Form Properly")
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

    function runSignUpChecks(){
        return true;
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            if (activeStep === steps.length - 1) {
                                                handleFinish()
                                            } else {
                                                handleNext()
                                            }
                                        }}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
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