import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import auth from './auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: { 
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar(props) {    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function loadProfile(){
        props.history.push("/account")
    }

    function loadDashboard(){
        props.history.push("/dashboard")
    }

    function logout(){
        auth.logout( () => {
            props.history.push("/login")
        })
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                {props.menuName}
            </Typography>
            {auth.isAuthenticated() && (
                <div>
                <IconButton
                    aria-label="Account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem selected={props.selected[0]} onClick={loadProfile}>Profile</MenuItem>
                    <MenuItem selected={props.selected[1]} onClick={loadDashboard}>Dashboard</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
                </div>
            )}
            </Toolbar>
        </AppBar>
        </div>
    );
}