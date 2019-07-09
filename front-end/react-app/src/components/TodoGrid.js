import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import todoImg from '../static/images/todos.png'; 

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
    return (
        <Grid container spacing={3} style={styles.root}>
            {todos.map((todo) => (
            <Grid item xs={4} key={todo._id}>
                <Card style={ styles.card } >
                    <div style={styles.details}>
                        <CardContent style={styles.content}>
                            <Typography component="h4" variant="h4">
                                {todo.title}
                            </Typography>
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
    );
}