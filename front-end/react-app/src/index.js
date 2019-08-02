import React from 'react'
import ReactDOM from 'react-dom'
import { ProtectedRoute } from './components/ProtectedRoute';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Account from './components/Account/Account'
import Welcome from './components/Welcome'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/welcome" component={Welcome}/>
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
