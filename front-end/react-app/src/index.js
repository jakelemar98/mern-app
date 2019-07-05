import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Dashboard from './components/Dashboard'

const routing = (
  <Router>

    <div>
      <Route exact path="/" component={App} />
<<<<<<< HEAD
      <Route path="/Dashboard" component={Dashboard} />
=======
      <Route path="/dashboard" component={Dashboard} />
>>>>>>> 200d0d177b788aa22fe4d1c9c1174f0c11958376
    </div>

  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
