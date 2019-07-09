import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Nav from './Nav'
import gitImg from '../static/images/github.svg'; 


export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dashError: null,
          gitError: null,
          dashIsLoaded: false,
          gitIsLoaded: false,
          todos: [],
          gitItems: [],
          baseGitUrl: "https://github.com/jakelemar98/mern-app/tree/"
        };
      }
    
      componentDidMount() {
        this.fetchDashItems();
        this.fetchGitRepos();
      }
      
      fetchDashItems = e => {
        var url = process.env.REACT_APP_API_URI + 'todos';

        var token = localStorage.getItem('token');

        fetch(url, {
            method: "GET",
          headers: {
            'Authorization': 'bearer ' + token
          }
        })
          .then(res => res.json())
          .then( (result) => {
                this.setState({
                    dashIsLoaded: true,
                    todos: result.results
                });                
            },
            (error) => {
              this.setState({
                dashIsLoaded: true,
                dashError: error
              });
            }
          )
      }

      fetchGitRepos = e => {
        var url = "https://api.github.com/repos/jakelemar98/mern-app/branches"

        fetch(url, {
            method: "GET"
        })
          .then(res => res.json())
          .then( (result) => {              
              this.setState({
                  gitIsLoaded: true,
                  gitItems: result
              });                
            },
            (error) => {
              this.setState({
                gitIsLoaded: true,
                gitError: error
              });
            }
          )
      }

      render() {
        const { error, todos, gitItems,dashError, gitError, dashIsLoaded, gitIsLoaded, baseGitUrl } = this.state;

        if (dashError || gitError) {
          return <div>Dash Error: {error.message} Git Error: {gitError.message}</div>;
        } else if (!dashIsLoaded || !gitIsLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
              <div>
                <Nav menuName="App Dashboard" history={this.props.history} selected={[false, true]}/>
                  <Grid container spacing={3} style={styles.root}>
                    {todos.map((todo) => (
                      <Grid item xs={4} key={todo._id}>
                        <Card style={ styles.card } >
                          <div style={styles.details}>
                            <CardContent style={styles.content}>
                              <Typography component="h5" variant="h5">
                                {todo.title}
                              </Typography>
                              <Typography variant="subtitle1" color="textSecondary">
                                {todo.sugg_worker}
                              </Typography>
                            </CardContent>
                          </div>
                          <CardMedia
                            style={styles.cover}
                            image={gitImg}
                            title="Live from space album cover"
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                <br></br>
                <div>
 
                  <Grid container spacing={3} style={styles.root}>
                  {gitItems.map((item) => (
                    <Grid item xs={4} key={item.name}>
                      <a href={baseGitUrl + item.name} >
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
                </div>
              </div>
               
            )
        }
    }
}
const styles = {
    root: {
      padding: 15
    },
    card: {
      display: 'flex',
      height: 120
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
    },
    playIcon: {
      height: 38,
      width: 38,
    }
}


export default Dashboard
