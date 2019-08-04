import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
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

export default function TeamCode(props) {
    const { onClose, selectedValue, ...other } = props;

    const classes = useStyles();

    function handleClose(){
        onClose();
    }


    return (
        <div className={classes.root}>
            <Dialog onClose={() => handleClose("close")} aria-labelledby="simple-dialog-title" {...other}>
                    <DialogTitle id="todoModal">
                        <List>
                            <ListItem>
                                Team Code                           
                            </ListItem>
                        </List>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                                </Avatar>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                        <TextField
                                            autoComplete="email"
                                            name="email"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Your Email"
                                            autoFocus
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="code"
                                            label="Team Code"
                                            id="code"
                                            autoComplete="code"
                                        />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Join Team
                                    </Button>
                                </form>
                            </div>
                        </Container>
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