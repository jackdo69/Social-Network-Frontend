import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// components
import Layout from './Layout/Layout';

// pages
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';

// hook
import useAuth from '../hooks/auth-hook';
import useInitData from '../hooks/init-data-hook';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../constants';

export default function App() {
  // global
  const { isLoggedIn } = useAuth();

  const { fetchPosts, getUserInfo, getFriendsSuggestions } = useInitData();

  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        const decoded = jwt.decode(token);
        fetchPosts();
        if (decoded !== null && typeof decoded !== 'string') {
          getUserInfo(decoded.userId);
          getFriendsSuggestions(decoded.userId);
        }
      }
    }
  });

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/home" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/home" />} />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  interface Props {
    path: string;
    component: typeof React.Component;
  }

  function PrivateRoute({ component, ...rest }: Props) {
    return (
      <Route
        {...rest}
        render={(props: any) =>
          isLoggedIn() ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }: Props) {
    return (
      <Route
        {...rest}
        render={(props: any) =>
          isLoggedIn() ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
