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

export default function Status(props) {
    const classes = useStyles();

    const colorArr = ['blue', 'orange', 'green'];
    const statusArr = ['Created', 'In Development', 'Completed'];
    const { status } = props;
    
    const statuses = statusArr.map((item, key) =>
        <MenuItem style={{color: colorArr[key]}} value={item} key={key}>{item}</MenuItem>
    );
    
    const statusValIndex = statusArr.indexOf(status)
    const [statusVal, setStatusVal] = React.useState(status)
    const [statusColor, setStatusColor] = React.useState(colorArr[statusValIndex])

    function handleChange(event) {
        setStatusVal(event.target.value);
        const newColor = statusArr.indexOf(event.target.value)
        setStatusColor(colorArr[newColor])  
        props.callBack("status", event.target.value)      
    }

    return (
        <div>
            <FormControl className={ classes.formControl } disabled={props.disabled} >
                <InputLabel htmlFor="demo-controlled-open-select">Status</InputLabel>
                <Select
                    value={ statusVal }
                    inputProps={{
                        name: 'status',
                        id: 'demo-controlled-open-select',
                    }}
                    onChange={handleChange}
                    style={{color: statusColor}}
                    >
                    { statuses }
                </Select>
            </FormControl>
        </div>
    )
}
