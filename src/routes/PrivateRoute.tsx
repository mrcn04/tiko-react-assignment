/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PrivateRouteProps from '../interfaces/privateRoute.interface';

export default function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteProps): JSX.Element {
  const context = useAuth();

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return context && context.user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
