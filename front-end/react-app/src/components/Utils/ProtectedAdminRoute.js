import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedAdminRoute = ({component: Component, isAuthenticated, isLoading, ...rest }) => { 

  return (
    <Route
      {...rest}
      render={props => {
        if(isLoading) {
          return <div>Loading...</div>
      }
      if(!isAuthenticated) {
          return <Redirect to="/home" />
      }
      return <Component {...props} /> 
      }}
    />
  )
}
export { ProtectedAdminRoute };
