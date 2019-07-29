import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MuiDialogContent from '@material-ui/core/DialogContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import RaisedButton from 'material-ui/RaisedButton';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 240,
    },
  }));

  const passwordArr = [];

export default function AccountPassDialog(props) {
    const { onClose, selectedValue, ...other } = props;

    passwordArr['oldPass'] = "";
    passwordArr['newPass'] = "";
    passwordArr['confirmPass'] = "";

    function handleClose(id) {
        var url = process.env.REACT_APP_API_URI + 'users/password/' + id;
        
        var token = localStorage.getItem("token");   
        
        if (passwordArr["newPass"] === passwordArr["confirmPass"]){
            fetch(url, {
                method: "PUT",
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                oldPassword: passwordArr["oldPass"],
                newPassword: passwordArr["newPass"]
              })
            })
            .then((response) => {
                if (response.status === 200){
                  return response.json()
                } else if (response.status === 400) {
                    alert("Old Password does not match")
                } else if (response.status === 403){
                  alert("Please sign in and try again")
                  props.history.push("/")
                }
            }).then((responseData) => {
                if(responseData.obj.nModified > 0){
                    window.location.reload();
                }
            })
        } else {
            alert("New Passwords do not match.")
        }
    }

    const classes = useStyles();

    function handleChange(passVal, e){
        passwordArr[passVal] = e.target.value;
    }

    return (
        <div>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Set New Account Password</DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faLock } size="2x" />
                            </ListItemIcon>
                            <TextField
                                id="standard-textarea"
                                type="password"
                                placeholder={"Current Password"}
                                label={"Current Password"}
                                className={classes.textField}
                                margin="normal"
                                onChange={ (e) => handleChange("oldPass", e) }
                           />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faLockOpen } size="2x" />
                            </ListItemIcon>
                            <TextField
                                type="password"
                                placeholder={"New Password"}
                                label={"New Password"}
                                className={classes.textField}
                                margin="normal"
                                onChange={ (e) => handleChange("newPass", e) }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faLockOpen } size="2x" />
                            </ListItemIcon>
                            <TextField
                                type="password"
                                placeholder={"Confirm Password"}
                                abel={"Confirm Password"}
                                className={classes.textField}
                                margin="normal"
                                onChange={ (e) => handleChange("confirmPass", e) }
                            />
                        </ListItem>
                        <Divider />
                    </List>
                </DialogContent>
                <DialogActions>
                    <RaisedButton
                        label="cancel"
                        secondary={true}
                        style={{margin: 15}}
                        onClick={() => {
                            onClose()
                        }}
                    />
                    <RaisedButton

                            label="Update"
                            primary={true}
                            style={{margin: 15}}
                            onClick={() => handleClose( props.id)}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
}
const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
