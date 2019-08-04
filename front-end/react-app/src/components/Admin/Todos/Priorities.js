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

export default function Priorities(props) {
    const classes = useStyles();
    const priorityArr = ["green", "orange", "red"];
    const priorityWordingArr = ['Low Priority', 'Medium Priority', 'HIGH PRIORITY'];
    const { priority } = props;
    const priorities = priorityWordingArr.map((item, key) =>
        <MenuItem style={{color: priorityArr[key]}} value={key + 1} key={key}>{item}</MenuItem>
    );    

    function handleChange(event) {
        props.callBack("priority", event.target.value)
    }

    return (
        <div>
            <FormControl className={ classes.formControl } disabled={props.disabled} >
                <InputLabel htmlFor="demo-controlled-open-select">Priority</InputLabel>
                <Select
                    value={ priority }
                    inputProps={{
                        name: 'age',
                        id: 'demo-controlled-open-select',
                    }}
                    onChange={handleChange}
                    style={{color: priorityArr[priority - 1]}}
                    >
                    { priorities }
                </Select>
            </FormControl>
        </div>
    )
}
