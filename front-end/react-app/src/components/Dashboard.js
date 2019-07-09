import React, { Component } from 'react'
import Nav from './Nav'
import Todo from './TodoGrid'
import Git from './GitGrid'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dashError: null,
          gitError: null,
          userError: null,
          dashIsLoaded: false,
          gitIsLoaded: false,
          userIsLoaded: false,
          todos: [],
          gitItems: [],
          users: [],
          baseGitUrl: "https://github.com/jakelemar98/mern-app/tree/"
        };
      }
    
      componentDidMount() {
        this.fetchDashItems();
        this.fetchGitRepos();
        this.fetchUsers();
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

      fetchUsers = e => {
        var url = process.env.REACT_APP_API_URI + 'users';

        var token = localStorage.getItem('token');

        fetch(url, {
            method: "GET",
          headers: {
            'Authorization': 'bearer ' + token
          }
        })
          .then(res => res.json())
          .then( (result) => {
              var userArr = []
              var resultsArr = result.results
              resultsArr.forEach(element => {
                userArr[element.user_id] = element.name
              });
              this.setState({
                  userIsLoaded: true,
                  users: userArr
              });                
            },
            (error) => {
              this.setState({
                userIsLoaded: true,
                userError: error
              });
            }
          )
      }

      render() {
        const { error, todos, gitItems, users, dashError, gitError, userError, dashIsLoaded, gitIsLoaded, userIsLoaded, baseGitUrl } = this.state;
        if (dashError || gitError || userError) {
          return <div>Dash Error: {error.message} Git Error: {gitError.message}</div>;
        } else if (!dashIsLoaded || !gitIsLoaded || !userIsLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
              <div>
                <Nav menuName="App Dashboard" history={this.props.history} selected={[false, true]}/>
                <Todo todos={todos} users={users}/>
                <br></br>
                <Git gitItems={gitItems} url={baseGitUrl} />
              </div>
            )
        }
    }
}

export default Dashboard
