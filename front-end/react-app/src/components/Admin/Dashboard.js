import React, { Component } from 'react'
import Nav from '../Utils/Nav'
import Todo from '../Todos/TodoGrid'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dashError: null,
          gitError: null,
          userError: null,
          dashIsLoaded: false,
          userIsLoaded: false,
          todos: [],
          users: [],
        };
      }
    
      componentDidMount() {
        this.fetchDashItems();
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
        const { error, todos, users, dashError, userError, dashIsLoaded, userIsLoaded } = this.state;
        if (dashError || userError) {
          return <div>Dash Error: {error.message} </div>;
        } else if (!dashIsLoaded || !userIsLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
              <div>
                <Nav menuName="Menu App Dashboard" history={this.props.history} selected={[false, true]}/>
                <Todo todos={todos} users={users} history={this.props.history}/>
              </div>
            )
        }
    }
}

export default Dashboard
