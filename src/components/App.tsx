import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// components
import Layout from './Layout/Layout';

// pages
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';

// hook
import useAuth from '../hooks/auth-hook';

export default function App() {
  // global
  const { isLoggedIn } = useAuth();

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
