import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import todoImg from '../static/images/todos.png'; 
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = {
    root: {
        flexGrow: 1,
        padding: 15
      },
      title: {
        flexGrow: 1,
      },
      card: {
          display: 'flex',
          height: 140
      },
      details: {
          display: 'flex',
          flexDirection: 'column',
      },
      content: {
          flex: '1 0 auto'
      },
      cover: {
          width: 150,
      },
  };

export default function TodoGrid(props) {    
    const {todos, users} = props    
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    function handleClickOpen(index) {
        setData(todos[index])
        console.log(data);
              
        setOpen(true);
    }
  
    const handleClose = value => {
      setOpen(false);
    };

    return (
        <div>
            <Grid container spacing={3} style={styles.root}>
                {todos.map((todo, index) => (
                <Grid item xs={4} key={index}>
                    <Card style={ styles.card } >
                        <div style={styles.details}>
                            <CardContent style={styles.content}>
                                <a onClick={() => handleClickOpen(index)}>
                                    <Typography component="h4" variant="h4">
                                        {todo.title}
                                    </Typography>
                                </a>
                            
                                <Typography variant="subtitle1" color="textSecondary">
                                    Assigned: {users[todo.sugg_worker]}
                                </Typography>
                            </CardContent>
                        </div>
                        <CardMedia
                            styles={styles.cover}
                            image={todoImg}
                            title="todos"
                        />
                    </Card>
                </Grid>
                ))}
            </Grid>
            <SimpleDialog open={open} onClose={handleClose} data={data}/>
        </div>

    );
}

const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
function SimpleDialog(props) {
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="todoModal"> {props.data.title} </DialogTitle>
            <DialogContent dividers>
                <List>
                    <ListItem button>
                        <ListItemText primary="Message" secondary={props.data.message} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Priority" secondary={props.data.priority} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="status" secondary={props.data.status} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Estimated Time" secondary={props.data.est_time + " hrs"}  />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Inteded Worker" secondary={props.data.sugg_worker} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Created By" secondary={props.data.user_created} />
                    </ListItem>
                </List>    
          </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    selectedValue: PropTypes.string,
    data: PropTypes.object
  };