import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from '../App'
import Dashboard from './Dashboard'
const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />

    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))