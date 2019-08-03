import React from 'react'
import ReactDOM from 'react-dom'
import { ProtectedAdminRoute } from './components/Utils/ProtectedAdminRoute';
import { ProtectedRoute } from './components/Utils/ProtectedRoute';
import NotFound from './components/Utils/NotFound'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Admin/Dashboard'
import LoginForm from './components/Entry/LoginForm';
import Register from './components/Entry/Register'
import Welcome from './components/Entry/Welcome'
import Account from './components/Account/Account'
import homepage from './components/Management/Homepage'
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={Register} />
        <ProtectedAdminRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedAdminRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/home" component={homepage} />
        <Route exact path="/" component={Welcome}/>
        <Route path="*" component={NotFound} />
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
