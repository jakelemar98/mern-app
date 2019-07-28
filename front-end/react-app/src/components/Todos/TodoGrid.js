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
      header: {
        padding: 15,
      },
      fab: {
          margin: 1,

      },
      extendedIcon: {
        marginLeft: 1,
      },
      leftIcon: {
          marginRight: 5,
      }
  };

export default function TodoGrid(props) {    
    const {todos, users} = props;    
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const [disabled, setDisabled] = React.useState();
    const [add, setAdd] = React.useState()

    function handleClickOpen(index) {
        setData(todos[index])
        setAdd(false)
        setDisabled(true)
        setOpen(true);
    }
  
    const handleClose = value => {
      setOpen(false);
    };

    function handleNew(){
        setData({message: "", status: "", priority: "", est_time: "", sugg_worker: "", user_created: "", title: ""})
        setAdd(true)
        setDisabled(false)        
        setOpen(true)
    }

    return (
            <MuiThemeProvider>
                <React.Fragment>
                <Container maxWidth="sm" component="main" style={styles.header}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Todos For Dev
                    </Typography>
                </Container>
                    <Grid container spacing={3} style={styles.root}>
                        {todos.map((todo, index) => (
                        <Grid item xs={3} key={index}>
                            <Card style={ styles.card } >
                                <div style={styles.details}>
                                    <CardContent style={styles.content}>
                                        <Typography onClick={() => handleClickOpen(index)} component="h4" variant="h4">
                                            {todo.title}
                                        </Typography>
                                    
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Assigned: {users[todo.sugg_worker]}
                                        </Typography>
                                    </CardContent>
                                </div>
                                {/* <CardMedia
                                    style= {styles.cover}
                                    image={todoImg}
                                    title="todos"
                                /> */}
                            </Card>
                        </Grid>
                        ))}
                        <Grid item xs={2} key={"actions"}  >
                            <Card style={ styles.card } >
                                <div style={styles.details}>
                                    <div style={{ display:'flex', justifyContent:'center' }}>
                                        <CardContent style={styles.content} >
                                            <div style={{padding: 5 }} >
                                                <Fab color="primary" variant="extended" onClick={handleNew} aria-label="Add" style={styles.fab}>
                                                    <AddIcon />
                                                    Add Todo 
                                                </Fab>
                                            </div>
                                            <div style={{padding: 5 }}>
                                                <Fab variant="extended" aria-label="Delete" style={styles.fab}>
                                                    <CloudUploadIcon style={styles.leftIcon} /> 
                                                    Show All
                                                </Fab>
                                            </div>
                                        </CardContent>
                                    </div>
                                </div>

                            </Card>
                        </Grid>
                    </Grid>
                    <TodoDialog open={ open } onClose={ handleClose } data={ data } users={ users } history={ props.history } disabled = { disabled } add = { add ? 1 : 0} />
                </React.Fragment>
            </MuiThemeProvider>
    );
}

