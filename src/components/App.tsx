import React from 'react';
import { HashRouter, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
// components
import Layout from './Layout/Layout';

// pages
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';

// context
import { useUserState } from '../context/UserContext';

export default function App() {
  // global
  const userState = useUserState();

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
          userState!.isAuthenticated ? (
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
          userState!.isAuthenticated ? (
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
