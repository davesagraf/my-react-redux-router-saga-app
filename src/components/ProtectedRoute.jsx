import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Auth from './Auth'

export const ProtectedRoute = ({
    Element,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (Auth.isAuthenticated()) {
            return <Element {...props} />;
          } else {
            return (
              <Navigate
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