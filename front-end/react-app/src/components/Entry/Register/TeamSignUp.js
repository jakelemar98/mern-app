import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TeamCode from './TeamCode'

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

    function teamCodeOpen() {
        setOpen(true)
    }
    
    function onClose() {
        setOpen(false)
    }

    return (
        <Container component="main" maxWidth="xs">
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
                <TextField
                    autoComplete="tName"
                    name="teamName"
                    variant="outlined"
                    required
                    fullWidth
                    id="teamName"
                    label="Team Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        autoComplete="state"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="zip"
                        label="Zip"
                        name="zip"
                        autoComplete="zip"
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="email"
                    label="Team Email"
                    type="email"
                    id="email"
                    autoComplete="current-password"
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
                Create Team
            </Button>
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
  );
}