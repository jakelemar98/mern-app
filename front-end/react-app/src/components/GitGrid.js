import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import gitImg from '../static/images/github.svg'; 

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

export default function GitGrid(props) {    
    const {gitItems, url} = props
    return (
        <Grid container spacing={3} style={styles.root}>
            {gitItems.map((item) => (
            <Grid item xs={4} key={item.name}>
                <a href={url + item.name} >
                <Card style={ styles.card } >
                    <div style={styles.details}>
                    <CardContent style={styles.content}>
                        <Typography component="h5" variant="h5">
                        {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                        mern-app
                        </Typography>
                    </CardContent>
                    </div>
                        <CardMedia
                        style={styles.cover}
                        image={gitImg}
                        title="Live from space album cover"
                        />
                </Card>
                </a>
            </Grid>
            ))}
        </Grid>
    );
}