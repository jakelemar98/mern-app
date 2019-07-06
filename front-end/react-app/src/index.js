import React from 'react'
import ReactDOM from 'react-dom'
import { ProtectedRoute } from './components/ProtectedRoute';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm';
import './App.css';
import Account from './components/Account'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/account" component={Account} />
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