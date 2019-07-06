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
        var url = process.env.REACT_APP_API_URI + 'companies';

        console.log(url, process.env.NODE_ENV)

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
