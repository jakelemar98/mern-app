import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import todoImg from '../static/images/todos.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoDialog from './TodoDialog'

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
    const {todos, users} = props;    
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});

    function handleClickOpen(index) {
        setData(todos[index])              
        setOpen(true);
    }
  
    const handleClose = value => {
      setOpen(false);
    };

    return (
            <MuiThemeProvider>
                <React.Fragment>
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
                    <TodoDialog open={ open } onClose={ handleClose } data={ data } users={ users } />
                </React.Fragment>
            </MuiThemeProvider>
    );
}


  
// function TodoDialog(props) {
//   const { onClose, selectedValue, ...other } = props;
//   const priorityArr = ["green", "orange", "red"];    
//   const [display, setDisplay] = React.useState("block");
//   const [displayCanUp, setDisplayCanUp] = React.useState("none");

//   function handleClose(type, id) {
//         if (type === "edit"){
//             setDisplay("none");
//             setDisplayCanUp("block");
//         } else if (type === "delete"){
//             console.log("deleting");
//         }

// //onClose();
//   }

//   return (
//     <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
//         <DialogTitle id="todoModal"> {props.data.title} </DialogTitle>
//         <DialogContent dividers>
//             <List>
//                 <ListItem button>
//                     <ListItemText primary="Message" secondary={props.data.message} />
//                 </ListItem>
//                 <Divider />
//                 <ListItem button>
//                     <ListItemText primary="Priority" secondary={<FontAwesomeIcon color={priorityArr[props.data.priority - 1]} icon={ faExclamationTriangle }/>}/>
//                 </ListItem>
//                 <Divider />
//                 <ListItem button>
//                     <ListItemText primary="status" secondary={props.data.status} />
//                 </ListItem>
//                 <Divider />
//                 <ListItem button>
//                     <ListItemText primary="Estimated Time" secondary={props.data.est_time + " hrs"}  />
//                 </ListItem>
//                 <Divider />
//                 <ListItem button>
//                     <ListItemText primary="Inteded Worker" secondary={props.users[props.data.sugg_worker]} />
//                 </ListItem>
//                 <Divider />
//                 <ListItem button>
//                     <ListItemText primary="Created By" secondary={props.users[props.data.user_created]} />
//                 </ListItem>
//             </List>    
//         </DialogContent>
//         <DialogActions>
//         <RaisedButton
//                 label="Edit"
//                 primary={true}
//                 style={{margin: 15, display: display}}
//                 onClick={() => handleClose("edit", props.data._id)}
//             />
//             <RaisedButton
//                 label="Delete"
//                 secondary={true}
//                 style={{margin: 15, display: display}}
//                 onClick={() => handleClose("delete", props.data._id)}
//             />
//              <RaisedButton
//                 label="cancel"
//                 secondary={true}
//                 style={{margin: 15, display: displayCanUp}}
//                 onClick={() => handleClose("cancel", props.data._id)}
//             />
//             <RaisedButton
//                 label="Update"
//                 primary={true}
//                 style={{margin: 15, display: displayCanUp}}
//                 onClick={() => handleClose("update", props.data._id)}
//             />
//         </DialogActions>
//     </Dialog>
//   );
// }
