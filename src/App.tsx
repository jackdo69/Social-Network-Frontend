import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Layout from "./hoc/Layout/Layout";
import Search from "./pages/Search/Search";
import User from "./pages/User/User";

export default function App() {
  const routes = (
    <Switch>
      <Route path="/user" component={User} />
      <Route path="/search" component={Search} />
      <Route path="/" exact component={Homepage} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div>
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    </div>
  );
}
