import React, { Component } from 'react'
import Nav from './Nav'

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
                <Nav menuName="App Dashboard" history={this.props.history} selected={[false, true]}/>
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                          {item.name}
                        </li>
                    ))}
                </ul>
              </div>
            )
        }
    }
}

export default Dashboard
