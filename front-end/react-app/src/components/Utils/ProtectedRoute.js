import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, isAuthenticated, isLoading, ...rest }) => { 
  console.log(isLoading);
  
  return (
    <Route
      {...rest}
      render={props => {
      if(isLoading) {
          return <div>Loading...</div>
      }      
      if(!isAuthenticated) {
          return <Redirect to="/login" />
      }
      return <Component {...props} /> 
      }}
    />
  )
}
export { ProtectedRoute };
