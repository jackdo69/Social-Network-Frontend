import React from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import useAuth from './hooks/auth-hook';
import Layout from "./hoc/Layout";
//routes
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Auth from "./pages/Auth";

const App = () => {
  const { isLoggedIn } = useAuth();

  const routes = (
    <Switch>
      <Route path="/user" render={() => (isLoggedIn() ? <User /> : <Redirect to="/auth" />)} />
      <Route path="/home" render={() => (isLoggedIn() ? <Homepage /> : <Redirect to="/auth" />)} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <div>
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    </div>
  );


};

export default App;
