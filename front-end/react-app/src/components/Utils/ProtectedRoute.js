import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from './auth'
const ProtectedRoute = ({component: Component, ...rest }) => {
  
  const [isAuth, setAuth] = React.useState(false);
  const [isLoading, setLoad] = React.useState(true);

  Auth.isAuthenticated().then( (result) => {
    if(result){
      setAuth(true)
      setLoad(false)
    } else {
      setAuth(false)
      setLoad(false)
    }
  })

  return (
    <Route
      {...rest}
      render={props => {
      if(isLoading) {
          return <div>Loading...</div>
      }      
      if(!isAuth) {        
          return <Redirect to="/login" />
      }
      return <Component {...props} /> 
      }}
    />
  )
}
export { ProtectedRoute };
