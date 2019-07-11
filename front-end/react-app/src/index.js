import React from 'react'
import ReactDOM from 'react-dom'
import { ProtectedRoute } from './components/ProtectedRoute';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Account from './components/Account'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/regForm" component={RegForm} />
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