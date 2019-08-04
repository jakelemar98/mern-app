import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 240,
    },
  }));
  
export default function Message(props) {
    const {initialMessage, disabled, isMessage, label, field} = props;
    const [message, setMessage] = React.useState(initialMessage)
    const classes = useStyles();

    function handleChange(e){
        setMessage(e.target.value)
        console.log(field);
        
        props.callBack(field, e.target.value)
    }

    return (
        <div>
            <TextField
                disabled = {disabled}
                id="standard-textarea"
                label={label}
                placeholder={label}
                multiline = {isMessage}
                value={message}
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
            />
        </div>
    )
}
