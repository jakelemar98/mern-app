import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedAdminRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        
        if (auth.isAuthenticated() && auth.userIsAdmin()) {
          return <Component {...props} />;
        } else {     
          console.log(auth.checkUserGroup(), "redirecting" );
           
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                } 
              }}
            />
          );
        }
      }}
    />
  );
};
