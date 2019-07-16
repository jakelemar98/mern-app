import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
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

    const { vertical, horizontal, open, editMode } = snackState;
    
    function handleItemClick(key, value){
        if(editMode){
            console.log(key, value)
        } else {
            console.log("edit mode not enabled");
            
        }
    }

    function handleClose(type, id) {
            if (type === "edit"){
                setSnackState({ open: true, vertical: 'top', horizontal: 'center', editMode: true })
                setDisplay("none");
                setDisplayCanUp("block");
            } else if (type === "delete"){
                console.log("deleting");
            }
    
    //onClose();
    }
    
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="todoModal" onClick={ () => handleItemClick("title", props.data.title)} > {props.data.title} </DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem button onClick={ () => handleItemClick("message", props.data.message) }>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faComments } size="2x" />
                            </ListItemIcon>
                            <ListItemText primary="Message" secondary={props.data.message} />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={ () => handleItemClick("priority", props.data.priority)} >
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faClipboardList } size="2x" />
                            </ListItemIcon>
                            <ListItemText primary="Priority" secondary={<span style={{color: priorityArr[props.data.priority - 1] }}>{priorityWordingArr[props.data.priority -1]}</span>}/>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={ () => handleItemClick("status", props.data.status)} >
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faSyncAlt } size="2x" />
                            </ListItemIcon>
                            <ListItemText primary="status" secondary={props.data.status} />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={ () => handleItemClick("est_time", props.data.est_time) }>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faHourglassHalf } size="2x" />
                            </ListItemIcon>
                            <ListItemText primary="Estimated Time" secondary={props.data.est_time + " hrs"}  />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={ () => handleItemClick("sugg_worker", props.data.sugg_worker) }>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faUserTag } size="2x" />
                            </ListItemIcon>
                            <ListItemText primary="Inteded Worker" secondary={props.users[props.data.sugg_worker]} />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={ () => handleItemClick("user_created", props.data.user_created) }>
                            <ListItemIcon>
                                <FontAwesomeIcon color="#15317E" icon={ faUser } size="2x" />
                            </ListItemIcon>
                            <ListItemText primary="Created By" secondary={props.users[props.data.user_created]} />
                        </ListItem>
                    </List>    
                </DialogContent>
                <DialogActions>
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
                        label="cancel"
                        secondary={true}
                        style={{margin: 15, display: displayCanUp}}
                        onClick={() => handleClose("cancel", props.data._id)}
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
