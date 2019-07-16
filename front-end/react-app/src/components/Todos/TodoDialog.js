import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DialogActions from '@material-ui/core/DialogActions';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt , faComments , faClipboardList , faHourglassHalf , faUserTag , faUser } from '@fortawesome/free-solid-svg-icons';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Snackbar from '@material-ui/core/Snackbar';
import Portal from '@material-ui/core/Portal';
import Priorities from './Priorities';
import Status from './Status';
import UserSelect from './UserSelect';
import Message from './TextFields'

const updatedValues   = [];

export default function TodoDialog(props) {
    const { onClose, selectedValue, ...other } = props;
    const [display, setDisplay] = React.useState("block");
    const [displayCanUp, setDisplayCanUp] = React.useState("none");
    const [disabled, setDisabled] = React.useState(true)


export default function TodoDialog(props) {
    const { onClose, selectedValue, ...other } = props;
    const priorityArr = ["green", "orange", "red"];
    const priorityWordingArr = ['Low Priority - No need to stress', 'Medium Priority - Uhm might want to look at this', 'HIGH PRIORITY - THIS NEEDS TO GET DONE ASAP'];
    const [display, setDisplay] = React.useState("block");
    const [displayCanUp, setDisplayCanUp] = React.useState("none");
    const [snackState, setSnackState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        editMode: false
    });
    updatedValues['message'] = props.data.message;
    updatedValues['priority'] = props.data.priority;
    updatedValues['status'] = props.data.status;
    updatedValues['est_time'] = props.data.est_time;
    updatedValues['created_by'] = props.data.created_by;
    updatedValues['sugg_worker'] = props.data.sugg_worker;
    updatedValues['id'] = props.data._id;


    const { vertical, horizontal, open } = snackState;
    
    function handleClose(type, id) {
            if (type === "edit"){
                setSnackState({ open: true, vertical: 'top', horizontal: 'center', editMode: true })
                setDisplay("none");
                setDisplayCanUp("block");
                setDisabled(false);
            } else if (type === "update"){
                console.log(updatedValues);
            }
    //onClose();
    }

    const myCallback = (key, data) => {
        key = key.toLowerCase()
        updatedValues[key] = data;
    }

    
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="todoModal"> {props.data.title} </DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faComments } size="2x" />
                            </ListItemIcon>
                            <Message initialMessage = { props.data.message } disabled = { disabled } isMessage = { true } label = { "Message" } field = { "message" } callBack = { myCallback } />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faClipboardList } size="2x" />
                            </ListItemIcon>
                            <Priorities priority = { props.data.priority } disabled = { disabled } callBack = { myCallback } />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faSyncAlt } size="2x" />
                            </ListItemIcon>
                            <Status status = { props.data.status } disabled = {disabled} callBack = { myCallback } />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faHourglassHalf } size="2x" />
                            </ListItemIcon>
                            <Message initialMessage = { props.data.est_time } disabled = { disabled } isMessage = { false } label = { "Estimated Time "} field = { "est_time" } callBack = { myCallback }  />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faUserTag } size="2x" />
                            </ListItemIcon>
                            <UserSelect user = { props.data.sugg_worker } users = { props.users } disabled = { disabled } description = { "Intended Worker" } field = { "sugg_worker" } callBack = { myCallback } />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faUser } size="2x" />
                            </ListItemIcon>
                            <UserSelect user = { props.data.user_created } users = { props.users } disabled = { disabled } description = { "Created By" } field = { "created_by" } callBack = { myCallback } />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <RaisedButton
                        label="cancel"
                        secondary={true}
                        style={{margin: 15}}
                        onClick={() => {
                            setSnackState({ open: false, vertical: 'top', horizontal: 'center', editMode: false })
                            setDisplay("block");
                            setDisplayCanUp("none");
                            setDisabled(true)
                            onClose()
                        }}
                    />
                    <RaisedButton

                            label="Edit"
                            primary={true}
                            style={{margin: 15, display: display}}
                            onClick={() => handleClose("edit", props.data._id)}
                    />
                    <RaisedButton
                        label="Delete"
                        secondary={true}
                        style={{margin: 15, display: display}}
                        onClick={() => handleClose("delete", props.data._id)}
                    />
                    <RaisedButton
                        label="Update"
                        primary={true}
                        style={{margin: 15, display: displayCanUp}}
                        onClick={() => handleClose("update", props.data._id)}
                    />
                </DialogActions>
        </Dialog>
        <Portal>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={<span>Click on the field you wish too edit</span>}
        />
        </Portal>
        </div>
    );
    }

const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
