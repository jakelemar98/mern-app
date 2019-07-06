import React, { Component } from 'react'
import auth from './auth'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        var url= "";

        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
          url = 'http://127.0.0.1:5004/api/companies';
        } else {
          url = 'http://backend.jalema01-mern-app.com/api/companies';
        }

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
                    isLoaded: true,
                    items: result.results
                });                
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, items } = this.state;
        console.log(this.state);
        
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                <div>
                <h1>App Dashboard</h1>
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                        {item.name} {item.price}
                        </li>
                    ))}
                </ul>
                    <button onClick={
                        () => {
                            auth.logout( () => {
                                this.props.history.push("/")
                            })
                        }
                    }>
                        Logout
                    </button>
                </div>
            )
        }
    }
}

export default Dashboard
