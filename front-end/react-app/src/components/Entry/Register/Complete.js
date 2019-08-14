import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Complete(props) {
    const classes = useStyles();

    function handleClick() {
      props.history.push("/home")
    }

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    Registration Complete!
                </div>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClick}
                    >
                        Proceed To User Home
                    </Button>
            </Container>
        </div>
    );
}