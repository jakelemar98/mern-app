import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Dashboard from './components/Dashboard'

const routing = (
  <Router>

    <div>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
    </div>

  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
