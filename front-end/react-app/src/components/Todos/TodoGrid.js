import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoDialog from './TodoDialog'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UserSelect from './UserSelect';
import Status from './Status';
import Priorities from './Priorities'
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
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
      header: {
        paddingTop: 20,
      },
      fab: {
          margin: 10,

      },
      extendedIcon: {
        marginLeft: 1,
      },
      leftIcon: {
          marginRight: 5,
      }
  };

  const updatedValues = []

export default function TodoGrid(props) {    
    const {todos, users} = props;    
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const [disabled, setDisabled] = React.useState();
    const [add, setAdd] = React.useState()
    const [status, setStatus] = React.useState("")
    const [worker, setWorker] = React.useState(0)
    const [priority, setPriority] = React.useState("")
    const [curUser, setCurUser] = React.useState(0)
    const [curPrior, setCurPrior] = React.useState(0)
    const [curStat, setCurStat] = React.useState("")

    const cardColors = ["#00cc00", "#ffb84d", "#ff4d4d"]

    function handleClickOpen(index) {        
        setData(todos[index])
        setAdd(false)
        setDisabled(true)
        setOpen(true);
    }
  
    const handleClose = value => {
      setOpen(false);
    };

    const myCallback = (key, data) => {
        key = key.toLowerCase()
        updatedValues[key] = data;
        if (key === "status") {            
            setCurStat(data)
            setStatus(data)
        } else if (key === "sugg_worker") {
            setCurUser(data)
            setWorker(data)
        } else {
            setCurPrior(data)
            setPriority(data)
        }
    }

    function handleNew(){
        setData({message: "", status: "", priority: "", est_time: "", sugg_worker: "", user_created: "", title: ""})
        setAdd(true)
        setDisabled(false)        
        setOpen(true)
    }

    function handleReset(){        
        setCurUser(0);
        setCurPrior("");
        setCurStat(0);
        setWorker(0);
        setStatus("");
        setPriority("");
    }

    function CardFill(vals){
        var data = todos.filter(function(todo, index){            
            todo.index = index;
            todo.priorityColor = todo.priority - 1;
            var trueStatus, trueWorker, truePriority = false;
            
            if  (vals.status !== ""){
                trueStatus = todo.status === vals.status;
            } else {
                trueStatus = todo.status !== "Completed";
            }

            if (vals.sugg_worker !== 0){
                trueWorker = todo.sugg_worker === vals.sugg_worker;
            } else {
                trueWorker = true;
            }

            if (vals.priority !== ""){
                truePriority = todo.priority === vals.priority;
            } else {
                truePriority = true;
            }

            if (trueStatus && trueWorker && truePriority){
                return true;
            } else {
                return false;
            }
        }).map(function({title, sugg_worker, index, priorityColor}){
            return createCards(title, sugg_worker, index, priorityColor)
        });
        
        return data;
    }

    function createCards(title, sugg_worker, index, color){        
        return (
            <Grid item xs={4} key={index}>
                <Card style={{display: 'flex', height: 140, background: cardColors[color]}} >
                    <div style={styles.details}>
                        <CardContent style={styles.content}>
                            <Container>
                                <Typography onClick={() => handleClickOpen(index)} component="h4" variant="h4">
                                    {title}
                                </Typography>
                            
                                <Typography variant="subtitle1" color="textSecondary">
                                    Assigned: {users[sugg_worker]}
                                </Typography>
                            </Container>
                        </CardContent>
                    </div>
                </Card>
            </Grid>
        );
    }

    return (
            <MuiThemeProvider>
                <React.Fragment>
                <Container maxWidth="sm" component="main" style={styles.header}>
                    <Paper style={{ background: "#DCDCDC" }}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary">
                            Todos
                        </Typography>
                    </Paper>
                    <div style= {{ padding: 20 }}>
                        <Fab color="primary" variant="extended" onClick={handleNew} aria-label="Add" style={styles.fab}>
                            <AddIcon />
                            Add Todo 
                        </Fab>
                        <Fab variant="extended" aria-label="reset" onClick={handleReset} style={styles.fab}>
                            <CloudUploadIcon style={styles.leftIcon} /> 
                            Reset Sort
                        </Fab>
                    </div>
                </Container>
                <Container maxWidth="lg">
                    <Grid container spacing={3} style={styles.root} direction="row" justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <UserSelect user = { curUser } users = { props.users } description = { "Assigned Worker" } field = { "sugg_worker" } callBack = { myCallback } />
                        </Grid>
                        <Grid item xs={4}>
                            <Priorities priority = { curPrior } callBack = { myCallback } />
                        </Grid>
                        <Grid item xs={4}>
                            <Status status = { curStat } callBack = { myCallback } />
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg">
                    <Grid container spacing={3} style={styles.root} direction="row" justify="center" alignItems="center">
                        <CardFill status = { status } sugg_worker = { worker } priority = { priority } />
                    </Grid>
                </Container>
                    <TodoDialog open={ open } onClose={ handleClose } data={ data } users={ users } history={ props.history } disabled = { disabled } add = { add ? 1 : 0} />
                </React.Fragment>
            </MuiThemeProvider>
    );
}

