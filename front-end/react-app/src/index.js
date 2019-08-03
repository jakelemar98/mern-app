import React from 'react'
import ReactDOM from 'react-dom'
import { ProtectedRoute } from './components/Utils/ProtectedRoute';
import NotFound from './components/Utils/NotFound'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Admin/Dashboard'
import LoginForm from './components/Entry/LoginForm';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Account from './components/Account/Account'
import Welcome from './components/Entry/Welcome'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/account" component={Account} />
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
