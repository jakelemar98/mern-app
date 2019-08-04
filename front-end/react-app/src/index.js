import React from 'react'
import ReactDOM from 'react-dom'
import { ProtectedAdminRoute } from './components/Utils/ProtectedAdminRoute';
import { ProtectedRoute } from './components/Utils/ProtectedRoute';
import  Auth  from './components/Utils/auth'
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

  const [isAdmin, setAdminAuth] = React.useState(false);
  const [isAdLoad, setAdminLoad] = React.useState(true);
  const [isAuth, setAuth] = React.useState(false);
  const [isLoading, setLoad] = React.useState(true);

  React.useEffect(() => {
    checkAdmin();
    checkAuth();
  });

  function checkAdmin(){
    Auth.userIsAdmin().then( (result) => {
      if(result){
        setAdminAuth(true)
        setAdminLoad(false)
      } else {
        setAdminAuth(false)
        setAdminLoad(false)
      }
    })
  }

  function checkAuth() {
    Auth.isAuthenticated().then( (result) => {
      if(result){
        setAuth(true)
        setLoad(false)
      } else {
        setAuth(false)
        setLoad(false)
      }
    })
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={Register} />
        <ProtectedAdminRoute exact path="/dashboard" component={Dashboard} isAuthenticated={isAdmin} isLoading={isAdLoad} />
        <ProtectedAdminRoute exact path="/account" component={Account} isAuthenticated={isAdmin} isLoading={isAdLoad} />
        <ProtectedRoute exact path="/home" component={homepage}  isAuthenticated={isAuth} isLoading={isLoading} />
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
