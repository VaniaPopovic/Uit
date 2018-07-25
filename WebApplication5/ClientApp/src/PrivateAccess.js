import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateAccess = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === '2'
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)
