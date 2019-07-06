import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);