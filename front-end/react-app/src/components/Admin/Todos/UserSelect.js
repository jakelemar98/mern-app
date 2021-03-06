import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
      },
    }),
  );
export default function UserSelect(props) {
    const classes = useStyles();
    const { user, users } = props;    

    const usersList = users.map((item, key) => 
        <MenuItem style={{color: "green"}} value={key} key={key}>{item}</MenuItem>
    );
    
    function handleChange(event) {
        props.callBack(props.field, event.target.value)
    }

    return (
        <div>
            <FormControl className={ classes.formControl } disabled={props.disabled} >
                <InputLabel htmlFor="user-selct">{ props.description }</InputLabel>
                <Select
                    value={ user }
                    inputProps={{
                        name: 'age',
                        id: 'user-select',
                    }}
                    onChange={handleChange}
                    style={{color: "green"}}
                    >
                    { usersList }
                </Select>
            </FormControl>
        </div>
    )
}
